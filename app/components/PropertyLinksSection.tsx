"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const residentialLocations = [
  "Akurdi PCMC", "Aundh - Ravet BRTS Road", "Aundh-Ravet BRTS", "BT Kawade Road", "Balewadi",
  "Baner", "Baner, Pancard Club Road", "Baner, Pancard club road", "Bavdhan", "Bhosale Nagar",
  "Bibwewadi", "Camp", "Chandan Nagar", "Chikhali", "Dhanori",
  "Erandwane", "Fatima Nagar", "Ghorpadi", "Hinjewadi", "Kalyani Nagar"
];

const commercialLocations = [
  "Deccan Gymkhana", "FC Road", "JM Road", "Koregaon Park", "Viman Nagar",
  "Magarpatta City", "Kharadi", "Swargate", "Shivajinagar", "Camp Area",
  "Hadapsar Industrial", "Pimpri", "Chinchwad", "Bhosari", "Hinjewadi Phase 1",
  "Hinjewadi Phase 2", "Hinjewadi Phase 3", "Wakad", "Baner", "Aundh"
];

export default function PropertyLinksSection() {
  const [activeTab, setActiveTab] = useState<'residential' | 'commercial'>('residential');
  const [showAll, setShowAll] = useState(false);

  const currentLocations = activeTab === 'residential' ? residentialLocations : commercialLocations;
  const displayedLocations = showAll ? currentLocations : currentLocations.slice(0, 10);

  const handleTabChange = (tab: 'residential' | 'commercial') => {
    setActiveTab(tab);
    setShowAll(false);
  };

  return (
    <section className="w-full bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200">
          <button
            onClick={() => handleTabChange('residential')}
            className={`pb-4 text-[13px] md:text-sm font-bold tracking-wider uppercase transition-colors relative ${
              activeTab === 'residential' ? 'text-[#C89B4A]' : 'text-gray-500 hover:text-[#C89B4A]'
            }`}
          >
            Residential Properties
            {activeTab === 'residential' && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C89B4A]"></div>
            )}
          </button>
          
          <button
            onClick={() => handleTabChange('commercial')}
            className={`pb-4 text-[13px] md:text-sm font-bold tracking-wider uppercase transition-colors relative ${
              activeTab === 'commercial' ? 'text-[#C89B4A]' : 'text-gray-500 hover:text-[#C89B4A]'
            }`}
          >
            Commercial Properties
            {activeTab === 'commercial' && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C89B4A]"></div>
            )}
          </button>
        </div>

        {/* Links Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
          {displayedLocations.map((loc, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <h4 className="text-[15px] font-bold text-[#2C2C2C] mb-1">{loc}</h4>
              
              {activeTab === 'residential' ? (
                <>
                  <Link href="#" className="text-[13px] text-gray-500 hover:text-[#C89B4A] transition-colors">
                    Flats for Sale in {loc}
                  </Link>
                  <Link href="#" className="text-[13px] text-gray-500 hover:text-[#C89B4A] transition-colors">
                    Properties in {loc}
                  </Link>
                  <Link href="#" className="text-[13px] text-gray-500 hover:text-[#C89B4A] transition-colors">
                    Properties for Sale in {loc}
                  </Link>
                </>
              ) : (
                <>
                  <Link href="#" className="text-[13px] text-gray-500 hover:text-[#C89B4A] transition-colors">
                    Offices for Sale in {loc}
                  </Link>
                  <Link href="#" className="text-[13px] text-gray-500 hover:text-[#C89B4A] transition-colors">
                    Commercial Properties in {loc}
                  </Link>
                  <Link href="#" className="text-[13px] text-gray-500 hover:text-[#C89B4A] transition-colors">
                    Shops for Sale in {loc}
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>

        {/* See More Button */}
        {currentLocations.length > 10 && (
          <div className="mt-10 flex justify-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-2.5 border-2 border-[#C89B4A] text-[#C89B4A] rounded-xl font-bold text-sm hover:bg-[#C89B4A] hover:text-white hover:shadow-[0_8px_20px_rgba(200,155,74,0.2)] hover:-translate-y-0.5 transition-all duration-300"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
