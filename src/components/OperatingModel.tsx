import React from 'react';
import { OPERATING_STEPS } from '../data';

export const OperatingModel: React.FC = () => {
  return (
    <section
      id="operating-model"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-[#D5D4CF]"
    >
      {/* Header */}
      <div className="pb-12 sm:pb-16 border-b border-[#D5D4CF]">
        <div className="text-[11px] font-mono tracking-widest text-[#767676] uppercase mb-4">
          05 / OPERATING MODEL
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0A0A0A] leading-[1.1]">
          FROM IDEA TO <span className="font-editorial-italic font-normal text-4xl sm:text-6xl lg:text-7xl">OPERATION.</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#767676] max-w-xl font-light leading-relaxed">
          How NEXSUS coordinates specialist capability from initial observation through practical market execution.
        </p>
      </div>

      {/* Four Steps Horizontal Grid with Thin Dividers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#D5D4CF] pt-6 sm:pt-10">
        {OPERATING_STEPS.map((step) => (
          <div
            key={step.number}
            className="py-8 md:py-0 md:px-6 lg:px-8 first:pl-0 last:pr-0 space-y-6 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono tracking-widest text-[#767676] mb-4">
                PHASE / {step.number}
              </div>

              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#0A0A0A] mb-3">
                {step.title}
              </h3>

              <div className="text-sm font-medium text-[#0A0A0A] mb-3 leading-snug">
                {step.headline}
              </div>

              <p className="text-xs sm:text-sm text-[#767676] font-light leading-relaxed mb-6">
                {step.description}
              </p>
            </div>

            {/* Sub-aspects tags */}
            <div className="pt-4 border-t border-[#D5D4CF]/60 space-y-1.5">
              {step.aspects.map((aspect, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] font-mono text-[#767676]">
                  <span className="w-1 h-1 bg-[#767676] inline-block" />
                  <span>{aspect}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
