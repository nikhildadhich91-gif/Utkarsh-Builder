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
              Building With Trust
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1B1B1B] tracking-tight leading-tight">
              Beautiful Spaces, Built to Last.
            </h3>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-base text-[#6F6F6F] font-light leading-relaxed my-2">
              From custom family homes to modern commercial centers, we build high quality properties across Jaipur. We handle everything for you, making the entire building process simple and stress free.
            </p>
          </FadeUp>
          <FadeUp delay={0.4} className="pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-[#C92C15] text-white hover:bg-[#D43B13] px-8 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>See Our Projects</span>
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

import bedroomImg from "../assets/generated/bedroom.webp";
import receptionImg from "../assets/generated/reception.webp";
import bathroomImg from "../assets/generated/bathroom.webp";
import wardrobeImg from "../assets/generated/wardrobe.webp";
import corridorImg from "../assets/generated/corridor.webp";
import balconyImg from "../assets/generated/balcony.webp";
import officeImg from "../assets/generated/office.webp";

import msCol1_1 from "../assets/projects/ms-jewellers-col1-1.webp";
import msCol2 from "../assets/projects/ms-jewellers-col2.webp";
import indieCol1_1 from "../assets/projects/indie-stitch-col1-1.webp";
import indieCol2 from "../assets/projects/indie-stitch-col2.webp";
import kitchenCol1_1 from "../assets/projects/modular-kitchen-col1-1.webp";
import kitchenCol2 from "../assets/projects/modular-kitchen-col2.webp";
import hotelCol1_1 from "../assets/projects/hotel-reeve-inn-col1-1.webp";
import hotelCol2 from "../assets/projects/hotel-reeve-inn-col2.webp";

const squareData = [
  { id: 1, src: bedroomImg },
  { id: 2, src: receptionImg },
  { id: 3, src: bathroomImg },
  { id: 4, src: wardrobeImg },
  { id: 5, src: corridorImg },
  { id: 6, src: balconyImg },
  { id: 7, src: officeImg },
  { id: 8, src: msCol1_1 },
  { id: 9, src: msCol2 },
  { id: 10, src: indieCol1_1 },
  { id: 11, src: indieCol2 },
  { id: 12, src: kitchenCol1_1 },
  { id: 13, src: kitchenCol2 },
  { id: 14, src: hotelCol1_1 },
  { id: 15, src: hotelCol2 },
  { id: 16, src: bedroomImg }
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
