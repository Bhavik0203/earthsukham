"use client";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePropertyActions } from '../hooks/usePropertyActions';
import { Heart } from 'lucide-react';

// Mock data based on the image
const mockProjects = [
  {
    id: 1,
    title: "Geras Joy on The Tree Tops",
    details: "3 BHK Apartment in Hinjewadi, Pune",
    price: "₹ 1.42 Cr",
    numericPrice: 14200000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
    status: "Under Construction",
    type: "3 BHK",
    rera: true,
  },
  {
    id: 2,
    title: "ANP Ultimus",
    details: "2 BHK Apartment in Wakad, Pune",
    price: "₹ 93.5 L",
    numericPrice: 9350000,
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80",
    status: "Newly Launched",
    type: "2 BHK",
    rera: true,
  },
  {
    id: 3,
    title: "Kohinoor Sapphire 3",
    details: "2 BHK Apartment in Tathawade, Pune",
    price: "₹ 77.08 L",
    numericPrice: 7708000,
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&q=80",
    status: "Ready Possession",
    type: "2 BHK",
    rera: true,
  },
  {
    id: 4,
    title: "Pride World City",
    details: "Premium Plots in Charholi, Pune",
    price: "₹ 1.2 Cr",
    numericPrice: 12000000,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80",
    status: "Ready Possession",
    type: "Villa",
    rera: true,
  },
  {
    id: 5,
    title: "WTC Pune",
    details: "Office space in Kharadi, Pune",
    price: "₹ 5 Cr",
    numericPrice: 50000000,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    status: "Ready Possession",
    type: "Commercial",
    rera: true,
  },
  {
    id: 6,
    title: "Euphoria In The East",
    details: "3 BHK Apartment Near DPS, Whitefield",
    price: "₹ 1.7 Cr",
    numericPrice: 17000000,
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80",
    status: "Newly Launched",
    type: "3 BHK",
    rera: true,
  },
  {
    id: 7,
    title: "Kolte Patil Life Republic",
    details: "Independent house/ villa in Hinjewadi, Pune",
    price: "₹ 2.5 Cr",
    numericPrice: 25000000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
    status: "Ready Possession",
    type: "Villa",
    rera: true,
  },
  {
    id: 8,
    title: "VTP Blue Waters",
    details: "1 BHK Apartment in Mahalunge, Pune",
    price: "₹ 45 L",
    numericPrice: 4500000,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80",
    status: "Ready Possession",
    type: "1 BHK",
    rera: true,
  },
  {
    id: 9,
    title: "Lodha Belmondo",
    details: "4 BHK Villa in Mumbai-Pune Expressway",
    price: "₹ 4.2 Cr",
    numericPrice: 42000000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    status: "Ready Possession",
    type: "4 BHK",
    rera: true,
  }
];

interface SearchResultsProps {
  query: string;
  hasSearched: boolean;
  activePropertyType?: string;
  activeBudget?: string;
  activeStatus?: string;
}

import { API_BASE_URL } from '../lib/api';

