"use client";
import Image from "next/image";
import { useState } from "react";
export default function DeveloperPartnersmob() {
  const [partners, setPartners] = useState<any[]>([]);

  const getPartnerData = (index: number) => {
    if (partners[index]) {
      return {
        name: partners[index].name || partners[index].company || `Developer Partner ${index + 1}`,
        image: partners[index].photoUrl || `/images/partner (${index + 1}).png`
      };
    }
    const fallbackNames = [
      "Hiranandani",
      "Shapoorji Pallonji",
      "Trade Centre",
      "Trump Towers",
      "Godrej",
      "Kolte Patil",
      "Lodha",
      "VTP Realty",
      "Omaxe"
    ];
    return {
      name: fallbackNames[index] || `Developer Partner ${index + 1}`,
      image: `/images/partner (${index + 1}).png`
    };
  };

  // Generate an array of 9 partners based on the previous arcs design
  const partnerList = Array.from({ length: 9 }).map((_, i) => getPartnerData(i));

  return (
    <section className="w-full px-4 py-12 bg-[#FBF9F4] md:hidden">
      {/* Section Headings */}
      <div className="space-y-2 mb-8 text-center">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-[#B58A3D]">
          DEVELOPER PARTNERS
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#2C2C2C] leading-tight">
          Earth Sukham Developer Partners
        </h2>
      </div>

      {/* Mobile Grid Layout */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
        {partnerList.map((partner, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-2xl shadow-sm border border-[#B58A3D]/20 hover:shadow-md transition-all active:scale-95"
          >
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-3">
              <Image 
                src={partner.image} 
                alt={partner.name} 
                fill 
                sizes="64px"
                className="object-contain drop-shadow-sm" 
              />
            </div>
            <p className="text-[9px] sm:text-[11px] text-center font-bold text-gray-700 leading-tight line-clamp-2">
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}