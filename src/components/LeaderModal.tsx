import React from 'react';
import { motion } from 'motion/react';
import { Leader } from '../types';
import { X, ArrowRight } from 'lucide-react';

interface LeaderModalProps {
  leader: Leader | null;
  onClose: () => void;
  onInquire: () => void;
}

export const LeaderModal: React.FC<LeaderModalProps> = ({
  leader,
  onClose,
  onInquire,
}) => {
  if (!leader) return null;

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
        className="relative w-full max-w-2xl bg-[#F4F3EF] border border-[#D5D4CF] shadow-2xl z-10 my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 text-[#767676] hover:text-[#0A0A0A] transition-colors cursor-pointer"
          aria-label="Close profile"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 aspect-square overflow-hidden bg-[#EAE9E4] shrink-0 border border-[#D5D4CF]">
              <img
                src={leader.image}
                alt={leader.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-105"
              />
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="text-[11px] font-mono tracking-widest text-[#767676] uppercase">
                EXECUTIVE DOSSIER
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#0A0A0A]">
                {leader.name}
              </h3>
              <p className="text-xs font-mono font-medium text-[#0A0A0A]">
                {leader.role}
              </p>
              {leader.secondaryRole && (
                <p className="text-[11px] font-mono text-[#767676]">
                  {leader.secondaryRole}
                </p>
              )}
              <p className="text-[10px] font-mono text-[#767676] pt-1">
                LOCATION: {leader.location}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#D5D4CF]">
            <h4 className="text-xs font-mono tracking-widest text-[#767676] uppercase">
              EXECUTIVE PROFILE &amp; CHARTER
            </h4>
            <p className="text-base text-[#0A0A0A] font-light leading-relaxed">
              {leader.bio}
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#D5D4CF]">
            <h4 className="text-xs font-mono tracking-widest text-[#767676] uppercase">
              AREAS OF OVERSIGHT
            </h4>
            <div className="flex flex-wrap gap-2">
              {leader.focus.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono text-[#0A0A0A] bg-[#FFFFFF] px-3 py-1.5 border border-[#D5D4CF]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#D5D4CF]">
            <button
              onClick={() => {
                onClose();
                onInquire();
              }}
              className="w-full bg-[#0A0A0A] text-[#F4F3EF] py-3.5 text-xs font-mono tracking-widest uppercase hover:bg-[#767676] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>INITIATE EXECUTIVE CORRESPONDENCE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
