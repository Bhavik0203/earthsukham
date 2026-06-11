"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Godrej Township",
    location: "Pune",
    type: "2 & 3 Bed Residences",
    category: "Residences & Townships",
    price: "₹60L - ₹2Cr",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    status: "New Launches"
  },
  {
    id: 2,
    title: "Lodha Splendora",
    location: "Thane",
    type: "3 & 4 Bed Residences",
    category: "Luxury Apartments",
    price: "₹1.5Cr - ₹3.5Cr",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
    status: "Ready Possession"
  },
  {
    id: 3,
    title: "Prestige City",
    location: "Bangalore",
    type: "1, 2 & 3 Bed Residences",
    category: "Smart Township",
    price: "₹45L - ₹1.2Cr",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800",
    status: "New Launches"
  }
];

const TABS = ["View All Projects", "New Launches", "Ready Possession"];

export default function OngoingProjects() {
  const [activeTab, setActiveTab] = useState("View All Projects");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProjects = PROJECTS.filter(p => 
    activeTab === "View All Projects" ? true : p.status === activeTab
  );

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0];

  const handleNext = () => {
    if (filteredProjects.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    }
  };

  const handlePrev = () => {
    if (filteredProjects.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12  border-t border-gray-200/60">
      <div className="space-y-2 mb-6">
         <span className="text-sm font-serif uppercase tracking-widest font-semibold text-[#C19B54]">Projects Status</span>
          <h2 className="text-5xl lg:text-6xl font-serif text-[#2C2C2C] leading-[1.15]">
             Ongoing & Upcoming Projects</h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`text-xs font-medium px-4 py-2 rounded-sm transition ${
              activeTab === tab
                ? "bg-[#8A6E3D] text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Interactive Carousel Block Layout */}
      {filteredProjects.length > 0 ? (
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center  p-6 md:p-10 rounded-lg">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 md:left-4 z-10 p-2 text-gray-400 hover:text-[#8A6E3D] transition"
          >
            <ChevronLeft size={36} strokeWidth={1} />
          </button>

          {/* Content Block */}
          <div className="md:col-span-5 space-y-4 md:pl-8">
            <h3 className="text-5xl lg:text-6xl font-serif text-[#C49A45]">{currentProject.title}</h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 uppercase font-semibold tracking-wider">
              <MapPin size={14} className="text-[#C49A45]" /> {currentProject.location}
            </div>
            <div className="flex items-baseline gap-6 pt-2">
              <div>
                <p className="text-sm font-bold text-gray-800">{currentProject.type}</p>
                <p className="text-xs text-gray-400">{currentProject.category}</p>
              </div>
              <div className="text-lg font-bold text-gray-800">
                {currentProject.price}
              </div>
            </div>
          </div>

          {/* Dynamic Showcase Feature Image */}
          <div className="md:col-span-7 overflow-hidden rounded-md shadow-md h-[300px] relative">
            <img 
              key={currentProject.id}
              src={currentProject.image} 
              alt={`${currentProject.title} Showcase View`} 
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-4 z-10 p-2 text-gray-400 hover:text-[#8A6E3D] transition"
          >
            <ChevronRight size={36} strokeWidth={1} />
          </button>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No projects found in this category.
        </div>
      )}
    </section>
  );
}