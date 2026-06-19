import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "./ui/FadeUp";

export const ShuffleHero = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-16 py-24 bg-white text-[#2A2A2A] border-t border-black/5 relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16 relative z-10">
        <div className="text-left space-y-6">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.2em] block">
              Better Every Day
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1B1B1B] tracking-tight leading-tight">
              Crafting Spaces, Redefining Standards.
            </h3>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-base text-[#6F6F6F] font-light leading-relaxed my-2">
              From custom luxury estates to landmark commercial centers, we are committed to building long-term value and structural perfection across Jaipur. Ditch the old, tedious construction processes—we build with precision.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} className="pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-[#C92C15] text-white hover:bg-[#D43B13] px-8 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Our Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>
        <div className="w-full relative">
          <ShuffleGrid />
        </div>
      </div>
    </section>
  );
};

const shuffle = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&h=400&q=80",
  },
];

const generateSquares = () => {
  return shuffle([...squareData]).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-2xl overflow-hidden border border-black/5 bg-gray-100 shadow-sm"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState<any[]>([]);

  useEffect(() => {
    setSquares(generateSquares());
    
    const triggerShuffle = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(triggerShuffle, 3000);
    };

    timeoutRef.current = setTimeout(triggerShuffle, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[350px] md:h-[450px] gap-2 lg:gap-3 p-2 bg-[#FAF7F5] rounded-[32px] border border-black/5 shadow-inner">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;