const SearchResults: React.FC<SearchResultsProps> = ({ query, hasSearched, activePropertyType, activeBudget, activeStatus }) => {
  const [projects, setProjects] = useState<any[]>(mockProjects);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right');
  const { isSaved, isCompared, toggleSave, toggleCompare } = usePropertyActions();

  useEffect(() => {
    fetch(`${API_BASE_URL}/properties`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.properties && data.properties.length > 0) {
          const mapped = data.properties.map((p: any) => ({
            id: p.id,
            title: p.propertyName,
            builder: p.builder || 'Builder',
            configuration: p.configuration || p.propertyType || 'Apartments',
            locationText: `${p.location ? p.location + ', ' : ''}${p.city || ''}`,
            details: `${p.propertyType || ''} ${p.location ? `in ${p.location}` : ''} ${p.city ? `, ${p.city}` : ''}`.trim(),
            price: p.tentativeBudget || 'Price on Request',
            numericPrice: parseInt(p.tentativeBudget?.replace(/\D/g, '')) || 0,
            image: p.multipleImages?.[0] ? `http://localhost:8000${p.multipleImages[0]}` : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
            status: p.possession ? `Possession: ${p.possession}` : "Ready Possession",
            type: p.propertyType,
            rera: !!p.reraNumber,
          }));
          setProjects(mapped);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const childWidth = scrollContainerRef.current.firstElementChild?.getBoundingClientRect().width || 400;
        
        if (scrollDirection === 'right') {
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollContainerRef.current.scrollBy({ left: childWidth + 24, behavior: 'smooth' });
          }
        } else {
          if (scrollLeft <= 10) {
            scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
          } else {
            scrollContainerRef.current.scrollBy({ left: -(childWidth + 24), behavior: 'smooth' });
          }
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [hasSearched, query, activePropertyType, activeBudget, activeStatus, scrollDirection]);

  const handleScrollLeft = () => {
    setScrollDirection('left');
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth } = scrollContainerRef.current;
      const childWidth = scrollContainerRef.current.firstElementChild?.getBoundingClientRect().width || 400;
      if (scrollLeft <= 10) {
        scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: -(childWidth + 24), behavior: 'smooth' });
      }
    }
  };

  const handleScrollRight = () => {
    setScrollDirection('right');
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const childWidth = scrollContainerRef.current.firstElementChild?.getBoundingClientRect().width || 400;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: childWidth + 24, behavior: 'smooth' });
      }
    }
  };

  if (!hasSearched) return null;

  const searchQuery = (query || '').toLowerCase().trim();
  
  // Real filter logic
  const filteredProjects = projects.filter(p => {
    // Exact Match Type
    if (activePropertyType && p.type !== activePropertyType) return false;
    
    // Exact Match Status
    if (activeStatus && p.status !== activeStatus) return false;

    // Range Match Budget
    if (activeBudget) {
      if (activeBudget === "Under 50 Lacs" && p.numericPrice >= 5000000) return false;
      if (activeBudget === "50 Lacs - 1 Cr" && (p.numericPrice < 5000000 || p.numericPrice > 10000000)) return false;
      if (activeBudget === "1 Cr - 2 Cr" && (p.numericPrice < 10000000 || p.numericPrice > 20000000)) return false;
      if (activeBudget === "Above 2 Cr" && p.numericPrice <= 20000000) return false;
    }

    if (!searchQuery) return true; // Show all if empty search but matches tags
    return p.title.toLowerCase().includes(searchQuery) || 
           p.details.toLowerCase().includes(searchQuery);
  });

  const hasResults = filteredProjects.length > 0;

  return (
    <div id="search-results-section" className="w-full py-8 px-4 md:px-8">
      <div className="w-full">
        {hasResults ? (
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a192f] mb-1">Recommended Properties</h2>
                <p className="text-gray-500 text-sm md:text-base">The most searched properties for "{query}"</p>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleScrollLeft}
                  className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button 
                  onClick={handleScrollRight}
                  className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <Link href="/properties" className="ml-2 text-sm font-semibold text-[#30498a] dark:text-blue-400 hover:underline whitespace-nowrap">
                  Show All Properties →
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
              {filteredProjects.slice(0, 6).map(project => (
                <div 
                  key={project.id} 
                  className="bg-white dark:bg-gray-900 rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-row h-44 hover:shadow-lg transition-shadow group relative"
                >
                  {/* Left Side: Image */}
                  <div className="w-[40%] relative shrink-0">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    
                    {/* Top Badges */}
                    {project.rera && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                          RERA
                        </span>
                      </div>
                    )}

                    {/* Bottom Status */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-white font-semibold text-[10px] truncate">{project.status}</p>
                    </div>
                  </div>
                  
                  {/* Right Side: Details */}
                  <div className="w-[60%] p-3 flex flex-col justify-center relative bg-white dark:bg-gray-900">
                    <h3 className="text-[16px] font-bold text-gray-900 dark:text-white leading-tight mb-1 truncate" title={project.title}>
                      {project.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 truncate">by {project.builder}</p>
                    
                    <p className="text-gray-800 dark:text-gray-200 text-sm truncate">{project.configuration}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 truncate">{project.locationText}</p>
                    
                    <p className="text-gray-900 dark:text-white font-bold text-[15px] truncate">{project.price}</p>
                    
                    {/* Save / Compare Buttons overlayed on top right */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(project.id.toString()); }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 ${isSaved(project.id.toString()) ? 'text-red-500' : 'text-gray-400'}`}
                      >
                        <Heart size={14} fill={isSaved(project.id.toString()) ? "currentColor" : "none"} />
                      </button>
                      <label 
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 cursor-pointer text-gray-400"
                        onClick={(e) => e.stopPropagation()}
                        title="Compare Property"
                      >
                        <input 
                          type="checkbox" 
                          checked={isCompared(project.id.toString())}
                          onChange={() => toggleCompare(project.id.toString())}
                          className="w-3.5 h-3.5 cursor-pointer accent-[#B58A3D]"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-12">
            <div className="text-left md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0a192f] mb-1">No Properties Found</h2>
              <p className="text-gray-500 text-sm md:text-base">We couldn't find any properties matching "{query}". Let us know what you're looking for and our experts will help you find the perfect match.</p>
            </div>
            
            <form className="space-y-4 w-full md:w-1/2" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                  <input type="text" className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#30498a] dark:focus:ring-blue-500 focus:border-[#30498a] dark:focus:border-blue-500 outline-none transition-all dark:text-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#30498a] dark:focus:ring-blue-500 focus:border-[#30498a] dark:focus:border-blue-500 outline-none transition-all dark:text-white" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What are you looking for?</label>
                <textarea rows={2} className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#30498a] dark:focus:ring-blue-500 focus:border-[#30498a] dark:focus:border-blue-500 outline-none transition-all dark:text-white" placeholder="e.g. 3 BHK in Wakad under 1.5 Cr..."></textarea>
              </div>
              <button type="submit" className="w-full bg-[#30498a] hover:bg-[#253970] dark:bg-[#3d60b5] dark:hover:bg-[#4d70c5] text-white font-bold py-3 px-4 rounded-lg transition-colors">
                Request Property Details
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
