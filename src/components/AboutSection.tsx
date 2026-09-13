import React from 'react';
import { motion } from 'motion/react';
import { NeuralSphere } from './NeuralSphere';

interface AboutSectionProps {
  onOpenContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section
      id="about"
      className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-28 border-t border-black/10 bg-white select-none overflow-hidden"
    >
      <div className="w-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Top Layer Label + Neural Particle Sphere in Black Box */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full min-h-[380px] sm:min-h-[460px]">
          {/* Section Category Identifier */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-sans font-medium tracking-wider uppercase text-black"
          >
            02 — ABOUT NEXSUS
          </motion.div>

          {/* Glowing Neural Particle Sphere Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px] aspect-square bg-black p-3 sm:p-4 overflow-hidden mt-8 lg:mt-auto shadow-sm"
          >
            <NeuralSphere />
          </motion.div>
        </div>

        {/* Right Column: Global Data Headline + 2 Column Narrative + Metric Rows */}
        <div className="lg:col-span-8 flex flex-col justify-start">
          {/* Main Display Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-black uppercase leading-[1.08]"
          >
            CROSS-DISCIPLINARY
            <br />
            OPERATING MATRIX
          </motion.h2>

          {/* 2-Column Editorial Manifesto */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-xs sm:text-sm text-black/80 font-sans leading-relaxed">
            {/* Left Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                NEXSUS operates at the nexus of brand culture, built environment, computational
                architecture, and long-term capital allocation. Rather than fragmenting intent
                across isolated agencies, our unified operating model eliminates the distance
                between strategic vision and material execution.
              </p>
            </motion.div>

            {/* Right Paragraph: Philosophy of Action */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 text-black/75"
            >
              <p>
                <strong className="text-black font-medium">Permanence Over Noise</strong> —
                Market trends dissipate and hype cycles fade, but enduring enterprise value is
                rooted in architectural rigor and operational substance. Every venture, physical
                space, and computational platform we construct is engineered to outlast cyclical
                disruption.
              </p>
              <p>
                <strong className="text-black font-medium">Precision in Execution</strong> —
                Ideas reveal their truth only when shaped, engineered, and deployed. We partner
                with sovereign enterprises to build enduring institutions defined by uncompromised
                craftsmanship.
              </p>
            </motion.div>
          </div>

          {/* Metrics & Capabilities Data Rows */}
          <div className="mt-12 sm:mt-16 border-t border-black/10">
            {[
              {
                title: 'CORE OPERATING DIVISIONS',
                desc: 'Amaris • Projects • Tech • Ventures',
              },
              {
                title: 'HEADQUARTERS & GEOGRAPHIC REACH',
                desc: 'Casablanca, Morocco • Global Mandates',
              },
              {
                title: 'CAPITAL GOVERNANCE & STRUCTURE',
                desc: '100% Sovereign & Independent',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 * idx,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 border-b border-black/10 text-xs sm:text-sm gap-1"
              >
                <span className="font-medium tracking-wider uppercase text-black">
                  {item.title}
                </span>
                <span className="font-mono text-black/80 tracking-wide">
                  {item.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
