# Utkarsh Builder — Animation Architecture Guide

This document catalogs the premium, high-fidelity UI animation systems built for the Utkarsh Builder platform. It provides the exact mathematical mappings, CSS layouts, and component structures needed to copy, recreate, or scale these effects in other projects using Framer Motion, GSAP, and the Web Audio API.

---

## Table of Contents
1. [Split Curtain Preloader Component](#1-split-curtain-preloader-component)
2. [Scroll-Scrubbed Video Banner (Home Page)](#2-scroll-scrubbed-video-banner-home-page)
3. [Scroll-Triggered Fade-Up Container](#3-scroll-triggered-fade-up-container)
4. [3D Scroll Tilt (Framer Motion) — Projects Component](#4-3d-scroll-tilt-framer-motion--projects-component)
5. [3D Scroll Tilt (GSAP Pinned List) — Services Component](#5-3d-scroll-tilt-gsap-pinned-list--services-component)
6. [Timeline Progress Line & Step Transitions — Our Journey Component](#6-timeline-progress-line--step-transitions--our-journey-component)
7. [Haptic & Sound-Synced Text Highlight — AnimatedText Component](#7-haptic--sound-synced-text-highlight--animatedtext-component)
8. [SVG Path/Border Cursor Drawing — PointerHighlight Component](#8-svg-pathborder-cursor-drawing--pointerhighlight-component)

---

## 1. Split Curtain Preloader Component

### Visual Behavior
* A fullscreen loader that splits horizontally from the center.
* A central SVG logo animates its scale and fades out right before the split transition.
* Utilizes a highly responsive cubic-bezier ease (`expoOut`) to give the curtain snap a premium, snappy feel.

### Component Structure (`Preloader.tsx`)
```tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while preloading
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 1800);

    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  const expoOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div className="fixed inset-0 h-[100dvh] w-full z-[999999] pointer-events-none flex flex-col overflow-hidden">
          {/* Central Logo */}
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.img
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.95] }}
              transition={{ duration: 1.6, times: [0, 0.3, 0.75, 1], ease: 'easeInOut' }}
              src="/logo.webp"
              className="w-40 md:w-72 h-auto object-contain"
            />
          </div>

          {/* Top Curtain */}
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: expoOut, delay: 1.0 }}
            className="w-full h-[50.5dvh] bg-white relative z-40"
          />

          {/* Bottom Curtain */}
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.9, ease: expoOut, delay: 1.0 }}
            className="w-full h-[50.5dvh] bg-white relative z-40 -mt-1"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

---

## 2. Scroll-Scrubbed Video Banner (Home Page)

### Visual Behavior
* Pinned background canvas with a high-definition looping video.
* Scrolling scrub-links the video current time, completing at exactly `68%` of the viewport scroll (cinematic reveal phase).
* The remaining `32%` acts as a static "hold phase" where a white overlay fades in, transitioning the background smoothly to subsequent section content.
* Interactive UI controls (Navbars, CTAs) fade out during downscroll and instantly snap back in during upscroll.

### Component Structure (`ScrollVideoBanner.tsx`)
```tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollVideoBanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let currentTarget = 0;
    let seekPending = false;

    const doSeek = (time: number) => {
      if (!video || !isFinite(time)) return;
      if (video.seeking) {
        seekPending = true;
      } else {
        video.currentTime = time;
      }
    };

    video.addEventListener('seeked', () => {
      if (seekPending) {
        seekPending = false;
        doSeek(currentTarget);
      }
    });

    const trigger = ScrollTrigger.create({
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.1,
      onUpdate: (self) => {
        // 1. Video scrubbing (0% -> 68% scroll maps to 0% -> 100% video progress)
        if (video.duration && isFinite(video.duration)) {
          const videoProgress = Math.min(1.0, self.progress / 0.68);
          currentTarget = videoProgress * video.duration;
          doSeek(currentTarget);
        }

        // 2. Fade Out Hero Titles
        const heroOpacity = Math.max(0, 1 - (self.progress / 0.15));
        gsap.set('.hero-text-container', { opacity: heroOpacity });

        // 3. Floating UI Fades on Scroll Direction
        if (self.progress === 0 || self.direction === -1) {
          gsap.to('nav, .floating-cta', { opacity: 1, duration: 0.3 });
        } else {
          gsap.to('nav, .floating-cta', { opacity: 0, duration: 0.3 });
        }

        // 4. Hold transition overlay (68% -> 90% scroll draws opacity 0 -> 0.75)
        const overlayOpacity = Math.max(0, Math.min(0.75, ((self.progress - 0.68) / (0.90 - 0.68)) * 0.75));
        gsap.set('.white-overlay', { opacity: overlayOpacity });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-0 bg-[#0a0a0a]">
      <video ref={videoRef} muted playsInline className="w-full h-full object-cover" />
      <div className="white-overlay absolute inset-0 bg-white opacity-0" />
    </div>
  );
};
```

---

## 3. Scroll-Triggered Fade-Up Container

### Visual Behavior
* Reusable container wrapper to animate DOM elements when they enter the viewport.
* Combines scale, vertical offset shifts (`y`), and cubic-bezier interpolation for a premium fluid pop.

### Component Structure (`FadeUp.tsx`)
```tsx
import React from 'react';
import { motion } from 'framer-motion';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  y = 30,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0.1 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1], // Smooth ease-out curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
```

---

## 4. 3D Scroll Tilt (Framer Motion) — Projects Component

### Visual Behavior
* A scrolling feed of project layout blocks.
* As cards enter the viewport, they scale up/down and tilt forward/backward dynamically.
* Mapped mathematically using `useScroll` and `useTransform`.

### Mappings and Formulas
* **Scroll Boundary**: Tracked via element bounds relative to the viewport (`['start end', 'end start']`).
* **Scale Map**: Card scales from `0.85` (entry) $\rightarrow$ `1.0` (center) $\rightarrow$ `0.85` (exit).
* **Tilt (`rotateX`) Map**: Rotates from `15deg` (entry) $\rightarrow$ `0deg` (center) $\rightarrow$ `-15deg` (exit).
* **Opacity Map**: Fades from `0` (entry) $\rightarrow$ `1.0` (center) $\rightarrow$ `0` (exit).

### Component Structure (`Projects.tsx`)
```tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ProjectCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="py-12 md:py-24 perspective-[1000px]">
      <motion.div
        style={{ scale, rotateX, opacity, transformStyle: 'preserve-3d' }}
        className="w-full bg-white rounded-3xl p-8 shadow-xl"
      >
        {/* Card content */}
      </motion.div>
    </div>
  );
};
```

---

## 5. 3D Scroll Tilt (GSAP Pinned List) — Services Component

### Visual Behavior
* Uses a vertical pinned container that occupies exactly `100vh`.
* As the scroll container moves vertically, list items are translated up via `y: -scrollDistance`.
* Standard viewport intersections do not work since the parent element is pinned.
* Instead, we measure the relative center distance dynamically on scroll using `getBoundingClientRect()` within a GSAP ScrollTrigger timeline.

### Mappings and Formulas
* **Offset Distance Ratio**: $\text{dist} = \frac{\text{itemCenterY} - \text{viewportCenterY}}{\text{viewportHeight} / 2}$
* **Scale**: $1.0 - (|\text{dist}| \times 0.08)$ (shrinks up to `0.92` at screen edges).
* **RotateX**: $-\text{dist} \times 12^\circ$ (tilts backward at entry, forward at exit).
* **Opacity**: $1.0 - (|\text{dist}| \times 0.55)$ (fades to `0.2` at viewport top/bottom).

### Component Structure (`ServicesPage.tsx`)
```tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ServicesList: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const scrollWindowRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current || !scrollWindowRef.current || !listWrapperRef.current) return;

    const calculateScroll = () => {
      const windowHeight = scrollWindowRef.current!.clientHeight;
      const listHeight = listWrapperRef.current!.scrollHeight;
      return Math.max(0, listHeight - windowHeight);
    };

    let scrollDistance = calculateScroll();

    const update3DEffects = () => {
      if (!scrollWindowRef.current || !listWrapperRef.current) return;
      const containerRect = scrollWindowRef.current.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;
      const containerHeight = containerRect.height;
      const items = listWrapperRef.current.querySelectorAll('.service-card');

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;

        const dist = (itemCenter - containerCenter) / (containerHeight / 2);
        const clampedDist = Math.min(1.2, Math.max(-1.2, dist));
        const absDist = Math.abs(clampedDist);

        const scale = 1 - absDist * 0.08;
        const rotateX = -clampedDist * 12;
        const opacity = 1 - absDist * 0.55;

        const el = item as HTMLElement;
        el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) scale(${scale})`;
        el.style.transformStyle = 'preserve-3d';
        el.style.opacity = `${Math.max(0.2, opacity)}`;
      });
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: pinnedContentRef.current,
        pinSpacing: true,
        onUpdate: update3DEffects,
        onRefresh: update3DEffects,
      }
    });

    if (scrollDistance > 0) {
      tl.to(listWrapperRef.current, {
        y: -scrollDistance,
        ease: 'none',
        onUpdate: update3DEffects,
      });
    }

    setTimeout(update3DEffects, 100);
  }, []);

  return (
    <div ref={triggerRef} style={{ height: '240vh' }}>
      <div ref={pinnedContentRef} className="h-screen overflow-hidden">
        <div ref={scrollWindowRef} className="relative h-full overflow-hidden">
          <div ref={listWrapperRef} className="flex flex-col">
            <div className="service-card py-12">Service 1</div>
            <div className="service-card py-12">Service 2</div>
            <div className="service-card py-12">Service 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 6. Timeline Progress Line & Step Transitions — Our Journey Component

### Visual Behavior
* Scrolling triggers a vertical path line segment that grows dynamically.
* Background slides (looping video previews) shift corresponding to the current active step index.
* Uses Framer Motion's `useScroll` and `useTransform` to bind element scroll progress directly.

### Component Structure (`OurJourney.tsx`)
```tsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const OurJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.28) setActiveStep(0);
      else if (latest < 0.55) setActiveStep(1);
      else if (latest < 0.80) setActiveStep(2);
      else setActiveStep(3);
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative py-32 bg-[#FAF7F5]">
      {/* Shared Vertical progress tracker */}
      <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-black/5">
        <motion.div style={{ height: lineHeight }} className="w-full bg-[#C92C15] origin-top" />
      </div>

      {/* Floating video showcase */}
      <div className="sticky top-20 aspect-[4/3] w-96 rounded-[32px] overflow-hidden">
        {/* Map through video sources mapping activeStep to opacity */}
      </div>
    </div>
  );
};
```

---

## 7. Haptic & Sound-Synced Text Highlight — AnimatedText Component

### Visual Behavior
* Text is split into words and individual characters.
* As characters enter a scroll boundary, they light up from opacity `0.2` to `1.0`.
* High-end, premium sensory feedback: **vibrates the device** (haptics) and **plays a physical wooden tick sound** (via the Web Audio API) in perfect synchronization with every word that highlights!

### Audio synthesis formula:
* Generates a sound on the fly with no audio files needed.
* Sine oscillator ramps exponentially from `1400Hz` down to `700Hz` over `30ms` to produce a crisp mechanical clock tick.
* Volume envelope starts at `0.05` and decays exponentially to `0.001`.

### Component Structure (`AnimatedText.tsx`)
```tsx
import React, { useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// Play mechanical click using Web Audio API on the fly
const playTickSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch {}
};

// Subtle premium haptic trigger
const vibrateDevice = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(12);
    } catch {}
  }
};

interface CharProps {
  char: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}

const AnimatedChar: React.FC<CharProps> = ({ char, scrollYProgress, start, end }) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-20 text-black/10">{char}</span>
      <motion.span style={{ opacity }} className="absolute top-0 left-0 text-current">
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.3'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charCounter = 0;
  const lastHighlightedWordIdx = useRef<number>(-1);

  const thresholds = useMemo(() => {
    let acc = 0;
    return words.map(w => {
      const val = acc / totalChars;
      acc += w.length + 1;
      return val;
    });
  }, [words, totalChars]);

  useEffect(() => {
    return scrollYProgress.on('change', (val) => {
      let activeIdx = -1;
      for (let i = 0; i < thresholds.length; i++) {
        if (val >= thresholds[i]) activeIdx = i;
        else break;
      }
      if (activeIdx !== lastHighlightedWordIdx.current) {
        if (activeIdx > lastHighlightedWordIdx.current) {
          playTickSound();
          vibrateDevice();
        }
        lastHighlightedWordIdx.current = activeIdx;
      }
    });
  }, [scrollYProgress, thresholds]);

  return (
    <p ref={containerRef} className="flex flex-wrap">
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block mr-[0.3em] whitespace-nowrap">
          {Array.from(word).map((char, index) => {
            const idx = charCounter++;
            const start = idx / totalChars;
            const end = Math.min((idx + 5) / totalChars, 1);
            return (
              <AnimatedChar key={index} char={char} scrollYProgress={scrollYProgress} start={start} end={end} />
            );
          })}
        </span>
      ))}
    </p>
  );
};
```

---

## 8. SVG Path/Border Cursor Drawing — PointerHighlight Component

### Visual Behavior
* A cursor mouse pointer SVG graphic follows and highlights a specific keyword span.
* A drawing border box automatically expands around the dimensions of the text span upon loading.
* Handles resizing dynamically using a `ResizeObserver` to recalculate width/height offsets.

### Component Structure (`PointerHighlight.tsx`)
```tsx
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const PointerHighlight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const rect = entry.target.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={containerRef} className="relative inline-block px-2">
      <span className="relative z-10 text-[#C92C15]">{children}</span>
      {dimensions.width > 0 && (
        <motion.span className="absolute inset-0 z-0 pointer-events-none">
          {/* Outlining border */}
          <motion.span
            initial={{ width: 0, height: 0 }}
            whileInView={{ width: dimensions.width, height: dimensions.height }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 border border-[#C92C15]/80 rounded bg-[#C92C15]/5"
          />
          {/* Tracking Cursor Pointer */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, x: dimensions.width + 4, y: dimensions.height + 4 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute left-0 top-0"
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5 fill-[#C92C15] text-[#C92C15] -rotate-90">
              <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
            </svg>
          </motion.span>
        </motion.span>
      )}
    </span>
  );
};
```
