import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { assets, getOptimizedImageUrl } from '../lib/cloudinary';
import { MapPin, Expand, X, Calendar, ShieldCheck, Compass } from 'lucide-react';
import { FadeUp } from './ui/FadeUp';
import { motion, AnimatePresence } from 'framer-motion';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface ProjectCardData {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'renovation';
  categoryLabel: string;
  image: string;
  images?: string[];
  location: string;
  area: string;
  status: 'Completed' | 'In Progress';
  description: string;
}

const projectsData: ProjectCardData[] = [
  {
    id: 'proj-1',
    title: 'Indie Stitch',
    category: 'commercial',
    categoryLabel: 'Bespoke Boutique & Office',
    image: assets.projects.indieCol2,
    images: [assets.projects.indieCol2, assets.projects.indieCol1_1, assets.projects.indieCol1_2],
    location: 'Mansarovar',
    area: '3,200 Sq. Ft.',
    status: 'Completed',
    description: 'A luxury fashion boutique and design office featuring custom wood paneling, premium layout spacing and modern design aesthetics.',
  },
  {
    id: 'proj-2',
    title: 'MS Jewellers',
    category: 'commercial',
    categoryLabel: 'Commercial Showroom',
    image: assets.projects.msCol2,
    images: [assets.projects.msCol2, assets.projects.msCol1_1, assets.projects.msCol1_2],
    location: 'Johari Bazaar',
    area: '12,000 Sq. Ft.',
    status: 'Completed',
    description: 'A high-concept luxury jewelry showroom combining advanced secure vault rooms, customized copper display counters and precise task lighting. Built with premium materials to ensure high durability and a stunning aesthetic.',
  },
  {
    id: 'proj-3',
    title: 'Reeve Inn Hotel',
    category: 'commercial',
    categoryLabel: 'Commercial & Hospitality',
    image: assets.projects.hotelCol1_1,
    images: [assets.projects.hotelCol1_1, assets.projects.hotelCol2, assets.projects.hotelCol1_2],
    location: 'Bani Park',
    area: '35,000 Sq. Ft.',
    status: 'In Progress',
    description: 'A premium hospitality project featuring a robust Fe 550D structural steel frame, reinforced concrete pillars, fire-resistant conduit pathways and customized layout divisions for hotel rooms and amenities.',
  },
  {
    id: 'proj-4',
    title: 'Paliwal Textile',
    category: 'commercial',
    categoryLabel: 'Textile Center & Office',
    image: assets.projects.paliwalCol1_2,
    images: [assets.projects.paliwalCol1_2, assets.projects.paliwalCol1_1, assets.projects.paliwalCol2],
    location: 'MI Road',
    area: '15,000 Sq. Ft.',
    status: 'Completed',
    description: 'A state-of-the-art textile showroom and administrative office, featuring high-capacity fabric display racks, custom client discussion tables and a premium exterior glass facade.',
  },
  {
    id: 'proj-5',
    title: 'Shri Narayan Sales',
    category: 'commercial',
    categoryLabel: 'Commercial Office & Hub',
    image: assets.projects.narayanChatgpt,
    images: [assets.projects.narayanChatgpt, assets.projects.narayanCol1_1, assets.projects.narayanCol1_2],
    location: 'Johari Bazaar',
    area: '4,500 Sq. Ft.',
    status: 'Completed',
    description: 'A contemporary commercial office space and sales hub designed with open planning, premium finishes and integrated smart facilities.',
  },
  {
    id: 'proj-6',
    title: 'Sanjay Stores',
    category: 'commercial',
    categoryLabel: 'Commercial Retail Showroom',
    image: assets.projects.sanjayCol2,
    images: [assets.projects.sanjayCol2, assets.projects.sanjayCol1_1, assets.projects.sanjayCol1_2],
    location: 'Johari Bazaar',
    area: '6,800 Sq. Ft.',
    status: 'Completed',
    description: 'A premier retail showroom layout featuring custom product displays, spacious inventory zones, modern lighting design, and a high-appeal storefront facade.',
  },
];

