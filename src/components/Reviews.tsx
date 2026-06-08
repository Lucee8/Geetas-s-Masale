/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { TESTIMONIALS } from '../data/storeData';

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll effect every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="reviews" className="py-24 bg-[#FAF9F6] text-slate-800 relative overflow-hidden">
      {/* Absolute decorative backdrops */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#A61B1B]/5 to-transparent rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#A61B1B]/5 to-transparent rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-25">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#A61B1B]/10 border border-[#A61B1B]/30 text-[#A61B1B] text-xs font-mono tracking-widest uppercase">
            <Star className="w-4 h-4 text-[#A61B1B] fill-current" />
            <span>COMMUNITY SENTIMENT & RATINGS</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight uppercase">
            Trusted by Cooks <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A61B1B] to-[#D21F1F]">& Food Critics</span>
          </h2>
          <p className="text-gray-500 text-sm font-light font-sans">
            Hear from native Malvanites, Pune foodies, and resort chefs who trust their kitchens with Geeta's Masale.
          </p>
        </div>

        {/* Carousel slide container inside glassmorphism shell */}
        <div className="relative">
          
          <div className="absolute inset-0 bg-[#A61B1B]/5 rounded-3xl blur-xl" />

          {/* Premium Glassmorphism Card */}
          <div className="relative bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/65 min-h-[380px] flex flex-col justify-between">
            <span className="text-6xl text-[#A61B1B]/15 font-serif absolute top-6 left-6 select-none leading-none">“</span>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6 relative z-10"
              >
                {/* 5 Stars display */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: TESTIMONIALS[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>

                {/* Feedback prose */}
                <p className="text-lg sm:text-xl font-sans italic text-slate-800 leading-relaxed font-light">
                  "{TESTIMONIALS[activeIndex].review}"
                </p>

                {/* User author details */}
                <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-[#A61B1B]/10 flex items-center justify-center text-[#A61B1B]">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-base text-slate-800 uppercase tracking-wide">
                      {TESTIMONIALS[activeIndex].name}
                    </h4>
                    <p className="text-xs font-mono text-gray-400 uppercase">
                      Location: {TESTIMONIALS[activeIndex].location}
                    </p>
                  </div>

                  {/* Certified Product Purchased Badge */}
                  <div className="ml-auto hidden sm:block">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#A61B1B]/10 text-[#A61B1B] text-[10px] font-mono uppercase font-black">
                      VERIFIED: {TESTIMONIALS[activeIndex].product}
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls Indicators of bottom */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 relative z-10">
              {/* Dots tracker indicators */}
              <div className="flex items-center space-x-2">
                {TESTIMONIALS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveIndex(dotIdx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === dotIdx ? 'w-8 bg-[#A61B1B]' : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Show testimonial ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Slider Controls Arrows */}
              <div className="flex space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
