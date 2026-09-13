import React from 'react';
import { motion } from 'motion/react';
import { EcosystemDivision } from '../types';
import { X, ArrowRight, Check } from 'lucide-react';

interface DivisionModalProps {
  division: EcosystemDivision | null;
  onClose: () => void;
  onInquire: (divisionId: string) => void;
}

export const DivisionModal: React.FC<DivisionModalProps> = ({
  division,
  onClose,
  onInquire,
}) => {
  if (!division) return null;

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
          aria-label="Close division details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Banner */}
        <div className="relative aspect-[21/9] sm:aspect-[2.5/1] w-full overflow-hidden bg-[#EAE9E4]">
          <img
            src={division.previewImage}
            alt={division.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:left-10 text-[#F4F3EF]">
            <div className="text-xs font-mono tracking-widest text-[#D5D4CF]">
              NEXSUS OPERATING DIVISION / {division.number}
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight">
              {division.name}
            </h2>
          </div>
        </div>

        {/* Details Body */}
        <div className="p-8 sm:p-12 space-y-10">
          <div className="space-y-4">
            <div className="text-xs font-mono tracking-widest text-[#767676] uppercase">
              {division.label}
            </div>
            <p className="text-lg sm:text-xl text-[#0A0A0A] font-light leading-relaxed">
              {division.extendedDescription}
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="space-y-4 pt-6 border-t border-[#D5D4CF]">
            <h4 className="text-xs font-mono tracking-widest text-[#767676] uppercase">
              STRATEGIC CAPABILITIES
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {division.capabilities.map((cap, idx) => (
                <div key={idx} className="p-4 bg-[#FFFFFF] border border-[#D5D4CF] space-y-2">
                  <div className="text-xs font-mono font-medium text-[#0A0A0A]">
                    {cap.title}
                  </div>
                  <p className="text-xs text-[#767676] font-light leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-[#D5D4CF] items-center">
            <div className="md:col-span-6 space-y-2">
              <span className="text-[10px] font-mono text-[#767676] uppercase">OPERATIONAL BENCHMARK</span>
              <div className="text-3xl sm:text-4xl font-normal text-[#0A0A0A]">
                {division.highlightMetric.value}
              </div>
              <p className="text-xs text-[#767676]">{division.highlightMetric.label}</p>
            </div>

            <div className="md:col-span-6 flex flex-col justify-end space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onInquire(division.id);
                }}
                className="w-full bg-[#0A0A0A] text-[#F4F3EF] py-3.5 text-xs font-mono tracking-widest uppercase hover:bg-[#767676] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>COMMISSION {division.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
