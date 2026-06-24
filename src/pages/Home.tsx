import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import About from '../components/About';
import MarketPresence from '../components/MarketPresence';
import ValueCreationTimeline from '../components/ValueCreationTimeline';
import DevelopmentShowcase from '../components/DevelopmentShowcase';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import ShuffleHero from '../components/ShuffleHero';
import Contact from '../components/Contact';
import { FadeUp } from '../components/ui/FadeUp';
import { ArrowRight } from 'lucide-react';
import { assets } from '../lib/cloudinary';

// New Conversion Sections
import RecentProjectsGrid from '../components/RecentProjectsGrid';
import FAQAccordion from '../components/FAQAccordion';

export const Home: React.FC = () => {
  return (
    <main className="bg-[#FAF7F5] w-full min-h-screen">
      {/* 1. Hero Section (VEX inspired video + edge blurs) */}
      <Hero />

      {/* 2. Trust Bar scrolling marquee */}
      <TrustBar />

      {/* 3. About Section (Legacy summary with tab selectors) */}
      <About />

      {/* 6. Market Presence Stats (Animated counters) */}
      <MarketPresence />

      {/* 7. Value Creation Timeline (Horizontal lifecycle flow) */}
      <ValueCreationTimeline />

      {/* Dynamic Conversion Section: Recent Projects Grid */}
      <RecentProjectsGrid />

      {/* 8. Development Showcase (Sticky card stack core operations) */}
      <DevelopmentShowcase />

      {/* 10. Custom Featured Video Section (Asme Section 3 customized for builder) */}
      <section className="py-12 md:py-24 bg-white text-[#2A2A2A] border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <FadeUp delay={0.1} y={50} className="rounded-3xl overflow-hidden h-[340px] md:h-auto md:aspect-video relative group shadow-2xl border border-black/5 bg-gray-100">
            {/* Background looping build video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover select-none pointer-events-none opacity-80"
              src={assets.videos.homeApproach}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Bottom Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-10 flex flex-col justify-end items-start md:flex-row md:justify-between md:items-end gap-2 md:gap-6 z-10">

              {/* Left Approach Card */}
              <div className="hidden md:block liquid-glass border border-white/20 p-8 rounded-2xl max-w-md text-left">
                <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.2em] block mb-0.5 animate-pulse">
                  Our Approach
                </span>
                <p className="text-sm text-gray-100 font-light leading-relaxed">
                  We believe in careful planning and solid building quality. Every drawing is designed to make the best use of space, and every construction step is made to ensure your property is comfortable and built to last.
                </p>
              </div>

              {/* Right Explore Button */}
              <Link
                to="/services"
                className="bg-white text-black hover:bg-gray-100 px-3.5 py-1.5 md:px-8 md:py-3.5 rounded-full text-[9px] md:text-sm font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer shadow-lg hover:scale-105 active:scale-95 duration-300 w-fit shrink-0"
              >
                <span>Explore Services</span>
                <ArrowRight className="h-2.5 w-2.5 md:h-4 md:w-4" />
              </Link>

            </div>
          </FadeUp>
        </div>
      </section>

      {/* 13. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 15. Construction Process Timeline */}
      <Process />

      {/* 17. Client Testimonials Slider */}
      <Testimonials />

      {/* 19. Shuffle Image Gallery Grid */}
      <ShuffleHero />

      {/* Dynamic Conversion Section: FAQ Accordion */}
      <FAQAccordion />

      {/* 20. Contact Form */}
      <Contact />
    </main>
  );
};
export default Home;
