"use client";
import { Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePropertyActions } from "../hooks/usePropertyActions";
import { API_BASE_URL } from "../lib/api";

export default function ExclusiveProjects() {
  const [activeImage, setActiveImage] = useState(0);
  const [progress, setProgress] = useState(0);
  const { isSaved, isCompared, toggleSave, toggleCompare } = usePropertyActions();
  const [projects, setProjects] = useState<any[]>([]);
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/properties`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.properties && data.properties.length > 0) {
          const mapped = data.properties.slice(0, 5).map((p: any) => ({
            id: p.id,
            title: p.propertyName,
            location: `${p.location ? p.location + ', ' : ''}${p.city || ''}`,
            type: p.propertyType || "Apartment",
            price: p.tentativeBudget || 'Price on Request',
            area: p.carpetArea ? `${p.carpetArea} sq ft` : 'Area on request',
            image: p.multipleImages?.[0] ? `http://localhost:8000${p.multipleImages[0]}` : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200",
            slug: p.slug
          }));
          setProjects(mapped);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    const slideDuration = 5000; // 5 seconds per slide
    const interval = 50; // Update every 50ms
    const step = (100 * interval) / slideDuration;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveImage((current) => (current < projects.length - 1 ? current + 1 : 0));
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [projects.length]);

  const handleManualChange = (index: number) => {
    setActiveImage(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveImage((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setActiveImage((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
    setProgress(0);
  };

  if (projects.length === 0) {
    return null; // Or a loading skeleton
  }

  const activeProject = projects[activeImage];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#0a192f]">Exclusive Projects</h2>
        <Link href="/exclusive-projects" className="text-blue-400 hover:text-blue-500 transition font-medium flex items-center gap-1">
          View all <span className="text-lg leading-none pb-0.5">&gt;</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row gap-6">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-between py-4 px-2 md:px-4">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-[#0a192f]">{activeProject.title}</h3>
              <div className="flex gap-4 text-gray-400 items-center">
                <button 
                  onClick={() => toggleSave(activeProject.id)}
                  className={`transition ${isSaved(activeProject.id) ? 'text-red-500' : 'hover:text-red-500'}`}
                >
                  <Heart size={20} fill={isSaved(activeProject.id) ? "currentColor" : "none"} />
                </button>
                <label className="flex items-center gap-1 text-sm cursor-pointer hover:text-[#B58A3D] transition">
                  <input 
                    type="checkbox" 
                    checked={isCompared(activeProject.id)}
                    onChange={() => toggleCompare(activeProject.id)}
                    className="w-4 h-4 cursor-pointer accent-[#B58A3D]"
                  />
                  Compare
                </label>
                <button className="hover:text-blue-500 transition ml-2"><Share2 size={20} /></button>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-8">{activeProject.location}</p>

            <p className="text-[#c69c37] font-bold text-xl mb-8">{activeProject.price}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-gray-400 text-sm mb-1">Configuration</p>
                <p className="text-[#0a192f] font-semibold">{activeProject.type}</p>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <p className="text-gray-400 text-sm mb-1">Builtup area</p>
                <p className="text-[#0a192f] font-semibold">{activeProject.area}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-12 md:mt-auto">
            <button className="text-[#0a192f] font-semibold hover:underline">Contact Us</button>
            <Link href={`/properties/${activeProject.slug}`} className="bg-[#15234b] text-white px-8 py-2.5 rounded-full font-medium hover:bg-[#0a192f] transition shadow-md">
              Explore now
            </Link>
          </div>
        </div>

        {/* Right Content - Main Image */}
        <div className="md:w-[65%]">
          <Link href={`/properties/${activeProject.slug}`} className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden relative block cursor-pointer">
            <img 
              src={activeProject.image} 
              alt={activeProject.title} 
              className="w-full h-full object-cover transition-all duration-500"
            />
          </Link>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex items-center justify-end gap-4 py-4 pr-0 md:pr-4">
        <button 
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 bg-white hover:bg-gray-50 shadow-sm transition"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex gap-3">
          {projects.map((project, index) => (
            <div key={project.id} className="flex flex-col gap-1.5" onClick={() => handleManualChange(index)}>
              <div className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer transition ${activeImage === index ? 'opacity-100 border-2 border-transparent' : 'opacity-70 hover:opacity-100'}`}>
                <img src={project.image} className="w-full h-full object-cover" alt={`Thumbnail ${index + 1}`} />
              </div>
              
              {/* Progress Bar Container */}
              <div className="h-[3px] w-full rounded-full bg-gray-100 overflow-hidden">
                <div 
                  className={`h-full bg-[#c69c37] transition-all duration-75 ease-linear`} 
                  style={{ width: activeImage === index ? `${progress}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 bg-white hover:bg-gray-50 shadow-sm transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
