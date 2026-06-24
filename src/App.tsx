import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.8, syncTouch: true }}>
      <Router>
        {/* Scroll Position Reset */}
        <ScrollToTop />
        
        <div className="relative w-full min-h-screen bg-[#FAF7F5] selection:bg-[#C92C15] selection:text-white">
          {/* Navigation */}
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
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;
