import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Link as LinkIcon, Zap, Map, Layout, Feather, HardHat, Award, TrendingUp } from 'lucide-react';
import { FadeUp } from './ui/FadeUp';
import { assets } from '../lib/cloudinary';
const LogoImg = assets.logo;

// Inline simple UI sub-components to bypass shadcn dependency and guarantee compilation
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider border ${className}`}>
    {children}
  </span>
);

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border shadow-xl ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 md:p-5 pb-1 flex flex-col space-y-1.5 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xs md:text-sm font-bold tracking-tight leading-snug ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 md:p-5 pt-0 ${className}`}>
    {children}
  </div>
);

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export const ValueCreationTimeline: React.FC = () => {
  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: 'Land Acquisition',
      date: 'Phase 01',
      content: 'Finding high-value plots in Jaipur and securing all necessary land permits.',
      category: 'Land',
      icon: Map,
      relatedIds: [2],
      status: 'completed',
      energy: 95
    },
    {
      id: 2,
      title: 'Site Feasibility',
      date: 'Phase 02',
      content: 'Planning natural sunlight access, spacing, and smart utility connections.',
      category: 'Planning',
      icon: Layout,
      relatedIds: [1, 3],
      status: 'completed',
      energy: 85
    },
    {
      id: 3,
      title: 'Bespoke Design',
      date: 'Phase 03',
      content: 'Combining classic Rajasthani stone designs with modern glass styling.',
      category: 'Design',
      icon: Feather,
      relatedIds: [2, 4],
      status: 'in-progress',
      energy: 90
    },
    {
      id: 4,
      title: 'Engineered Build',
      date: 'Phase 04',
      content: 'Constructing with high-strength, rust-resistant steel and laboratory-tested concrete.',
      category: 'Construction',
      icon: HardHat,
      relatedIds: [3, 5],
      status: 'pending',
      energy: 70
    },
    {
      id: 5,
      title: 'Sovereign Delivery',
      date: 'Phase 05',
      content: 'Thorough quality checks, beautiful styling finishes, and keys handover with a warranty.',
      category: 'Delivery',
      icon: Award,
      relatedIds: [4, 6],
      status: 'pending',
      energy: 40
    },
    {
      id: 6,
      title: 'Asset Lifecycle Appreciation',
      date: 'Phase 06',
      content: 'Providing premium quality that ensures high rental income and long-term durability.',
      category: 'Long-Term Value',
      icon: TrendingUp,
      relatedIds: [5],
      status: 'pending',
      energy: 30
    }
  ];

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [radius, setRadius] = useState<number>(200);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Responsive radius adjustments
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(140);
      } else if (window.innerWidth < 1024) {
        setRadius(190);
      } else {
        setRadius(230);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      newState[id] = !prev[id];

      if (newState[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const currentItem = timelineData.find((item) => item.id === id);
        const related = currentItem ? currentItem.relatedIds : [];
        const newPulseEffect: Record<number, boolean> = {};
        related.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: any;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.3) % 360);
      }, 50);
    }
    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex === -1) return;
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-green-700 bg-green-50 border-green-200";
      case "in-progress":
        return "text-orange-700 bg-orange-50 border-orange-200";
      case "pending":
        return "text-gray-500 bg-gray-50 border-gray-200";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  return (
    <section id="timeline" className="py-24 md:py-32 bg-[#FAF7F5] relative overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full relative z-10">
        
        {/* Two-Column Layout: Left Text + Right Orbital */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[600px]">
          
          {/* Left Column: Subtle Text Content */}
          <div className="lg:col-span-4 text-left space-y-6">
            <FadeUp delay={0.1}>
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.25em] uppercase block">Our Process</span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1B1B1B] tracking-tight leading-tight">
                From Vision<br />to Reality
              </h2>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-[#6F6F6F] font-light text-sm leading-relaxed">
                Every project follows our proven six-phase lifecycle. Click on any node to explore.
              </p>
            </FadeUp>
          </div>

          {/* Right Column: Orbital Animation — larger */}
          <div className="lg:col-span-8 flex items-center justify-center">
            <div 
              className="relative w-full max-w-[600px] h-[500px] sm:h-[580px] md:h-[620px] flex items-center justify-center cursor-default overflow-visible"
              ref={containerRef}
              onClick={handleContainerClick}
            >
              <div
                className="absolute w-full h-full flex items-center justify-center"
                ref={orbitRef}
            style={{ perspective: "1000px" }}
          >
            {/* Center Logo Circle */}
            <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center z-10 shadow-xl border border-black/5">
              <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#C92C15]/10 animate-ping opacity-40"></div>
              <div className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-[#C92C15]/5 animate-ping opacity-20" style={{ animationDelay: "0.5s" }}></div>
              <img 
                src={LogoImg} 
                alt="Utkarsh Builder" 
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-full"
              />
            </div>

            {/* Circular Orbit Path Line */}
            <div 
              className="absolute rounded-full border border-black/[0.04] pointer-events-none"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
              }}
            ></div>

            {/* Node Items */}
            {timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isExpanded = expandedItems[item.id];
              const isRelated = activeNodeId ? item.relatedIds.includes(activeNodeId) : false;
              const isPulsing = pulseEffect[item.id];
              const Icon = item.icon;

              const nodeStyle = {
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => { nodeRefs.current[item.id] = el; }}
                  className="absolute transition-all duration-700 cursor-pointer flex flex-col items-center justify-center"
                  style={nodeStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  {/* Energy Aura halo behind node */}
                  <div
                    className={`absolute rounded-full -inset-1 pointer-events-none ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                    style={{
                      background: `radial-gradient(circle, rgba(201,44,21,0.12) 0%, rgba(201,44,21,0) 70%)`,
                      width: `${item.energy * 0.4 + 40}px`,
                      height: `${item.energy * 0.4 + 40}px`,
                      left: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                      top: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                    }}
                  ></div>

                  {/* Core Node Circle */}
                  <div
                    className={`
                      w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg
                      ${
                        isExpanded
                          ? "bg-[#C92C15] text-white"
                          : isRelated
                          ? "bg-[#C92C15]/20 text-[#C92C15] border-[#C92C15]"
                          : "bg-white text-[#1B1B1B] border-black/5"
                      }
                      border-2 
                      ${
                        isExpanded
                          ? "border-[#C92C15] shadow-lg shadow-[#C92C15]/30 scale-125"
                          : isRelated
                          ? "border-[#C92C15]/40 animate-pulse scale-110"
                          : "border-black/10"
                      }
                      transition-all duration-300 transform hover:scale-110
                    `}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Numerical Badge */}
                  <span className="absolute -top-1 -right-1 bg-[#C92C15] text-white text-[8px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white shadow-sm pointer-events-none select-none">
                    {item.id}
                  </span>

                  {/* Category text label below node */}
                  <div
                    className={`
                      absolute top-14 sm:top-16 whitespace-nowrap
                      text-[9px] font-bold tracking-wider uppercase
                      transition-all duration-300 pointer-events-none select-none
                      ${isExpanded ? "text-[#C92C15] scale-105" : "text-[#6F6F6F]"}
                    `}
                  >
                    {item.category}
                  </div>

                  {/* Details Card Pop-up */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute z-[300]"
                        style={{
                          top: radius > 150 ? '70px' : '60px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                        }}
                      >
                        <Card className="w-60 sm:w-64 bg-white/95 backdrop-blur-lg border-black/10 text-[#1B1B1B] shadow-2xl relative overflow-visible">
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white/95"></div>
                          
                          <CardHeader className="pb-1">
                            <div className="flex justify-between items-center w-full">
                              <Badge className={`px-2 py-0.5 text-[9px] font-bold ${getStatusStyles(item.status)}`}>
                                {item.status === "completed"
                                  ? "COMPLETE"
                                  : item.status === "in-progress"
                                  ? "IN PROGRESS"
                                  : "PENDING"}
                              </Badge>
                              <span className="text-[10px] font-mono font-semibold text-[#6F6F6F]">
                                {item.date}
                              </span>
                            </div>
                            <CardTitle className="text-xs sm:text-sm font-bold text-[#1B1B1B] mt-2">
                              {item.title}
                            </CardTitle>
                          </CardHeader>
                          
                          <CardContent className="text-[11px] text-[#6F6F6F] font-light leading-relaxed">
                            <p>{item.content}</p>

                            {/* Energy Level Bar */}
                            <div className="mt-3.5 pt-2.5 border-t border-black/5">
                              <div className="flex justify-between items-center text-[10px] mb-1 font-semibold text-[#1B1B1B]">
                                <span className="flex items-center gap-1">
                                  <Zap size={10} className="text-[#C92C15]" />
                                  Execution Level
                                </span>
                                <span className="font-mono">{item.energy}%</span>
                              </div>
                              <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#C92C15] to-[#D43B13]"
                                  style={{ width: `${item.energy}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Connected Nodes Links */}
                            {item.relatedIds.length > 0 && (
                              <div className="mt-3.5 pt-2.5 border-t border-black/5">
                                <div className="flex items-center gap-1 mb-2">
                                  <LinkIcon size={10} className="text-[#C92C15]" />
                                  <h4 className="text-[9px] uppercase tracking-wider font-bold text-[#1B1B1B]">
                                    Connected Phases
                                  </h4>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {item.relatedIds.map((relatedId) => {
                                    const relatedItem = timelineData.find((i) => i.id === relatedId);
                                    return (
                                      <button
                                        key={relatedId}
                                        className="inline-flex items-center h-5 px-2 text-[9px] font-semibold rounded bg-[#C92C15]/5 hover:bg-[#C92C15] hover:text-white border border-[#C92C15]/10 text-[#C92C15] transition-all cursor-pointer gap-0.5"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleItem(relatedId);
                                        }}
                                      >
                                        {relatedItem?.category}
                                        <ArrowRight size={8} className="opacity-70" />
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ValueCreationTimeline;
