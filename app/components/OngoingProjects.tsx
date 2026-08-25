"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, Heart, Share2, Construction, Rocket } from "lucide-react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { usePropertyActions } from "../hooks/usePropertyActions";

interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  category: string;
  price: string;
  image: string;
  status: string;
  slug: string;
}

const TABS = ["View All Properties", "New Launches", "Ready Possession"];

const DUMMY_PROJECTS: Project[] = [
  { id: "1", title: "Sadhna Obsidian", location: "Jagatpur, Ahmedabad", type: "4,5 BHK Apartment", category: "Township", price: "₹ 1.9 Cr Onwards", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800", status: "Ready Possession", slug: "#" },
  { id: "2", title: "Dev The Galaxy", location: "Shela", type: "3 BHK Apartment", category: "Residences", price: "₹ 1.11 Cr Onwards", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800", status: "New Launches", slug: "#" },
  { id: "3", title: "Sukham Residency", location: "SG Highway", type: "5 BHK Villa", category: "Villas", price: "₹ 2.2 Cr Onwards", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800", status: "Ready Possession", slug: "#" }
];

function OngoingProjectsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("View All Properties");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>(DUMMY_PROJECTS);
  const [allData, setAllData] = useState<Project[]>(DUMMY_PROJECTS);
  const { isSaved, isCompared, toggleSave, toggleCompare } = usePropertyActions();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/properties`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.properties && data.properties.length > 0) {
          const mapped = data.properties.map((p: any) => ({
            id: p.id,
            title: p.propertyName,
            location: `${p.location ? p.location + ', ' : ''}${p.city || ''}`.trim(),
            type: p.propertyType || "Apartment",
            category: p.propertyCategory || "Residences",
            price: p.tentativeBudget || 'Price on Request',
            image: p.multipleImages?.[0] ? `http://localhost:8000${p.multipleImages[0]}` : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800",
            status: p.possession ? `Possession: ${p.possession}` : 'New Launches',
            slug: p.slug
          }));
          setAllData(mapped);
          setProjects(mapped);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const query = searchParams.get('query')?.toLowerCase() || "";
    const type = searchParams.get('type') || "";
    const status = searchParams.get('status') || "";

    let filtered = [...allData];
    
    if (query) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query));
    }
    if (type && type !== "Property Type") {
      filtered = filtered.filter(p => p.type.includes(type));
    }
    if (status && status !== "Property Status") {
      if (status === "Newly Launched") {
        filtered = filtered.filter(p => p.status.includes("Launch"));
      } else {
        filtered = filtered.filter(p => p.status === status);
      }
    }
    
    setProjects(filtered);
    setCurrentIndex(0);
  }, [searchParams, allData]);

  const filteredProjects = projects.filter(p => 
    activeTab === "View All Properties" ? true : p.status === activeTab
  );

  let visibleProjects = [];
  if (filteredProjects.length > 0) {
    visibleProjects.push(filteredProjects[currentIndex]);
    if (filteredProjects.length > 1) {
      visibleProjects.push(filteredProjects[(currentIndex + 1) % filteredProjects.length]);
    }
    if (filteredProjects.length > 2) {
      visibleProjects.push(filteredProjects[(currentIndex + 2) % filteredProjects.length]);
    }
  }

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

  const handleShare = async (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = `${window.location.origin}/properties/${project.slug}`;
    const shareData = {
      title: project.title,
      text: `Check out ${project.title} in ${project.location} on Earth Sukham!`,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.log("Failed to copy:", err);
      }
    }
  };

  return (
    <section className="bg-[#FAF8F5] py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title area */}
        <div className="space-y-2 mb-10">
           <span className="text-sm font-serif uppercase tracking-widest font-semibold text-[#C19B54]">Property Status</span>
            <h2 className="text-5xl lg:text-6xl font-serif text-[#2C2C2C] leading-[1.15]">
               Ongoing & Upcoming Properties</h2>
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
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch w-full">
              {visibleProjects.map((project, idx) => (
                <Link href={`/properties/${project.slug}`} key={`${project.id}-${idx}`} className="block h-fit bg-white rounded-xl overflow-hidden border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-lg transition duration-300 group">
                  {/* Image Container */}
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    
                    {/* Top Right Icons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleSave(project.id.toString()); }}
                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition cursor-pointer ${isSaved(project.id.toString()) ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
                      >
                        <Heart size={14} fill={isSaved(project.id.toString()) ? "currentColor" : "none"} />
                      </button>
                      <label 
                        className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                        title="Compare Property"
                      >
                        <input 
                          type="checkbox" 
                          checked={isCompared(project.id.toString())}
                          onChange={() => toggleCompare(project.id.toString())}
                          className="w-4 h-4 cursor-pointer accent-[#B58A3D]"
                        />
                      </label>
                      <div 
                        onClick={(e) => handleShare(e, project)}
                        className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition cursor-pointer"
                      >
                        <Share2 size={14} />
                      </div>
                    </div>
                    
                    {/* Bottom Right Badge */}
                    <div className="absolute bottom-3 right-3 bg-[#0a192f] text-white text-[11px] font-medium px-3 py-1.5 rounded flex items-center gap-1.5 shadow-md">
                      {project.status === "Under Construction" ? <Construction size={12} /> : <Rocket size={12} />}
                      <span>{project.status}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 flex flex-col h-full">
                    <h3 className="font-bold text-[#0a192f] text-[17px] mb-1 truncate">{project.title}</h3>
                    <p className="text-gray-500 text-[13px] mb-3 truncate">{project.location}</p>
                    
                    <p className="text-[#B58A3D] font-bold text-lg mb-2">{project.price}</p>
                    
                    <div className="text-gray-600 text-[13px] flex items-center gap-2 truncate mb-4">
                      <span>{project.type}</span>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100 mt-auto">
                      <p className="text-gray-400 text-[12px]">{project.category}</p>
                    </div>
                  </div>
                </Link>
              ))}
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
            No properties found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

export default function OngoingProjects() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-gray-500">Loading properties...</div>}>
      <OngoingProjectsContent />
    </Suspense>
  );
}