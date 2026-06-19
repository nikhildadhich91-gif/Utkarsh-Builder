import { useState, useEffect } from 'react';

import { FadeUp } from '../components/ui/FadeUp';
import { StaggerContainer } from '../components/ui/StaggerContainer';
import { Calculator } from 'lucide-react';


interface ServiceItem {
  number: string;
  title: string;
  description: string;
  extendedDetails: string;
}

const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: 'Residential & Commercial Construction',
    description: 'Creation of detailed architectural objects, luxury houses, or commercial plazas tailored to client structural demands.',
    extendedDetails: 'We deploy advanced engineering techniques, corrosion-resistant rebar, and high-strength concrete mixes. Each site is governed by strict structural safety parameters conforming to national building standards.'
  },
  {
    number: '02',
    title: 'Turnkey Projects',
    description: 'High-quality, comprehensive renders and structural execution from initial permits down to handovers.',
    extendedDetails: 'Our turnkey service covers soil testing, blueprint architectural styling, structural engineering, raw material procurement, interior completion, and final keys handover. You deal with a single company for all requirements.'
  },
  {
    number: '03',
    title: 'Project Management',
    description: 'Complete project oversight ensuring quality, milestone timeline compliance, and strict budget control.',
    extendedDetails: 'We supervise daily labor schedules, audit incoming raw material quality, coordinate sub-contractors, manage municipal inspections, and provide detailed weekly progress reports with real-time photographic updates.'
  },
  {
    number: '04',
    title: 'Interior Design Services',
    description: 'Crafting cohesive and visually refined internal environments that communicate style, symmetry, and legacy.',
    extendedDetails: 'We specialize in modern luxury interior styling, utilizing premium marble floorings, custom woodwork, lighting design plans, and heritage-inspired aesthetic combinations that reflect your lifestyle.'
  },
  {
    number: '05',
    title: 'Renovation & Remodeling',
    description: 'Transforming existing structural shells into modernized, highly functional, and striking environments.',
    extendedDetails: 'We restore heritage structures, extend current building envelopes, reinforce structural pillars, and completely redesign interior and exterior facades to modern efficiency benchmarks.'
  },
  {
    number: '06',
    title: 'Real Estate Development Advisory',
    description: 'Strategic market advice helping clients identify prime local corridors with highest compounding appreciation potential.',
    extendedDetails: 'We leverage 30+ years of local Jaipur real estate experience, compiling registry indexes, municipal planning layouts, and market trends to deliver actionable asset allocation blueprints.'
  },
  {
    number: '07',
    title: 'Site Feasibility Analysis',
    description: 'Detailed analysis of density optimization models, sunlight orientations, soil metrics, and utility layouts.',
    extendedDetails: 'Before any brick is laid, we run virtual design iterations to identify spacing opportunities, calculate loading metrics, and ensure full compliance with the Jaipur Development Authority (JDA) zoning regulations.'
  },
  {
    number: '08',
    title: 'End-To-End Development Planning',
    description: 'Comprehensive management of the full real estate lifecycle, from raw land procurement to final handovers.',
    extendedDetails: 'We act as your development partner, coordinating engineering blueprints, municipal permits, structural execution, internal decor spacing, and post-delivery lifecycle audits.'
  }
];

