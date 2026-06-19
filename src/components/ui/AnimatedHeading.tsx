import React, { useEffect, useState } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  initialDelay?: number; // ms, default 200ms
  charDelay?: number; // ms, default 30ms
  charDuration?: number; // ms, default 500ms
  letterSpacing?: string;
  highlightText?: string;
  highlightClassName?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = '',
  initialDelay = 200,
  charDelay = 30,
  charDuration = 500,
  letterSpacing = '-0.04em',
  highlightText = '',
  highlightClassName = '',
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  // Find offsets for highlight tracking
  const highlightStart = highlightText ? text.indexOf(highlightText) : -1;
  const highlightEnd = highlightStart !== -1 ? highlightStart + highlightText.length : -1;

  const lines = text.split('\n');
  
  // Track indices across line segments
  let globalCharCount = 0;
  let absoluteIndex = 0;

  return (
    <h1 className={`${className}`} style={{ letterSpacing }}>
      {lines.map((line, lineIndex) => {
        const chars = Array.from(line);

        const renderedLine = (
          <span key={lineIndex} className="block whitespace-nowrap">
            {chars.map((char, charIndex) => {
              const delay = globalCharCount * charDelay;
              globalCharCount++;

              // Check if this character falls inside the highlight boundaries
              const isHighlighted = highlightStart !== -1 && 
                absoluteIndex >= highlightStart && 
                absoluteIndex < highlightEnd;
              
              absoluteIndex++;

              // Render space as non-breaking space
              const displayChar = char === ' ' ? '\u00A0' : char;

              return (
                <span
                  key={charIndex}
                  className={`inline-block transition-all ease-out ${isHighlighted ? highlightClassName : ''}`}
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateX(0)' : 'translateX(-18px)',
                    transitionDuration: `${charDuration}ms`,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {displayChar}
                </span>
              );
            })}
          </span>
        );

        // Account for the newline char in absolute index
        absoluteIndex++;

        return renderedLine;
      })}
    </h1>
  );
};
export default AnimatedHeading;
