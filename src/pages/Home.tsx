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
import Founders from '../components/Founders';
import ShuffleHero from '../components/ShuffleHero';
import Contact from '../components/Contact';
import { FadeUp } from '../components/ui/FadeUp';
import { ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <main className="bg-[#FAF7F5] w-full min-h-screen">
      {/* 1. Hero Section (VEX inspired video + edge blurs) */}
      <Hero />

      {/* 2. Trust Bar scrolling marquee */}
      <TrustBar />

      {/* 3. About Section (Heritage summary with tab selectors) */}
      <About />

      {/* 6. Market Presence Stats (Animated counters) */}
      <MarketPresence />

      {/* 7. Value Creation Timeline (Horizontal lifecycle flow) */}
      <ValueCreationTimeline />

      {/* 8. Development Showcase (Sticky card stack core operations) */}
      <DevelopmentShowcase />

      {/* 10. Custom Featured Video Section (Asme Section 3 customized for builder) */}
      <section className="py-24 bg-white text-[#2A2A2A] border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <FadeUp delay={0.1} y={50} className="rounded-3xl overflow-hidden aspect-video relative group shadow-2xl border border-black/5 bg-gray-100">
            {/* Background looping build video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover select-none pointer-events-none opacity-80"
              src="https://res.cloudinary.com/darmr4g5x/video/upload/f_auto,q_auto/v1782198262/utkarsh%20construction/home-approach.mp4"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Bottom Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10">

              {/* Left Approach Card */}
              <div className="liquid-glass border border-white/20 p-6 md:p-8 rounded-2xl max-w-md text-left">
                <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.2em] block mb-2">
                  Our Approach
                </span>
                <p className="text-sm text-gray-100 font-light leading-relaxed">
                  We believe in careful planning and solid building quality. Every drawing is designed to make the best use of space, and every construction step is made to ensure your property is comfortable and built to last.
                </p>
              </div>

              {/* Right Explore Button */}
              <Link
                to="/services"
                className="bg-white text-black hover:bg-gray-100 px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 duration-300"
              >
                <span>Explore Services</span>
                <ArrowRight className="h-4 w-4" />
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

      {/* 18. Founders Profiles */}
      <Founders />

      {/* 19. Shuffle Image Gallery Grid */}
      <ShuffleHero />

      {/* 20. Contact Form */}
      <Contact />
    </main>
  );
};
export default Home;
