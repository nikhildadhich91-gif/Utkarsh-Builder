import React, { useState } from 'react';
import { assets } from '../lib/cloudinary';
import { MapPin, Expand, X, CheckCircle2, Clock, Calendar, ShieldCheck, Compass } from 'lucide-react';
import { FadeUp } from './ui/FadeUp';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectCardData {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'renovation';
  categoryLabel: string;
  image: string;
  location: string;
  area: string;
  status: 'Completed' | 'In Progress';
  description: string;
}

const projectsData: ProjectCardData[] = [
  {
    id: 'proj-1',
    title: 'MS Jewellers Showroom',
    category: 'commercial',
    categoryLabel: 'Commercial Showroom',
    image: assets.projects.msCol2,
    location: 'Johri Bazar, Jaipur',
    area: '12,000 Sq. Ft.',
    status: 'Completed',
    description: 'A high-concept luxury jewelry showroom combining advanced secure vault rooms, customized copper display counters, and precise task lighting. Built with premium materials to ensure high durability and a stunning aesthetic.',
  },
  {
    id: 'proj-2',
    title: 'Barfiwala Sweets Showroom',
    category: 'commercial',
    categoryLabel: 'Premium Retail Showroom',
    image: assets.projects.barfiwalaCol2,
    location: 'Jaipur, Rajasthan',
    area: '8,500 Sq. Ft.',
    status: 'Completed',
    description: 'A modern retail sweets showroom blending heritage Rajasthani elements with clean contemporary display cases, hygiene-first packaging areas, and warm inviting lighting.',
  },
  {
    id: 'proj-3',
    title: 'Indie Stitch Designer Boutique',
    category: 'commercial',
    categoryLabel: 'Bespoke Boutique & Office',
    image: assets.projects.indieCol2,
    location: 'C-Scheme, Jaipur',
    area: '3,200 Sq. Ft.',
    status: 'Completed',
    description: 'A luxury fashion boutique and design office featuring custom wood paneling, premium layout spacing, and modern design aesthetics.',
  },
  {
    id: 'proj-4',
    title: 'Paliwal Textile Hub',
    category: 'commercial',
    categoryLabel: 'Textile Center & Office',
    image: assets.projects.paliwalCol2,
    location: 'Jaipur, Rajasthan',
    area: '15,000 Sq. Ft.',
    status: 'Completed',
    description: 'A state-of-the-art textile showroom and administrative office, featuring high-capacity fabric display racks, custom client discussion tables, and a premium exterior glass facade.',
  },
  {
    id: 'proj-5',
    title: 'Elegant Modular Kitchen',
    category: 'residential',
    categoryLabel: 'Residential Kitchen',
    image: assets.projects.kitchenCol2,
    location: 'Raja Park, Jaipur',
    area: '450 Sq. Ft.',
    status: 'Completed',
    description: 'A fully customized modular kitchen showcasing gloss finishes, quartz countertops, high-capacity chimneys, and integrated storage solutions.',
  },
  {
    id: 'proj-6',
    title: 'Hotel Reeve Inn',
    category: 'commercial',
    categoryLabel: 'Commercial & Hospitality',
    image: assets.projects.hotelCol2,
    location: 'Mansarovar, Jaipur',
    area: '35,000 Sq. Ft.',
    status: 'In Progress',
    description: 'A premium hospitality project featuring a robust Fe 550D structural steel frame, reinforced concrete pillars, fire-resistant conduit pathways, and customized layout divisions for hotel rooms and amenities.',
  },
];

export const RecentProjectsGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCardData | null>(null);

  return (
    <section className="py-16 md:py-32 bg-white text-[#2A2A2A] relative overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 md:mb-20 text-left">
          <div>
            <FadeUp delay={0.1}>
              <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.2em] block mb-3">
                Portfolio
              </span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#1B1B1B] tracking-tight leading-tight">
                Recent Projects Grid
              </h2>
            </FadeUp>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.map((project, idx) => (
            <FadeUp
              key={project.id}
              delay={0.1 + idx * 0.08}
              y={35}
            >
              <div
                onClick={() => setSelectedProject(project)}
                className="bg-[#FAF7F5] border border-black/[0.04] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group flex flex-col h-full cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-black/5 text-[#C92C15] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Card Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow text-left">
                  <h3 className="text-lg md:text-xl font-bold text-[#1B1B1B] mb-4 group-hover:text-[#C92C15] transition-colors leading-tight">
                    {project.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-black/5 pt-4 text-xs font-light text-[#6F6F6F]">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#C92C15] shrink-0" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Expand className="h-4 w-4 text-[#C92C15] shrink-0" />
                      <span>{project.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Morphing Modal Dialog */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
              
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="relative bg-white border border-black/5 rounded-[28px] shadow-2xl max-w-3xl w-full overflow-hidden z-10 flex flex-col max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/5 hover:bg-[#C92C15] hover:text-white transition-colors duration-300 flex items-center justify-center text-[#1B1B1B] z-20 cursor-pointer"
                  title="Close Dialog"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Scrollable Content */}
                <div className="overflow-y-auto">
                  {/* Banner Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
                    <span className="absolute bottom-6 left-6 text-white bg-[#C92C15] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md border border-white/10">
                      {selectedProject.categoryLabel}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 space-y-6 text-left">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-[#1B1B1B] tracking-tight">
                        {selectedProject.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#6F6F6F]">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-[#C92C15]" />
                          <span>{selectedProject.location}</span>
                        </div>
                        <span className="text-black/10">&bull;</span>
                        <div className="flex items-center gap-1.5">
                          <Expand className="h-3.5 w-3.5 text-[#C92C15]" />
                          <span>{selectedProject.area}</span>
                        </div>
                        <span className="text-black/10">&bull;</span>
                        <div className="flex items-center gap-1.5">
                          {selectedProject.status === 'Completed' ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Clock className="h-3.5 w-3.5 text-amber-600" />
                          )}
                          <span className={selectedProject.status === 'Completed' ? 'text-emerald-700 font-medium' : 'text-amber-700 font-medium'}>
                            {selectedProject.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-[#6F6F6F] font-light leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Generic Trust Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-black/5 pt-6">
                      <div className="bg-[#FAF7F5] border border-black/[0.04] p-4 rounded-xl flex gap-3 items-start">
                        <Compass className="h-5 w-5 text-[#C92C15] shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider mb-0.5">Execution</h5>
                          <p className="text-[10px] text-[#6F6F6F] font-light leading-relaxed">Turnkey engineering &amp; layout planning.</p>
                        </div>
                      </div>
                      <div className="bg-[#FAF7F5] border border-black/[0.04] p-4 rounded-xl flex gap-3 items-start">
                        <ShieldCheck className="h-5 w-5 text-[#C92C15] shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider mb-0.5">Standards</h5>
                          <p className="text-[10px] text-[#6F6F6F] font-light leading-relaxed">Fe 550D TMT steel &amp; 53 grade concrete.</p>
                        </div>
                      </div>
                      <div className="bg-[#FAF7F5] border border-black/[0.04] p-4 rounded-xl flex gap-3 items-start">
                        <Calendar className="h-5 w-5 text-[#C92C15] shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-bold text-[#1B1B1B] uppercase tracking-wider mb-0.5">Timeline</h5>
                          <p className="text-[10px] text-[#6F6F6F] font-light leading-relaxed">Completed within promised milestone days.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
export default RecentProjectsGrid;
