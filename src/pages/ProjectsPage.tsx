import React, { useState } from 'react';
import { FadeUp } from '../components/ui/FadeUp';
import Projects from '../components/Projects';
import { Shield } from 'lucide-react';


export const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'development' | 'interiors'>('all');

  // Specs lists for Jaipur landmark building materials
  const projectSpecifications = [
    {
      title: 'Structural Steel',
      desc: 'Corrosion-Resistant TMT bars grade Fe 550D for seismic protection.'
    },
    {
      title: 'Cement & Concrete',
      desc: 'High-strength M30 mix designs cured specifically for Jaipur climate criteria.'
    },
    {
      title: 'Exterior Facade',
      desc: 'Double-glazed vacuum glass cladding providing 45dB acoustic dampening.'
    },
    {
      title: 'Waterproof Membrane',
      desc: 'Multi-layer polyurethane systems with 10-year structural warranty.'
    }
  ];

  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pb-24">
      
      {/* 1. Premium Header Banner */}
      <div className="inner-hero-banner">
        {/* Decorative radial glows */}
        <div className="inner-hero-banner-glow top-[-50px] right-[-100px]" />
        <div className="inner-hero-banner-glow bottom-[-50px] left-[-100px]" />
        
        <div className="relative z-10 max-w-4xl pt-16">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] block mb-4">
              Our Portfolio
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="text-[#1B1B1B] mb-6">
              Crafted With Precision
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-[#6F6F6F] font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our landmark projects across Jaipur, from modern offices to custom-built luxury villas.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* 2. Project Category Filter Controls */}
      <div className="py-12 bg-white border-b border-gray-100 relative z-10 -mt-10 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-wrap justify-center items-center gap-4">
          {[
            { id: 'all', label: 'All Developments' },
            { id: 'residential', label: 'Bespoke Residential' },
            { id: 'commercial', label: 'Commercial Developments' },
            { id: 'development', label: 'Land Developments' },
            { id: 'interiors', label: 'Luxury Interiors' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                filter === btn.id 
                  ? 'bg-[#C92C15] text-white' 
                  : 'bg-[#FAF7F5] text-[#1B1B1B] border border-black/5 hover:bg-gray-100'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Stacking Card Showcase Component */}
      <div className="relative">
        <Projects filter={filter} />
      </div>

      {/* 4. Quality & Material Specifications Grid (Additional luxury detail) */}
      <div className="py-24 bg-white text-[#1B1B1B] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeUp delay={0.1} className="mb-3">
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Engineering Quality</span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1B1B1B]">
                Structural Specifications
              </h2>
            </FadeUp>
            <FadeUp delay={0.3} className="mt-4">
              <p className="text-[#6F6F6F] font-light text-sm">
                Every building we construct uses certified raw materials that exceed standard strength requirements by at least 18%.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectSpecifications.map((spec, index) => (
              <FadeUp
                key={index}
                delay={index * 0.1}
                y={30}
                className="p-8 rounded-2xl bg-[#FAF7F5]/50 border border-black/5 flex flex-col justify-between text-left group hover:border-[#C92C15]/30 hover:bg-white transition-all duration-300 hover:shadow-lg shadow-sm"
              >
                <div>
                  <div className="h-10 w-10 bg-[#C92C15]/10 rounded-lg flex items-center justify-center text-[#C92C15] mb-6">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1B1B1B] mb-3 group-hover:text-[#C92C15] transition-all">
                    {spec.title}
                  </h3>
                  <p className="text-xs text-[#6F6F6F] font-light leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
export default ProjectsPage;
