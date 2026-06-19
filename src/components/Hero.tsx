import { Link } from 'react-router-dom';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { FadeIn } from './ui/FadeIn';
import BoomerangVideoBg from './BoomerangVideoBg';
import { PointerHighlight } from './ui/pointer-highlight';

export const Hero = () => {
  const videoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_144509_89e2d612-8af2-45c3-90f4-4831bc60715d.mp4';

  return (
    <section id="home" className="hero bg-black text-white relative">
      {/* Top Blur Overlay */}
      <div className="blur-overlay blur-overlay-top" />

      {/* Seamless Boomerang Video Background */}
      <BoomerangVideoBg src={videoUrl} className="hero-bg" />

      {/* Spacer below the navbar */}
      <div className="h-24 w-full relative z-20" />

      {/* Hero Content (Positioned at top: 42% transform: translateY(-42%)) */}
      <div 
        className="absolute left-0 right-0 z-20 px-6 md:px-12 lg:px-16 text-left"
        style={{
          top: '42%',
          transform: 'translateY(-42%)',
        }}
      >
        <div 
          className="relative -ml-6 md:-ml-12 lg:-ml-16 pl-6 md:pl-12 lg:pl-16 pr-12 md:pr-24 py-10 md:py-14 w-full max-w-4xl bg-white/70 backdrop-blur-md flex flex-col justify-center text-left rounded-r-[32px] shadow-2xl"
          style={{
            maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }}
        >
          <AnimatedHeading
            text={"Building Spaces That\nDefine Generations."}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-[#1B1B1B] mb-4 leading-[1.1]"
            initialDelay={200}
            charDelay={30}
            charDuration={500}
            highlightText="Define Generations."
            highlightClassName="text-[#C92C15]"
          />

          <FadeIn delay={800} duration={1000}>
            <p className="text-base md:text-lg text-gray-800 mb-6 max-w-2xl font-semibold leading-relaxed">
              With 30+ years of experience and over 100 completed projects in Jaipur, Utkarsh Builder <PointerHighlight delay={1.8}>transforms</PointerHighlight> ideas into premium homes and commercial spaces built to last.
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
    </section>
  );
};
export default Hero;
