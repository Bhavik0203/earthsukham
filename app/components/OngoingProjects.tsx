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
    price: "₹60L-₹2Cr",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    status: "New Launches"
  },
  {
    id: 2,
    title: "Lodha Splendora",
    location: "Thane",
    type: "3 & 4 Bed Residences",
    category: "Luxury Apartments",
    price: "₹1.5Cr-₹3.5Cr",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
    status: "Ready Possession"
  },
  {
    id: 3,
    title: "Prestige City",
    location: "Bangalore",
    type: "1, 2 & 3 Bed Residences",
    category: "Smart Township",
    price: "₹45L-₹1.2Cr",
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
    <section className="bg-[#FAF8F5] py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title area */}
        <div className="space-y-2 mb-10">
           <span className="text-sm font-serif uppercase tracking-widest font-semibold text-[#C19B54]">Projects Status</span>
            <h2 className="text-5xl lg:text-6xl font-serif text-[#2C2C2C] leading-[1.15]">
               Ongoing & Upcoming Projects</h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex w-fit rounded-[4px] border border-[#D5B980] overflow-hidden mb-16 max-w-full overflow-x-auto">
          {TABS.map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`text-[13px] md:text-[14px] font-medium px-6 md:px-8 py-3 whitespace-nowrap transition ${
                activeTab === tab
                  ? "bg-[#A88532] text-white"
                  : "bg-transparent text-[#C2A366] hover:bg-[#A88532]/5"
              } ${index !== 0 ? "border-l border-[#D5B980]" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Interactive Carousel Block Layout */}
        {filteredProjects.length > 0 ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
            
            {/* Left Arrow */}
            <button 
              onClick={handlePrev}
              className="hidden md:block text-[#C89B4A] hover:opacity-80 transition p-2 flex-shrink-0"
            >
              <ChevronLeft size={56} strokeWidth={1} />
            </button>

            {/* Content Block */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
              
              {/* Text Content */}
              <div className="space-y-6 md:pl-4">
                <h3 className="text-[2.8rem] md:text-[3.5rem] font-serif text-[#C89B4A] leading-[1.1]">
                  {currentProject.title}
                </h3>
                
                <div className="flex items-center gap-2 text-[#2C2C2C] font-bold tracking-widest uppercase">
                  <MapPin size={22} className="text-[#C89B4A] fill-[#C89B4A]" strokeWidth={2} /> 
                  {currentProject.location}
                </div>
                
                <div className="pt-2 space-y-1">
                  <div className="flex items-center gap-8 md:gap-12">
                    <p className="text-[1.15rem] md:text-[1.25rem] font-bold text-gray-900">{currentProject.type}</p>
                    <p className="text-[1.15rem] md:text-[1.25rem] font-bold text-gray-900">{currentProject.price}</p>
                  </div>
                  <p className="text-[1.05rem] text-[#9CA3AF] font-medium">
                    {currentProject.category}
                  </p>
                </div>
              </div>

              {/* Dynamic Showcase Feature Image */}
              <div className="overflow-hidden rounded-[20px] h-[280px] md:h-[360px] w-full">
                <img 
                  key={currentProject.id}
                  src={currentProject.image} 
                  alt={`${currentProject.title} Showcase View`} 
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>
            </div>

            {/* Mobile Arrows */}
            <div className="flex md:hidden items-center justify-center gap-8 w-full mt-4">
               <button 
                onClick={handlePrev}
                className="text-[#C89B4A] hover:opacity-80 transition p-2"
              >
                <ChevronLeft size={48} strokeWidth={1} />
              </button>
              <button 
                onClick={handleNext}
                className="text-[#C89B4A] hover:opacity-80 transition p-2"
              >
                <ChevronRight size={48} strokeWidth={1} />
              </button>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={handleNext}
              className="hidden md:block text-[#C89B4A] hover:opacity-80 transition p-2 flex-shrink-0"
            >
              <ChevronRight size={56} strokeWidth={1} />
            </button>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}