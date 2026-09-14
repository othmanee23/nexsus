import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NexsusLogo } from './NexsusLogo';

interface LoadingScreenProps {
  onComplete?: () => void;
  durationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  durationMs = 1800,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll during intro loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Progress counter
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / durationMs) * 100), 100);
      setProgress(currentProgress);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        setIsVisible(false);
        setTimeout(() => {
          document.body.style.overflow = originalOverflow;
          onComplete?.();
        }, 800); // match exit transition duration
      }
    }, 24);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow;
    };
  }, [durationMs, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center select-none overflow-hidden"
          onClick={() => setIsVisible(false)} // allow instant skip
        >
          {/* Subtle architectural grid lines for depth */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Centered Logo with Cinematic Intro and Zoom-Out Exit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            exit={{
              scale: 0.72,
              opacity: 0,
              y: -20,
              transition: {
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="flex flex-col items-center justify-center px-6 sm:px-12 w-full max-w-4xl"
          >
            {/* Nexsus Wordmark Logo */}
            <div className="w-full flex items-center justify-center py-4">
              <NexsusLogo className="w-full max-w-[280px] sm:max-w-[480px] md:max-w-[620px] h-auto object-contain" />
            </div>

            {/* Minimalist Progress Indicator */}
            <div className="w-full max-w-[220px] sm:max-w-[320px] mt-8 flex flex-col items-center gap-3">
              {/* Hairline Progress Bar */}
              <div className="w-full h-[1px] bg-black/10 overflow-hidden relative">
                <motion.div
                  className="h-full bg-black origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>

              {/* Monospace Metadata & Percentage */}
              <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-black/40 uppercase">
                <span>TEMARA</span>
                <span>{progress}%</span>
              </div>
            </div>
          </motion.div>

          {/* Subtle Bottom Instruction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute bottom-8 text-[10px] tracking-widest uppercase font-mono text-black/40"
          >
            NEXSUS PROJECT SARL • 2025
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
