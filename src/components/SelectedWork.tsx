import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SELECTED_PROJECTS } from '../data';
import { PortfolioProject } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface SelectedWorkProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredProjects =
    activeFilter === 'ALL'
      ? SELECTED_PROJECTS
      : SELECTED_PROJECTS.filter((p) => p.division.toUpperCase() === activeFilter);

  return (
    <section
      id="work"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-[#D5D4CF]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#D5D4CF]">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-[#767676] uppercase mb-4">
            04 / SELECTED WORK
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0A0A0A] leading-[1.1]">
            What we <span className="font-editorial-italic font-normal text-4xl sm:text-6xl lg:text-7xl">build.</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider">
          {['ALL', 'AMARIS', 'PROJECTS', 'TECHNOLOGY', 'VENTURES'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 transition-colors cursor-pointer border ${
                activeFilter === filter
                  ? 'bg-[#0A0A0A] text-[#F4F3EF] border-[#0A0A0A]'
                  : 'bg-[#FFFFFF] text-[#767676] border-[#D5D4CF] hover:text-[#0A0A0A] hover:border-[#0A0A0A]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Grid: 2-column or 3-column asymmetric layout */}
      <motion.div layout className="pt-12 sm:pt-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#EAE9E4] mb-6">
                <img
                  src={project.image}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />

                {/* Subtle Hover Action Reveal */}
                <div className="absolute inset-0 bg-[#0A0A0A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-[#F4F3EF] text-[#0A0A0A] text-xs font-mono tracking-widest px-4 py-2 flex items-center gap-2 shadow-lg">
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 text-[10px] font-mono tracking-widest text-[#F4F3EF] bg-[#0A0A0A]/80 backdrop-blur-sm px-2.5 py-1">
                  {project.division}
                </div>
              </div>

              {/* Metadata and Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#767676]">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#0A0A0A] group-hover:text-[#767676] transition-colors">
                    {project.name}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#767676] group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                </div>

                <p className="text-sm text-[#767676] font-light line-clamp-2 leading-relaxed">
                  {project.summary}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