export const ServicesPage = () => {
  // Calculator States
  const [area, setArea] = useState<number>(2500);
  const [quality, setQuality] = useState<'standard' | 'premium' | 'royal'>('premium');
  const [type, setType] = useState<'residential' | 'commercial' | 'turnkey'>('residential');
  const [timeline, setTimeline] = useState<'fast' | 'normal' | 'flexible'>('normal');
  const [estimate, setEstimate] = useState({ min: 0, max: 0, pmo: 0, total: 0 });

  // Recalculate cost estimate when parameters change
  useEffect(() => {
    // Base cost per sq ft in INR (Jaipur standards for premium builders)
    let baseRate = 1800; // standard
    if (quality === 'premium') baseRate = 2800;
    if (quality === 'royal') baseRate = 4500;

    // Type multiplier
    let typeMultiplier = 1.0;
    if (type === 'commercial') typeMultiplier = 1.15; // commercial has complex HVAC, glass facades
    if (type === 'turnkey') typeMultiplier = 1.25; // turnkey includes structural, basic fittings, tiles, paint, doors

    // Timeline multiplier
    let timelineMultiplier = 1.0;
    if (timeline === 'fast') timelineMultiplier = 1.08; // crash schedules require overtime wages

    const calculatedBase = area * baseRate * typeMultiplier * timelineMultiplier;
    
    // Project management overhead (usually 10-15%)
    const pmo = Math.round(calculatedBase * 0.12);
    const total = Math.round(calculatedBase + pmo);
    
    // Provide a premium range
    const min = Math.round(total * 0.95);
    const max = Math.round(total * 1.05);

    setEstimate({ min, max, pmo, total });
  }, [area, quality, type, timeline]);

  const formatLakhsCrores = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Crore`;
    }
    return `₹${(value / 100000).toFixed(1)} Lakh`;
  };

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
              Utkarsh Capabilities
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="text-[#1B1B1B] mb-6">
              Our Professional Services
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-[#6F6F6F] font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We provide high-quality building services in Jaipur, custom-tailored to meet residential, commercial, and turnkey design needs.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* 2. Jack-Style Services Section (Vertical list, white bg) */}
      <div className="py-24 bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] relative z-10 -mt-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
          
          <div className="text-center mb-16 md:mb-24">
            <FadeUp delay={0.1} className="mb-3">
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">The Services</span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B]">
                Core Competencies
              </h2>
            </FadeUp>
          </div>

          <StaggerContainer staggerChildren={0.15} className="flex flex-col border-t border-[#1B1B1B]/15">
            {servicesData.map((service, index) => (
              <FadeUp
                key={service.number}
                delay={index * 0.1}
                y={30}
                className="py-10 md:py-12 border-b border-[#1B1B1B]/15 flex flex-col md:flex-row items-start gap-6 md:gap-12 group hover:bg-[#FAF7F5]/40 transition-all duration-300 px-4 rounded-xl"
              >
                {/* Left side: Huge Index Number */}
                <div className="w-20 md:w-32 shrink-0">
                  <span className="text-5xl md:text-6xl lg:text-7xl font-light text-[#C92C15]/35 group-hover:text-[#C92C15] transition-colors duration-300 select-none">
                    {service.number}
                  </span>
                </div>

                {/* Right side: Name & Detail stacked */}
                <div className="flex-1 text-left space-y-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-base text-[#6F6F6F] font-light leading-relaxed">
                    {service.description}
                  </p>
                  
                  <p className="text-sm text-[#6F6F6F]/80 font-light leading-relaxed border-l-2 border-[#C92C15]/30 pl-4 group-hover:border-[#C92C15] transition-all">
                    {service.extendedDetails}
                  </p>
                </div>
              </FadeUp>
            ))}
          </StaggerContainer>

        </div>
      </div>

      {/* 3. Asme-Style Video Bento Grid */}
      <div className="py-24 bg-[#FAF7F5] text-[#1B1B1B] border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="text-left">
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-3">Our Standards</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1B1B1B]">
                Execution Divisions
              </h2>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <p className="text-[#6F6F6F] font-light max-w-sm">
                How we bifurcate our engineering divisions to guarantee specialized, high-end attention.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Residential */}
            <FadeUp delay={0.1} y={40} className="bg-white rounded-3xl overflow-hidden group border border-black/5 shadow-xl flex flex-col justify-between min-h-[420px] hover:shadow-2xl transition-all duration-300">
              <div className="relative h-60 w-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 bg-black/10 border border-black/25 px-3 py-1 rounded-full text-xxs uppercase tracking-widest text-[#1B1B1B] backdrop-blur-md">
                  Residential Division
                </span>
              </div>
              <div className="p-8 text-left space-y-3">
                <h3 className="text-2xl font-semibold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors">
                  Bespoke Villas &amp; Homes
                </h3>
                <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                  We combine Jaipur's rich architectural heritage with modern sustainable building practices to deliver extraordinary residential estates featuring flawless symmetry and structural longevity.
                </p>
              </div>
            </FadeUp>

            {/* Card 2: Commercial */}
            <FadeUp delay={0.2} y={40} className="bg-white rounded-3xl overflow-hidden group border border-black/5 shadow-xl flex flex-col justify-between min-h-[420px] hover:shadow-2xl transition-all duration-300">
              <div className="relative h-60 w-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 bg-black/10 border border-black/25 px-3 py-1 rounded-full text-xxs uppercase tracking-widest text-[#1B1B1B] backdrop-blur-md">
                  Commercial Division
                </span>
              </div>
              <div className="p-8 text-left space-y-3">
                <h3 className="text-2xl font-semibold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors">
                  Retail &amp; Corporate Spaces
                </h3>
                <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                  Expert execution of mixed-use hubs, high-symmetry jewelry showrooms, and office complexes engineered for workflow efficiency, energy savings, and structural integrity.
                </p>
              </div>
            </FadeUp>

          </div>

        </div>
      </div>

      {/* 4. Interactive Project Estimation Calculator Section */}
      <div id="calculator-section" className="py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.25em] uppercase">Interactive Tool</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Cost Estimator Calculator
            </h2>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-4">
            <p className="text-[#6F6F6F] font-light">
              Get an instant cost estimate for your residential, commercial, or turnkey construction project in Jaipur.
            </p>
          </FadeUp>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-black/5 shadow-2xl bg-white text-[#1B1B1B]">
          
          {/* Left Form Column (7 spans) */}
          <div className="lg:col-span-7 p-8 md:p-12 space-y-8 bg-[#FAF7F5]/50 border-r border-black/5 text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#1B1B1B]">Configure Your Project</h3>
              <p className="text-xs text-[#6F6F6F] font-light">Adjust the fields below to see real-time pricing updates.</p>
            </div>

            {/* Slider: Area */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-sm font-semibold tracking-wider uppercase text-[#6F6F6F]">Plot / Construction Area</label>
                <span className="text-lg font-bold text-[#C92C15]">{area.toLocaleString()} Sq. Ft.</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="10000" 
                step="250"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[#C92C15]"
              />
              <div className="flex justify-between text-xxs text-[#6F6F6F]/70">
                <span>1,000 Sq. Ft.</span>
                <span>10,000 Sq. Ft.</span>
              </div>
            </div>

            {/* Selector: Quality Standard */}
            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-wider uppercase text-[#1B1B1B] block">Quality &amp; Material Standard</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'standard', title: 'Standard Quality', desc: '₹1,800/sq.ft' },
                  { id: 'premium', title: 'Premium Luxury', desc: '₹2,800/sq.ft' },
                  { id: 'royal', title: 'Royal Heritage', desc: '₹4,500/sq.ft' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setQuality(item.id as any)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[90px] ${
                      quality === item.id 
                        ? 'border-[#C92C15] bg-[#C92C15]/10 text-[#C92C15]' 
                        : 'border-black/10 bg-black/[0.01] hover:border-black/20 text-[#1B1B1B]'
                    }`}
                  >
                    <span className="text-xs font-semibold">{item.title}</span>
                    <span className={`text-xxs font-light mt-2 ${quality === item.id ? 'text-[#C92C15]' : 'text-[#6F6F6F]'}`}>
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid selector: Construction Type & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Type */}
              <div className="space-y-3">
                <label className="text-sm font-semibold tracking-wider uppercase text-[#1B1B1B] block">Construction Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-[#1B1B1B] text-sm focus:outline-none focus:border-[#C92C15] cursor-pointer"
                >
                  <option value="residential">Residential Villa (Custom)</option>
                  <option value="commercial">Commercial Development (+15%)</option>
                  <option value="turnkey">Turnkey Complete Build (+25%)</option>
                </select>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <label className="text-sm font-semibold tracking-wider uppercase text-[#1B1B1B] block">Required Timeline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value as any)}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-[#1B1B1B] text-sm focus:outline-none focus:border-[#C92C15] cursor-pointer"
                >
                  <option value="normal">Standard Schedule</option>
                  <option value="fast">Crashed Schedule (Fast-Track +8%)</option>
                  <option value="flexible">Flexible / Planning Phase</option>
                </select>
              </div>
            </div>

          </div>

          {/* Right Results Column (5 spans) */}
          <div className="lg:col-span-5 p-8 md:p-12 bg-[#FAF7F5] text-[#1B1B1B] flex flex-col justify-between text-left relative">
            {/* Elegant architectural background pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <div className="space-y-6 relative z-10 w-full">
              <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.2em] block">
                Estimated Quote
              </span>
              
              <div className="border-b border-[#1B1B1B]/10 pb-6">
                <h4 className="text-xs text-[#6F6F6F] uppercase tracking-wider font-medium">Estimated Pricing Range</h4>
                <p className="text-3xl md:text-4xl font-light text-[#C92C15] mt-2 tracking-tight">
                  {formatLakhsCrores(estimate.min)} - {formatLakhsCrores(estimate.max)}
                </p>
                <p className="text-xxs text-[#6F6F6F]/60 font-light mt-1">
                  *Approximation based on current Rajasthan brick, cement, and labor indexes.
                </p>
              </div>

              {/* Cost breakdown */}
              <div className="space-y-4 text-sm font-light text-[#6F6F6F]">
                <div className="flex justify-between">
                  <span>Base Construction Cost:</span>
                  <span className="font-medium text-[#1B1B1B]">
                    {formatLakhsCrores(estimate.total - estimate.pmo)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Project Oversight &amp; PMO (12%):</span>
                  <span className="font-medium text-[#1B1B1B]">{formatLakhsCrores(estimate.pmo)}</span>
                </div>
                <div className="flex justify-between border-t border-[#1B1B1B]/10 pt-4 text-base font-medium text-[#1b1b1b]">
                  <span>Total Estimated Price:</span>
                  <span className="text-[#C92C15]">{formatLakhsCrores(estimate.total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 relative z-10 w-full">
              <a 
                href="/contact" 
                className="w-full bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all duration-300 py-4 px-6 rounded-xl font-medium tracking-wide flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-95 text-center text-sm uppercase"
              >
                <Calculator className="h-4 w-4" />
                <span>Lock In This Quote</span>
              </a>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
export default ServicesPage;
