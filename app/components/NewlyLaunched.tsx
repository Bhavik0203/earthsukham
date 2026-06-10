"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "LODHA SPLENDORA",
    type: "3 & 4 Bed Residences",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
  },
  {
    id: 2,
    title: "PRESTIGE CITY",
    type: "2 & 3 Bed Residences",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
  },
  {
    id: 3,
    title: "GODREJ TOWNSHIP",
    type: "2 & 3 Bed Residences",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
  },
  {
    id: 4,
    title: "MAHINDRA HAPPINEST",
    type: "1 & 2 Bed Residences",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800",
  },
  {
    id: 5,
    title: "TATA PROMONT",
    type: "3 & 4 Bed Residences",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
  },
];

export default function NewlyLaunched() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // If nothing is hovered, default to the center one (index 2)
  const activeIndex = hoveredIndex !== null ? hoveredIndex : 2;

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Title Header */}
      <div className="space-y-2 mb-10">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A3D]">New Projects</span>
        <h2 className="text-3xl font-serif text-[#2C2C2C]">Newly Launched Projects</h2>
      </div>

      {/* Accordion Layout */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-3 h-[600px] md:h-[400px]">
        {PROJECTS.map((project, idx) => {
          const isActive = activeIndex === idx;
          
          return (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative rounded-lg overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group flex
                ${isActive ? 'flex-[4] shadow-lg' : 'flex-[1] opacity-90 hover:opacity-100'}
              `}
            >
              {/* Background Image */}
              <img 
                src={project.image} 
                alt={project.title} 
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100'}`}
              />
              
              {/* Dark Overlay */}
              <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-black/10' : 'bg-black/50'}`} />
              
              {/* Top Right Arrow */}
              <span className={`absolute top-3 right-3 backdrop-blur-md rounded-full text-white transition-all duration-500
                ${isActive ? 'bg-white/30 p-2 opacity-100' : 'bg-white/20 p-1.5 opacity-0 md:opacity-100'}
              `}>
                <ArrowUpRight size={isActive ? 16 : 14} />
              </span>
              
              {/* Content Overlay - Only fully visible when active */}
              <div className={`absolute bottom-0 left-0 right-0 bg-[#8A6E3D]/95 backdrop-blur-xs px-6 py-4 text-white border-t border-white/10 transition-all duration-500 transform flex flex-col justify-end min-h-[80px]
                ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
              `}>
                <h4 className="font-serif tracking-wider text-sm font-semibold truncate">{project.title}</h4>
                <div className="w-16 h-[1px] bg-white/50 my-1 shrink-0" />
                <p className="text-[10px] text-gray-200 truncate">{project.type}</p>
              </div>

              {/* Vertical Title for inactive state on desktop */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none hidden md:flex
                ${!isActive ? 'opacity-100' : 'opacity-0'}
              `}>
                <h4 className="font-serif tracking-widest text-xs font-semibold text-white -rotate-90 whitespace-nowrap">
                  {project.title}
                </h4>
              </div>
              
              {/* Horizontal Title for inactive state on mobile */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none md:hidden
                ${!isActive ? 'opacity-100' : 'opacity-0'}
              `}>
                <h4 className="font-serif tracking-widest text-xs font-semibold text-white whitespace-nowrap">
                  {project.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}