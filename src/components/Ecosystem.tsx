import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DIVISIONS } from '../data';
import { EcosystemDivision } from '../types';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface EcosystemProps {
  onSelectDivision: (division: EcosystemDivision) => void;
}

export const Ecosystem: React.FC<EcosystemProps> = ({ onSelectDivision }) => {
  const [activeDivisionId, setActiveDivisionId] = useState<string>('amaris');

  const amaris = DIVISIONS.find((d) => d.id === 'amaris')!;
  const projects = DIVISIONS.find((d) => d.id === 'projects')!;
  const technology = DIVISIONS.find((d) => d.id === 'technology')!;
  const ventures = DIVISIONS.find((d) => d.id === 'ventures')!;

  return (
    <section
      id="ecosystem"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-[#D5D4CF]"
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#D5D4CF]">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-[#767676] uppercase mb-4">
            03 / THE NEXSUS ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0A0A0A] leading-[1.1]">
            Four disciplines. <br />
            One <span className="font-editorial-italic font-normal text-4xl sm:text-6xl lg:text-7xl">operating group.</span>
          </h2>
        </div>

        <p className="text-sm text-[#767676] max-w-md font-light leading-relaxed">
          Integrated capabilities operating either independently or in concert to build enduring assets across physical and digital frontiers.
        </p>
      </div>

      {/* Dynamic Editorial Layout */}
      <div className="pt-12 sm:pt-16 space-y-12 sm:space-y-16">
        {/* ===================================================================
            DIVISION 01: AMARIS (Full-Width Visual Hero Block)
           =================================================================== */}
        <div
          id="division-amaris-block"
          onMouseEnter={() => setActiveDivisionId('amaris')}
          className="group relative bg-[#FFFFFF] border border-[#D5D4CF] p-8 sm:p-12 lg:p-16 transition-all duration-300 hover:border-[#0A0A0A]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-[#767676]">
                  DIVISION 01 / CREATIVE DEPARTMENT
                </span>
                <span className="text-xs font-mono text-[#0A0A0A] px-2 py-0.5 bg-[#F4F3EF] border border-[#D5D4CF]">
                  AMARIS
                </span>
              </div>

              {/* Distinctive Brand Lockup */}
              <div className="py-2">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0A0A0A]">
                  amaris
                </div>
                <div className="text-xs font-mono tracking-wider text-[#767676] pt-1">
                  from nexsus™
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#0A0A0A] font-light leading-relaxed">
                {amaris.description}
              </p>

              {/* Services pills */}
              <div className="pt-2">
                <div className="text-[10px] font-mono tracking-widest text-[#767676] uppercase mb-3">
                  CORE CAPABILITIES
                </div>
                <div className="flex flex-wrap gap-2">
                  {amaris.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-light text-[#0A0A0A] bg-[#F4F3EF] px-3 py-1.5 border border-[#D5D4CF]"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  id="explore-amaris-btn"
                  onClick={() => onSelectDivision(amaris)}
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#0A0A0A] hover:text-[#767676] transition-colors cursor-pointer group/btn"
                >
                  <span className="border-b border-[#0A0A0A] pb-0.5 group-hover/btn:border-[#767676]">
                    {amaris.ctaText}
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#F4F3EF]">
              <img
                src={amaris.image}
                alt="AMARIS Creative Department"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-[#F4F3EF] bg-[#0A0A0A]/70 backdrop-blur-sm px-3 py-2">
                <span>AMARIS FILM &amp; BRAND STUDIO</span>
                <span>FIG 01.1</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            TWO-COLUMN SPLIT: PROJECTS & TECHNOLOGY
           =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* DIVISION 02: PROJECTS */}
          <div
            id="division-projects-block"
            onMouseEnter={() => setActiveDivisionId('projects')}
            className="group relative bg-[#FFFFFF] border border-[#D5D4CF] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#0A0A0A]"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D5D4CF]">
                <span className="text-xs font-mono tracking-widest text-[#767676]">
                  DIVISION 02
                </span>
                <span className="text-xs font-mono tracking-widest text-[#0A0A0A]">
                  BUILT ENVIRONMENT
                </span>
              </div>

              <div className="py-6 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#0A0A0A]">
                  PROJECTS
                </h3>
                <p className="text-sm sm:text-base text-[#767676] font-light leading-relaxed">
                  {projects.description}
                </p>
              </div>

              {/* Visual Frame */}
              <div className="my-4 aspect-[16/10] overflow-hidden bg-[#F4F3EF]">
                <img
                  src={projects.image}
                  alt="NEXSUS Projects Architecture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>

              {/* Services List */}
              <div className="pt-4 pb-6 border-t border-[#D5D4CF] space-y-2">
                <div className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">
                  DELIVERY DISCIPLINES
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-light text-[#0A0A0A]">
                  {projects.services.slice(0, 4).map((srv, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#0A0A0A] inline-block" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D5D4CF]">
              <button
                id="explore-projects-btn"
                onClick={() => onSelectDivision(projects)}
                className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#0A0A0A] hover:text-[#767676] transition-colors cursor-pointer group/btn"
              >
                <span className="border-b border-[#0A0A0A] pb-0.5 group-hover/btn:border-[#767676]">
                  {projects.ctaText}
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* DIVISION 03: TECHNOLOGY & SOLUTIONS */}
          <div
            id="division-technology-block"
            onMouseEnter={() => setActiveDivisionId('technology')}
            className="group relative bg-[#FFFFFF] border border-[#D5D4CF] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#0A0A0A]"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D5D4CF]">
                <span className="text-xs font-mono tracking-widest text-[#767676]">
                  DIVISION 03
                </span>
                <span className="text-xs font-mono tracking-widest text-[#0A0A0A]">
                  DIGITAL INFRASTRUCTURE
                </span>
              </div>

              <div className="py-6 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#0A0A0A]">
                  TECHNOLOGY &amp; SOLUTIONS
                </h3>
                <p className="text-sm sm:text-base text-[#767676] font-light leading-relaxed">
                  {technology.description}
                </p>
              </div>

              {/* Visual Frame */}
              <div className="my-4 aspect-[16/10] overflow-hidden bg-[#F4F3EF]">
                <img
                  src={technology.image}
                  alt="Technology & Solutions Data Systems"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>

              {/* Services List */}
              <div className="pt-4 pb-6 border-t border-[#D5D4CF] space-y-2">
                <div className="text-[10px] font-mono tracking-widest text-[#767676] uppercase">
                  SOFTWARE &amp; ARCHITECTURE
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-light text-[#0A0A0A]">
                  {technology.services.slice(0, 4).map((srv, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#0A0A0A] inline-block" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D5D4CF]">
              <button
                id="explore-technology-btn"
                onClick={() => onSelectDivision(technology)}
                className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#0A0A0A] hover:text-[#767676] transition-colors cursor-pointer group/btn"
              >
                <span className="border-b border-[#0A0A0A] pb-0.5 group-hover/btn:border-[#767676]">
                  {technology.ctaText}
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================================
            DIVISION 04: VENTURES (Full-Width Horizontal Block)
           =================================================================== */}
        <div
          id="division-ventures-block"
          onMouseEnter={() => setActiveDivisionId('ventures')}
          className="group relative bg-[#FFFFFF] border border-[#D5D4CF] p-8 sm:p-12 lg:p-16 transition-all duration-300 hover:border-[#0A0A0A]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Visual */}
            <div className="order-2 lg:order-1 lg:col-span-5 aspect-[16/11] overflow-hidden bg-[#F4F3EF]">
              <img
                src={ventures.image}
                alt="NEXSUS Ventures"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>

            {/* Right Information */}
            <div className="order-1 lg:order-2 lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-[#767676]">
                  DIVISION 04 / BUSINESSES &amp; INVESTMENTS
                </span>
                <span className="text-xs font-mono text-[#0A0A0A] px-2 py-0.5 bg-[#F4F3EF] border border-[#D5D4CF]">
                  PERMANENT CAPITAL
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0A0A0A]">
                VENTURES
              </h3>

              <p className="text-base sm:text-lg text-[#0A0A0A] font-light leading-relaxed">
                {ventures.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {ventures.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="text-xs font-light text-[#0A0A0A] bg-[#F4F3EF] px-3 py-2 border border-[#D5D4CF]"
                  >
                    {srv}
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  id="explore-ventures-btn"
                  onClick={() => onSelectDivision(ventures)}
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#0A0A0A] hover:text-[#767676] transition-colors cursor-pointer group/btn"
                >
                  <span className="border-b border-[#0A0A0A] pb-0.5 group-hover/btn:border-[#767676]">
                    {ventures.ctaText}
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
