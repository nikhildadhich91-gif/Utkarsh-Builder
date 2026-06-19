import React from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from './ui/FadeUp';
import { StaggerContainer } from './ui/StaggerContainer';
import { Building2, Compass, Briefcase, Paintbrush, Hammer, ArrowUpRight } from 'lucide-react';


interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<any>;
}

const servicesList: ServiceItem[] = [
  {
    id: 'res-comm',
    number: '01',
    title: 'Residential & Commercial Construction',
    description: 'Creating durable and elegant spaces tailored to modern lifestyles. From bespoke residential villas to sophisticated commercial developments.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    icon: Building2,
  },
  {
    id: 'turnkey',
    number: '02',
    title: 'Turnkey Projects',
    description: 'End-to-end execution from initial concept planning and design permissions down to structural handovers and keys delivery.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
    icon: Compass,
  },
  {
    id: 'pm',
    number: '03',
    title: 'Project Management',
    description: 'Complete oversight ensuring strict quality benchmarks, seamless timelines, and rigid budget control across all site operations.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    icon: Briefcase,
  },
  {
    id: 'interior',
    number: '04',
    title: 'Interior Design',
    description: 'Functional and visually refined interiors that blend Jaipur’s rich heritage symmetry with contemporary minimalist aesthetics.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    icon: Paintbrush,
  },
  {
    id: 'renovation',
    number: '05',
    title: 'Renovation & Remodeling',
    description: 'Transforming existing structural properties into modern, functional, and aesthetically striking residential and corporate environments.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    icon: Hammer,
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAF7F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="text-left max-w-2xl">
            <FadeUp delay={0.1} className="mb-3">
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Our Capabilities</span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
                Architectural Expertise &amp; Execution
              </h2>
            </FadeUp>
          </div>
          <div className="text-left md:text-right mt-4 md:mt-0">
            <FadeUp delay={0.3}>
              <p className="text-[#6F6F6F] font-light max-w-md">
                We design and build premium structures combining decades of manual construction expertise with modernized workflows.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Services Bento/List Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeUp 
                key={service.id} 
                delay={index * 0.1}
                y={40}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 border border-[#1B1B1B]/5 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image wrapper with zoom */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating Service Number */}
                    <span className="absolute top-4 right-4 text-white/80 font-light text-2xl tracking-widest bg-black/30 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 select-none">
                      {service.number}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#FAF7F5] text-[#C92C15] border border-[#C92C15]/10 transition-colors group-hover:bg-[#C92C15] group-hover:text-white duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-lg text-[#1B1B1B] leading-snug group-hover:text-[#C92C15] transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Footer details inside card */}
                <Link 
                  to="/services"
                  className="px-6 pb-6 pt-2 text-left flex items-center justify-between border-t border-gray-50 mt-auto group/link cursor-pointer hover:bg-[#FAF7F5]/50 transition-colors"
                >
                  <span className="text-xs text-[#C92C15] font-semibold tracking-wider uppercase select-none">
                    Discover Details
                  </span>
                  <div className="text-gray-400 group-hover/link:text-[#C92C15] transition-colors duration-300 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
export default Services;
