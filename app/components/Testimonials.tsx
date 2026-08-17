"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  date: string;
  text: string;
  name: string;
  isActive?: boolean;
}

const DUMMY_REVIEWS: Testimonial[] = [
  { id: "1", date: "15 August 2026", text: "Earth Sukham helped me find the perfect home. The entire process was seamless and transparent.", name: "Rahul Sharma" },
  { id: "2", date: "02 July 2026", text: "Exceptional service and beautiful properties. Highly recommended for anyone looking to invest in real estate.", name: "Priya Patel" },
  { id: "3", date: "20 June 2026", text: "The team was very professional. They understood my requirements and showed me the best options available.", name: "Amit Kumar" }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [reviews, setReviews] = useState<Testimonial[]>(DUMMY_REVIEWS);


  // Auto-scroll every 8 seconds, paused on hover
  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const handlePrev = () => {
    if (reviews.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    if (reviews.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];
    
    const prevIndex = (activeIndex - 1 + reviews.length) % reviews.length;
    const nextIndex = (activeIndex + 1) % reviews.length;

    // Always return 3 items: previous, active, next
    return [
      { ...reviews[prevIndex], isActive: false },
      { ...reviews[activeIndex], isActive: true },
      { ...reviews[nextIndex], isActive: false },
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
          {reviews.length > 0 ? getVisibleReviews().map((rev, idx) => {
            const isActive = rev.isActive;
            return (
              <div
                key={`${rev.id}-${idx}`}
                className={`rounded-xl p-6 transition-all duration-300 flex flex-col justify-between h-full min-h-[250px] shadow-xl ${isActive
                    ? "bg-gradient-to-b from-[#CC9A3B] to-[#5C4314] text-white md:scale-105 z-10 border border-amber-600/20"
                    : "bg-white text-gray-700 hidden md:flex border border-gray-100"
                  }`}
              >
                {/* Card Meta Content */}
                <div>
                  <span className={`block text-right text-[10px] font-medium mb-3 transition-colors duration-300 ${isActive ? "text-white/80" : "text-gray-400"}`}>
                    {rev.date}
                  </span>

                  <p className={`text-[13px] md:text-[14px] leading-relaxed transition-colors duration-300 italic mb-6 line-clamp-6 ${isActive ? "text-white/95" : "text-gray-600"}`}>
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px] transition-colors duration-300 ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}>
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`text-[13px] font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-[#2C2C2C]"}`}>
                      {rev.name}
                    </h4>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="col-span-3 text-center py-10 text-gray-500">
              No testimonials available at the moment.
            </div>
          )}
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