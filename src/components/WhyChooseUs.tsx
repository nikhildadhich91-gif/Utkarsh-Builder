import React from 'react';
import { FadeUp } from './ui/FadeUp';
import { StaggerContainer } from './ui/StaggerContainer';
import { Award, Briefcase, Calendar, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

interface ReasonItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const reasonsList: ReasonItem[] = [
  {
    title: '30+ Years Experience',
    description: 'Over 30 years of building safe, reliable, and premium properties across Rajasthan.',
    icon: Award,
  },
  {
    title: '100+ Projects Completed',
    description: 'We have successfully built everything from luxury villas to large commercial complexes.',
    icon: ShieldCheck,
  },
  {
    title: 'Dedicated Project Manager',
    description: 'You work with a single person who handles all the builders, materials, and architects for you.',
    icon: Briefcase,
  },
  {
    title: 'Transparent Communication',
    description: 'We offer clear cost estimates, honest contracts, and absolutely no hidden fees.',
    icon: MessageSquare,
  },
  {
    title: 'Quality Construction',
    description: 'We use top grade cement and steel, and run regular quality checks at every step.',
    icon: CheckCircle2,
  },
  {
    title: 'On Time Delivery',
    description: 'We follow a strict schedule so we can hand over your keys on the exact day promised.',
    icon: Calendar,
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white text-[#2A2A2A] relative overflow-hidden border-t border-black/5">
      {/* Subtle grid lines background overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Title details */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-extrabold tracking-[0.2em] uppercase">Why Choose Us</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Why People Trust Us to Build
            </h2>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-4">
            <p className="text-lg md:text-xl text-[#6F6F6F] font-light max-w-xl mx-auto">
              Our work is based on trust, high quality building, and meeting our promises. Here is why clients choose us.
            </p>
          </FadeUp>
        </div>

        {/* Grid elements */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasonsList.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <FadeUp
                key={index}
                delay={index * 0.1}
                y={30}
                className="group p-8 rounded-2xl bg-[#FAF7F5] border border-black/5 hover:border-[#C92C15]/30 transition-all duration-300 flex flex-col items-start text-left shadow-md hover:bg-white"
              >
                {/* Icon Circle */}
                <div className="p-3 rounded-xl bg-[#C92C15]/5 text-[#C92C15] border border-[#C92C15]/10 mb-6 transition-all duration-300 group-hover:bg-[#C92C15] group-hover:text-white group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#1B1B1B] mb-3 group-hover:text-[#C92C15] transition-colors duration-300">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                  {reason.description}
                </p>
              </FadeUp>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
export default WhyChooseUs;
// Use capital letters correctly for our components
export const WhyChooseUsSection = WhyChooseUs;
