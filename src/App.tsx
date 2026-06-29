import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import FloatingCTA from './components/FloatingCTA';
import ScrollVideoBanner from './components/ScrollVideoBanner';

// Inner component so we can use useLocation inside Router
function AppInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="relative w-full min-h-screen selection:bg-[#C92C15] selection:text-white">
      {/* Scroll-linked video background — only on home page, sits at z-0 */}
      {isHome && <ScrollVideoBanner />}

      {/* Navigation — z-50 always on top */}
      <Navbar />

      {/* Dynamic Route Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>

      {/* Global Footer */}
      <Footer />

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
