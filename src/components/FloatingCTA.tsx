import { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { assets } from '../lib/cloudinary';

export const FloatingCTA = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const isCollapsed = sessionStorage.getItem('floating_cta_collapsed');
    return isCollapsed !== 'true';
  });
  const [isVisible, setIsVisible] = useState(false);
  const [hasAutoCollapsed, setHasAutoCollapsed] = useState(() => {
    const isCollapsed = sessionStorage.getItem('floating_cta_collapsed');
    return isCollapsed === 'true';
  });

  useEffect(() => {
    // Show with a slight delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-collapse after 5 seconds of visibility on initial load
    if (isVisible && isOpen && !hasAutoCollapsed) {
      const collapseTimer = setTimeout(() => {
        setIsOpen(false);
        setHasAutoCollapsed(true);
      }, 5000);
      return () => clearTimeout(collapseTimer);
    }
  }, [isVisible, isOpen, hasAutoCollapsed]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasAutoCollapsed(true); // Keep it open once clicked
    sessionStorage.removeItem('floating_cta_collapsed');
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setHasAutoCollapsed(true); // Don't auto-open again
    sessionStorage.setItem('floating_cta_collapsed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="floating-cta-container fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-breath {
          0%, 100% { 
            transform: scale(1);
            opacity: 1; 
            box-shadow: 0 10px 25px -5px rgba(201, 44, 21, 0.4), 0 8px 10px -6px rgba(201, 44, 21, 0.4); 
          }
          50% { 
            transform: scale(0.95);
            opacity: 0.85; 
            box-shadow: 0 20px 35px -5px rgba(201, 44, 21, 0.7), 0 12px 18px -6px rgba(201, 44, 21, 0.7); 
          }
        }
        .slow-breath-btn {
          animation: slow-breath 2.5s ease-in-out infinite;
        }
      `}} />
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-[155px] sm:w-[250px] bg-[#1E1E1E] rounded-2xl shadow-2xl border border-black/5 flex flex-col relative"
          >
            {/* Close/Dismiss Button (Desktop and Mobile) */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 z-30 w-6 h-6 bg-black/40 hover:bg-[#C92C15] text-white rounded-full flex items-center justify-center border-none cursor-pointer transition-colors shadow-md"
              aria-label="Close consultation widget"
            >
              <X className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </button>

            {/* Top Section with Dark Background and Overlapping Characters */}
            <div className="h-[38px] sm:h-[60px] bg-[#1E1E1E] rounded-t-2xl relative overflow-visible flex items-end justify-center">
              {/* Architectural background pattern grid */}
              <div className="absolute inset-0 opacity-10 pointer-events-none rounded-t-2xl bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:10px_10px]" />
              
              <img
                src={assets.characters}
                alt="Utkarsh Builder Experts"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[130px] sm:w-[220px] h-[72px] sm:h-[120px] object-contain pointer-events-none z-10 select-none drop-shadow-[0_-5px_8px_rgba(0,0,0,0.25)]"
              />
            </div>

            {/* Bottom Section with Brand Consistent Red Background */}
            <div className="bg-[#C92C15] rounded-b-2xl p-2.5 sm:p-4 flex flex-col items-center text-center">
              <span className="text-white font-extrabold text-[10px] sm:text-sm uppercase tracking-wide">
                Book FREE
              </span>
              <span className="text-white/90 text-[8.5px] sm:text-xs font-semibold mt-0.5">
                Expert Consultation!
              </span>
              
              <a
                href="/contact#contact-section"
                onClick={(e) => {
                  if (window.location.pathname === '/contact') {
                    e.preventDefault();
                    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-white text-black hover:bg-gray-100 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 py-1 sm:py-2 rounded-lg sm:rounded-xl font-bold tracking-wide mt-2 sm:mt-3.5 text-[9px] sm:text-[11px] uppercase block text-center shadow-md no-underline"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className="w-10 h-10 sm:w-14 sm:h-14 bg-[#C92C15] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-[#B5250F] transition-colors relative border-none focus:outline-none group slow-breath-btn"
            aria-label="Open consultation widget"
          >
            {/* Pulsing indicator */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-white rounded-full border-2 border-[#C92C15] animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-white rounded-full border-2 border-[#C92C15]" />
            
            <Calendar className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
            
            {/* Tooltip */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1B1B1B] text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
              Book Consultation
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingCTA;
