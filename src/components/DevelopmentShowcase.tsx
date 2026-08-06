import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building, Paintbrush, ShieldCheck, Hammer } from 'lucide-react';
import { assets } from '../lib/cloudinary';

interface ServiceItem {
  title: string;
  icon: React.ElementType;
  image: string;
  link: string;
}

const services: ServiceItem[] = [
  {
    title: 'Home Design & Construction',
    icon: Home,
    image: assets.projects.bhangadiyaCol2, // Real house project
    link: '/services#service-01',
  },
  {
    title: 'Commercial Construction',
    icon: Building,
    image: assets.projects.hotelCol2, // Real hotel project
    link: '/services#service-02',
  },
  {
    title: 'Interior Design & Construction',
    icon: Paintbrush,
    image: assets.generated.bedroom, // Real interior bedroom
    link: '/services#service-03',
  },
  {
    title: 'Construction & Management',
    icon: ShieldCheck, // Quality management
    image: assets.generated.reception, // Managed reception/office
    link: '/services#service-04',
  },
  {
    title: 'Renovation & Remodeling',
    icon: Hammer,
    image: assets.projects.kitchenCol2, // Renovated modular kitchen
    link: '/services#service-05',
  },
];

export const DevelopmentShowcase: React.FC = () => {
  // Triple the array to ensure smooth continuous marquee flow at any resolution
  const marqueeItems = [...services, ...services, ...services];

  return (
    <section
      id="developments-showcase"
      className="relative py-16 md:py-28 overflow-hidden text-left"
    >
      {/* Container for Heading */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12 md:mb-16">
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-10 shadow-2xl">
          <span className="text-[#C92C15] text-xs font-extrabold tracking-[0.2em] uppercase block mb-3 animate-pulse">
            Our Offerings
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-[1.2]">
            We’re a leading construction company in Rajasthan.
          </h2>
          <p className="text-[#333333] font-semibold mt-2 md:mt-4 text-sm md:text-lg">
            Our offerings include:
          </p>
        </div>
      </div>

      {/* Infinite Marquee Slider Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-8 shadow-2xl overflow-hidden relative">
          {/* Left and Right blur overlays - soft white blur matching card background and border radius with gradient fade-out mask */}
          <div 
            className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-white via-white/70 to-transparent backdrop-blur-[4px] z-10 pointer-events-none rounded-l-[28px]" 
            style={{
              WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1.0) 25%, rgba(0, 0, 0, 0.0) 100%)',
              maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1.0) 25%, rgba(0, 0, 0, 0.0) 100%)',
            }}
          />
          <div 
            className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-white via-white/70 to-transparent backdrop-blur-[4px] z-10 pointer-events-none rounded-r-[28px]" 
            style={{
              WebkitMaskImage: 'linear-gradient(to left, rgba(0, 0, 0, 1.0) 25%, rgba(0, 0, 0, 0.0) 100%)',
              maskImage: 'linear-gradient(to left, rgba(0, 0, 0, 1.0) 25%, rgba(0, 0, 0, 0.0) 100%)',
            }}
          />

          {/* Marquee Track */}
          <div className="flex w-max gap-6 animate-marquee-slow hover:[animation-play-state:paused]">
            {marqueeItems.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="w-[285px] md:w-[330px] shrink-0 bg-white border border-gray-100 rounded-3xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:scale-[1.02]"
                >
                  {/* Card Top: Icon & Title */}
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#C92C15]/10 border border-[#C92C15]/20 flex items-center justify-center text-[#C92C15]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#111111] tracking-tight leading-snug min-h-[56px] flex items-center">
                      {service.title}
                    </h3>
                  </div>

                  {/* Card Bottom: Stock Image & CTA Link */}
                  <Link
                    to={service.link}
                    className="relative block rounded-2xl overflow-hidden aspect-[4/3] mt-4 group cursor-pointer"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      width={330}
                      height={247}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Dark gradient overlay inside image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300" />
                    
                    {/* Inline CTA Button */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider">
                      <span>Explore Service</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentShowcase;
