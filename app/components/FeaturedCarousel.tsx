"use client";

import { useState } from "react";
import { Heart, Share2, Rocket, ChevronLeft, ChevronRight, Construction, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedCarousel({ cards }: { cards: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Apartment", "Villa"];
  const filteredCards = filter === "All" ? cards : cards.filter((c: any) => c.config && c.config.includes(filter));

  // We show 3 cards at a time on desktop
  const visibleCardsCount = 3;
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < filteredCards.length - visibleCardsCount;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentIndex(0);
  };

  const handleShare = async (e: React.MouseEvent, card: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = `${window.location.origin}/properties/${card.slug}`;
    const shareData = {
      title: card.title,
      text: `Check out ${card.title} in ${card.location} on Earth Sukham!`,
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
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Left Heading Info Block */}
        <div className="flex flex-col justify-center space-y-6 lg:space-y-8 bg-gray-50/30 p-2 md:p-4">
          <div className="space-y-3 lg:space-y-4">
            <span className="text-sm font-serif uppercase tracking-widest font-semibold text-[#B58A3D]">Featured Properties</span>
            <h2 className="text-4xl lg:text-5xl font-serif text-[#2C2C2C] leading-[1.15]">
              SPACES <br />That Define <br />Excellence
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 py-2">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition ${filter === f ? 'bg-[#B58A3D] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <Link href="/properties" className="self-start border border-[#B58A3D]/50 text-[#2C2C2C] bg-white px-6 py-3 text-sm font-semibold flex items-center gap-3 hover:bg-[#FBF9F4] transition shadow-sm rounded">
            View All Properties <ArrowUpRight size={16} className="text-[#B58A3D]" />
          </Link>
          
          <div className="flex gap-2">
            <button 
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm transition ${
                canScrollLeft ? 'hover:bg-gray-50 text-gray-600 cursor-pointer' : 'text-gray-300 opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm transition ${
                canScrollRight ? 'hover:bg-gray-50 text-gray-600 cursor-pointer' : 'text-gray-300 opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Cards */}
        {filteredCards.length > 0 ? (
          filteredCards.slice(currentIndex, currentIndex + visibleCardsCount).map((card: any) => (
            <Link href={`/properties/${card.slug}`} key={card.id} className="block h-fit bg-white rounded-xl overflow-hidden border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-lg transition duration-300">
              {/* Image Container */}
              <div className="relative h-[200px] w-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition duration-500 hover:scale-105"
                  style={{ backgroundImage: `url(${card.img})` }}
                />
                
                {/* Top Right Icons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  
                  <div 
                    onClick={(e) => handleShare(e, card)}
                    className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition cursor-pointer"
                  >
                    <Share2 size={14} />
                  </div>
                </div>
                
                {/* Bottom Right Badge */}
                <div className="absolute bottom-3 right-3 bg-[#0a192f] text-white text-[11px] font-medium px-3 py-1.5 rounded flex items-center gap-1.5 shadow-md">
                  {card.status === "Under Construction" ? <Construction size={12} /> : <Rocket size={12} />}
                  <span>{card.status}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#0a192f] text-[17px] mb-1 truncate">{card.title}</h3>
                <p className="text-gray-500 text-[13px] mb-3 truncate">{card.location}</p>
                
                <p className="text-[#B58A3D] font-bold text-lg mb-2">{card.price}</p>
                
                <div className="text-gray-600 text-[13px] flex items-center gap-2 truncate mb-4">
                  <span>{card.config}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-gray-400 text-[12px]">{card.builder}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-1 sm:col-span-1 lg:col-span-3 flex items-center justify-center text-gray-500 py-20">
            No properties match the selected filter.
          </div>
        )}
      </div>
    </section>
  );
}
