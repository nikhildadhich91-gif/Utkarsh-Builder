import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './Preloader';

gsap.registerPlugin(ScrollTrigger);

const RAW_VIDEO_SRC = '/assets/videos/scroll-banner.mp4';

const FIRST_FRAME_SRC = '/assets/videos/scroll-banner-first-frame.jpg';

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

  const [isMobile, setIsMobile] = React.useState(false);
  const [videoReady, setVideoReady] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Defer video loading until after first paint to unblock LCP
  useEffect(() => {
    const defer = () => setVideoReady(true);
    if ('requestIdleCallback' in window) {
      (window as Window & typeof globalThis & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(defer, { timeout: 1500 });
    } else {
      setTimeout(defer, 500);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let currentTarget = 0;
    let seekPending = false;
    let lastSeekTime = 0;
    let throttleTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let animFrameId: number | null = null;
    let scrollTriggerInstance: ScrollTrigger | null = null;
    let videoScrollTriggerInstance: ScrollTrigger | null = null;
    let footerScrollTriggerInstance: ScrollTrigger | null = null;

    const doSeek = (time: number) => {
      if (!video || !isFinite(time) || isNaN(time)) return;

      currentTarget = time;

      if (Math.abs(video.currentTime - time) < 0.04) return;

      const now = Date.now();
      const timeSinceLastSeek = now - lastSeekTime;

      if (timeSinceLastSeek < 80) {
        if (throttleTimeoutId) clearTimeout(throttleTimeoutId);
        throttleTimeoutId = setTimeout(() => {
          if (!video.seeking) {
            video.currentTime = currentTarget;
            lastSeekTime = Date.now();
          }
        }, 100);
        return;
      }

      if (!seekPending && !video.seeking) {
        seekPending = true;
        if (animFrameId) cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(() => {
          video.currentTime = currentTarget;
          lastSeekTime = Date.now();
        });
      }
    };

    const handleSeeked = () => {
      seekPending = false;
    };

    if (video) {
      video.addEventListener('seeked', handleSeeked);
      // Only assign src after videoReady flag (deferred past first paint)
      if (videoReady) {
        video.src = src;
        video.load();
      }
    }

    const initScrollAnimations = () => {
      const homeEl = document.getElementById('home');
      if (!homeEl) return false;

      const pageEl = document.querySelector('.home-content-layer');

      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }
      if (videoScrollTriggerInstance) {
        videoScrollTriggerInstance.kill();
        videoScrollTriggerInstance = null;
      }
      if (footerScrollTriggerInstance) {
        footerScrollTriggerInstance.kill();
        footerScrollTriggerInstance = null;
      }

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.1,
        onUpdate: (self) => {
          const heroOpacity = Math.max(0, 1 - (self.progress / 0.15));
          gsap.set('.hero-text-container', {
            opacity: heroOpacity,
            pointerEvents: heroOpacity > 0 ? 'auto' : 'none',
          });

          const maxWhiteOpacity = 0.85;
          const overlayOpacity = Math.min(maxWhiteOpacity, self.progress * maxWhiteOpacity);
          gsap.set('.video-white-overlay', { opacity: overlayOpacity });
        },
      });

      if (video && !isMobile) {
        videoScrollTriggerInstance = ScrollTrigger.create({
          trigger: pageEl || 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
          onUpdate: (self) => {
            if (video.duration && isFinite(video.duration)) {
              currentTarget = self.progress * video.duration;
              doSeek(currentTarget);
            }
          }
        });
      }

      footerScrollTriggerInstance = ScrollTrigger.create({
        trigger: 'footer',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const maxWhiteOpacity = 0.85;
          const footerOpacity = maxWhiteOpacity * (1 - self.progress);
          gsap.set('.video-white-overlay', { opacity: footerOpacity });
        }
      });

      return true;
    };

    const handleLoadedMetadata = () => {
      if (initScrollAnimations()) {
        ScrollTrigger.refresh();
      }
    };

    if (video) {
      if (video.readyState >= 1) {
        initScrollAnimations();
      } else {
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
      }
    } else {
      initScrollAnimations();
    }

    const resizeObserver = new ResizeObserver(() => {
      if (initScrollAnimations()) {
        ScrollTrigger.refresh();
      }
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (throttleTimeoutId) clearTimeout(throttleTimeoutId);
      if (video) {
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      if (videoScrollTriggerInstance) {
        videoScrollTriggerInstance.kill();
      }
      if (footerScrollTriggerInstance) {
        footerScrollTriggerInstance.kill();
      }
      resizeObserver.disconnect();
      gsap.set('.video-white-overlay', { clearProps: 'all' });
    };
  }, [src, isMobile, videoReady]);

  return (
    <>
      <Preloader />

      <div
        ref={wrapperRef}
        id="scroll-video-container"
        className={`fixed top-0 left-0 w-full h-full z-0 bg-[#0a0a0a] overflow-hidden origin-center ${className}`}
      >
        {/* Always show first-frame image immediately as poster/background */}
        <img
          src={FIRST_FRAME_SRC}
          alt="Utkarsh Builder Background"
          width={1920}
          height={1080}
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover object-[40%_center] md:object-center scale-[1.05] md:scale-100 ${!isMobile && videoReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        />

        {/* Desktop scroll video — only rendered after deferred load */}
        {!isMobile && videoReady && (
          <video
            ref={videoRef}
            muted
            playsInline
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover object-[40%_center] md:object-center scale-[1.05] md:scale-100 pointer-events-none [will-change:transform] [transform:translateZ(0)]"
          />
        )}
        <div className="overlay absolute inset-0 hidden md:block bg-black/25 pointer-events-none" />
        <div className="video-white-overlay absolute inset-0 bg-white opacity-0 pointer-events-none" />
      </div>
    </>
  );
};

export default ScrollVideoBanner;
