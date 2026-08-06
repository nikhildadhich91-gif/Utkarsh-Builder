import { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../lib/cloudinary';
const LogoImg = assets.logo;
import { Menu, X } from 'lucide-react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollUpAccumulator = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY <= 50) {
        setIsVisible(true);
        scrollUpAccumulator.current = 0;
      } else {
        const diff = currentScrollY - lastScrollY.current;

        if (diff > 0) {
          // Scrolling down - hide navbar and reset accumulator
          setIsVisible(false);
          scrollUpAccumulator.current = 0;
        } else if (diff < 0) {
          // Scrolling up - accumulate the scroll-up distance
          scrollUpAccumulator.current += Math.abs(diff);
          if (scrollUpAccumulator.current > 15) {
            setIsVisible(true);
          }
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useBodyScrollLock(isMenuOpen);


  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="px-3 sm:px-6 md:px-12 lg:px-16 pt-3 md:pt-4">
          <div 
            className={`liquid-glass rounded-xl px-3.5 sm:px-6 py-1.5 md:py-2 flex items-center justify-between transition-all duration-300 !overflow-visible ${
              isScrolled || isMenuOpen ? 'bg-black/60 shadow-lg backdrop-blur-md border border-white/10' : 'bg-black/25'
            }`}
          >
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.03] shrink-0"
            >
              <img 
                src={LogoImg} 
                alt="Utkarsh Builder Logo" 
                width={96}
                height={96}
                className="h-[48px] sm:h-[64px] md:h-[84px] lg:h-[96px] w-auto object-contain transition-all duration-300 my-[-6px] sm:my-[-10px] md:my-[-18px] lg:my-[-22px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
              />
            </Link>

            {/* Center Links (desktop) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm xl:text-base tracking-wide font-medium transition-all hover:text-[#C92C15] cursor-pointer ${
                      isActive ? 'text-[#C92C15] font-bold border-b-2 border-[#C92C15] pb-0.5' : 'text-gray-200 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right: CTA Button & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <Link
                to="/contact#contact-section"
                onClick={(e) => {
                  if (window.location.pathname === '/contact') {
                    e.preventDefault();
                    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-black hover:bg-gray-100 transition-all px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm xl:text-base font-semibold cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] inline-block whitespace-nowrap shrink-0"
              >
                Book Consultation
              </Link>

              {/* Mobile Toggle Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-white hover:text-[#C92C15] transition-colors focus:outline-none cursor-pointer shrink-0"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sliding Mobile Navigation Drawer (Warm Light Premium Aesthetic) */}
      <div 
        className={`fixed inset-0 z-40 bg-[#FAF7F5]/98 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-8 text-center px-6 w-full max-w-sm mt-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-2xl font-semibold tracking-wide transition-all py-2 w-full border-b border-black/5 cursor-pointer block ${
                  isActive ? 'text-[#C92C15] font-bold border-[#C92C15]' : 'text-[#1B1B1B] hover:text-[#C92C15]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact#contact-section"
            onClick={(e) => {
              setIsMenuOpen(false);
              if (window.location.pathname === '/contact') {
                e.preventDefault();
                document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all py-3.5 px-8 rounded-xl text-base font-semibold cursor-pointer shadow-lg mt-6 w-full text-center uppercase tracking-wider"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
