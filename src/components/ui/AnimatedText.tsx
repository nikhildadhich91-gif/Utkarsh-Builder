import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

// Crisp, high-end tick sound generated programmatically via Web Audio API
const playTickSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.03);
    
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (e) {
    // Fail silently to prevent console pollution
  }
};

// Subtle, crisp haptic feedback for premium mobile feel
const vibrateDevice = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(12);
    } catch (e) {
      // Fail silently
    }
  }
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.3'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;

  // Track thresholds for each word to trigger ticks and vibrations
  const wordStartThresholds = useRef<number[]>([]);
  const lastHighlightedWordIdx = useRef<number>(-1);

  if (wordStartThresholds.current.length === 0) {
    let charAcc = 0;
    const thresholds = words.map((word) => {
      const start = charAcc / totalChars;
      charAcc += word.length + 1; // includes trailing space
      return start;
    });
    wordStartThresholds.current = thresholds;
  }

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      let activeIdx = -1;
      for (let i = 0; i < wordStartThresholds.current.length; i++) {
        if (value >= wordStartThresholds.current[i]) {
          activeIdx = i;
        } else {
          break;
        }
      }

      if (activeIdx !== lastHighlightedWordIdx.current) {
        if (activeIdx > lastHighlightedWordIdx.current && activeIdx >= 0) {
          playTickSound();
          vibrateDevice();
        }
        lastHighlightedWordIdx.current = activeIdx;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center`}>
      {words.map((word, wordIdx) => {
        const chars = Array.from(word);
        
        return (
          <span key={wordIdx} className="inline-block mr-[0.35em] whitespace-nowrap">
            {chars.map((char, index) => {
              const currentIdx = charCounter;
              charCounter++;

              // Map scroll progress range for this specific character
              const start = currentIdx / totalChars;
              const end = Math.min((currentIdx + 5) / totalChars, 1);

              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

              return (
                <span key={index} className="relative inline-block">
                  <span className="opacity-20 text-[#FAF7F5]/30">{char}</span>
                  <motion.span
                    style={{ opacity }}
                    className="absolute top-0 left-0 text-current select-none"
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
