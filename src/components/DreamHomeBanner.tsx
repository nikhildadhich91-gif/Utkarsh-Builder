import React from 'react';
import { FadeUp } from './ui/FadeUp';
import { assets } from '../lib/cloudinary';

export const DreamHomeBanner: React.FC = () => {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-transparent">
      {/* Decorative background glow elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C92C15]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
        {/* Text content inside Frosted Glass Panel */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-10 mb-10 md:mb-16 max-w-3xl mx-auto text-center shadow-2xl">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-extrabold tracking-[0.2em] uppercase">
              Hassle Free Construction
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-6">
              No Time to Build Your Dream Home?
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-lg md:text-xl text-[#333333] font-medium leading-relaxed">
              We handle everything from planning and approvals to construction and handover so you can enjoy a stress free building experience
            </p>
          </FadeUp>
        </div>

        {/* Clear, full-width Image */}
        <FadeUp delay={0.4} y={40}>
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-black/5 bg-gray-100 w-full">
            <img
              src={assets.dreamHome}
              alt="Dream Home Construction Banner"
              className="w-full h-auto object-contain block"
              loading="lazy"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default DreamHomeBanner;
