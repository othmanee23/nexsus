import React from 'react';
import { motion } from 'motion/react';

export const BrandStatement: React.FC = () => {
  return (
    <section
      id="brand-statement"
      className="py-24 sm:py-36 lg:py-48 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-[#D5D4CF]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left index label */}
        <div className="lg:col-span-3 text-[11px] font-mono tracking-widest text-[#767676] uppercase">
          <span>02 / MANIFESTO</span>
        </div>

        {/* Center / Right big statement */}
        <div className="lg:col-span-9 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-normal tracking-[-0.03em] leading-[1.08] text-[#0A0A0A]">
              Different disciplines. <br />
              One <span className="font-editorial-italic font-normal text-4xl sm:text-6xl lg:text-8xl">direction.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#D5D4CF]">
            <p className="text-base sm:text-lg text-[#0A0A0A] font-light leading-relaxed">
              NEXSUS connects different capabilities around one objective: turning opportunities into meaningful brands, products, environments and businesses.
            </p>
            <p className="text-sm text-[#767676] font-light leading-relaxed">
              Rather than siloing strategy and execution, we coordinate creative direction, architectural delivery, software engineering, and business development around a clear operating scope.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
