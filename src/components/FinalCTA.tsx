import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenContact: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenContact }) => {
  return (
    <section
      id="cta"
      className="py-28 sm:py-44 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-[#D5D4CF]"
    >
      <div className="max-w-4xl space-y-8">
        <div className="text-[11px] font-mono tracking-widest text-[#767676] uppercase">
          HAVE A PROJECT, BUSINESS OR OPPORTUNITY?
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-normal tracking-tight text-[#0A0A0A] leading-[1.05]">
          Let's <span className="font-editorial-italic font-normal text-5xl sm:text-7xl lg:text-9xl">talk.</span>
        </h2>

        <p className="text-base sm:text-xl text-[#767676] font-light max-w-2xl leading-relaxed">
          Whether you require turnkey creative production with AMARIS, built-environment execution with PROJECTS, digital infrastructure, or institutional venture alignment.
        </p>

        <div className="pt-4">
          <button
            id="cta-start-conversation-btn"
            onClick={onOpenContact}
            className="inline-flex items-center gap-3 bg-[#0A0A0A] text-[#F4F3EF] px-8 py-4 text-xs font-medium tracking-[0.16em] uppercase hover:bg-[#767676] transition-colors cursor-pointer group"
          >
            <span>START A CONVERSATION</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
