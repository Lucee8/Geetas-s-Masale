/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, Layers, ShoppingCart, Headphones, ArrowDown, ChevronRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onWhatsAppClick: () => void;
}

export default function Hero({ onExploreClick, onWhatsAppClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#FAF9F6] pt-28 md:pt-36 pb-12"
    >
      {/* Subtle Warm Ambiance Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D21F1F]/5 blur-[130px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#A61B1B]/5 blur-[120px]" />
      </div>

      {/* Main Container tailored perfectly for brand representation and clear description details */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Authentic store label badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#A61B1B]/10 border border-[#A61B1B]/20 text-[#A61B1B] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ESTABLISHED KASAL STORE</span>
          </div>

          {/* Heading */}
          <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0F172A] leading-[1.1] uppercase max-w-4xl mx-auto">
            AUTHENTIC <span className="text-[#A61B1B]">MALVANI MASALAS</span> <br />
            <span className="text-slate-600 text-3xl sm:text-5xl md:text-6xl block mt-2 font-black">& KONKAN MEVA</span>
          </h1>

          {/* Warm professional description */}
          <p className="text-gray-500 text-sm sm:text-base font-normal font-sans max-w-2xl mx-auto leading-relaxed">
            Prepared lovingly near Dewoolwada along the Kasal-Malvan national highway. We grind our traditional griddle spices, mill pure healthy grain flours, and select premium coastal raw cashews—keeping the true taste of Maharashtra’s rich coastline alive.
          </p>

          {/* Quick-action buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6.5 py-4.5 rounded-2xl bg-[#A61B1B] text-white hover:bg-red-800 text-xs font-sans font-extrabold tracking-widest uppercase transition-all shadow-lg hover:shadow-red-900/10 active:scale-[0.98] cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>EXPLORE SPICE CATALOG</span>
            </button>

            <button
              onClick={onWhatsAppClick}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6.5 py-4.5 rounded-2xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-sans font-extrabold tracking-widest uppercase transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <Headphones className="w-4 h-4 text-[#A61B1B]" />
              <span>INQUIRE VIA WHATSAPP</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Elegant scroll down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25 hidden md:flex flex-col items-center">
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-[#A61B1B]/40 hover:text-[#A61B1B] cursor-pointer transition-colors p-2"
          onClick={onExploreClick}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </div>
    </section>
  );
}

