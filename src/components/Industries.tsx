import React from 'react';
import { FadeUp } from './ui/FadeUp';
import { StaggerContainer } from './ui/StaggerContainer';
import { Home, Building2, ShoppingBag, Briefcase, Hammer, Landmark } from 'lucide-react';

interface IndustryItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const industriesList: IndustryItem[] = [
  {
    title: 'Residential Villas',
    description: 'Bespoke high-end custom villas with structural elegance and luxury layouts.',
    icon: Home,
  },
  {
    title: 'Commercial Buildings',
    description: 'Highly functional retail malls, corporate towers, and shopping centers.',
    icon: Building2,
  },
  {
    title: 'Retail Spaces',
    description: 'Symmetric luxury showrooms, jewelry boutiques, and luxury stores.',
    icon: ShoppingBag,
  },
  {
    title: 'Office Interiors',
    description: 'Acoustic corporate workspaces, meeting suites, and creative production layouts.',
    icon: Briefcase,
  },
  {
    title: 'Renovation Projects',
    description: 'Transforming vintage spaces with contemporary updates while keeping heritage design.',
    icon: Hammer,
  },
  {
    title: 'Mixed Use Developments',
    description: 'Integrated spaces combining premium shopping zones with luxury suites.',
    icon: Landmark,
  },
];

export const Industries: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white text-[#2A2A2A] relative overflow-hidden">
      {/* Decorative terracotta background blob */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-96 h-96 bg-[#C92C15]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Sectors We Build</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1B1B1B]">
              Industries We Serve
            </h2>
          </FadeUp>
        </div>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industriesList.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <FadeUp
                key={index}
                delay={index * 0.08}
                y={30}
                className="group p-8 rounded-2xl bg-[#FAF7F5] border border-black/5 hover:border-[#C92C15]/30 hover:bg-white transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  {/* Icon Circle */}
                  <div className="p-3.5 rounded-xl bg-[#C92C15]/5 text-[#C92C15] border border-[#C92C15]/10 mb-6 w-max transition-all duration-300 group-hover:bg-[#C92C15] group-hover:text-white group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-2 group-hover:text-[#C92C15] transition-colors duration-300">
                    {ind.title}
                  </h3>
                  <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
export default Industries;
