import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { getOptimizedImageUrl, assets } from '../lib/cloudinary';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import projectGalleries from '../lib/project_galleries.json';
interface ProjectData {
  number: string;
  name: string;
  category: string;
  location: string;
  description: string;
  tag: 'residential' | 'commercial' | 'development' | 'industrial';
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
    col2_extra?: string;
  };
  gallery?: string[];
}

const SlideshowImage: React.FC<{ images: string[]; alt: string }> = ({ images, alt }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-full">
      {images.map((src, i) => (
        <motion.img
          key={src}
          src={getOptimizedImageUrl(src, 800)}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  onViewGallery: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onViewGallery }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const safeImages = project.images || {
    col1_1: '',
    col1_2: '',
    col2: '',
    col2_extra: undefined
  };

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Map progress to 3D scale: small (0.88) when coming, fit (1.0) in mid, small (0.88) when going
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.88, 1.0, 1.0, 0.88]);
  
  // Map progress to 3D tilt rotation
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [14, 0, 0, -14]);
  
  // 100% full opacity at all times (no fading while scrolling)
  const opacity = 1.0;

  return (
    <div 
      ref={cardRef} 
      className="w-full mb-8 md:mb-16 flex justify-center"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        style={{
          scale,
          rotateX,
          opacity,
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
        className="w-full rounded-[24px] md:rounded-[40px] border border-black/10 bg-white p-5 md:p-8 lg:p-10 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-12 items-center"
      >
        {isEven ? (
          <>
            {/* Text block (Left 42%) */}
            <div className="w-full md:w-[42%] flex flex-col text-left justify-center space-y-4 lg:space-y-6">
              <div 
                className="max-md:cursor-pointer md:cursor-default group/title select-none"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsExpanded(!isExpanded);
                  }
                }}
              >
                <span className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#C92C15] leading-none select-none">
                  {project.number}
                </span>
                <div className="mt-2">
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-[#111111] tracking-tight leading-tight group-hover/title:text-[#C92C15] transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#222222] font-extrabold block mt-1.5 group-hover/title:text-[#C92C15] transition-colors">
                    {project.category} &bull; {project.location}
                  </span>
                </div>
              </div>

              {/* PC View: Always visible description */}
              <div className="hidden md:block">
                <p className="text-[#2B2B2B] font-normal text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Mobile View: Collapsible description */}
              <div className="block md:hidden">
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-[#2B2B2B] font-normal text-sm leading-relaxed py-1">
                    {project.description}
                  </p>
                  {/* Mobile only Enquire Project button when expanded */}
                  <div className="pt-4 pb-2">
                    <button
                      onClick={() => onViewGallery(project)}
                      className="inline-flex items-center gap-2 border border-black/20 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-[#111111] cursor-pointer"
                    >
                      <span>Explore Gallery</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex items-center gap-4">
                {/* PC: Always show Enquire Project */}
                <div className="hidden md:block">
                  <button
                    onClick={() => onViewGallery(project)}
                    className="inline-flex items-center gap-2 border border-black/20 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-[#111111] cursor-pointer"
                  >
                    <span>Explore Gallery</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Mobile: Show Learn More/Learn Less (Toggles Expand) */}
                <div className="block md:hidden">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center gap-2 border border-black/20 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-[#111111] cursor-pointer"
                  >
                    <span>{isExpanded ? 'Learn Less' : 'Learn More'}</span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </div>
              </div>
            </div>

            {/* Image block (Right 58%) */}
            <div className="w-full md:w-[58%]">
              <div className="grid grid-cols-10 gap-4 lg:gap-6">
                {/* Left tall image (Col 2) */}
                <div className="col-span-6 rounded-[20px] md:rounded-[30px] overflow-hidden bg-black/5 h-[320px] lg:h-[420px]">
                  <img
                    src={getOptimizedImageUrl(safeImages.col2, 800)}
                    alt={`${project.name} main view`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Right stacked images (Col 1_1 and 1_2) */}
                <div className="col-span-4 flex flex-col gap-4 lg:gap-6 justify-between h-[320px] lg:h-[420px]">
                  <div className="rounded-[15px] md:rounded-[22px] overflow-hidden bg-black/5 h-[calc(50%-8px)] lg:h-[calc(50%-12px)]">
                    <img
                      src={getOptimizedImageUrl(safeImages.col1_1, 500)}
                      alt={`${project.name} detail view 1`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="rounded-[15px] md:rounded-[22px] overflow-hidden bg-black/5 h-[calc(50%-8px)] lg:h-[calc(50%-12px)]">
                    <img
                      src={getOptimizedImageUrl(safeImages.col1_2, 500)}
                      alt={`${project.name} detail view 2`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Image block (Left 58%) */}
            <div className="w-full md:w-[58%] order-2 md:order-1">
              <div className="grid grid-cols-10 gap-4 lg:gap-6">
                {/* Left stacked images (Col 1_1 and 1_2) */}
                <div className="col-span-4 flex flex-col gap-4 lg:gap-6 justify-between h-[320px] lg:h-[420px]">
                  <div className="rounded-[15px] md:rounded-[22px] overflow-hidden bg-black/5 h-[calc(50%-8px)] lg:h-[calc(50%-12px)]">
                    <img
                      src={getOptimizedImageUrl(safeImages.col1_1, 500)}
                      alt={`${project.name} detail view 1`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="rounded-[15px] md:rounded-[22px] overflow-hidden bg-black/5 h-[calc(50%-8px)] lg:h-[calc(50%-12px)]">
                    <img
                      src={getOptimizedImageUrl(safeImages.col1_2, 500)}
                      alt={`${project.name} detail view 2`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Right tall image (Col 2) */}
                <div className="col-span-6 rounded-[20px] md:rounded-[30px] overflow-hidden bg-black/5 h-[320px] lg:h-[420px] relative">
                  {safeImages.col2_extra ? (
                    <SlideshowImage 
                      images={[safeImages.col2, safeImages.col2_extra]} 
                      alt={`${project.name} main view`} 
                    />
                  ) : (
                    <img
                      src={getOptimizedImageUrl(safeImages.col2, 800)}
                      alt={`${project.name} main view`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Text block (Right 42%) */}
            <div className="w-full md:w-[42%] flex flex-col text-left justify-center space-y-4 lg:space-y-6 order-1 md:order-2">
              <div 
                className="max-md:cursor-pointer md:cursor-default group/title select-none"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsExpanded(!isExpanded);
                  }
                }}
              >
                <span className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#C92C15] leading-none select-none">
                  {project.number}
                </span>
                <div className="mt-2">
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-[#111111] tracking-tight leading-tight group-hover/title:text-[#C92C15] transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#222222] font-extrabold block mt-1.5 group-hover/title:text-[#C92C15] transition-colors">
                    {project.category} &bull; {project.location}
                  </span>
                </div>
              </div>

              {/* PC View: Always visible description */}
              <div className="hidden md:block">
                <p className="text-[#2B2B2B] font-normal text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Mobile View: Collapsible description */}
              <div className="block md:hidden">
                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-[#2B2B2B] font-normal text-sm leading-relaxed py-1">
                    {project.description}
                  </p>
                  {/* Mobile only Enquire Project button when expanded */}
                  <div className="pt-4 pb-2">
                    <button
                      onClick={() => onViewGallery(project)}
                      className="inline-flex items-center gap-2 border border-black/20 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-[#111111] cursor-pointer"
                    >
                      <span>Explore Gallery</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex items-center gap-4">
                {/* PC: Always show Enquire Project */}
                <div className="hidden md:block">
                  <button
                    onClick={() => onViewGallery(project)}
                    className="inline-flex items-center gap-2 border border-black/20 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-[#111111] cursor-pointer"
                  >
                    <span>Explore Gallery</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Mobile: Show Learn More/Learn Less (Toggles Expand) */}
                <div className="block md:hidden">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center gap-2 border border-black/20 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-[#111111] cursor-pointer"
                  >
                    <span>{isExpanded ? 'Learn Less' : 'Learn More'}</span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};


const SkeletonCard: React.FC = () => {
  return (
    <div className="w-full mb-8 md:mb-16 flex justify-center">
      <div className="w-full rounded-[24px] md:rounded-[40px] border border-black/5 bg-white p-5 md:p-8 lg:p-10 shadow-md flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-12 items-center animate-pulse">
        {/* Left block (Text skeleton) */}
        <div className="w-full md:w-[42%] flex flex-col text-left justify-center space-y-4">
          <div className="w-16 h-8 bg-black/5 rounded" />
          <div className="space-y-2">
            <div className="w-24 h-3 bg-black/5 rounded" />
            <div className="w-48 h-6 bg-black/5 rounded" />
          </div>
          <div className="space-y-2">
            <div className="w-full h-4 bg-black/5 rounded" />
            <div className="w-5/6 h-4 bg-black/5 rounded" />
          </div>
          <div className="w-32 h-10 bg-black/5 rounded-full" />
        </div>
        {/* Right block (Image skeleton) */}
        <div className="w-full md:w-[58%]">
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-6 rounded-[20px] bg-black/5 h-[240px] md:h-[320px]" />
            <div className="col-span-4 flex flex-col gap-4 justify-between h-[240px] md:h-[320px]">
              <div className="rounded-[15px] bg-black/5 h-[calc(50%-8px)]" />
              <div className="rounded-[15px] bg-black/5 h-[calc(50%-8px)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const fallbackProjects: ProjectData[] = [
  {
    number: '01',
    name: 'MS Jewellers',
    category: 'Commercial Showroom',
    location: 'Johari Bazaar',
    description: 'A high-concept jewelry showroom combining state-of-the-art security, custom-engineered display counters and precise task lighting.',
    tag: 'commercial',
    images: {
      col1_1: assets.projects.msCol1_1,
      col1_2: assets.projects.msCol1_2,
      col2: assets.projects.msCol2
    }
  },
  {
    number: '02',
    name: 'Barfiwala Sweets',
    category: 'Premium Retail Showroom',
    location: 'Johari Bazaar',
    description: 'A modern retail sweets showroom blending heritage Rajasthani elements with clean contemporary display cases, hygiene-first packaging areas and warm inviting lighting.',
    tag: 'industrial',
    images: {
      col1_1: assets.projects.barfiwalaCol1_1,
      col1_2: assets.projects.barfiwalaCol1_2,
      col2: assets.projects.barfiwalaCol2,
      col2_extra: assets.projects.barfiwalaCol2Extra
    }
  },
  {
    number: '03',
    name: 'Reeve Inn Hotel',
    category: 'Commercial & Hospitality',
    location: 'Bani Park',
    description: 'A modern commercial hotel development showcasing structural concrete integrity, customized exterior finishes and premium room layouts.',
    tag: 'development',
    images: {
      col1_1: assets.projects.hotelCol1_1,
      col1_2: assets.projects.hotelCol1_2,
      col2: assets.projects.hotelCol2
    }
  },
  {
    number: '04',
    name: 'Paliwal Textile',
    category: 'Textile Center & Office',
    location: 'MI Road',
    description: 'A state-of-the-art textile showroom and administrative office, featuring high-capacity fabric display racks, custom client discussion tables and a premium exterior glass facade.',
    tag: 'commercial',
    images: {
      col1_1: assets.projects.paliwalCol1_1,
      col1_2: assets.projects.paliwalCol1_2,
      col2: assets.projects.paliwalCol2
    }
  },
  {
    number: '05',
    name: 'Modular Kitchen',
    category: 'Luxury Kitchen Design',
    location: 'Vaishali Nagar',
    description: 'A premium modular kitchen design featuring high-quality customized cabinetry, smart integrated appliances, custom quartz countertops, and optimized layout ergonomics.',
    tag: 'residential',
    images: {
      col1_1: assets.projects.kitchenCol1_1,
      col1_2: assets.projects.kitchenCol1_2,
      col2: assets.projects.kitchenCol2
    }
  },
  {
    number: '06',
    name: 'Shri Narayan Sales',
    category: 'Commercial Office & Hub',
    location: 'Johari Bazaar',
    description: 'A contemporary commercial office space and sales hub designed with open planning, premium finishes and integrated smart facilities.',
    tag: 'commercial',
    images: {
      col1_1: assets.projects.narayanCol1_1,
      col1_2: assets.projects.narayanCol1_2,
      col2: assets.projects.narayanCol2
    }
  },
  {
    number: '07',
    name: 'Indie Stitch',
    category: 'Bespoke Boutique & Office',
    location: 'Mansarovar',
    description: 'A luxury fashion boutique and design office featuring custom wood paneling, premium layout spacing and modern design aesthetics.',
    tag: 'commercial',
    images: {
      col1_1: assets.projects.indieCol1_1,
      col1_2: assets.projects.indieCol1_2,
      col2: assets.projects.indieCol2
    }
  },
  {
    number: '08',
    name: 'Sanjay Stores',
    category: 'Commercial Retail Showroom',
    location: 'Johari Bazaar',
    description: 'A premier retail showroom layout featuring custom product displays, spacious inventory zones, modern lighting design, and a high-appeal storefront facade.',
    tag: 'commercial',
    images: {
      col1_1: assets.projects.sanjayCol1_1,
      col1_2: assets.projects.sanjayCol1_2,
      col2: assets.projects.sanjayCol2
    }
  }
];

const ProjectGalleryModal: React.FC<{ project: ProjectData; onClose: () => void }> = ({ project, onClose }) => {
  // Case-insensitive and space-insensitive matching for local gallery JSON
  const normalizeKey = (key: string) => key.toLowerCase().replace(/[^a-z0-9]/g, '');
  const dbImagesKey = Object.keys(projectGalleries).find(
    (k) => normalizeKey(k) === normalizeKey(project.name)
  );
  
  const dbImages = dbImagesKey 
    ? (projectGalleries[dbImagesKey as keyof typeof projectGalleries] || []) 
    : [];

  const fallbackImages = project.images 
    ? [project.images.col2, project.images.col1_1, project.images.col1_2].filter(Boolean) as string[]
    : [];

  // Prioritize Firestore-backed gallery array, then check static JSON, fallback to column views
  const images = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : (dbImages.length > 0 ? dbImages : fallbackImages);

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    // Preload all high-res lightbox images in the background for instant opening
    images.forEach((src) => {
      const isVideo = src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm') || src.toLowerCase().endsWith('.mov');
      if (!isVideo) {
        const img = new Image();
        img.src = getOptimizedImageUrl(src, 1200);
      }
    });
  }, [images]);

  useEffect(() => {
    document.body.classList.add('gallery-open');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('gallery-open');
      document.body.style.overflow = '';
    };
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % images.length);
  }, [activeImageIndex, images.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
  }, [activeImageIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setActiveImageIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, handleNext, handlePrev]);

  return (
    <div className="fixed inset-0 z-[99999] bg-[#0A0A0A]/95 text-white backdrop-blur-xl flex flex-col select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0A0A0A]/50 backdrop-blur-md relative z-10">
        <div>
          <span className="text-[#C92C15] text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-0.5">
            {project.category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">{project.name}</h3>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/contact#contact-section"
            onClick={() => {
              onClose();
              setTimeout(() => {
                document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
            className="hidden sm:inline-flex items-center gap-2 border border-white/20 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/10 transition-all px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white"
          >
            <span>Enquire Project</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={onClose}
            className="flex items-center gap-2 border border-white/20 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/10 transition-all px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white cursor-pointer"
            title="Close Gallery"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div 
        data-lenis-prevent
        className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
      >
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((src, i) => {
            const isVideo = src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm') || src.toLowerCase().endsWith('.mov');
            return (
              <motion.div
                key={src + i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                onClick={() => setActiveImageIndex(i)}
                className="break-inside-avoid relative group overflow-hidden rounded-2xl bg-white/5 border border-white/5 cursor-pointer shadow-lg"
              >
                {isVideo ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center min-h-[150px]">
                    <video
                      src={src}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full p-3.5 scale-90 group-hover:scale-100 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 fill-white text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={getOptimizedImageUrl(src, 600)}
                    alt={`${project.name} gallery image ${i + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Mobile Enquire Button inside scroll (for small screens) */}
        <div className="sm:hidden mt-8 flex justify-center pb-6">
          <Link
            to="/contact#contact-section"
            onClick={() => {
              onClose();
              setTimeout(() => {
                document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
            className="inline-flex items-center gap-2 bg-[#C92C15] hover:bg-[#D43B13] transition-all px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white w-full justify-center shadow-lg font-bold"
          >
            <span>Enquire Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {activeImageIndex !== null && (() => {
          const activeSrc = images[activeImageIndex];
          const isActiveVideo = activeSrc.toLowerCase().endsWith('.mp4') || activeSrc.toLowerCase().endsWith('.webm') || activeSrc.toLowerCase().endsWith('.mov');
          return (
            <div 
              onClick={() => setActiveImageIndex(null)}
              className="fixed inset-0 z-[999999] bg-black/95 flex items-center justify-center"
            >
              {/* Close Lightbox */}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all hover:bg-black/80 z-20 cursor-pointer"
                title="Close View"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Left Control */}
              <button
                onClick={handlePrev}
                className="absolute left-6 w-12 h-12 rounded-full bg-black/60 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all hover:bg-black/80 z-20 cursor-pointer"
                title="Previous Image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Right Control */}
              <button
                onClick={handleNext}
                className="absolute right-6 w-12 h-12 rounded-full bg-black/60 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all hover:bg-black/80 z-20 cursor-pointer"
                title="Next Image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Center Image/Video Container */}
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center"
              >
                {isActiveVideo ? (
                  <video
                    src={activeSrc}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl border border-white/5"
                  />
                ) : (
                  <motion.img
                    key={activeImageIndex}
                    src={getOptimizedImageUrl(activeSrc, 1200)}
                    alt="Fullscreen view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl border border-white/5 select-none pointer-events-none"
                  />
                )}
                <span className="absolute bottom-[-40px] text-xs font-semibold text-white/50 tracking-wider">
                  {activeImageIndex + 1} / {images.length}
                </span>
              </div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};

interface ProjectsProps {
  filter?: 'all' | 'residential' | 'commercial' | 'development' | 'industrial';
}

export const Projects: React.FC<ProjectsProps> = ({ filter = 'all' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projectsList, setProjectsList] = useState<ProjectData[]>(fallbackProjects);
  const [loading, setLoading] = useState(!!db);
  const [activeGalleryProject, setActiveGalleryProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        if (!db) {
          console.info("Using local offline projects database.");
          setProjectsList(fallbackProjects);
          setLoading(false);
          return;
        }
        const q = query(collection(db!, 'projects'), orderBy('number', 'asc'));
        const querySnapshot = await getDocs(q);
        const list: ProjectData[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data() as ProjectData;
          if (data.name === 'Barfiwala Sweets') {
            data.images = {
              ...data.images,
              col1_1: assets.projects.barfiwalaCol1_1,
              col1_2: assets.projects.barfiwalaCol1_2,
              col2: assets.projects.barfiwalaCol2,
              col2_extra: assets.projects.barfiwalaCol2Extra
            };
          }
          if (data.name === 'MS Jewellers') {
            data.images = {
              ...data.images,
              col1_1: assets.projects.msCol1_1,
              col1_2: assets.projects.msCol1_2,
              col2: assets.projects.msCol2
            };
          }
          if (data.name === 'Indie Stitch') {
            data.images = {
              ...data.images,
              col1_1: assets.projects.indieCol1_1,
              col1_2: assets.projects.indieCol1_2,
              col2: assets.projects.indieCol2
            };
          }
          if (data.name === 'Reeve Inn Hotel' || data.name === 'Reeve Inn') {
            data.images = {
              ...data.images,
              col1_1: assets.projects.hotelCol1_1,
              col1_2: assets.projects.hotelCol1_2,
              col2: assets.projects.hotelCol2
            };
          }
          if (data.name === 'Sanjay Stores' || data.name === 'Sanjay Store') {
            data.images = {
              ...data.images,
              col1_1: assets.projects.sanjayCol1_1,
              col1_2: assets.projects.sanjayCol1_2,
              col2: assets.projects.sanjayCol2
            };
          }
          if (data.name === 'Shri Narayan Sales') {
            data.images = {
              ...data.images,
              col1_1: assets.projects.narayanCol1_1,
              col1_2: assets.projects.narayanCol1_2,
              col2: assets.projects.narayanCol2
            };
          }
          list.push(data);
        });
        if (list.length === 0) {
          setProjectsList(fallbackProjects);
        } else {
          setProjectsList(list);
        }
      } catch (err) {
        console.error("Firestore projects fetch error, falling back to local list: ", err);
        setProjectsList(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = filter === 'all'
    ? projectsList
    : projectsList.filter(p => p.tag === filter);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[#FAF7F5] py-12 md:py-24 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Heading */}
        <div className="text-left mb-12 md:mb-20">
          <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-3">
            Our Works
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
            Crafted With Precision
          </h2>
          <p className="text-[#6F6F6F] font-light mt-2 md:mt-4 max-w-xl text-xs md:text-sm">
            A showcase of our landmark developments where precision architecture meets luxury construction.
          </p>
        </div>

        {/* UNIFIED ALTERNATING CARD LIST (1-BY-1 FOR BOTH MOBILE & PC) */}
        <div className="flex relative flex-col items-center w-full">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.number}
                  project={project}
                  index={index}
                  onViewGallery={setActiveGalleryProject}
                />
              ))}
              {filteredProjects.length === 0 && (
                <div className="text-center py-12 md:py-20 text-gray-500 font-light w-full bg-white rounded-2xl md:rounded-3xl border border-black/5 text-xs md:text-sm">
                  No developments in this category at this time.
                </div>
              )}
            </>
          )}

          {activeGalleryProject && createPortal(
            <ProjectGalleryModal 
              project={activeGalleryProject} 
              onClose={() => setActiveGalleryProject(null)} 
            />,
            document.body
          )}
        </div>

      </div>
    </section>
  );
};


export default Projects;
