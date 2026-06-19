import React from 'react';
import { Award, Compass, Layers, ShieldCheck, Zap, Briefcase, Paintbrush, Hammer } from 'lucide-react';

const trustItems = [
  { text: '30+ Years Experience', icon: Award },
  { text: '100+ Projects Delivered', icon: ShieldCheck },
  { text: 'Residential Construction', icon: Compass },
  { text: 'Commercial Construction', icon: Layers },
  { text: 'Turnkey Solutions', icon: Zap },
  { text: 'Project Management', icon: Briefcase },
  { text: 'Interior Design', icon: Paintbrush },
  { text: 'Renovation Experts', icon: Hammer },
];

export const TrustBar: React.FC = () => {
  // Triple the items to ensure seamless loop without gaps
  const marqueeItems = [...trustItems, ...trustItems, ...trustItems];

  return (
    <div className="relative w-full bg-white py-6 overflow-hidden border-y border-black/5 z-10 shadow-sm">
      {/* Decorative side fades */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Marquee Row */}
      <div className="flex w-max items-center animate-marquee">
        {marqueeItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className="flex items-center gap-3 px-8 text-[#2A2A2A] uppercase tracking-wider text-xs md:text-sm font-semibold select-none whitespace-nowrap"
            >
              <Icon className="h-4 w-4 text-[#C92C15]" />
              <span>{item.text}</span>
              <span className="ml-8 text-black/10 font-light">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TrustBar;
