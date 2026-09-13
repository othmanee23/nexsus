import React from 'react';
import { LEADERSHIP } from '../data';
import { Leader } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface LeadershipProps {
  onSelectLeader: (leader: Leader) => void;
}

export const LeadershipSection: React.FC<LeadershipProps> = ({ onSelectLeader }) => {
  return (
    <section
      id="leadership"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-[#D5D4CF]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#D5D4CF]">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-[#767676] uppercase mb-4">
            07 / LEADERSHIP &amp; GOVERNANCE
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0A0A0A] leading-[1.1]">
            Executive <span className="font-editorial-italic font-normal text-4xl sm:text-6xl lg:text-7xl">direction.</span>
          </h2>
        </div>

        <p className="text-sm text-[#767676] max-w-md font-light leading-relaxed">
          Led by multidisciplinary practitioners uniting capital allocation, creative excellence, and full-stack technical mastery.
        </p>
      </div>

      {/* Leadership Editorial Grid */}
      <div className="pt-12 sm:pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {LEADERSHIP.map((leader) => (
          <div
            key={leader.id}
            onClick={() => onSelectLeader(leader)}
            className="group cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Portrait Frame */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE9E4] mb-6">
                <img
                  src={leader.image}
                  alt={leader.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-[#F4F3EF] text-[#0A0A0A] text-xs font-mono tracking-widest px-4 py-2 flex items-center gap-2">
                    <span>VIEW PROFILE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Leader Meta */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-normal tracking-tight text-[#0A0A0A] group-hover:text-[#767676] transition-colors">
                    {leader.name}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#767676] group-hover:text-[#0A0A0A] transition-colors" />
                </div>

                <div className="text-xs font-mono tracking-wider text-[#0A0A0A] font-medium">
                  {leader.role}
                </div>

                {leader.secondaryRole && (
                  <div className="text-[11px] font-mono tracking-wider text-[#767676]">
                    {leader.secondaryRole}
                  </div>
                )}

                <p className="text-sm text-[#767676] font-light leading-relaxed pt-2">
                  {leader.bio}
                </p>
              </div>
            </div>

            {/* Focus points */}
            <div className="pt-6 mt-6 border-t border-[#D5D4CF]/60 flex flex-wrap gap-1.5">
              {leader.focus.slice(0, 3).map((f, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono text-[#767676] bg-[#FFFFFF] px-2 py-1 border border-[#D5D4CF]"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