export const RecentProjectsGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCardData | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useBodyScrollLock(selectedProject !== null);

  const handleOpenProject = (project: ProjectCardData) => {
    setSelectedProject(project);
    setActiveImage(project.image);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    setActiveImage(null);
  };


  const modalElement = (
    <AnimatePresence>
      {selectedProject && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 md:p-6 select-none">
          
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseProject}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative bg-white/95 backdrop-blur-2xl border border-white/80 rounded-[24px] sm:rounded-[32px] shadow-2xl max-w-3xl w-full overflow-hidden z-20 flex flex-col max-h-[92vh] sm:max-h-[88vh] text-[#111111]"
          >
            {/* Fixed High Contrast Close Button */}
            <button
              onClick={handleCloseProject}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 h-10 w-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#C92C15] transition-colors duration-300 flex items-center justify-center z-30 cursor-pointer shadow-xl"
              title="Close Dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable Content with sleek custom scrollbar & Lenis scroll prevention */}
            <div 
              data-lenis-prevent
              className="flex-1 overflow-y-auto pb-6 sm:pb-8 select-text scrollbar-thin scrollbar-thumb-black/20 hover:scrollbar-thumb-[#C92C15] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#C92C15]"
            >
              {/* Banner Image with responsive height capping so text gets ample room on laptops */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[200px] sm:max-h-[260px] md:max-h-[320px] w-full overflow-hidden bg-gray-100">
                <img
                  src={getOptimizedImageUrl(activeImage || selectedProject.image, 1000)}
                  alt={selectedProject.title}
                  width={1000}
                  height={500}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Thumbnail Selector */}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <div className="px-5 sm:px-6 md:px-8 mt-3 sm:mt-4 flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 select-none scrollbar-none">
                  {selectedProject.images.map((img, i) => (
                    <button
                      key={img + i}
                      onClick={() => setActiveImage(img)}
                      className={`relative flex-shrink-0 w-16 sm:w-20 h-12 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                        activeImage === img
                          ? 'border-[#C92C15] scale-105 shadow-md shadow-black/15'
                          : 'border-transparent hover:border-black/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getOptimizedImageUrl(img, 200)}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Body Content */}
              <div className="p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-6 text-left">
                <div>
                  <span className="text-[#C92C15] text-[11px] font-extrabold uppercase tracking-wider block mb-1.5">
                    {selectedProject.categoryLabel}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4 mt-2.5 text-xs text-[#333333] font-bold">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#C92C15]" />
                      <span>{selectedProject.location}</span>
                    </div>
                    <span className="text-black/20">&bull;</span>
                    <div className="flex items-center gap-1.5">
                      <Expand className="h-3.5 w-3.5 text-[#C92C15]" />
                      <span>{selectedProject.area}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm md:text-base text-[#333333] font-medium leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Sleek Feature Pill Badges */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 border-t border-black/10 pt-5 sm:pt-6">
                  <div className="flex items-center gap-2 bg-black/5 border border-black/10 px-3.5 sm:px-4 py-2 rounded-full text-xs text-[#111111] font-bold shadow-sm">
                    <Compass className="h-4 w-4 text-[#C92C15]" />
                    <span>Turnkey Engineering</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/5 border border-black/10 px-3.5 sm:px-4 py-2 rounded-full text-xs text-[#111111] font-bold shadow-sm">
                    <ShieldCheck className="h-4 w-4 text-[#C92C15]" />
                    <span>Fe 550D Steel &amp; 53 Grade Concrete</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/5 border border-black/10 px-3.5 sm:px-4 py-2 rounded-full text-xs text-[#111111] font-bold shadow-sm">
                    <Calendar className="h-4 w-4 text-[#C92C15]" />
                    <span>Milestone Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Header Block in White Liquid Glass Panel */}
        <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[28px] p-6 md:p-10 mb-12 md:mb-20 text-left shadow-2xl">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-extrabold uppercase tracking-[0.2em] block mb-3">
              Portfolio
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Recent Projects Showcase
            </h2>
          </FadeUp>
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
                onClick={() => handleOpenProject(project)}
                className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col h-full cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                  <img
                    src={getOptimizedImageUrl(project.image, 600)}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-white text-[#111111] text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg border border-black/10">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Card Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow text-left">
                  <h3 className="text-lg md:text-xl font-extrabold text-[#111111] mb-4 group-hover:text-[#C92C15] transition-colors leading-tight">
                    {project.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-4 text-xs font-extrabold text-[#333333]">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#C92C15]" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Expand className="h-4 w-4 text-[#C92C15]" />
                      <span>{project.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Render Modal directly to document.body via Portal */}
        {typeof document !== 'undefined' && createPortal(modalElement, document.body)}

      </div>
    </section>
  );
};
export default RecentProjectsGrid;
