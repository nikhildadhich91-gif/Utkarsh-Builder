import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeUp } from '../components/ui/FadeUp';
import { ScrollTextRise } from '../components/ui/ScrollTextRise';
import Founders from '../components/Founders';
import About from '../components/About';
import { Compass, Layers, ShieldCheck, Landmark, Leaf, Sparkles } from 'lucide-react';
import { StaggerContainer } from '../components/ui/StaggerContainer';
import { assets } from '../lib/cloudinary';
const HookVideo = assets.videos.hookMp4;
const HookWebm = assets.videos.hookWebm;

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
    }, 4000); // slowed down to 4 seconds
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pb-24">

      {/* 1. Premium Animated Text-Rotating Header Banner */}
      <div className="inner-hero-banner relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32 flex flex-col items-center justify-center !h-auto min-h-[520px] md:min-h-[600px]">
        {/* Hanging Hook Video Component on Top Left - 7 times larger */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-[72px] md:top-[88px] right-[-50px] md:right-[-100px] w-[500px] md:w-[800px] h-auto pointer-events-none z-20 mix-blend-multiply filter contrast-[1.1] brightness-[1.05]"
        >
          <source src={HookWebm} type="video/webm" />
          <source src={HookVideo} type="video/mp4" />
        </video>

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
            <h1 className="text-4xl md:text-6xl font-light text-[#1B1B1B] tracking-tight leading-tight max-w-3xl mx-auto flex flex-col items-center justify-center gap-y-4">
              <span>We build spaces that are</span>
              <span className="relative inline-block font-semibold text-[#C92C15] w-full text-center h-[1.2em] overflow-hidden">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-0 flex justify-center items-center whitespace-nowrap"
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
                A legacy of craftsmanship, structural safety, and transparent client communication in every project since 1995.
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
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white text-[#2A2A2A] hover:bg-gray-50 border border-black/10 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
            >
              <span>Contact Us</span>
              <span className="text-lg">→</span>
            </Link>
          </FadeUp>
        </div>
      </div>

      {/* 2. Philosophy — Scroll-Driven Text Rise Section */}
      {/* Static heading intro */}
      <div id="philosophy" className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-white text-[#2A2A2A] border-t border-black/5 overflow-hidden">
        {/* Decorative corner absolute graphics */}
        {/* Top-left */}
        <div className="absolute top-[12%] left-[5%] hidden md:block">
          <FadeUp delay={0.1} y={-40} className="bg-white/50 border border-black/5 rounded-full p-6 text-[#C92C15] hover:scale-110 hover:border-[#C92C15]/30 hover:bg-white transition-all duration-300 shadow-md backdrop-blur-md">
            <Compass className="h-8 w-8" />
          </FadeUp>
        </div>

        {/* Top-right */}
        <div className="absolute top-[12%] right-[5%] hidden md:block">
          <FadeUp delay={0.15} y={-40} className="bg-white/50 border border-black/5 rounded-full p-6 text-[#C92C15] hover:scale-110 hover:border-[#C92C15]/30 hover:bg-white transition-all duration-300 shadow-md backdrop-blur-md">
            <Layers className="h-8 w-8" />
          </FadeUp>
        </div>

        {/* Centered header */}
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-4">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em]">Our Philosophy</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1B1B1B]">
              Precision Meets Passion
            </h2>
          </FadeUp>
        </div>
      </div>

      {/* Scroll-driven text rise — word-by-word bold reveal */}
      <ScrollTextRise
        className="h-[150vh] bg-white"
        text="With over 30 years of experience in construction, we deliver outstanding quality with complete transparency. We manage your entire project from site analysis to keys handover, keeping your needs first."
      />

      {/* 3. Story, Vision, Mission Tabs Component */}
      <About />

      {/* 3.5 Innovation x Vision Section */}
      <section className="py-24 md:py-32 bg-[#FAF7F5] text-[#2A2A2A] border-t border-black/5 relative overflow-hidden">
        {/* Subtle grid lines background overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#1B1B1B] mb-16 md:mb-24 text-left">
              Innovation <span className="text-[#C92C15] italic">x</span> Vision
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column: Aspect 4/3 Video */}
            <FadeUp delay={0.2} x={-40} className="rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-2xl border border-black/5">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover select-none pointer-events-none opacity-90"
                src="https://res.cloudinary.com/darmr4g5x/video/upload/f_auto,q_auto/v1782198265/utkarsh%20construction/about-innovation.mp4"
              />
            </FadeUp>

            {/* Right Column: Narrative Blocks */}
            <StaggerContainer staggerChildren={0.2} className="space-y-10 text-left">

              {/* Block 1 */}
              <FadeUp delay={0.3} x={40} className="space-y-4">
                <div className="flex items-center gap-2 text-[#6F6F6F]">
                  <Sparkles className="h-4 w-4 text-[#C92C15]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold">Choose Your Space</span>
                </div>
                <p className="text-base md:text-lg text-[#2A2A2A] font-light leading-relaxed">
                  Every great building starts with solid engineering and a clear design. We combine both to turn concrete and steel into great offices and workspaces for your business.
                </p>
              </FadeUp>

              {/* Separator line */}
              <div className="w-full h-px bg-black/5" />

              {/* Block 2 */}
              <FadeUp delay={0.4} x={40} className="space-y-4">
                <div className="flex items-center gap-2 text-[#6F6F6F]">
                  <Sparkles className="h-4 w-4 text-[#C92C15]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold">Shape The Future</span>
                </div>
                <p className="text-base md:text-lg text-[#2A2A2A] font-light leading-relaxed">
                  We believe the best buildings are those that are both highly practical and beautiful. Our team is dedicated to bringing your blueprints to life with absolute care and top quality.
                </p>
              </FadeUp>

            </StaggerContainer>

          </div>
        </div>
      </section>

      {/* Beyond Construction Section (Developer positioning) */}
      <section className="py-24 bg-white border-t border-black/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Text detail */}
            <div className="lg:col-span-5 text-left space-y-6">
              <FadeUp delay={0.1}>
                <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.2em] block">
                  Our Promise to You
                </span>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight leading-tight">
                  More Than Just Building
                </h2>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="text-[#6F6F6F] font-light text-sm md:text-base leading-relaxed">
                  We act as your long term property partner. Our work does not start or stop with laying bricks. We help you plan, build, and maintain your properties so they remain valuable and safe for years to come.
                </p>
              </FadeUp>
            </div>

            {/* Right: 3 core pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Landmark,
                  title: 'Selecting the Best Land',
                  desc: 'We look for areas that are growing fast and check city rules to find the perfect plot for your building.'
                },
                {
                  icon: Layers,
                  title: 'Smart Design Planning',
                  desc: 'We design rooms for great natural sunlight, maximum space utility, and flexible layouts.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Long Term Support',
                  desc: 'We offer checkups and support to keep your building completely safe even after you move in.'
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
              { icon: ShieldCheck, title: 'Unwavering Trust', desc: 'Over 30 years of building relationships based on reliable execution, prompt handovers, and structural safety.' },
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
