import React from 'react';
import { FadeUp } from './ui/FadeUp';
import { Map, Layout, Feather, HardHat, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineStep {
  title: string;
  icon: any;
  desc: string;
  label: string;
}

const bubbleVariants: any = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: i * 0.18
    }
  })
};

export const ValueCreationTimeline: React.FC = () => {
  const steps: TimelineStep[] = [
    {
      title: 'Land Acquisition',
      icon: Map,
      label: 'Land',
      desc: 'Finding high-value plots in Jaipur and securing all necessary land permits.'
    },
    {
      title: 'Site Feasibility',
      icon: Layout,
      label: 'Planning',
      desc: 'Planning natural sunlight access, spacing, and smart utility connections.'
    },
    {
      title: 'Bespoke Design',
      icon: Feather,
      label: 'Design',
      desc: 'Combining classic Rajasthani stone designs with modern glass styling.'
    },
    {
      title: 'Engineered Build',
      icon: HardHat,
      label: 'Construction',
      desc: 'Constructing with high-strength, rust-resistant steel and laboratory-tested concrete.'
    },
    {
      title: 'Sovereign Delivery',
      icon: Award,
      label: 'Delivery',
      desc: 'Thorough quality checks, beautiful styling finishes, and keys handover with a warranty.'
    },
    {
      title: 'Asset Lifecycle',
      icon: TrendingUp,
      label: 'Long-Term Value',
      desc: 'Providing premium quality that ensures high rental income and long-term durability.'
    }
  ];

  return (
    <section id="timeline" className="py-24 bg-[#FAF7F5] relative overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <FadeUp delay={0.1} className="mb-3 block">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.25em] uppercase">Structured Progression</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Value Creation Timeline
            </h2>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-4">
            <p className="text-[#6F6F6F] font-light text-sm">
              We design and manage the entire asset lifecycle, ensuring value multipliers at every phase.
            </p>
          </FadeUp>
        </div>

        {/* Timeline Flow */}
        <div className="relative mt-12">
          {/* Horizontal Line Connector (desktop only) */}
          <div className="hidden lg:block absolute top-[45px] left-[5%] right-[5%] h-[2px] bg-black/5 z-0" />
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center space-y-4 group"
                >
                  {/* Step Bubble Indicator with Spring Stagger Animation */}
                  <motion.div
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={bubbleVariants}
                    className="relative z-10"
                  >
                    <div className="h-20 w-20 rounded-full bg-white border border-black/5 shadow-md flex items-center justify-center text-[#C92C15] group-hover:bg-[#C92C15] group-hover:text-white transition-all duration-300 relative">
                      <Icon className="h-8 w-8" />
                    </div>
                    {/* Small numerical tag */}
                    <span className="absolute -top-1 -right-1 bg-[#C92C15] text-white text-[10px] font-bold h-6 w-6 rounded-full flex items-center justify-center border-2 border-[#FAF7F5]">
                      {idx + 1}
                    </span>
                  </motion.div>

                  {/* Text Details with FadeUp */}
                  <FadeUp 
                    delay={idx * 0.1} 
                    y={25}
                    className="space-y-2 max-w-xs flex flex-col items-center"
                  >
                    <span className="text-[#C92C15] text-xxs uppercase tracking-widest font-semibold block">
                      {step.label}
                    </span>
                    <h3 className="text-base font-bold text-[#1B1B1B] group-hover:text-[#C92C15] transition-colors duration-300 lg:min-h-[48px] flex items-center justify-center">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#6F6F6F] font-light leading-relaxed lg:min-h-[80px]">
                      {step.desc}
                    </p>
                  </FadeUp>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
export default ValueCreationTimeline;
