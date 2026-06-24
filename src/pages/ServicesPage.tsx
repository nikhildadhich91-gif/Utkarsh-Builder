import { useState, useEffect } from 'react';

import { FadeUp } from '../components/ui/FadeUp';
import { StaggerContainer } from '../components/ui/StaggerContainer';
import { Calculator, Briefcase, ShieldCheck, Award } from 'lucide-react';
import { HeroSection } from '../components/ui/hero-section-2';


interface ServiceItem {
  number: string;
  title: string;
  description: string;
  extendedDetails: string;
}

const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: 'Residential and Commercial Construction',
    description: 'We design and build strong, beautiful houses and commercial offices tailored to exactly what you need.',
    extendedDetails: 'We use high quality steel and strong concrete mixes to make sure every building is completely safe, durable, and built to the highest local safety standards.'
  },
  {
    number: '02',
    title: 'Complete Start to Finish Construction',
    description: 'We take care of the entire project from start to finish, managing all approvals, designs, and building work.',
    extendedDetails: 'This service covers everything: testing the soil, creating architectural blueprints, handling structural engineering, buying materials, and handing over the keys.'
  },
  {
    number: '03',
    title: 'Site Supervision and Engineering',
    description: 'We supervise daily construction, check material quality, and handle schedules to keep your project on time and within budget.',
    extendedDetails: 'We oversee daily labor, check the quality of materials delivered to the site, coordinate all builders, handle city inspections, and send you weekly progress updates with photos.'
  },
  {
    number: '04',
    title: 'Renovation and Remodeling',
    description: 'We transform old buildings into modern, functional spaces by updating layouts, reinforcing structures, and refreshing styling.',
    extendedDetails: 'We restore older structures, add new rooms, strengthen supporting columns, and completely redesign the interior and exterior to make it feel brand new.'
  },
  {
    number: '05',
    title: 'Land Selection and Sourcing',
    description: 'We help you find and choose the best locations and plots in Rajasthan that will grow in value over time.',
    extendedDetails: 'With over 30 years of local land and construction experience, we guide you through market trends, municipal plans, and pricing to help you make the best decision for your plot.'
  },
  {
    number: '06',
    title: 'Land and Plot Site Testing',
    description: 'We check the soil, sunlight direction, utilities, and layout options before starting construction.',
    extendedDetails: 'Before we lay a single brick, we carefully check the ground, plan for natural light, and make sure everything perfectly follows all municipal development authority regulations.'
  },
  {
    number: '07',
    title: 'Plot Development Support',
    description: 'We handle the entire journey for you, coordinating building approvals, blueprints, structural building, and checking in on your building even after move-in.',
    extendedDetails: 'We act as your reliable development partner, managing blueprints, municipal permits, structural building, and post-delivery checkups.'
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
    // Base cost per sq ft in INR (Rajasthan standards for premium builders)
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
      <div className="w-full pt-20">
        <HeroSection
          className="rounded-none border-none shadow-none w-full min-h-[500px] md:min-h-[600px]"
          title={
            <>
              Quality Construction <br />
              <span className="text-[#C92C15]">Built for Generations</span>
            </>
          }
          subtitle="From premium custom residential villas to commercial corporate spaces and complete turnkey solutions, we bring structural integrity and engineering excellence to life in Rajasthan."
          callToAction={{
            text: "Book A Consultation",
            href: "/contact"
          }}
          backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        />
      </div>

      {/* 2. Jack-Style Services Section (Vertical list, white bg) */}
      <div className="py-12 md:py-24 bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] relative z-10 -mt-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">

          <div className="text-center mb-10 md:mb-24">
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
                className="py-6 md:py-12 border-b border-[#1B1B1B]/15 flex flex-col md:flex-row items-start gap-4 md:gap-12 group hover:bg-[#FAF7F5]/40 transition-all duration-300 px-3 md:px-4 rounded-xl"
              >
                {/* Left side: Huge Index Number */}
                <div className="w-16 md:w-32 shrink-0">
                  <span className="text-3xl md:text-6xl lg:text-7xl font-light text-[#C92C15]/35 group-hover:text-[#C92C15] transition-colors duration-300 select-none">
                    {service.number}
                  </span>
                </div>

                {/* Right side: Name & Detail stacked */}
                <div className="flex-1 text-left space-y-2 md:space-y-4">
                  <h3 className="text-lg md:text-2xl font-semibold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-sm md:text-base text-[#6F6F6F] font-light leading-relaxed">
                    {service.description}
                  </p>

                  <p className="text-xs md:text-sm text-[#6F6F6F]/80 font-light leading-relaxed border-l-2 border-[#C92C15]/30 pl-4 group-hover:border-[#C92C15] transition-all">
                    {service.extendedDetails}
                  </p>
                </div>
              </FadeUp>
            ))}
          </StaggerContainer>

        </div>
      </div>

      {/* 3. Asme-Style Video Bento Grid */}
      <div className="py-12 md:py-24 bg-[#FAF7F5] text-[#1B1B1B] border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">

          <div className="text-left max-w-3xl mb-10 md:mb-16 space-y-3">
            <div>
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-3">Our Standards</span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1B1B1B]">
                Execution Divisions
              </h2>
            </div>
            <p className="text-[#6F6F6F] font-light text-sm md:text-base leading-relaxed">
              How we bifurcate our engineering divisions to guarantee specialized, high-end attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* Card 1: Residential */}
            <FadeUp delay={0.1} y={40} className="bg-white rounded-3xl overflow-hidden group border border-black/5 shadow-xl flex flex-col justify-between min-h-[340px] md:min-h-[420px] hover:shadow-2xl transition-all duration-300">
              <div className="relative h-40 md:h-60 w-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://res.cloudinary.com/darmr4g5x/video/upload/f_auto,q_auto/v1782198267/utkarsh%20construction/services-residential.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 bg-black/10 border border-black/25 px-3 py-1 rounded-full text-xxs uppercase tracking-widest text-[#1B1B1B] backdrop-blur-md">
                  Residential Division
                </span>
              </div>
              <div className="p-5 md:p-8 text-left space-y-2 md:space-y-3">
                <h3 className="text-lg md:text-2xl font-semibold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors">
                  Bespoke Villas &amp; Homes
                </h3>
                <p className="text-xs md:text-sm text-[#6F6F6F] font-light leading-relaxed">
                  We combine Rajasthan's rich architectural traditions with modern sustainable building practices to deliver extraordinary residential estates featuring flawless symmetry and structural longevity.
                </p>
              </div>
            </FadeUp>

            {/* Card 2: Commercial */}
            <FadeUp delay={0.2} y={40} className="bg-white rounded-3xl overflow-hidden group border border-black/5 shadow-xl flex flex-col justify-between min-h-[340px] md:min-h-[420px] hover:shadow-2xl transition-all duration-300">
              <div className="relative h-40 md:h-60 w-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://res.cloudinary.com/darmr4g5x/video/upload/f_auto,q_auto/v1782198269/utkarsh%20construction/services-commercial.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 bg-black/10 border border-black/25 px-3 py-1 rounded-full text-xxs uppercase tracking-widest text-[#1B1B1B] backdrop-blur-md">
                  Commercial Division
                </span>
              </div>
              <div className="p-5 md:p-8 text-left space-y-2 md:space-y-3">
                <h3 className="text-lg md:text-2xl font-semibold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors">
                  Retail &amp; Corporate Spaces
                </h3>
                <p className="text-xs md:text-sm text-[#6F6F6F] font-light leading-relaxed">
                  Expert execution of mixed-use hubs, high-symmetry jewelry showrooms, and office complexes engineered for workflow efficiency, energy savings, and structural integrity.
                </p>
              </div>
            </FadeUp>

          </div>

        </div>
      </div>

      {/* 4. Interactive Project Estimation Calculator Section */}
      <div id="calculator-section" className="py-12 md:py-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.25em] uppercase">Interactive Tool</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Cost Estimator Calculator
            </h2>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-2">
            <p className="text-sm text-[#6F6F6F] font-light">
              Get an instant cost estimate for your residential, commercial, or turnkey construction project in Rajasthan.
            </p>
          </FadeUp>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-black/5 shadow-2xl bg-white text-[#1B1B1B]">

          {/* Left Form Column (7 spans) */}
          <div className="lg:col-span-7 p-5 md:p-12 space-y-6 md:space-y-8 bg-[#FAF7F5]/50 border-r border-black/5 text-left">
            <div className="space-y-1">
              <h3 className="text-lg md:text-xl font-semibold text-[#1B1B1B]">Configure Your Project</h3>
              <p className="text-xs text-[#6F6F6F] font-light">Adjust the fields below to see real-time pricing updates.</p>
            </div>

            {/* Slider: Area */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-semibold tracking-wider uppercase text-[#6F6F6F]">Plot / Construction Area</label>
                <span className="text-base md:text-lg font-bold text-[#C92C15]">{area.toLocaleString()} Sq. Ft.</span>
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
              <div className="flex justify-between text-[10px] text-[#6F6F6F]/70">
                <span>1,000 Sq. Ft.</span>
                <span>10,000 Sq. Ft.</span>
              </div>
            </div>

            {/* Selector: Quality Standard */}
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wider uppercase text-[#1B1B1B] block">Quality &amp; Material Standard</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                {[
                  { id: 'standard', title: 'Standard Quality', desc: '₹1,800/sq.ft' },
                  { id: 'premium', title: 'Premium Luxury', desc: '₹2,800/sq.ft' },
                  { id: 'royal', title: 'Royal Premium', desc: '₹4,500/sq.ft' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setQuality(item.id as any)}
                    className={`p-3 md:p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 flex flex-row sm:flex-col justify-between items-center sm:items-start min-h-0 sm:min-h-[90px] ${quality === item.id
                        ? 'border-[#C92C15] bg-[#C92C15]/10 text-[#C92C15]'
                        : 'border-black/10 bg-black/[0.01] hover:border-black/20 text-[#1B1B1B]'
                      }`}
                  >
                    <span className="text-xs font-semibold">{item.title}</span>
                    <span className={`text-[10px] sm:text-xxs font-light sm:mt-2 ${quality === item.id ? 'text-[#C92C15]' : 'text-[#6F6F6F]'}`}>
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
          <div className="lg:col-span-5 p-5 md:p-12 bg-[#FAF7F5] text-[#1B1B1B] flex flex-col justify-between text-left relative border-t lg:border-t-0 border-black/5">
            {/* Elegant architectural background pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]" />

            <div className="space-y-6 relative z-10 w-full">
              <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.2em] block">
                Estimated Quote
              </span>

              <div className="border-b border-[#1B1B1B]/10 pb-6">
                <h4 className="text-xs text-[#6F6F6F] uppercase tracking-wider font-medium">Estimated Pricing Range</h4>
                <p className="text-2xl md:text-4xl font-light text-[#C92C15] mt-2 tracking-tight">
                  {formatLakhsCrores(estimate.min)} - {formatLakhsCrores(estimate.max)}
                </p>
                <p className="text-[10px] text-[#6F6F6F]/60 font-light mt-1">
                  *Approximation based on current Rajasthan brick, cement, and labor indexes.
                </p>
              </div>

              {/* Cost breakdown */}
              <div className="space-y-4 text-xs md:text-sm font-light text-[#6F6F6F]">
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
                <div className="flex justify-between border-t border-[#1B1B1B]/10 pt-4 text-sm md:text-base font-medium text-[#1b1b1b]">
                  <span>Total Estimated Price:</span>
                  <span className="text-[#C92C15]">{formatLakhsCrores(estimate.total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12 relative z-10 w-full">
              <a
                href="/contact"
                className="w-full bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all duration-300 py-3.5 md:py-4 px-6 rounded-xl font-medium tracking-wide flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-95 text-center text-xs md:text-sm uppercase"
              >
                <Calculator className="h-4 w-4" />
                <span>Lock In This Quote</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* 5. Interactive Client Extra Benefits Section */}
      <div className="py-12 md:py-24 bg-white rounded-b-[40px] sm:rounded-b-[50px] md:rounded-b-[60px] relative z-10 -mt-10 border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Value Additions</span>
          </FadeUp>
          <FadeUp delay={0.2} className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Extra Benefits We Give to Clients
            </h2>
          </FadeUp>

          {/* Interactive Benefit Tabs */}
          <ServicesExtraBenefits />
        </div>
      </div>

    </div>
  );
};

// Sub-component for client extra benefits
const ServicesExtraBenefits: React.FC = () => {
  const [activeBenefitTab, setActiveBenefitTab] = useState<'engineer' | 'permits' | 'billing' | 'quality'>('engineer');

  const benefitTabs = [
    {
      id: 'engineer',
      label: 'Site Engineer Supervision',
      title: 'Dedicated Site Engineers on Duty',
      desc: 'We place a qualified site engineer on every single construction project. They check materials, supervise builders, and ensure the engineering design is followed to the letter.',
      icon: Briefcase
    },
    {
      id: 'permits',
      label: 'Municipal Permitting Support',
      title: 'Liaison & Approval Management',
      desc: 'We handle the paperwork and approvals for you. From municipal structural blueprints, zoning guidelines, and utility board clearances, we make sure your building is fully compliant.',
      icon: ShieldCheck
    },
    {
      id: 'billing',
      label: 'Transparent Milestone Payments',
      title: 'Cost Control & Open Books',
      desc: 'We believe in absolute clarity. Payments are structured around clear construction milestones. You only pay for work completed, with fully transparent bill itemizations.',
      icon: Calculator
    },
    {
      id: 'quality',
      label: 'Material Auditing',
      title: 'Rigorous Quality Checks',
      desc: 'We conduct independent tests for all reinforcement steel bars, cement mixes, and sand grade. We only use high-grade verified components built to stand for generations.',
      icon: Award
    }
  ];

  const activeBenefit = benefitTabs.find(tab => tab.id === activeBenefitTab)!;
  const BenefitIcon = activeBenefit.icon;

  return (
    <div className="space-y-6 md:space-y-10">
      {/* Tab Selectors */}
      <div className="flex flex-wrap gap-1.5 justify-center border-b border-black/5 pb-2.5">
        {benefitTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveBenefitTab(tab.id as any)}
            className={`px-3 md:px-5 py-1.5 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeBenefitTab === tab.id
                ? 'bg-[#C92C15] text-white shadow-md'
                : 'text-[#6F6F6F] hover:text-[#C92C15] hover:bg-black/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Display */}
      <FadeUp delay={0.2} className="bg-[#FAF7F5] rounded-3xl p-5 md:p-12 border border-black/5 text-left flex flex-col md:flex-row gap-4 md:gap-8 items-center min-h-0 sm:min-h-[220px]">
        <div className="h-12 w-12 md:h-16 md:w-16 bg-[#C92C15]/5 border border-[#C92C15]/10 rounded-2xl flex items-center justify-center text-[#C92C15] shrink-0">
          <BenefitIcon className="h-6 w-6 md:h-8 md:w-8" />
        </div>
        <div className="space-y-2 md:space-y-3">
          <h4 className="text-lg md:text-2xl font-semibold text-[#1B1B1B]">{activeBenefit.title}</h4>
          <p className="text-sm md:text-base text-[#6F6F6F] font-light leading-relaxed">{activeBenefit.desc}</p>
        </div>
      </FadeUp>
    </div>
  );
};

export default ServicesPage;
