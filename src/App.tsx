import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import ScrollVideoBanner from './components/ScrollVideoBanner';
import { Home } from './pages/Home';

// Lazy load subpage components
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions').then(module => ({ default: module.TermsAndConditions })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(module => ({ default: module.AdminPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));


// Modern brand-colored loader for page transitions
const PageLoader = () => (
  <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4 bg-transparent select-none pointer-events-none">
    <div className="w-10 h-10 border-4 border-[#C92C15]/20 border-t-[#C92C15] rounded-full animate-spin" />
    <span className="text-xs font-semibold text-white/50 tracking-widest uppercase animate-pulse">Loading</span>
  </div>
);

// Inner component so we can use useLocation inside Router
function AppInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const setupSections = () => {
      const sections = document.querySelectorAll('section');
      const isMobile = window.innerWidth < 768;

      sections.forEach(section => {
        // Exclude specific container elements we want to keep visible immediately
        if (
          isMobile ||
          section.id === 'home' || 
          section.classList.contains('no-reveal') ||
          section.classList.contains('inner-hero-banner')
        ) {
          section.classList.add('reveal-visible');
          return;
        }

        // Check if the section is already in or above the viewport on initial setup
        const rect = section.getBoundingClientRect();
        const isInViewport = rect.top < (window.innerHeight || document.documentElement.clientHeight);
        
        if (isInViewport) {
          section.classList.add('reveal-visible');
          return;
        }

        if (!section.classList.contains('reveal-visible')) {
          if (!section.classList.contains('scroll-reveal')) {
            section.classList.add('scroll-reveal');
          }
          revealObserver.observe(section);
        }
      });
    };

    // Run setup initially
    setupSections();

    // Force reveal safety net for sections near the bottom of the page
    const handleScrollSafetyNet = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If we scroll close to the bottom (within 100px)
      if (windowHeight + scrollY >= documentHeight - 100) {
        document.querySelectorAll('section').forEach(section => {
          section.classList.add('reveal-visible');
        });
      }
    };

    window.addEventListener('scroll', handleScrollSafetyNet, { passive: true });

    // Set up a MutationObserver to catch elements loaded dynamically (like after lazy loading Suspense)
    // Debounced via rAF to avoid forced reflows on every DOM mutation
    let mutationRafId: number | null = null;
    const domObserver = new MutationObserver(() => {
      if (mutationRafId) cancelAnimationFrame(mutationRafId);
      mutationRafId = requestAnimationFrame(() => {
        setupSections();
      });
    });

    domObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      revealObserver.disconnect();
      domObserver.disconnect();
      if (mutationRafId) cancelAnimationFrame(mutationRafId);
      window.removeEventListener('scroll', handleScrollSafetyNet);
    };
  }, [location.pathname]);

  return (
    <div className="relative w-full min-h-screen selection:bg-[#C92C15] selection:text-white">
      {/* Scroll-linked video background — only on home page, sits at z-0 */}
      {isHome && <ScrollVideoBanner />}

      {/* Navigation — z-50 always on top */}
      <Navbar />

      {/* Dynamic Route Pages with Suspense boundary */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Global Footer */}
        <Footer />
      </Suspense>

      {/* Floating Consultation Widget */}
      <FloatingCTA />
    </div>
  );
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.8, syncTouch: true }}>
      <Router>
        <ScrollToTop />
        <AppInner />
      </Router>
    </ReactLenis>
  );
}

export default App;
