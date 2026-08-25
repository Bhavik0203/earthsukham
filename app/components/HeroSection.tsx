"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, IndianRupee, BedDouble, BarChart3, ChevronDown, Zap, ChevronRight, X } from "lucide-react";
import SearchResults from "./SearchResults";

const budgetOptions = ["Under 50 Lacs", "50 Lacs - 1 Cr", "1 Cr - 2 Cr", "Above 2 Cr"];
const typeOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Commercial"];
const statusOptions = ["Newly Launched", "Under Construction", "Ready Possession"];

export default function HeroSection() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState("Budget");
  const [selectedType, setSelectedType] = useState("Property Type");
  const [selectedStatus, setSelectedStatus] = useState("Property Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [buyerCount, setBuyerCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("query", searchQuery);
    if (selectedBudget !== "Budget") params.append("budget", selectedBudget);
    if (selectedType !== "Property Type") params.append("type", selectedType);
    if (selectedStatus !== "Property Status") params.append("status", selectedStatus);
    
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Counter Animation
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const target = 10000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setBuyerCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-black flex-col mb-24">
      {/* Background Video Overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/images/hero.mp4" type="video/mp4" />
      </video>
      
      {/* Floating Content Wrapper */}
      <div className="absolute bottom-0  translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-20">
        
        {/* Left-Aligned Text Content (Positioned directly above the search box) */}
        <div className="absolute bottom-full left-0 w-full flex flex-col items-start space-y-6 mb-2">
          {/* Active Counter Badge */}
          <div className="flex items-center ml-10 gap-2 bg-black/20 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 duration-300">
            <div className="flex -space-x-2 mr-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 border-black/50 bg-gray-300 bg-cover bg-center`} style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})` }} />
              ))}
            </div>
            <span className="text-[#E5BA73] font-bold text-lg md:text-xl">{buyerCount.toLocaleString()}+</span>
            <span className="text-white/90 text-xs md:text-sm font-medium tracking-wider uppercase">Happy Property Buyers</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-3xl ml-10 font-serif leading-tight text-white text-left tracking-wide drop-shadow-lg">
            Find Your <span className="text-[#E5BA73] font-bold">Perfect Home</span> With Earth Sukham
          </h1>
        </div>

        {/* Floating Search Box */}
        <div className="w-full bg-white mt-10 rounded-3xl p-4 md:p-6 shadow-2xl" ref={dropdownRef}>
          
          {/* Top Search Input Row */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 bg-white rounded-2xl pb-4 border-b border-gray-100 md:border-none md:pb-0">
            <div className="flex items-center flex-1 w-full relative ">
              <Search className="text-slate-400 absolute left-3 w-6 h-6" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by Location, Properties or Developer" 
                className="w-full text-gray-700 bg-transparent py-3 pl-12 pr-4 text-base md:text-lg focus:outline-none placeholder-gray-400"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="hidden md:flex items-center gap-2 bg-[#B58A3D] text-white px-8 py-2 rounded-xl hover:bg-[#96702e] transition font-bold shadow-md mx-2"
            >
              Search
            </button>
          </div>

          {/* Bottom Filters Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            {/* Left Side Filters */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Budget Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'budget' ? null : 'budget')}
                  className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition ${activeDropdown === 'budget' ? 'border-[#C19B54] bg-gray-50 text-gray-800' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <IndianRupee className={`w-4 h-4 transition-colors ${activeDropdown === 'budget' ? 'text-[#C19B54]' : 'text-gray-500'}`} />
                  {selectedBudget}
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === 'budget' ? 'rotate-180 text-[#C19B54]' : 'text-gray-500'}`} />
                </button>
                
                {activeDropdown === 'budget' && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden">
                    {budgetOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => { setSelectedBudget(option); setActiveDropdown(null); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C19B54] transition border-b border-gray-50 last:border-none"
                      >
                        {option}
                      </button>
                    ))}
                    {selectedBudget !== "Budget" && (
                      <button onClick={() => { setSelectedBudget("Budget"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition border-t border-gray-100 bg-gray-50">Clear Selection</button>
                    )}
                  </div>
                )}
              </div>

              {/* Property Type Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                  className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition ${activeDropdown === 'type' ? 'border-[#C19B54] bg-gray-50 text-gray-800' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <BedDouble className={`w-4 h-4 transition-colors ${activeDropdown === 'type' ? 'text-[#C19B54]' : 'text-gray-500'}`} />
                  {selectedType}
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === 'type' ? 'rotate-180 text-[#C19B54]' : 'text-gray-500'}`} />
                </button>

                {activeDropdown === 'type' && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden">
                    {typeOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => { setSelectedType(option); setActiveDropdown(null); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C19B54] transition border-b border-gray-50 last:border-none"
                      >
                        {option}
                      </button>
                    ))}
                    {selectedType !== "Property Type" && (
                      <button onClick={() => { setSelectedType("Property Type"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition border-t border-gray-100 bg-gray-50">Clear Selection</button>
                    )}
                  </div>
                )}
              </div>

              {/* Property Status Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')}
                  className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition ${activeDropdown === 'status' ? 'border-[#C19B54] bg-gray-50 text-gray-800' : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <BarChart3 className={`w-4 h-4 transition-colors ${activeDropdown === 'status' ? 'text-[#C19B54]' : 'text-gray-500'}`} />
                  {selectedStatus}
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === 'status' ? 'rotate-180 text-[#C19B54]' : 'text-gray-500'}`} />
                </button>

                {activeDropdown === 'status' && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden">
                    {statusOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => { setSelectedStatus(option); setActiveDropdown(null); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C19B54] transition border-b border-gray-50 last:border-none"
                      >
                        {option}
                      </button>
                    ))}
                    {selectedStatus !== "Property Status" && (
                      <button onClick={() => { setSelectedStatus("Property Status"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition border-t border-gray-100 bg-gray-50">Clear Selection</button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Button */}
            <Link 
              href="/post-property"
              className="flex items-center gap-2 bg-white text-[#C19B54] px-6 py-2.5 rounded-full font-bold hover:bg-gray-50 transition shadow-sm w-full md:w-auto justify-center md:justify-start"
            >
              <Zap className="w-4 h-4 fill-[#C19B54]" />
              Are you a Property Owner?
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <button 
              onClick={handleSearch}
              className="md:hidden w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-black transition font-bold shadow-md mt-2"
            >
              Search
            </button>
          </div>
        </div>

        {/* Live Search Results Dropdown */}
        {(searchQuery.trim().length > 0 || selectedBudget !== "Budget" || selectedType !== "Property Type" || selectedStatus !== "Property Status") && (
          <div className="mt-4 w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedBudget("Budget");
                setSelectedType("Property Type");
                setSelectedStatus("Property Status");
              }}
              className="absolute top-4 right-4 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition"
              title="Clear Search"
            >
              <X size={20} />
            </button>
            <SearchResults 
              query={searchQuery} 
              hasSearched={true} 
              activePropertyType={selectedType === "Property Type" ? "" : selectedType}
              activeBudget={selectedBudget === "Budget" ? "" : selectedBudget}
              activeStatus={selectedStatus === "Property Status" ? "" : selectedStatus}
            />
          </div>
        )}
      </div>
    </section>
  );
}