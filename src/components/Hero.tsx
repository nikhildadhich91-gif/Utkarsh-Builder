import { Link } from 'react-router-dom';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { FadeIn } from './ui/FadeIn';
import BoomerangVideoBg from './BoomerangVideoBg';
import { PointerHighlight } from './ui/pointer-highlight';

export const Hero = () => {
  const videoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_144509_89e2d612-8af2-45c3-90f4-4831bc60715d.mp4';

  return (
    <section id="home" className="hero bg-[#FAF7F5] relative h-screen w-full overflow-hidden">
      {/* Seamless Boomerang Video Background */}
      <BoomerangVideoBg src={videoUrl} className="hero-bg" />

      {/* Dark tint overlay over the video on mobile only */}
      <div className="absolute inset-0 bg-black/40 md:bg-transparent z-10 pointer-events-none" />

      {/* Top Blur Overlay */}
      <div className="blur-overlay blur-overlay-top" />

      {/* Spacer below the navbar (desktop only) */}
      <div className="h-24 w-full relative z-20 hidden md:block" />

      {/* ================= DESKTOP LAYOUT (md and up) ================= */}
      <div
        className="hidden md:block absolute left-0 right-0 z-20 px-12 lg:px-16 text-left"
        style={{
          top: '42%',
          transform: 'translateY(-42%)',
        }}
      >
        <div className="relative -ml-12 lg:-ml-16 pl-12 lg:pl-16 pr-24 py-10 md:py-14 w-full max-w-4xl flex flex-col justify-center text-left rounded-r-[32px]">
          {/* Fading Glass Card Background */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-r-[32px] shadow-2xl hero-overlay-mask pointer-events-none z-0" />

          <div className="relative z-10 w-full flex flex-col justify-center">
            <AnimatedHeading
              text={"Building Spaces\nThat Define Generations."}
              className="text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-[#1B1B1B] mb-4 leading-[1.1]"
              initialDelay={200}
              charDelay={30}
              charDuration={500}
              highlightText="Define Generations."
              highlightClassName="text-[#C92C15]"
            />

            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-800 mb-6 max-w-2xl font-semibold leading-relaxed">
                With 30+ years of experience and over 100 completed projects in Jaipur, Utkarsh Builder <PointerHighlight delay={1.8} containerClassName="text-[#C92C15] font-semibold">transforms</PointerHighlight> ideas into premium homes and commercial spaces built to last.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all px-8 py-3.5 rounded-lg font-medium cursor-pointer shadow-lg hover:scale-105 active:scale-95 inline-block text-center"
                >
                  Book Consultation
                </Link>
                <Link
                  to="/projects"
                  className="border border-black/20 text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white transition-all px-8 py-3.5 rounded-lg font-medium cursor-pointer shadow-lg hover:scale-105 active:scale-95 inline-block text-center"
                >
                  Explore Projects
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ================= MOBILE LAYOUT (phone) ================= */}
      <div className="md:hidden absolute inset-0 z-20 flex items-center justify-start px-6">
        <div className="w-full text-left">
          <AnimatedHeading
            text={"Building Spaces\nThat Define Generations."}
            className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6 leading-[1.15]"
            initialDelay={200}
            charDelay={30}
            charDuration={500}
            highlightText="Define Generations."
            highlightClassName="text-[#C92C15]"
          />

          <FadeIn delay={800} duration={1000}>
            <p className="text-base sm:text-lg text-white/95 mb-8 max-w-2xl font-light leading-relaxed">
              With 30+ years of experience and over 100 completed projects in Jaipur, Utkarsh Builder <PointerHighlight delay={1.8} containerClassName="text-[#C92C15] font-semibold">transforms</PointerHighlight> ideas into premium homes and commercial spaces built to last.
            </p>
          </FadeIn>

          <FadeIn delay={1200} duration={1000}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all px-8 py-4 rounded-xl font-semibold cursor-pointer shadow-lg hover:scale-105 active:scale-95 text-center text-sm uppercase tracking-wider"
              >
                Book Consultation
              </Link>
              <Link
                to="/projects"
                className="border border-white/30 text-white hover:bg-white hover:text-black transition-all px-8 py-4 rounded-xl font-semibold cursor-pointer shadow-lg hover:scale-105 active:scale-95 text-center text-sm uppercase tracking-wider"
              >
                Explore Projects
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
export default Hero;
