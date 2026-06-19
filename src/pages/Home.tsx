import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import About from '../components/About';
import LandmarkDevelopments from '../components/LandmarkDevelopments';
import MarketPresence from '../components/MarketPresence';
import ValueCreationTimeline from '../components/ValueCreationTimeline';
import DevelopmentShowcase from '../components/DevelopmentShowcase';
import FeaturedDevelopments from '../components/FeaturedDevelopments';
import WhyChooseUs from '../components/WhyChooseUs';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Founders from '../components/Founders';
import ShuffleHero from '../components/ShuffleHero';
import Contact from '../components/Contact';
import { FadeUp } from '../components/ui/FadeUp';
import { StaggerContainer } from '../components/ui/StaggerContainer';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PointerHighlight } from '../components/ui/pointer-highlight';

export const Home: React.FC = () => {
  return (
    <main className="bg-[#FAF7F5] w-full min-h-screen">
      {/* 1. Hero Section (VEX inspired video + edge blurs) */}
      <Hero />

      {/* 2. Trust Bar scrolling marquee */}
      <TrustBar />

      {/* 3. About Section (Heritage summary with tab selectors) */}
      <About />

      {/* 4. Landmark Developments (Creating Communities, Not Just Structures) */}
      <LandmarkDevelopments />

      {/* 6. Market Presence Stats (Animated counters) */}
      <MarketPresence />

      {/* 7. Value Creation Timeline (Horizontal lifecycle flow) */}
      <ValueCreationTimeline />

      {/* 8. Development Showcase (Sticky card stack core operations) */}
      <DevelopmentShowcase />

      {/* 9. Featured Developments (Hover-zoom portfolio cards) */}
      <FeaturedDevelopments />

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
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
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

      {/* 11. Philosophy Section (Asme Section 4 customized for builder) */}
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
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
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
                  Every great building starts with solid engineering and a clear design. We combine both to turn raw concrete and steel into <PointerHighlight delay={0.9}>beautiful homes</PointerHighlight> that you will love to live in.
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
