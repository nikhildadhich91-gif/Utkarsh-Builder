import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

function App() {
  return (
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
        </Routes>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
