import React from 'react';

interface BoomerangVideoBgProps {
  src: string;
  className?: string;
}

// Highly-optimized, hardware-accelerated background video loop
export const BoomerangVideoBg: React.FC<BoomerangVideoBgProps> = ({ src, className = '' }) => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default BoomerangVideoBg;
