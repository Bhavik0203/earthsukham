"use client";
import Image from "next/image";
import { useState } from "react";
export default function DeveloperPartners() {
  const [partners, setPartners] = useState<any[]>([]);

  const getPartnerData = (index: number) => {
    if (partners[index]) {
      return {
        name: partners[index].name || partners[index].company || `Developer Partner ${index + 1}`,
        image: partners[index].photoUrl || `/images/partner (${index + 1}).png`
      };
    }
    return {
      name: index === 0 ? "Kolte Patil" : index === 3 ? "Trade Centre" : index === 6 ? "Godrej" : `Developer Partner ${index + 1}`,
      image: `/images/partner (${index + 1}).png`
    };
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 bg-[#FBF9F4]">
      {/* Section Headings */}
      <div className="space-y-2 mb-12">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A3D]">
          DEVELOPER PARTNERS
        </span>
        <h2 className="text-3xl font-serif text-[#2C2C2C] leading-tight">
          Earth Sukham Devloper Partners
        </h2>
      </div>

      {/* Concentric Arcs Container */}
      <div className="relative max-w-3xl mx-auto h-[260px] md:h-[320px] border-b border-[#B58A3D]/30 mt-16 [clip-path:polygon(-100%_-100%,_200%_-100%,_200%_100%,_-100%_100%)]">
        
        {/* --- ARC 1: OUTER LARGE RING - Clockwise --- */}
        <div className="absolute bottom-0 left-1/2 w-[85%] aspect-square -translate-x-1/2 translate-y-1/2 z-10 pointer-events-none">
          <div className="w-full h-full rounded-full border-2 border-[#D4AF37] animate-[spin_40s_linear_infinite] group/ring hover:[animation-play-state:paused]">
            {/* Partner 1 */}
            <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group/logo z-10 hover:z-50">
              <div className="animate-[spin_40s_linear_infinite_reverse] group-hover/ring:[animation-play-state:paused]">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl border border-amber-200/40 p-1 flex items-center justify-center transform group-hover/logo:scale-150 transition-all duration-300 relative">
                  <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    <Image src={getPartnerData(0).image} alt={getPartnerData(0).name} fill sizes="100px" className="object-contain p-1" />
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover/logo:mb-8 opacity-0 group-hover/logo:opacity-100 transition-all duration-300 whitespace-nowrap bg-white border border-[#D4AF37]/50 text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded shadow-lg pointer-events-none">
                  {getPartnerData(0).name}
                </div>
              </div>
            </div>
            {/* Partner 2 */}
            <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group/logo z-10 hover:z-50">
              <div className="animate-[spin_40s_linear_infinite_reverse] group-hover/ring:[animation-play-state:paused]">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl border border-amber-200/40 p-1 flex items-center justify-center transform group-hover/logo:scale-150 transition-all duration-300 relative">
                  <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    <Image src={getPartnerData(1).image} alt={getPartnerData(1).name} fill sizes="100px" className="object-contain p-1" />
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover/logo:mb-8 opacity-0 group-hover/logo:opacity-100 transition-all duration-300 whitespace-nowrap bg-white border border-[#D4AF37]/50 text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded shadow-lg pointer-events-none">
                  {getPartnerData(1).name}
                </div>
              </div>
            </div>
            {/* Partner 3 */}
            <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group/logo z-10 hover:z-50">
              <div className="animate-[spin_40s_linear_infinite_reverse] group-hover/ring:[animation-play-state:paused]">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl border border-amber-200/40 p-1 flex items-center justify-center transform group-hover/logo:scale-150 transition-all duration-300 relative">
                  <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    <Image src={getPartnerData(2).image} alt={getPartnerData(2).name} fill sizes="100px" className="object-contain p-1" />
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover/logo:mb-8 opacity-0 group-hover/logo:opacity-100 transition-all duration-300 whitespace-nowrap bg-white border border-[#D4AF37]/50 text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded shadow-lg pointer-events-none">
                  {getPartnerData(2).name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ARC 2: MIDDLE RING - Anti-Clockwise --- */}
        <div className="absolute bottom-0 left-1/2 w-[60%] aspect-square -translate-x-1/2 translate-y-1/2 z-10 pointer-events-none">
          <div className="w-full h-full rounded-full border-2 border-[#D4AF37] animate-[spin_30s_linear_infinite_reverse] group/ring hover:[animation-play-state:paused]">
            {/* Partner 4 */}
            <div className="absolute top-[11.7%] left-[17.9%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group/logo z-10 hover:z-50">
              <div className="animate-[spin_30s_linear_infinite] group-hover/ring:[animation-play-state:paused]">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-xl border border-amber-200/40 p-1 flex items-center justify-center transform group-hover/logo:scale-150 transition-all duration-300 relative">
                  <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    <Image src={getPartnerData(3).image} alt={getPartnerData(3).name} fill sizes="100px" className="object-contain p-1" />
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover/logo:mb-8 opacity-0 group-hover/logo:opacity-100 transition-all duration-300 whitespace-nowrap bg-white border border-[#D4AF37]/50 text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded shadow-lg pointer-events-none">
                  {getPartnerData(3).name}
                </div>
              </div>
            </div>
            {/* Partner 5 */}
            <div className="absolute top-[97%] left-[32.9%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group/logo z-10 hover:z-50">
              <div className="animate-[spin_30s_linear_infinite] group-hover/ring:[animation-play-state:paused]">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-xl border border-amber-200/40 p-1 flex items-center justify-center transform group-hover/logo:scale-150 transition-all duration-300 relative">
                  <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    <Image src={getPartnerData(4).image} alt={getPartnerData(4).name} fill sizes="100px" className="object-contain p-1" />
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover/logo:mb-8 opacity-0 group-hover/logo:opacity-100 transition-all duration-300 whitespace-nowrap bg-white border border-[#D4AF37]/50 text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded shadow-lg pointer-events-none">
                  {getPartnerData(4).name}
                </div>
              </div>
            </div>
            {/* Partner 6 */}
            <div className="absolute top-[41.3%] left-[99.2%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group/logo z-10 hover:z-50">
              <div className="animate-[spin_30s_linear_infinite] group-hover/ring:[animation-play-state:paused]">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-xl border border-amber-200/40 p-1 flex items-center justify-center transform group-hover/logo:scale-150 transition-all duration-300 relative">
                  <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    <Image src={getPartnerData(5).image} alt={getPartnerData(5).name} fill sizes="100px" className="object-contain p-1" />
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover/logo:mb-8 opacity-0 group-hover/logo:opacity-100 transition-all duration-300 whitespace-nowrap bg-white border border-[#D4AF37]/50 text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded shadow-lg pointer-events-none">
                  {getPartnerData(5).name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ARC 3: INNER RING - Clockwise --- */}
        <div className="absolute bottom-0 left-1/2 w-[38%] aspect-square -translate-x-1/2 translate-y-1/2 z-10 pointer-events-none">
          <div className="w-full h-full rounded-full border-2 border-[#D4AF37] animate-[spin_20s_linear_infinite] group/ring hover:[animation-play-state:paused]">
            {/* Partner 7 */}
            <div className="absolute top-[11.7%] left-[82.1%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group/logo z-10 hover:z-50">
              <div className="animate-[spin_20s_linear_infinite_reverse] group-hover/ring:[animation-play-state:paused]">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-xl border border-amber-200/40 p-1 flex items-center justify-center transform group-hover/logo:scale-150 transition-all duration-300 relative">
                  <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    <Image src={getPartnerData(6).image} alt={getPartnerData(6).name} fill sizes="100px" className="object-contain p-1" />
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover/logo:mb-8 opacity-0 group-hover/logo:opacity-100 transition-all duration-300 whitespace-nowrap bg-white border border-[#D4AF37]/50 text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded shadow-lg pointer-events-none">
                  {getPartnerData(6).name}
                </div>
              </div>
            </div>
            {/* Partner 8 */}
            <div className="absolute top-[41.3%] left-[0.8%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group/logo z-10 hover:z-50">
              <div className="animate-[spin_20s_linear_infinite_reverse] group-hover/ring:[animation-play-state:paused]">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-xl border border-amber-200/40 p-1 flex items-center justify-center transform group-hover/logo:scale-150 transition-all duration-300 relative">
                  <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    <Image src={getPartnerData(7).image} alt={getPartnerData(7).name} fill sizes="100px" className="object-contain p-1" />
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover/logo:mb-8 opacity-0 group-hover/logo:opacity-100 transition-all duration-300 whitespace-nowrap bg-white border border-[#D4AF37]/50 text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded shadow-lg pointer-events-none">
                  {getPartnerData(7).name}
                </div>
              </div>
            </div>
            {/* Partner 9 */}
            <div className="absolute top-[97%] left-[67.1%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto group/logo z-10 hover:z-50">
              <div className="animate-[spin_20s_linear_infinite_reverse] group-hover/ring:[animation-play-state:paused]">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-xl border border-amber-200/40 p-1 flex items-center justify-center transform group-hover/logo:scale-150 transition-all duration-300 relative">
                  <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center overflow-hidden relative">
                    <Image src={getPartnerData(8).image} alt={getPartnerData(8).name} fill sizes="100px" className="object-contain p-1" />
                  </div>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 group-hover/logo:mb-8 opacity-0 group-hover/logo:opacity-100 transition-all duration-300 whitespace-nowrap bg-white border border-[#D4AF37]/50 text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded shadow-lg pointer-events-none">
                  {getPartnerData(8).name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SMALL BASE ARCH (Center Core) --- */}
        <div className="absolute bottom-0 left-1/2 w-[18%] aspect-square -translate-x-1/2 translate-y-1/2 rounded-full border border-[#B58A3D]/40 z-10 pointer-events-none" />

      </div>
    </section>
  );
}