import React from 'react';
import { motion } from 'motion/react';
import { PortfolioProject } from '../types';
import { X, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onInquire: (divisionId: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A0A0A]/70 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        className="relative w-full max-w-4xl bg-[#F4F3EF] border border-[#D5D4CF] shadow-2xl z-10 my-auto max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-[#F4F3EF]/80 backdrop-blur-sm text-[#0A0A0A] hover:text-[#767676] transition-colors cursor-pointer"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Visual */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#EAE9E4]">
          <img
            src={project.image}
            alt={project.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-105"
          />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-[#F4F3EF] bg-[#0A0A0A]/80 backdrop-blur-sm px-3.5 py-2">
            <span>{project.division} / ARCHIVAL DOSSIER</span>
            <span>{project.year} • {project.location || 'CASABLANCA'}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-12 space-y-8">
          <div className="space-y-3 pb-6 border-b border-[#D5D4CF]">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#767676]">
              <span>{project.category}</span>
              <span>•</span>
              <span>REF ID: {project.id.toUpperCase()}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#0A0A0A]">
              {project.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-6">
              <div>
                <h4 className="text-xs font-mono tracking-widest text-[#767676] uppercase mb-2">
                  PROJECT BRIEF &amp; OBJECTIVE
                </h4>
                <p className="text-base text-[#0A0A0A] font-light leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {project.metrics && (
                <div className="p-4 bg-[#FFFFFF] border border-[#D5D4CF] space-y-1">
                  <span className="text-[10px] font-mono text-[#767676] uppercase">KEY RESULT / METRIC</span>
                  <p className="text-sm font-medium text-[#0A0A0A]">{project.metrics}</p>
                </div>
              )}
            </div>

            {/* Scope / Deliverables */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-mono tracking-widest text-[#767676] uppercase">
                SCOPE OF DELIVERY
              </h4>
              <div className="space-y-2">
                {project.scope.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-light text-[#0A0A0A]">
                    <span className="w-1 h-1 rounded-full bg-[#0A0A0A] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#D5D4CF]">
                <button
                  onClick={() => {
                    onClose();
                    onInquire(project.divisionId);
                  }}
                  className="w-full bg-[#0A0A0A] text-[#F4F3EF] py-3 text-xs font-mono tracking-widest uppercase hover:bg-[#767676] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>INQUIRE THIS DISCIPLINE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
