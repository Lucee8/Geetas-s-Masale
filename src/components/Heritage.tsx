/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Anchor, Compass, Heart } from 'lucide-react';

export default function Heritage() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate parallax factor for image translation
  const yBg = useTransform(scrollYProgress, [0, 1], [-90, 90]);

  return (
    <section
      id="heritage"
      ref={containerRef}
      className="relative h-[650px] flex items-center justify-center overflow-hidden bg-[#A61B1B] text-white"
    >
      {/* Background Parallax Coast Card */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-x-0 -top-40 -bottom-40 z-0 opacity-45"
      >
        <img
          src="/src/assets/images/konkan_coast_1780594634904.png"
          alt="Malvan Coastline Heritage view"
          className="w-full h-full object-cover filter saturate-[1.1] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Soft shadow gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#A61B1B] via-transparent to-[#A61B1B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#A61B1B]/85 via-transparent to-[#A61B1B]/85" />
      </motion.div>

      {/* Decorative center grid elements */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-white/20" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-white/20" />

      {/* Core emotional writing overlay card */}
      <div className="relative z-25 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex p-4 rounded-full bg-white/10 border border-white/25 text-white shadow-lg mb-2"
        >
          <Anchor className="w-8 h-8 animate-pulse" />
        </motion.div>

        <div className="space-y-4">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs sm:text-sm tracking-[0.3em] font-medium text-rose-100 uppercase"
          >
            THE TASTE OF KONKAN HERITAGE
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white leading-none"
          >
            Celebrate the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-white">
              Culinary Spirit of Malvan
            </span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/95 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed font-sans"
        >
          Deep in the heart of Maharashtra’s stunning Konkan coastline lies Malvan: a historic, wave-washed kingdom famed for its sweeping sea forts, pristine palm forests, and an unforgettable culinary legacy. The local cuisine is a celebration of fire and coconut—of red Sankeshwari chillies hand-roasted in earthenware griddles, blended with rich ground coconut paste, and sharpened by Kokum fruit rinds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-rose-100/90 font-mono tracking-wider uppercase"
        >
          <span className="flex items-center space-x-1.5 bg-black/30 px-3.5 py-2 rounded-full border border-white/10">
            <Heart className="w-4 h-4 text-[#A61B1B] fill-current" />
            <span>Spicy Sea Breezes</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-black/30 px-3.5 py-2 rounded-full border border-white/10">
            <Compass className="w-4 h-4 text-rose-200" />
            <span>Time-Tested Coastal Sourcing</span>
          </span>
        </motion.div>

      </div>
    </section>
  );
}
