import React, { useState } from 'react';
import { assets } from '../lib/cloudinary';
import { MapPin, Expand, CheckCircle2, Clock } from 'lucide-react';
import { FadeUp } from './ui/FadeUp';

interface ProjectCardData {
  title: string;
  category: 'residential' | 'commercial' | 'renovation';
  categoryLabel: string;
  image: string;
  location: string;
  area: string;
  status: 'Completed' | 'In Progress';
}

const projectsData: ProjectCardData[] = [
  {
    title: 'MS Jewellers Showroom',
    category: 'commercial',
    categoryLabel: 'Commercial Showroom',
    image: assets.projects.msCol2,
    location: 'Johri Bazar, Jaipur',
    area: '12,000 Sq. Ft.',
    status: 'Completed',
  },
  {
    title: 'Modern Residential Villa',
    category: 'residential',
    categoryLabel: 'Luxury Residential',
    image: assets.generated.bedroom,
    location: 'Raja Park, Jaipur',
    area: '4,500 Sq. Ft.',
    status: 'Completed',
  },
  {
    title: 'Indie Stitch Designer Boutique',
    category: 'commercial',
    categoryLabel: 'Commercial Boutique',
    image: assets.projects.indieCol2,
    location: 'C-Scheme, Jaipur',
    area: '3,200 Sq. Ft.',
    status: 'Completed',
  },
  {
    title: 'Hotel Reeve Inn',
    category: 'commercial',
    categoryLabel: 'Commercial & Hospitality',
    image: assets.projects.hotelCol2,
    location: 'Mansarovar, Jaipur',
    area: '35,000 Sq. Ft.',
    status: 'In Progress',
  },
  {
    title: 'Vintage Villa Restoration',
    category: 'renovation',
    categoryLabel: 'Heritage Renovation',
    image: assets.generated.balcony,
    location: 'Johri Bazar, Jaipur',
    area: '6,000 Sq. Ft.',
    status: 'Completed',
  },
  {
    title: 'Luxury Office Renovation',
    category: 'renovation',
    categoryLabel: 'Office Renovation',
    image: assets.generated.office,
    location: 'Civil Lines, Jaipur',
    area: '2,800 Sq. Ft.',
    status: 'Completed',
  },
];

export const RecentProjectsGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'renovation'>('all');

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

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

          {/* Filter Buttons */}
          <FadeUp delay={0.3} className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'renovation', label: 'Renovation' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                  activeFilter === tab.id
                    ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]'
                    : 'bg-transparent text-[#6F6F6F] border-black/10 hover:border-black/30 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </FadeUp>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, idx) => (
            <FadeUp
              key={idx}
              delay={0.1 + idx * 0.08}
              y={35}
              className="bg-[#FAF7F5] border border-black/[0.04] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
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

                {/* Status Badge */}
                <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm border flex items-center gap-1.5 ${
                  project.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50'
                    : 'bg-amber-50 text-amber-700 border-amber-200/50'
                }`}>
                  {project.status === 'Completed' ? (
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <Clock className="h-3 w-3 text-amber-600" />
                  )}
                  {project.status}
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
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
};
export default RecentProjectsGrid;
