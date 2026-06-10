"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    date: "22 January 2025",
    text: "Clear claim transferred my physical shares within given time,professional, very prompt, overall a hassle-free experience, I highly recommend I highly recommend.",
    name: "Yash Kale",
  },
  {
    id: 2,
    date: "22 January 2025",
    text: "Very reliable, gives personal attention & above all, very reasonable charges. I have given them shares which are in IEPF for transferring into my demat account. At present after completing all documentation by them the matter is with IEPF for their clearance. My Best Wishes to Shrikant and his team.",
    name: "Vinayak Gaitonde",
  },
  {
    id: 3,
    date: "12 January 2025",
    text: "Clear claim transferred my physical shares within given time,professional, very prompt, overall a hassle-free experience, I highly recommend I highly recommend.",
    name: "Samraj Gaitonde",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 5 seconds, paused on hover
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const getVisibleReviews = () => {
    const prevIndex = (activeIndex - 1 + REVIEWS.length) % REVIEWS.length;
    const nextIndex = (activeIndex + 1) % REVIEWS.length;
    
    // Always return 3 items: previous, active, next
    return [
      { ...REVIEWS[prevIndex], isActive: false },
      { ...REVIEWS[activeIndex], isActive: true },
      { ...REVIEWS[nextIndex], isActive: false },
    ];
  };

  return (
    <section 
      className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-[#FBF9F4]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Title Header */}
      <div className="space-y-2 mb-12">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A3D]">Testimonials</span>
        <h2 className="text-3xl font-serif text-[#2C2C2C]">What Our Clients Say</h2>
      </div>

      {/* Main Row Assembly */}
      <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto">
        
        {/* Left Arrow Trigger */}
        <button 
          onClick={handlePrev}
          className="bg-[#CC9A3B] hover:bg-[#B38530] text-white p-2.5 rounded-full transition shadow-md shrink-0"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-center">
          {getVisibleReviews().map((rev) => {
            const isActive = rev.isActive;
            return (
              <div
                key={rev.id}
                className={`rounded-xl p-6 transition-all duration-300 flex flex-col justify-between h-full min-h-[250px] shadow-xl ${
                  isActive
                    ? "bg-gradient-to-b from-[#CC9A3B] to-[#5C4314] text-white md:scale-105 z-10 border border-amber-600/20"
                    : "bg-white text-gray-700 hidden md:flex border border-gray-100"
                }`}
              >
                {/* Card Meta Content */}
                <div>
                  <span className={`block text-right text-[10px] font-medium mb-3 transition-colors duration-300 ${isActive ? "text-white/80" : "text-gray-400"}`}>
                    {rev.date}
                  </span>
                  <p className={`text-xs leading-relaxed font-light transition-colors duration-300 ${isActive ? "text-white" : "text-gray-600"}`}>
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Footer Identity */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t transition-colors duration-300 border-black/5 dark:border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden shrink-0">
                    <div className="w-full h-full bg-slate-400 flex items-center justify-center text-white text-[10px] font-bold uppercase">
                      {rev.name.charAt(0)}
                    </div>
                  </div>
                  <span className={`text-xs font-semibold tracking-wide transition-colors duration-300 ${isActive ? "text-white" : "text-gray-800"}`}>
                    {rev.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Trigger */}
        <button 
          onClick={handleNext}
          className="bg-[#CC9A3B] hover:bg-[#B38530] text-white p-2.5 rounded-full transition shadow-md shrink-0"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}