"use client";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Expanded array of images so the lightbox has a few extras to scroll through
  const images = [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200", // large
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200", // topRight
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1200", // bottomRight1
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200", // bottomRight2
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200", // extra
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200", // extra
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200", // extra
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative">
      {/* Headings */}
      <div className="space-y-1 mb-8">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A3D]">Gallery</span>
        <h2 className="text-3xl font-serif text-[#2C2C2C]">Project Gallery</h2>
      </div>

      {/* Structural Grid Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left Side Large Landscape Feature Block */}
        <div 
          onClick={() => setSelectedIndex(0)}
          className="md:col-span-6 h-[320px] md:h-[420px] rounded-lg overflow-hidden shadow-xs cursor-pointer group relative"
        >
          <img src={images[0]} alt="Project Exterior View" className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Right Side Nested Grid Array */}
        <div className="md:col-span-6 flex flex-col gap-4">
          {/* Top Wide Card */}
          <div 
            onClick={() => setSelectedIndex(1)}
            className="h-[150px] md:h-[200px] rounded-lg overflow-hidden shadow-xs cursor-pointer group relative"
          >
            <img src={images[1]} alt="Facade details" className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Bottom Row Twin Cards Split */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div 
              onClick={() => setSelectedIndex(2)}
              className="h-[150px] md:h-[204px] rounded-lg overflow-hidden shadow-xs cursor-pointer group relative"
            >
              <img src={images[2]} alt="Tower Structure" className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Final Image tile with transparent count overlay block */}
            <div 
              onClick={() => setSelectedIndex(3)}
              className="h-[150px] md:h-[204px] rounded-lg overflow-hidden shadow-xs relative group cursor-pointer"
            >
              <img src={images[3]} alt="Additional views" className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center" />
              <span className="absolute inset-0 flex items-center justify-center text-white text-3xl font-serif font-medium tracking-wide drop-shadow-md">
                10+
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white p-2 transition-colors z-50"
            aria-label="Close gallery"
          >
            <X size={36} strokeWidth={1.5} />
          </button>

          {/* Prev Button */}
          <button 
            onClick={handlePrev} 
            className="absolute left-2 md:left-8 text-white/70 hover:text-white p-4 transition-colors z-50 group"
            aria-label="Previous image"
          >
            <ChevronLeft size={48} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={images[selectedIndex]} 
              alt="Gallery Preview" 
              className="max-w-full max-h-full object-contain rounded-sm shadow-2xl transition-opacity duration-300"
            />
            {/* Image Counter */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest font-medium">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next Button */}
          <button 
            onClick={handleNext} 
            className="absolute right-2 md:right-8 text-white/70 hover:text-white p-4 transition-colors z-50 group"
            aria-label="Next image"
          >
            <ChevronRight size={48} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
}