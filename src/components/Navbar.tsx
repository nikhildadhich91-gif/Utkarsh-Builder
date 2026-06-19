import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoImg from '../assets/logo.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="px-6 md:px-12 lg:px-16 pt-4">
        <div 
          className={`liquid-glass rounded-xl px-6 py-2 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'bg-black/60 shadow-lg backdrop-blur-md border border-white/10' : 'bg-black/25'
          }`}
        >
          {/* Left: Logo Badge (White Backdrop with Opacity) */}
          <Link 
            to="/" 
            className="flex items-center gap-3 cursor-pointer bg-white/85 backdrop-blur-sm px-4 py-1.5 rounded-lg border border-white/50 shadow-sm transition-all duration-300 hover:bg-white/95"
          >
            <img 
              src={LogoImg} 
              alt="Utkarsh Builder Logo" 
              className="h-[38px] md:h-[46px] lg:h-[50px] w-auto object-contain transition-all duration-300 filter brightness-105"
            />
          </Link>

          {/* Center Links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { path: '/', label: 'Home' },
              { path: '/services', label: 'Services' },
              { path: '/projects', label: 'Projects' },
              { path: '/about', label: 'About Us' },
              { path: '/contact', label: 'Contact' },
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm md:text-base tracking-wide font-medium transition-all hover:text-[#C92C15] cursor-pointer ${
                    isActive ? 'text-[#C92C15] font-bold border-b-2 border-[#C92C15] pb-0.5' : 'text-gray-200 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right: CTA Button */}
          <div>
            <Link
              to="/contact"
              className="bg-white text-black hover:bg-gray-100 transition-all px-5 py-2 rounded-lg text-sm md:text-base font-semibold cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] inline-block"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
