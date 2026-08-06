import React, { useEffect } from 'react';
import { FadeUp } from '../components/ui/FadeUp';
import Projects from '../components/Projects';
import HeroSection from '../components/ui/hero-section-9';
import { Check, X } from 'lucide-react';
import { assets } from '../lib/cloudinary';

export const ProjectsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Our Projects | Utkarsh Builder - Premium Construction Portfolio";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our premium residential and commercial construction portfolio. Landmark projects built with precision, durability and luxury design across Rajasthan.');
    }
  }, []);


  const heroData = {
    title: (
      <>
        From Concept to <span className="font-semibold text-[#C92C15]">Finished Spaces</span>
      </>
    ),
    subtitle: 'Explore our landmark projects across Rajasthan, from modern offices to custom built luxury villas.',
    actions: [
      {
        text: 'Book Consultation',
        onClick: () => { window.location.href = '/contact#contact-section' }
      }
    ],
    images: [
      assets.projects.hotelCol1_1,
      assets.projects.msCol1_2,
      assets.projects.kitchenCol1_1,
      assets.projects.indieCol2,
      assets.projects.barfiwalaCol1_1,
      assets.projects.paliwalCol1_2,
    ],
  };

  // Comparative build standards
  const comparisonData = [
    {
      feature: 'Structural Steel',
      standard: 'Fe 500 or lower standard steel, prone to moisture corrosion and fatigue.',
      utkarsh: 'Fe 550D Grade Corrosion-Resistant TMT bars for maximum seismic protection and durability.',
    },
    {
      feature: 'Cement & Concrete',
      standard: 'Standard M20 mix design without specific regional curing adjustments.',
      utkarsh: 'High-strength M25 mix design, custom-cured for Rajasthan\'s high-temperature climate.',
    },
    {
      feature: 'Exterior Facade',
      standard: 'Single-glazed windows offering minimal insulation and 15dB noise reduction.',
      utkarsh: 'Double-glazed vacuum glass cladding providing 45dB sound-dampening & thermal efficiency.',
    },
    {
      feature: 'Waterproofing',
      standard: 'Single coat bitumen paint or basic brush-applied liquid barrier.',
      utkarsh: 'Multi-layer polyurethane systems with comprehensive structural waterproofing warranty.',
    },
    {
      feature: 'Quality Control',
      standard: 'Ad-hoc self-inspections with minimal structural certification steps.',
      utkarsh: 'Multi-stage, certified quality tests for concrete strength, plumbing and electrical loads.',
    }
  ];

  return (
    <main className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pb-24 overflow-x-hidden">

      
      {/* 1. Portfolio Hero Section */}
      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        actions={heroData.actions}
        images={heroData.images}
      />

      {/* 2. Stacking Card Showcase Component */}
      <div className="relative z-10">
        <Projects filter="all" />
      </div>

      {/* 4. Quality & Material Specifications Grid (Additional luxury detail) */}
      <div className="py-16 md:py-28 bg-white text-[#1B1B1B] border-t border-black/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          
          {/* Split Section: Client Consultation & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-5 text-left flex flex-col justify-center">
              <FadeUp delay={0.1} className="mb-4">
                <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase bg-[#C92C15]/5 px-3 py-1.5 rounded-full inline-block">
                  Engineering Quality
                </span>
              </FadeUp>
              <FadeUp delay={0.2} className="mb-6">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1B1B1B] leading-tight">
                  Your Vision. <br />
                  <span className="text-[#C92C15]">Our Commitment.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.3} className="mb-8">
                <p className="text-base md:text-lg text-[#555555] font-light leading-relaxed">
                  Every project begins by understanding your needs, lifestyle and budget. We work hand-in-hand to translate your requirements into structural realities, ensuring transparency, premium quality and safety at every turn.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <a
                  href="/contact#contact-section"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B1B1B] text-white font-medium text-sm hover:bg-[#C92C15] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group w-fit cursor-pointer"
                >
                  Book a Consultation
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </FadeUp>
            </div>

            {/* Right Column: Interactive Image Panel */}
            <div className="lg:col-span-7">
              <FadeUp delay={0.3} y={40}>
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-black/5 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                  {/* Decorative backdrop patterns */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#C92C15]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                  
                  <img
                    src="/assets/client_consultation.png"
                    alt="Client Consultation - Discussing floor plans"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Bottom Float Info Card */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-lg text-left hidden sm:block transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[#C92C15] text-[10px] font-bold tracking-wider uppercase mb-1">Interactive Planning</p>
                    <h4 className="text-sm font-semibold text-[#1B1B1B] mb-1">Tailored Architectural Design</h4>
                    <p className="text-xs text-[#6F6F6F] font-light">Collaborative blueprints shaped directly by your lifestyle preferences.</p>
                  </div>
                </div>
              </FadeUp>
            </div>

          </div>

          <hr className="border-black/5 my-12 md:my-16" />

          {/* Subheading: Premium Build Standards */}
          <div className="text-center mb-8 md:mb-12">
            <FadeUp delay={0.1}>
              <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#1B1B1B] leading-tight">
                Premium Build Standards
              </h3>
            </FadeUp>
          </div>

          {/* Comparison Table */}
          <div className="mt-8 md:mt-12 overflow-hidden rounded-3xl border border-black/5 bg-[#FAF7F5]/30 backdrop-blur-md shadow-xl">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 bg-[#1B1B1B] text-white px-6 py-4 md:px-8 md:py-5 text-xs font-semibold tracking-wider uppercase text-left">
              <div className="col-span-4 flex items-center gap-3">
                <div className="h-2 w-2 opacity-0 shrink-0" />
                <span>Build Parameter</span>
              </div>
              <div className="col-span-4 flex gap-3 items-center pr-6 text-white/60">
                <div className="w-[18px] h-[18px] opacity-0 shrink-0" />
                <span>Standard Practice</span>
              </div>
              <div className="col-span-4 flex gap-3 items-center pl-4 text-[#C92C15]">
                <div className="w-[18px] h-[18px] opacity-0 shrink-0" />
                <span>Utkarsh Builder Standard</span>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-black/5 bg-white">
              {comparisonData.map((row, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 items-center px-6 py-6 md:px-8 md:py-8 hover:bg-white/50 transition-all duration-300 gap-4 md:gap-0"
                >
                  {/* Parameter Column */}
                  <div className="md:col-span-4 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#C92C15] shrink-0" />
                    <span className="font-semibold text-base md:text-lg text-[#1B1B1B]">{row.feature}</span>
                  </div>

                  {/* Standard Practice Column */}
                  <div className="md:col-span-4 flex gap-3 items-start md:pr-6 text-left">
                    <div className="mt-1 shrink-0 p-0.5 bg-black/5 rounded-full text-[#8A8A8A]">
                      <X className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="md:hidden text-[10px] uppercase tracking-wider text-black/40 font-bold mb-1">Standard practice</span>
                      <p className="text-xs md:text-sm text-[#7A7A7A] font-light">{row.standard}</p>
                    </div>
                  </div>

                  {/* Utkarsh Builder Standard Column (Highlighted column) */}
                  <div className="md:col-span-4 flex gap-3 items-start md:pl-4 text-left border-t border-black/5 pt-4 md:pt-0 md:border-t-0">
                    <div className="mt-1 shrink-0 p-0.5 bg-[#C92C15]/10 rounded-full text-[#C92C15]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="md:hidden text-[10px] uppercase tracking-wider text-[#C92C15] font-bold mb-1">Utkarsh Premium</span>
                      <p className="text-xs md:text-sm text-[#1B1B1B] font-medium leading-relaxed">{row.utkarsh}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};
export default ProjectsPage;
