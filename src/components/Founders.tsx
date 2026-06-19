import React from 'react';
import { FadeUp } from './ui/FadeUp';
import { StaggerContainer } from './ui/StaggerContainer';
import { Award, GraduationCap, ArrowUpRight } from 'lucide-react';
import Magnet from './ui/Magnet';

export const Founders: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#FAF7F5] relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Leadership</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Meet Our Founders
            </h2>
          </FadeUp>
        </div>

        {/* 2-Column Profile Layout */}
        <StaggerContainer staggerChildren={0.25} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Card 1: Ghanshyam Das Maheshwari */}
          <FadeUp
            delay={0.1}
            y={40}
            className="group relative bg-white rounded-3xl p-6 md:p-8 border border-black/5 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 text-left flex flex-col sm:flex-row gap-6 md:gap-8 items-start"
          >
            {/* Magnetic Portrait Frame */}
            <Magnet strength={12} padding={100} className="w-full sm:w-auto flex justify-center shrink-0">
              <div className="w-[180px] h-[240px] rounded-2xl overflow-hidden border border-black/5 relative shadow-md group-hover:shadow-xl transition-shadow duration-500 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=533&q=80"
                  alt="Ghanshyam Das Maheshwari"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </Magnet>

            {/* Profile Info Details */}
            <div className="flex-1 flex flex-col justify-between h-full min-h-[240px] space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C92C15] font-bold">
                  Founder
                </span>
                <h3 className="text-xl font-bold text-[#1B1B1B] mt-0.5 mb-3">
                  Ghanshyam Das Maheshwari
                </h3>

                <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs">
                  <Award className="h-4 w-4 text-[#C92C15] shrink-0" />
                  <span className="font-medium">30+ Years Construction Heritage</span>
                </div>

                <p className="text-xs text-[#6F6F6F] font-light leading-relaxed">
                  With over 30 years of experience in the construction and real estate industry, our founder brings a wealth of knowledge, hands-on expertise, and visionary leadership. He is renowned for his uncompromising commitment to structural quality and sustainable brick masonry design.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#C92C15] uppercase tracking-wider">Heritage Builder</span>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#C92C15] transition-colors" />
              </div>
            </div>
          </FadeUp>

          {/* Card 2: Utkarsh Nowal */}
          <FadeUp
            delay={0.25}
            y={40}
            className="group relative bg-white rounded-3xl p-6 md:p-8 border border-black/5 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 text-left flex flex-col sm:flex-row gap-6 md:gap-8 items-start"
          >
            {/* Magnetic Portrait Frame */}
            <Magnet strength={12} padding={100} className="w-full sm:w-auto flex justify-center shrink-0">
              <div className="w-[180px] h-[240px] rounded-2xl overflow-hidden border border-black/5 relative shadow-md group-hover:shadow-xl transition-shadow duration-500 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=533&q=80"
                  alt="Utkarsh Nowal"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </Magnet>

            {/* Profile Info Details */}
            <div className="flex-1 flex flex-col justify-between h-full min-h-[240px] space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C92C15] font-bold">
                  Co-Founder
                </span>
                <h3 className="text-xl font-bold text-[#1B1B1B] mt-0.5 mb-3">
                  Utkarsh Nowal
                </h3>

                <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs">
                  <GraduationCap className="h-4 w-4 text-[#C92C15] shrink-0" />
                  <span className="font-medium">MBA — Marketing &amp; Operations</span>
                </div>

                <p className="text-xs text-[#6F6F6F] font-light leading-relaxed">
                  An MBA graduate in Marketing and Operations, our co-founder brings a modern perspective. Having honed strategic agility at real estate startups, his data-driven methods complement our construction heritage to scale new growth vectors.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#C92C15] uppercase tracking-wider">Modern Management</span>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#C92C15] transition-colors" />
              </div>
            </div>
          </FadeUp>

        </StaggerContainer>

      </div>
    </section>
  );
};

export default Founders;
