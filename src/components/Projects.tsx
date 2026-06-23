import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { assets } from '../lib/cloudinary';

const msJewellersCol1_1 = assets.projects.msCol1_1;
const msJewellersCol1_2 = assets.projects.msCol1_2;
const msJewellersCol2 = assets.projects.msCol2;

const indieStitchCol1_1 = assets.projects.indieCol1_1;
const indieStitchCol1_2 = assets.projects.indieCol1_2;
const indieStitchCol2 = assets.projects.indieCol2;

const modularKitchenCol1_1 = assets.projects.kitchenCol1_1;
const modularKitchenCol1_2 = assets.projects.kitchenCol1_2;
const modularKitchenCol2 = assets.projects.kitchenCol2;

const hotelReeveInnCol1_1 = assets.projects.hotelCol1_1;
const hotelReeveInnCol1_2 = assets.projects.hotelCol1_2;
const hotelReeveInnCol2 = assets.projects.hotelCol2;

interface ProjectData {
  number: string;
  name: string;
  category: string;
  location: string;
  description: string;
  tag: 'residential' | 'commercial' | 'development';
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
  };
}

const projectsList: ProjectData[] = [
  {
    number: '01',
    name: 'MS Jewellers Showroom',
    category: 'Commercial Showroom',
    location: 'Rajasthan',
    description: 'A high-concept jewelry showroom combining state-of-the-art security, custom-engineered display counters, and precise task lighting.',
    tag: 'commercial',
    images: {
      col1_1: msJewellersCol1_1,
      col1_2: msJewellersCol1_2,
      col2: msJewellersCol2
    }
  },
  {
    number: '02',
    name: 'Indie Stitch Designer Boutique',
    category: 'Bespoke Boutique & Office',
    location: 'Rajasthan',
    description: 'A luxury fashion boutique and design office featuring custom wood paneling, premium layout spacing, and modern design aesthetics.',
    tag: 'commercial',
    images: {
      col1_1: indieStitchCol1_1,
      col1_2: indieStitchCol1_2,
      col2: indieStitchCol2
    }
  },
  {
    number: '03',
    name: 'Elegant Modular Kitchen',
    category: 'Residential Kitchen',
    location: 'Rajasthan',
    description: 'A fully customized modular kitchen showcasing gloss finishes, quartz countertops, high-capacity chimneys, and integrated storage solutions.',
    tag: 'residential',
    images: {
      col1_1: modularKitchenCol1_1,
      col1_2: modularKitchenCol1_2,
      col2: modularKitchenCol2
    }
  },
  {
    number: '04',
    name: 'Hotel Reeve Inn',
    category: 'Commercial & Hospitality',
    location: 'Rajasthan',
    description: 'A modern commercial hotel development showcasing structural concrete integrity, customized exterior finishes, and premium room layouts.',
    tag: 'development',
    images: {
      col1_1: hotelReeveInnCol1_1,
      col1_2: hotelReeveInnCol1_2,
      col2: hotelReeveInnCol2
    }
  }
];


interface ProjectCardProps {
  project: ProjectData;
  index: number;
  progress: MotionValue<number>;
  total: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, progress, total }) => {
  const targetScale = 1 - (total - 1 - index) * 0.03;

  // Custom scroll transform to scale down each card slightly as we scroll past it
  const scale = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [1, targetScale]
  );

  return (
    <div className="sticky top-28 md:top-36 flex items-center justify-center pb-24">
      <motion.div
        style={{ scale }}
        className="w-full rounded-[30px] md:rounded-[40px] border border-black/5 bg-white p-6 md:p-8 lg:p-10 shadow-xl flex flex-col gap-6 md:gap-8"
      >
        {/* Top Row: Details & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black/5 pb-6">
          <div className="text-left flex items-start gap-4">
            <span className="text-4xl md:text-5xl font-light text-[#C92C15] leading-none select-none">
              {project.number}
            </span>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#6F6F6F] font-medium">
                {project.category} — {project.location}
              </span>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1B1B1B] tracking-tight mt-1">
                {project.name}
              </h3>
            </div>
          </div>

          <button
            className="flex items-center gap-2 border border-black/10 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#1B1B1B] cursor-pointer"
          >
            <span>View Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mid Row: Description */}
        <div className="text-left text-[#6F6F6F] font-light text-sm md:text-base leading-relaxed max-w-3xl">
          <p>{project.description}</p>
        </div>

        {/* Bottom Row: Image Grid (Left 40% two stacked, Right 60% one tall) */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-6">

          {/* Left Column (40% width = 4 grid spans) */}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
            <div className="rounded-[20px] md:rounded-[30px] overflow-hidden bg-black/5 h-[140px] md:h-[180px] lg:h-[220px]">
              <img
                src={project.images.col1_1}
                alt={`${project.name} detail`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="rounded-[20px] md:rounded-[30px] overflow-hidden bg-black/5 h-[160px] md:h-[220px] lg:h-[280px]">
              <img
                src={project.images.col1_2}
                alt={`${project.name} detail view`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width = 6 grid spans) */}
          <div className="md:col-span-6 rounded-[20px] md:rounded-[30px] overflow-hidden bg-black/5 h-[316px] md:h-[416px] lg:h-[526px]">
            <img
              src={project.images.col2}
              alt={`${project.name} facade view`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>

        </div>

      </motion.div>
    </div>
  );
};

interface ProjectsProps {
  filter?: 'all' | 'residential' | 'commercial' | 'development';
}

export const Projects: React.FC<ProjectsProps> = ({ filter = 'all' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the entire projects section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const filteredProjects = filter === 'all'
    ? projectsList
    : projectsList.filter(p => p.tag === filter);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[#FAF7F5] py-24 md:py-32 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Heading */}
        <div className="text-left mb-16 md:mb-24">
          <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-3">
            Our Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
            Crafted With Precision
          </h2>
          <p className="text-[#6F6F6F] font-light mt-4 max-w-xl">
            A showcase of our landmark developments where precision architecture meets luxury construction.
          </p>
        </div>

        {/* Stacking Card List */}
        <div className="relative flex flex-col items-center">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              progress={scrollYProgress}
              total={filteredProjects.length}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500 font-light w-full bg-white rounded-3xl border border-black/5">
              No developments in this category at this time.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
export default Projects;
