"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";

const REGIONS = ["Central Pune", "East Pune", "West Pune", "North Pune", "PCMC"];

const LOCATIONS = [
  // Central Pune
  { name: "SHIVAJINAGAR", count: 12, region: "Central Pune" },
  { name: "DECCAN", count: 8, region: "Central Pune" },
  { name: "KOTHRUD", count: 24, region: "Central Pune" },
  { name: "ERANDWANE", count: 15, region: "Central Pune" },
  { name: "CAMP", count: 9, region: "Central Pune" },
  { name: "SADASHIV PETH", count: 11, region: "Central Pune" },

  // East Pune
  { name: "KHARADI", count: 32, region: "East Pune" },
  { name: "VIMAN NAGAR", count: 28, region: "East Pune" },
  { name: "WAGHOLI", count: 40, region: "East Pune" },
  { name: "HADAPSAR", count: 35, region: "East Pune" },
  { name: "MAGARPATTA", count: 18, region: "East Pune" },
  { name: "MUNDHWA", count: 22, region: "East Pune" },

  // West Pune
  { name: "BANER", count: 30, region: "West Pune" },
  { name: "BALEWADI", count: 25, region: "West Pune" },
  { name: "BAVDHAN", count: 20, region: "West Pune" },
  { name: "WARJE", count: 15, region: "West Pune" },
  { name: "CHANDANI CHOWK", count: 10, region: "West Pune" },
  { name: "SUS", count: 22, region: "West Pune" },

  // North Pune
  { name: "PIMPRI", count: 25, region: "North Pune" },
  { name: "CHINCHWAD", count: 30, region: "North Pune" },
  { name: "MOSHI", count: 42, region: "North Pune" },
  { name: "CHAKAN", count: 18, region: "North Pune" },
  { name: "BHOSARI", count: 20, region: "North Pune" },
  { name: "NIGDI", count: 15, region: "North Pune" },
  { name: "RAVET", count: 35, region: "North Pune" },

  // PCMC
  { name: "WAKAD", count: 45, region: "PCMC" },
  { name: "TATHAWADE", count: 28, region: "PCMC" },
  { name: "PUNAWALE", count: 32, region: "PCMC" },
  { name: "PIMPLE SAUDAGAR", count: 20, region: "PCMC" },
  { name: "PIMPLE GURAV", count: 14, region: "PCMC" },
  { name: "AKURDI", count: 18, region: "PCMC" },
  { name: "THERGAON", count: 22, region: "PCMC" },
];

export default function ExploreByLocation() {
  const [activeRegion, setActiveRegion] = useState("Central Pune");

  const filteredLocations = LOCATIONS.filter(loc => loc.region === activeRegion);

  // Fallback to show something if the region doesn't have many locations
  const displayLocations = filteredLocations.length > 0 ? filteredLocations : LOCATIONS.slice(0, 5);

  return (
    <section className="bg-[#FAF8F5] py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title Area */}
        <div className="space-y-2 mb-8">
          <span className="text-sm font-serif uppercase tracking-widest font-semibold text-[#C19B54]">Projects Status</span>
          <h2 className="text-4xl md:text-[3.5rem] font-serif text-[#2C2C2C] leading-tight">
            Explore by Location
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex w-fit rounded-[4px] border border-[#D5B980] overflow-hidden mb-12 max-w-full overflow-x-auto">
          {REGIONS.map((region, index) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`text-[13px] md:text-[14px] font-medium px-6 py-3 whitespace-nowrap transition ${
                activeRegion === region
                  ? "bg-[#A88532] text-white"
                  : "bg-transparent text-[#C2A366] hover:bg-[#A88532]/5"
              } ${index !== 0 ? "border-l border-[#D5B980]" : ""}`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Location Cards */}
        <div className="flex gap-6 overflow-x-auto pb-10 pt-4 px-2 -mx-2 hide-scrollbar">
          {displayLocations.map((loc, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 w-[240px] md:w-[260px] h-[250px] bg-white bg-no-repeat bg-bottom bg-contain rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col pt-8 px-6 overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300"
              style={{ backgroundImage: `url('/images/location-bg.png')` }}
            >
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[2.5rem] font-serif font-bold text-gray-900 leading-none">{loc.count}</span>
                <span className="text-[11px] font-bold tracking-widest text-gray-800 uppercase">Projects</span>
              </div>
              
              <div className="flex items-center gap-2 mb-auto">
                <MapPin size={22} className="text-gray-900 fill-gray-900" strokeWidth={1} />
                <span className="text-xl font-serif text-gray-900 uppercase font-bold">{loc.name}</span>
              </div>
              
           
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}