import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Home, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

import bedroomImg from '../assets/generated/bedroom.webp';
import officeImg from '../assets/generated/office.webp';
import wardrobeImg from '../assets/generated/wardrobe.webp';

interface ShowcaseItem {
  number: string;
  title: string;
  subtitle: string;
  icon: any;
  desc: string;
  highlights: string[];
  image: string;
  color: string;
}

const items: ShowcaseItem[] = [
  {
    number: '01',
    title: 'Residential Development',
    subtitle: 'Custom Luxury Homes & Communities',
    icon: Home,
    desc: 'We design and build custom private homes and gated neighborhoods in Jaipur. Our focus is on spacious layouts, plenty of natural light, and premium quality styling to create perfect family homes.',
    highlights: ['Vastu Compliant', 'Strong Concrete Structures', 'Energy-Efficient Glass'],
    image: bedroomImg,
    color: '#C92C15'
  },
  {
    number: '02',
    title: 'Commercial Development',
    subtitle: 'Premium Offices & Retail Spaces',
    icon: Building,
    desc: "We build modern, energy-efficient offices and shopping spaces. Located in Jaipur's primary business hubs, these spaces are designed to support your business growth.",
    highlights: ['Prime Locations', 'Soundproof Windows', 'Flexible Office Layouts'],
    image: officeImg,
    color: '#1B1B1B'
  },
  {
    number: '03',
    title: 'Turnkey Construction',
    subtitle: 'Complete Construction from Start to Finish',
    icon: CheckSquare,
    desc: 'We take care of everything—from soil testing and JDA approvals to architectural design, building, and final styling. You get a ready-to-move-in property with a complete structural warranty.',
    highlights: ['One Point of Contact', 'Clear Stage-Wise Billing', 'Guaranteed Timelines'],
    image: wardrobeImg,
    color: '#C92C15'
  }
];

export const DevelopmentShowcase: React.FC = () => {
  return (
    <section
      id="developments-showcase"
      className="relative bg-[#FAF7F5] py-24 md:py-32 overflow-visible border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Heading */}
        <div className="text-left mb-16 md:mb-20">
          <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-3">
            Core Operations
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
            Our Core Building Services
          </h2>
          <p className="text-[#6F6F6F] font-light mt-4 max-w-xl">
            We specialize in luxury homes, commercial projects, and end-to-end building services in Jaipur.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Card 1: Residential Development (spans 2 columns on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col md:flex-row h-full rounded-[30px] overflow-hidden bg-white text-[#1B1B1B] border border-black/5 hover:border-[#C92C15]/40 transition-all duration-500 hover:shadow-2xl group relative"
          >
            {/* Liquid glass shimmer overlay */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

            {/* Content block */}
            <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-3xl md:text-4xl font-light text-[#C92C15] leading-none select-none">
                    {items[0].number}
                  </span>
                  <div className="p-3 rounded-xl bg-[#FAF7F5] border border-black/5 text-[#C92C15]">
                    <Home className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-bold block">
                    {items[0].subtitle}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1B1B1B]">
                    {items[0].title}
                  </h3>
                </div>

                <p className="text-xs md:text-sm text-[#6F6F6F] font-light leading-relaxed">
                  {items[0].desc}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/10">
                <h4 className="text-[10px] uppercase tracking-wider text-[#C92C15] font-bold">Key Value Inclusions</h4>
                <div className="flex flex-wrap gap-1.5">
                  {items[0].highlights.map((h, i) => (
                    <span key={i} className="bg-[#FAF7F5] border border-black/5 text-[#1B1B1B] text-[10px] px-2.5 py-1 rounded-full font-light">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Image block */}
            <div className="relative w-full md:w-[45%] shrink-0 overflow-hidden min-h-[180px] md:min-h-full">
              <img
                src={items[0].image}
                alt={items[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-white/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 right-6 z-20">
                <Link
                  to="/services"
                  className="h-10 w-10 rounded-full bg-white border border-black/5 hover:bg-[#C92C15] transition-all duration-300 flex items-center justify-center text-[#1B1B1B] hover:text-white cursor-pointer shadow-md"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Commercial Development (spans 1 column on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-1 flex flex-col h-full rounded-[30px] overflow-hidden bg-white text-[#1B1B1B] border border-black/5 hover:border-[#C92C15]/40 transition-all duration-500 hover:shadow-2xl group relative"
          >
            {/* Liquid glass shimmer overlay */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

            {/* Image block top */}
            <div className="relative w-full h-[140px] overflow-hidden shrink-0">
              <img
                src={items[1].image}
                alt={items[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content block bottom */}
            <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-3xl font-light text-[#C92C15] leading-none select-none">
                    {items[1].number}
                  </span>
                  <div className="p-3 rounded-xl bg-[#FAF7F5] border border-black/5 text-[#C92C15]">
                    <Building className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-bold block">
                    {items[1].subtitle}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-[#1B1B1B]">
                    {items[1].title}
                  </h3>
                </div>

                <p className="text-xs text-[#6F6F6F] font-light leading-relaxed">
                  {items[1].desc}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/10">
                <h4 className="text-[10px] uppercase tracking-wider text-[#C92C15] font-bold">Key Value Inclusions</h4>
                <div className="flex flex-wrap gap-1.5">
                  {items[1].highlights.map((h, i) => (
                    <span key={i} className="bg-[#FAF7F5] border border-black/5 text-[#1B1B1B] text-[10px] px-2.5 py-1 rounded-full font-light">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  to="/services"
                  className="h-10 w-10 rounded-full bg-white border border-black/5 hover:bg-[#C92C15] transition-all duration-300 flex items-center justify-center text-[#1B1B1B] hover:text-white cursor-pointer shadow-md"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Turnkey Construction (spans all 3 columns on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-3 flex flex-col md:flex-row h-full rounded-[30px] overflow-hidden bg-white text-[#1B1B1B] border border-black/5 hover:border-[#C92C15]/40 transition-all duration-500 hover:shadow-2xl group relative"
          >
            {/* Liquid glass shimmer overlay */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

            {/* Content block */}
            <div className="p-8 md:p-10 flex flex-col justify-between flex-1 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-3xl md:text-4xl font-light text-[#C92C15] leading-none select-none">
                    {items[2].number}
                  </span>
                  <div className="p-3 rounded-xl bg-[#FAF7F5] border border-black/5 text-[#C92C15]">
                    <CheckSquare className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#6F6F6F] font-bold block">
                    {items[2].subtitle}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1B1B1B]">
                    {items[2].title}
                  </h3>
                </div>

                <p className="text-xs md:text-sm text-[#6F6F6F] font-light leading-relaxed">
                  {items[2].desc}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/10">
                <h4 className="text-[10px] uppercase tracking-wider text-[#C92C15] font-bold">Key Value Inclusions</h4>
                <div className="flex flex-wrap gap-1.5">
                  {items[2].highlights.map((h, i) => (
                    <span key={i} className="bg-[#FAF7F5] border border-black/5 text-[#1B1B1B] text-[10px] px-2.5 py-1 rounded-full font-light">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Image block */}
            <div className="relative w-full md:w-[40%] shrink-0 overflow-hidden min-h-[220px] md:min-h-full">
              <img
                src={items[2].image}
                alt={items[2].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-white/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 right-6 z-20">
                <Link
                  to="/services"
                  className="h-10 w-10 rounded-full bg-white border border-black/5 hover:bg-[#C92C15] transition-all duration-300 flex items-center justify-center text-[#1B1B1B] hover:text-white cursor-pointer shadow-md"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default DevelopmentShowcase;
