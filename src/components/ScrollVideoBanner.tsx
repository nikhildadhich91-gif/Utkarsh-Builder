import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './Preloader';

gsap.registerPlugin(ScrollTrigger);

const RAW_VIDEO_SRC = '/assets/videos/scroll-banner.mp4';

interface ScrollVideoBannerProps {
  src?: string;
  className?: string;
}

export const ScrollVideoBanner: React.FC<ScrollVideoBannerProps> = ({
  src = RAW_VIDEO_SRC,
  className = '',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    let currentTarget = 0;
    let seekPending = false;
    let scrollTriggerInstance: ScrollTrigger | null = null;

    const doSeek = (time: number) => {
      if (!video || !isFinite(time) || isNaN(time)) return;
      if (video.seeking) {
        seekPending = true;
      } else {
        video.currentTime = time;
      }
    };

    const handleSeeked = () => {
      if (seekPending) {
        seekPending = false;
        doSeek(currentTarget);
      }
    };

    video.addEventListener('seeked', handleSeeked);

    // Set raw local video source for instant hardware-accelerated playback
    video.src = src;
    video.load();

    // ── GSAP ScrollTrigger Scroll-to-seek ──────────────────────────────────────
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1,
      onUpdate: (self) => {
        if (video.duration && isFinite(video.duration)) {
          currentTarget = self.progress * video.duration;
          doSeek(currentTarget);
        }
      },
    });

    // Refresh ScrollTrigger when layout changes (e.g. when lazy pages finish rendering)
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      resizeObserver.disconnect();
    };
  }, [src]);

  return (
    <>
      {/* Split Curtain Preloader */}
      <Preloader />

      {/* Instant Video Background Wrapper */}
      <div
        ref={wrapperRef}
        id="scroll-video-container"
        className={`fixed top-0 left-0 w-full h-full z-0 bg-[#0a0a0a] overflow-hidden origin-center ${className}`}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-[40%_center] md:object-center scale-[1.05] md:scale-100 pointer-events-none transition-all duration-300"
        />
        {/* Overlay is shown on laptop/desktop (md:block) and hidden on mobile so video is 100% clear */}
        <div className="overlay absolute inset-0 hidden md:block bg-black/25 pointer-events-none" />
      </div>
    </>
  );
};

export default ScrollVideoBanner;
