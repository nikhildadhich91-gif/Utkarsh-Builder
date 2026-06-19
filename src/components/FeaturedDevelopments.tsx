import React from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from './ui/FadeUp';
import { ArrowUpRight } from 'lucide-react';

interface DevelopmentCard {
  title: string;
  type: string;
  location: string;
  desc: string;
  image: string;
  link: string;
}

export const FeaturedDevelopments: React.FC = () => {
  const developments: DevelopmentCard[] = [
    {
      title: 'Aura Luxury Estates',
      type: 'Residential Development',
      location: 'Jaipur Growth Corridor',
      desc: 'Premium private residences designed for modern comfort, structural strength, and natural cooling.',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      link: '/projects?filter=residential'
    },
    {
      title: 'Solaris Innovation Center',
      type: 'Commercial Development',
      location: 'C-Scheme District, Jaipur',
      desc: 'A modern, eco-friendly office complex featuring energy-efficient glass designs and spacious workspaces.',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
      link: '/projects?filter=commercial'
    },
    {
      title: 'Nextlevel Corporate Plaza',
      type: 'Mixed Use Development',
      location: 'Raja Park Premium Hub',
      desc: 'A premium mix of luxury shopping galleries, executive offices, and beautiful heritage-inspired design.',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      link: '/projects?filter=development'
    }
  ];

  return (
    <section id="featured-developments" className="py-24 md:py-32 bg-[#FAF7F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block">Asset Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Featured Developments
            </h2>
          </div>
          <p className="text-[#6F6F6F] font-light max-w-sm text-left md:text-right">
            Explore carefully structured developments that blend engineering longevity with lifestyle design.
          </p>
        </div>

        {/* Development Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {developments.map((dev, idx) => (
            <FadeUp
              key={idx}
              delay={idx * 0.15}
              y={40}
              className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-lg flex flex-col group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container with Zoom */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black/5">
                <img 
                  src={dev.image} 
                  alt={dev.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-4 left-4 bg-white/90 text-[#1B1B1B] border border-black/5 px-3 py-1 rounded-full text-xxs uppercase tracking-widest font-semibold backdrop-blur-sm shadow-sm">
                  {dev.type}
                </span>
              </div>

              {/* Text Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between text-left space-y-6">
                <div className="space-y-3">
                  <span className="text-xxs uppercase tracking-wider text-gray-400 font-semibold">{dev.location}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors duration-300">
                    {dev.title}
                  </h3>
                  <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                    {dev.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5">
                  <Link 
                    to={dev.link}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C92C15] group-hover:text-[#D43B13] transition-colors duration-300 cursor-pointer"
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedDevelopments;
