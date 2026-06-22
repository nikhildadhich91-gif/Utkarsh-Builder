import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectData {
  number: string;
  name: string;
  category: string;
  location: string;
  description: string;
  tag: 'residential' | 'commercial' | 'development' | 'interiors';
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
  };
}

const projectsList: ProjectData[] = [
  {
    number: '01',
    name: 'Nextlevel Studio',
    category: 'Commercial Development',
    location: 'Jaipur, Rajasthan',
    description: 'A modern, high-concept corporate media studio blending acoustic perfection with contemporary design aesthetics.',
    tag: 'development',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85'
    }
  },
  {
    number: '02',
    name: 'Aura Luxury Residences',
    category: 'Bespoke Residential',
    location: 'Jaipur, Rajasthan',
    description: 'A high-end private estate showcasing structural symmetry, customized concrete finishes, and state-of-the-art automation.',
    tag: 'residential',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85'
    }
  },
  {
    number: '03',
    name: 'Solaris Commercial Plaza',
    category: 'Corporate Office Complex',
    location: 'Jaipur, Rajasthan',
    description: 'An architectural marvel incorporating eco-friendly green workspaces, double-glazed glass facades, and modular layout zones.',
    tag: 'commercial',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85'
    }
  },
  {
    number: '04',
    name: 'Pink Square Showroom',
    category: 'Interior Design',
    location: 'Jaipur, Rajasthan',
    description: 'A heritage-inspired premium showroom redesign matching Jaipur\'s local aesthetic legacy with custom marble layouts and optimized display structures.',
    tag: 'interiors',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85'
    }
  },
  {
    number: '05',
    name: 'Landmark Gated Communities',
    category: 'Land Development & Planning',
    location: 'Jaipur Expansion Zone',
    description: 'Site feasibility analysis, plotting layouts, and central common facilities design for a luxury residential community corridor.',
    tag: 'development',
    images: {
      col1_1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1_2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85'
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
  filter?: 'all' | 'residential' | 'commercial' | 'development' | 'interiors';
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
