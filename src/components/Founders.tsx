import React from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from './ui/FadeUp';
import { StaggerContainer } from './ui/StaggerContainer';
import { Award, GraduationCap, ArrowUpRight } from 'lucide-react';

export const Founders: React.FC = () => {
  const founders = [
    {
      name: "Ghanshyam Das Maheshwari",
      role: "Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=800&q=80",
      icon: <Award className="h-5 w-5 text-[#C92C15]" />,
      tag: "30+ Years Construction Legacy",
      desc: "With over 30 years of experience in the construction industry, our founder brings a wealth of knowledge, hands-on expertise, and visionary leadership. He is renowned for his uncompromising commitment to structural quality and sustainable brick masonry design.",
      heritage: "Legacy Builder",
    },
    {
      name: "Utkarsh Nowal",
      role: "Co-Founder",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=800&q=80",
      icon: <GraduationCap className="h-5 w-5 text-[#C92C15]" />,
      tag: "MBA — Marketing & Operations",
      desc: "An MBA graduate in Marketing and Operations, our co-founder brings a modern perspective. Having honed strategic agility at property development startups, his data-driven methods complement our construction legacy to scale new growth vectors.",
      heritage: "Modern Management",
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAF7F5] relative overflow-hidden border-t border-black/5">
      {/* Background visual detail */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-24">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Leadership</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Meet Our Founders
            </h2>
          </FadeUp>
        </div>

        {/* 2-Column Arch Layout */}
        <StaggerContainer staggerChildren={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto justify-center">
          {founders.map((founder, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-md hover:shadow-2xl transition-shadow duration-500 bg-gradient-to-b from-white to-[#FAF7F5]"
            >
              {/* Arch Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                
                {/* Floating badge inside image overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white font-semibold bg-[#C92C15] px-3 py-1 rounded-full">
                      {founder.role}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold mt-2 text-white tracking-tight drop-shadow-sm">
                      {founder.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Founder Text & Qualifications */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 bg-[#C92C15]/5 rounded-lg shrink-0">
                      {founder.icon}
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-gray-800">
                      {founder.tag}
                    </span>
                  </div>

                  <p className="text-sm text-[#6F6F6F] font-light leading-relaxed text-left">
                    {founder.desc}
                  </p>
                </div>

                <div className="border-t border-black/5 pt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#C92C15] uppercase tracking-wider">
                    {founder.heritage}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#C92C15]/5 flex items-center justify-center group-hover:bg-[#C92C15] transition-colors duration-300">
                    <ArrowUpRight className="h-4 w-4 text-[#C92C15] group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Founders;
