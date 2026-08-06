import React from 'react';
import { FadeUp } from './ui/FadeUp';
import { assets } from '../lib/cloudinary';

interface Brand {
  name: string;
  path: string;
}

const brands: Brand[] = [
  { name: 'Havells', path: assets.brands.havells },
  { name: 'UltraTech Cement', path: assets.brands.ultratech },
  { name: 'Ashirvad Pipes', path: assets.brands.ashirvad },
  { name: 'Kajaria', path: assets.brands.kajaria },
  { name: 'RR Kabel', path: assets.brands.rrkabel },
  { name: 'Cera', path: assets.brands.cera },
];

export const BrandStrip: React.FC = () => {
  // Triple the list to ensure infinite scrolling covers wide viewports
  const scrollingBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white/20 backdrop-blur-xl border-y border-white/40 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        {/* Brand Heading aligned with consistent brand styling */}
        <div className="text-center mb-12">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-extrabold uppercase tracking-[0.2em] block mb-3">
              Partners
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
              Brand that trust us
            </h2>
          </FadeUp>
        </div>

        {/* Marquee viewport container with edge fade masks */}
        <div 
          className="relative w-full overflow-hidden py-4"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          {/* Scroll Track */}
          <div className="flex gap-16 md:gap-24 w-max animate-brand-marquee items-center">
            {scrollingBrands.map((brand, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center shrink-0 w-[120px] md:w-[160px] h-[60px] select-none hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={brand.path}
                  alt={brand.name}
                  width={160}
                  height={60}
                  className="max-w-full max-h-full object-contain opacity-95 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  draggable={false}
                />

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;
