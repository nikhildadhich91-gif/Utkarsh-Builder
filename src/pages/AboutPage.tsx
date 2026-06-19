import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from '../components/ui/FadeUp';
import { AnimatedText } from '../components/ui/AnimatedText';
import Founders from '../components/Founders';
import About from '../components/About';
import { Compass, Layers, ShieldCheck, Ruler, Landmark, Leaf } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["luxurious", "durable", "modern", "sustainable", "timeless"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pb-24">
      
      {/* 1. Premium Animated Text-Rotating Header Banner */}
      <div className="inner-hero-banner relative overflow-hidden py-24 md:py-32 flex items-center justify-center min-h-[400px]">
        {/* Decorative radial glows */}
        <div className="inner-hero-banner-glow top-[-50px] right-[-100px] absolute w-[300px] h-[300px] bg-[#C92C15]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="inner-hero-banner-glow bottom-[-50px] left-[-100px] absolute w-[300px] h-[300px] bg-[#C92C15]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl text-center px-6 space-y-8 flex flex-col items-center">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] bg-[#C92C15]/5 px-4 py-1.5 rounded-full inline-block">
              Our Legacy
            </span>
          </FadeUp>
          
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-light text-[#1B1B1B] tracking-tight leading-tight max-w-3xl mx-auto flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
              <span>We build spaces that are</span>
              <span className="relative inline-block font-semibold text-[#C92C15] min-w-[200px] text-center md:text-left h-[1.2em]">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-0 flex justify-center md:justify-start items-center whitespace-nowrap"
                    initial={{ opacity: 0, y: 15 }}
                    animate={
                      titleNumber === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: -15 }
                    }
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <FadeUp delay={0.3}>
              <p className="text-[#6F6F6F] font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
                A heritage of craftsmanship, structural safety, and transparent client communication in every project since 1995.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.4} className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#philosophy"
              className="px-8 py-3.5 bg-[#C92C15] text-white hover:bg-[#D43B13] rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
            >
              <span>Our Philosophy</span>
              <span className="text-lg">↓</span>
            </a>
            <a 
              href="#contact"
              className="px-8 py-3.5 bg-white text-[#2A2A2A] hover:bg-gray-50 border border-black/10 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
            >
              <span>Contact Us</span>
              <span className="text-lg">→</span>
            </a>
          </FadeUp>
        </div>
      </div>

      {/* 2. Jack-Style About Section (min-h-screen, corner floating graphics, scroll-reveal paragraph) */}
      <div id="philosophy" className="relative min-h-[80vh] flex flex-col justify-center items-center py-24 bg-white text-[#2A2A2A] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] z-10 -mt-10 overflow-hidden border-t border-black/5 shadow-inner">
        {/* Decorative corner absolute graphics */}
        {/* Top-left */}
        <div className="absolute top-[8%] left-[5%] hidden md:block">
          <FadeUp delay={0.1} y={-40} className="bg-white/50 border border-black/5 rounded-full p-6 text-[#C92C15] hover:scale-110 hover:border-[#C92C15]/30 hover:bg-white transition-all duration-300 shadow-md backdrop-blur-md">
            <Compass className="h-8 w-8" />
          </FadeUp>
        </div>
        
        {/* Bottom-left */}
        <div className="absolute bottom-[10%] left-[8%] hidden md:block">
          <FadeUp delay={0.25} y={40} className="bg-white/50 border border-black/5 rounded-full p-6 text-[#C92C15] hover:scale-110 hover:border-[#C92C15]/30 hover:bg-white transition-all duration-300 shadow-md backdrop-blur-md">
            <Ruler className="h-8 w-8" />
          </FadeUp>
        </div>

        {/* Top-right */}
        <div className="absolute top-[8%] right-[5%] hidden md:block">
          <FadeUp delay={0.15} y={-40} className="bg-white/50 border border-black/5 rounded-full p-6 text-[#C92C15] hover:scale-110 hover:border-[#C92C15]/30 hover:bg-white transition-all duration-300 shadow-md backdrop-blur-md">
            <Layers className="h-8 w-8" />
          </FadeUp>
        </div>

        {/* Bottom-right */}
        <div className="absolute bottom-[10%] right-[8%] hidden md:block">
          <FadeUp delay={0.3} y={40} className="bg-white/50 border border-black/5 rounded-full p-6 text-[#C92C15] hover:scale-110 hover:border-[#C92C15]/30 hover:bg-white transition-all duration-300 shadow-md backdrop-blur-md">
            <ShieldCheck className="h-8 w-8" />
          </FadeUp>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-12">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em]">Our Philosophy</span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1B1B1B] mb-6">
              Precision Meets Passion
            </h2>
          </FadeUp>

          {/* Scroll reveal paragraph */}
          <div className="text-xl md:text-2xl lg:text-3xl text-[#2A2A2A] font-light leading-relaxed max-w-3xl mx-auto">
            <AnimatedText 
              text="With over 30 years of experience in construction and real estate, we deliver outstanding quality with complete transparency. We manage your entire project—from land purchase to keys handover—keeping your needs first."
            />
          </div>
        </div>
      </div>

      {/* 3. Story, Vision, Mission Tabs Component */}
      <About />

      {/* Beyond Construction Section (Developer positioning) */}
      <section className="py-24 bg-white border-t border-black/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Text detail */}
            <div className="lg:col-span-5 text-left space-y-6">
              <FadeUp delay={0.1}>
                <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.2em] block">
                  Strategic Stewardship
                </span>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight leading-tight">
                  Beyond Construction
                </h2>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="text-[#6F6F6F] font-light text-sm md:text-base leading-relaxed">
                  We operate as a developer and long-term asset creator. Our work doesn't start or stop with brick laying. We build and manage frameworks to secure multi-generational value, lifecycle utility, and structural legacy.
                </p>
              </FadeUp>
            </div>

            {/* Right: 3 core pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Landmark,
                  title: 'Land Intelligence',
                  desc: 'Analyzing growth corridors and municipal bylaws to identify prime locations with strong appreciation profiles.'
                },
                {
                  icon: Layers,
                  title: 'Development Planning',
                  desc: 'Designing spaces for sunlight optimization, density efficiency, and high layouts adaptability.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Lifecycle Ownership',
                  desc: 'Ensuring ongoing support, safety audits, and stewardship of assets long after the initial handover.'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <FadeUp
                    key={idx}
                    delay={idx * 0.15}
                    y={30}
                    className="p-6 rounded-2xl bg-[#FAF7F5] border border-black/5 text-left flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <div className="h-10 w-10 bg-[#C92C15]/5 border border-[#C92C15]/10 rounded-lg flex items-center justify-center text-[#C92C15] mb-6">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-semibold text-sm text-[#1B1B1B] mb-2">{item.title}</h4>
                      <p className="text-xs text-[#6F6F6F] font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Core Values Detail Grid */}
      <div className="py-24 bg-[#FAF7F5] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.2em] block mb-3">Our Principles</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Values We Live By
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Landmark, title: 'Jaipur Heritage', desc: 'We build with respect for Rajasthan’s symmetrical architecture while adapting spaces to modern structural requirements.' },
              { icon: ShieldCheck, title: 'Absolute Transparency', desc: 'Zero hidden fees, precise billing itemizations, and high-integrity materials ensure you get what you contract for.' },
              { icon: Leaf, title: 'Sustainable Engineering', desc: 'Employing double-glazed panel glass, local masonry stones, and energy-efficient designs that minimize eco footprints.' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <FadeUp
                  key={idx}
                  delay={idx * 0.1}
                  y={30}
                  className="bg-white p-8 rounded-2xl border border-black/5 shadow-md text-left flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="h-10 w-10 bg-[#C92C15]/5 border border-[#C92C15]/10 rounded-lg flex items-center justify-center text-[#C92C15] mb-6">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1B1B1B] mb-3">{item.title}</h3>
                    <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">{item.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Founders Profile section */}
      <Founders />

    </div>
  );
};
export default AboutPage;
