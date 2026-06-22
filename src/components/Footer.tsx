import LogoImg from '../assets/logo.webp';
import { ArrowUp } from 'lucide-react';


export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#FAF7F5] text-[#2A2A2A] pt-16 pb-8 border-t border-black/5 relative overflow-hidden">

      {/* Footer Top Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

          {/* Col 1: Logo & Tagline (5 spans) */}
          <div className="md:col-span-5 text-left space-y-6">
            <img
              src={LogoImg}
              alt="Utkarsh Builder Logo"
              className="h-12 w-auto object-contain brightness-100"
            />
            <p className="text-[#6F6F6F] font-light text-sm leading-relaxed max-w-sm">
              Utkarsh Builder is committed to delivering expert construction services that bring your vision to life. With a focus on quality craftsmanship and attention to detail, we turn your construction projects into stunning realities.
            </p>
          </div>

          {/* Col 2: Quick Links (3 spans) */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.15em] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm font-light text-[#6F6F6F]">
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Services' },
                { id: 'projects', label: 'Projects' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollToSection(link.id)}
                    className="hover:text-[#C92C15] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (4 spans) */}
          <div className="md:col-span-4 text-left">
            <h4 className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.15em] mb-6">
              Our Services
            </h4>
            <ul className="space-y-4 text-sm font-light text-[#6F6F6F]">
              <li>Residential &amp; Commercial Construction</li>
              <li>Turnkey Projects</li>
              <li>Project Management</li>
              <li>Interior Design Services</li>
              <li>Renovation &amp; Remodeling</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 border-t border-black/5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">

          {/* Legal / Copyright */}
          <div className="text-left text-xs text-[#6F6F6F] font-light space-y-1">
            <p>&copy; 2025 Utkarsh Builder. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#C92C15] transition-colors">Privacy Policy</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-[#C92C15] transition-colors">Terms &amp; Conditions</a>
            </div>
          </div>

          {/* Scroll to Top Circle */}
          <button
            onClick={scrollToTop}
            className="h-10 w-10 rounded-full bg-white border border-black/5 text-[#C92C15] hover:bg-[#C92C15] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md"
            title="Scroll to Top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>

        </div>
      </div>

    </footer>
  );
};
export default Footer;
