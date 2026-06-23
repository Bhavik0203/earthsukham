"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const achievementItems = [
  {
    id: ".01",
    title: "Real Estate",
    description: "Lorem Ipsum is simply dummy text of the printing and dummy text of the printing industry Lorem Ipsum.",
    image: "/images/achievement_real_estate.png",
  },
  {
    id: ".02",
    title: "Educational Accomplishments",
    description: "Lorem Ipsum is simply dummy text of the printing and dummy text of the printing industry Lorem Ipsum.",
    image: "/images/achievement_education.png",
  },
  {
    id: ".03",
    title: "Real Estate",
    description: "Lorem Ipsum is simply dummy text of the printing and dummy text of the printing industry Lorem Ipsum.",
    image: "/images/achievement_commercial.png",
  },
];

export default function Achievements() {
  const [activeItem, setActiveItem] = useState(1); // Default active to the middle index match (.02)

  return (
    <section className="relative w-full py-24 px-6 sm:px-12 lg:px-20 min-h-screen flex flex-col justify-center bg-gradient-to-br from-[#b08836] via-[#916d26] to-[#594212] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header Top Left Alignment */}
        <div className="mb-14 flex flex-col">
          <span className="text-amber-200/70 text-sm font-medium tracking-wide mb-2 font-serif">
            Achievements
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-white font-serif tracking-tight">
            Achievements
          </h2>
        </div>

        {/* Stack Block Container Rows */}
        <div className="w-full flex flex-col gap-5 relative z-10">
          {achievementItems.map((item, index) => {
            const isActive = activeItem === index;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveItem(index)}
                onClick={() => setActiveItem(index)}
                className={`relative w-full rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#FAF6F0] text-zinc-900 shadow-xl"
                    : "bg-transparent text-white hover:bg-white/5"
                }`}
              >
                
                {/* Left Side Content Segment: Circular Button Indicator + Paragraph Description */}
                <div className="flex items-center gap-6 max-w-xl flex-1">
                  {/* Styled Circular Action Target Toggle Button */}
                  <div
                    className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${
                      isActive ? "bg-[#C5A880] text-white" : "bg-white text-[#916d26]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        isActive ? "rotate-0" : "rotate-45"
                      }`}
                    >
                      {isActive ? (
                        <line x1="19" y1="12" x2="5" y2="12" />
                      ) : (
                        <>
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </>
                      )}
                    </svg>
                  </div>

                  {/* Description Box text block layout styling */}
                  <p
                    className={`text-sm leading-relaxed tracking-wide font-light ${
                      isActive ? "text-zinc-700" : "text-amber-100/80"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Right Side Content Segment: Row Title Layout and Index Numbers */}
                <div className="flex items-center justify-end gap-4 min-w-[240px] text-right self-end md:self-auto ml-18 md:ml-0 relative">
                  
                  {/* Floating collage frame matching the active item */}
                  <AnimatePresence>
                    {isActive && item.image && (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.85, rotate: -15, y: "-40%" }}
                        animate={{ opacity: 1, scale: 1, rotate: -8, y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.85, rotate: -15, y: "-40%" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute right-[250px] top-1/2 w-52 h-32 hidden lg:block shadow-2xl rounded-2xl overflow-hidden bg-zinc-800 border-4 border-white/95 z-20 hover:rotate-0 transition-transform duration-300"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <h3
                    className={`text-xl sm:text-2xl font-normal font-serif tracking-tight max-w-[200px] leading-tight ${
                      isActive ? "text-zinc-950" : "text-white"
                    }`}
                  >
                    {item.title}
                  </h3>
                  
                  <span
                    className={`text-3xl md:text-4xl font-bold font-serif tracking-tight ml-2 ${
                      isActive ? "text-[#C5A880]" : "text-white"
                    }`}
                  >
                    {item.id}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}