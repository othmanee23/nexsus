import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export interface DivisionItem {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  bullets: string[];
  image: string;
}

interface DivisionsGridProps {
  onSelectDivision: (id: string) => void;
  onOpenContact: () => void;
}

const DIVISIONS: DivisionItem[] = [
  {
    id: 'amaris',
    code: '01',
    name: 'AMARIS',
    subtitle: 'BRAND & VISUAL SYSTEMS',
    description:
      'Logos, interfaces, and visual systems for sovereign enterprises that choose substance over market noise. Dynamic architectures built to define category leadership.',
    bullets: [
      'Brand architecture & guidelines',
      'Bespoke creative direction',
      'Digital design systems',
    ],
    image: '/images/division-amaris.jpg',
  },
  {
    id: 'projects',
    code: '02',
    name: 'PROJECTS',
    subtitle: 'BUILT ENVIRONMENT & ARCHITECTURE',
    description:
      'Architecture, interior fit-outs, and physical monoliths engineered to endure for decades. Precision construction meeting contemporary functional luxury.',
    bullets: [
      'Architectural masterplanning',
      'High-specification fit-outs',
      'Environmental spatial branding',
    ],
    image: '/images/division-projects.jpg',
  },
  {
    id: 'technology',
    code: '03',
    name: 'TECHNOLOGY',
    subtitle: 'SYSTEMS & COMPUTATION',
    description:
      'Enterprise software platforms, computational systems, and custom digital tooling. High-concurrency infrastructures delivering uncompromised resilience.',
    bullets: [
      'Distributed cloud infrastructure',
      'Scalable systems engineering',
      'Computational tooling & APIs',
    ],
    image: '/images/division-technology.jpg',
  },
  {
    id: 'ventures',
    code: '04',
    name: 'VENTURES',
    subtitle: 'CAPITAL & CONSUMER BRANDS',
    description:
      'Incubation of proprietary consumer brands, direct capital allocation, and sovereign operating holdings. Cultivating long-term enterprise equity.',
    bullets: [
      'Direct-to-consumer incubation',
      'Strategic capital deployment',
      'Long-term equity governance',
    ],
    image: '/images/division-ventures.jpg',
  },
];

const DivisionRow: React.FC<{
  division: DivisionItem;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onSelect: (id: string) => void;
}> = ({ division, index, isActive, onHover, onSelect }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse follower for the circular "VIEW ↗" button
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cursorX = useSpring(rawX, { stiffness: 450, damping: 28 });
  const cursorY = useSpring(rawY, { stiffness: 450, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(division.id)}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative w-full border-b border-black/10 py-7 sm:py-9 lg:py-10 px-4 sm:px-8 lg:px-12 transition-colors duration-400 cursor-pointer overflow-hidden ${
        isActive ? 'bg-black/[0.012]' : 'hover:bg-black/[0.008]'
      }`}
    >
      {/* Desktop Floating "VIEW ↗" Cursor Follower */}
      {isHovered && (
        <motion.div
          style={{ left: cursorX, top: cursorY }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:flex w-20 h-20 rounded-full bg-black text-white flex-col items-center justify-center gap-0.5 text-[11px] font-mono font-medium tracking-widest uppercase shadow-2xl"
        >
          <div className="flex items-center gap-1">
            <span>VIEW</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>
      )}

      {/* Main 3-Column Grid Matching Reference Layout */}
      <div className="w-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        {/* Column 1: Division Title (Medium Uppercase) */}
        <div className="lg:col-span-4 flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-black uppercase select-none transition-transform duration-300 group-hover:translate-x-1.5">
              {division.name}
            </h3>
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-black/50 uppercase mt-1">
              ({division.code}) {division.subtitle}
            </span>
          </div>
        </div>

        {/* Column 2: Middle Content - Shows 1-2 lines when collapsed, expands to full text + bullets when active */}
        <div className="lg:col-span-4 flex flex-col justify-start">
          <AnimatePresence mode="wait" initial={false}>
            {isActive ? (
              <motion.div
                key="expanded-content"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
                  {division.description}
                </p>

                {/* 3 Structured Bullet Points */}
                <div className="mt-4 sm:mt-5 space-y-1.5">
                  {division.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-black/85 font-mono"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs sm:text-sm text-black/60 font-sans leading-relaxed line-clamp-2">
                  {division.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Column 3: Image Container - Thin Slice when Collapsed, Full Aspect when Active */}
        <div className="lg:col-span-4 flex justify-end">
          <div
            className={`w-full lg:w-[420px] bg-[#E8E8E5] overflow-hidden transition-all duration-500 ease-[0.16,1,0.3,1] relative ${
              isActive
                ? 'h-[220px] sm:h-[260px] lg:h-[280px]'
                : 'h-[52px] sm:h-[62px] lg:h-[68px] opacity-90'
            }`}
          >
            <img
              src={division.image}
              alt={division.name}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] ${
                isActive ? 'scale-100' : 'scale-105 hover:scale-110'
              }`}
            />

            {/* Subtle overlay indicator on collapsed strip */}
            {!isActive && (
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-transparent" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const DivisionsGrid: React.FC<DivisionsGridProps> = ({
  onSelectDivision,
}) => {
  // Default to first row active, changes on hover
  const [activeId, setActiveId] = useState<string>(DIVISIONS[0].id);

  return (
    <section id="divisions-grid" className="w-full bg-white">
      {/* Section Header Matching Reference Layout */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-12 border-b border-black/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-black uppercase leading-[1.08]">
              THE OPERATING
              <br />
              DISCIPLINES
              <br />
              FRAMEWORK
            </h2>
          </div>
          <div className="text-xs sm:text-sm font-mono tracking-wider uppercase text-black/50">
            NEXSUS OPERATING MODEL • 01 — 04
          </div>
        </motion.div>
      </div>

      {/* Accordion List of Divisions */}
      <div className="w-full">
        {DIVISIONS.map((division, index) => (
          <DivisionRow
            key={division.id}
            index={index}
            division={division}
            isActive={activeId === division.id}
            onHover={() => setActiveId(division.id)}
            onSelect={onSelectDivision}
          />
        ))}
      </div>
    </section>
  );
};
