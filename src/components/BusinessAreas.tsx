import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_AREAS } from '../data';
import { ArrowUpRight } from 'lucide-react';

interface BusinessAreasProps {
  onSelectArea: (divisionId: 'amaris' | 'projects' | 'technology' | 'ventures') => void;
}

export const BusinessAreas: React.FC<BusinessAreasProps> = ({ onSelectArea }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="business-areas"
      className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-[#D5D4CF] overflow-hidden"
    >
      {/* Dynamic Background Image Reveal on Hover */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              key={hoveredIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.16, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={BUSINESS_AREAS[hoveredIndex].previewImage}
                alt={BUSINESS_AREAS[hoveredIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: NEXSUS / 04 */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-[11px] font-mono tracking-widest text-[#767676] uppercase">
            08 / BUSINESS DOMAINS
          </div>
          <div className="text-4xl sm:text-6xl font-normal tracking-tighter text-[#0A0A0A]">
            NEXSUS <br />
            <span className="font-editorial-italic text-[#767676]">/ 04</span>
          </div>
          <p className="text-sm text-[#767676] font-light max-w-xs leading-relaxed pt-4">
            Hover each domain to inspect operational scope across physical, creative, and digital ventures.
          </p>
        </div>

        {/* Right Side: List of 4 Disciplines */}
        <div className="lg:col-span-8 divide-y divide-[#D5D4CF]">
          {BUSINESS_AREAS.map((area, idx) => (
            <div
              key={area.index}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onSelectArea(area.divisionId)}
              className="py-8 sm:py-10 group cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 transition-colors"
            >
              <div className="flex items-baseline gap-6 sm:gap-10">
                <span className="text-sm sm:text-base font-mono text-[#767676] group-hover:text-[#0A0A0A] transition-colors">
                  {area.index}
                </span>
                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0A0A0A] group-hover:translate-x-3 transition-transform duration-300">
                  {area.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-[#767676] group-hover:text-[#0A0A0A] transition-colors pl-10 sm:pl-0">
                <span className="hidden sm:inline-block max-w-xs font-light text-right">
                  {area.description}
                </span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
