import Image from "next/image";

export default function DeveloperPartners() {
  // Placeholder branding paths. Replace src with your exact local assets
  const partners = [
    { id: 1, name: "Kolte Patil", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200", positionClass: "bottom-0 left-[20%] -translate-x-1/2 translate-y-1/2" },
    { id: 2, name: "Godrej Properties", logo: "https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?q=80&w=200", positionClass: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
    { id: 3, name: "Trade Centre", logo: "https://images.unsplash.com/photo-1542744094-2ab25be78b90?q=80&w=200", positionClass: "bottom-0 right-[20%] translate-x-1/2 translate-y-1/2" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-24 overflow-hidden">
      {/* Section Headings */}
      <div className="space-y-2 mb-16">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A3D]">
          DEVELOPER PARTNERS
        </span>
        <h2 className="text-3xl font-serif text-[#2C2C2C] leading-tight">
          Earth Sukham Devloper Partners
        </h2>
      </div>

      {/* Concentric Arcs Arena */}
      <div className="relative max-w-2xl mx-auto h-[240px] md:h-[300px] border-b border-[#B58A3D]/40 mt-12">
        
        {/* Outer Ring Arc */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] aspect-square rounded-full border-2 border-[#B58A3D]/40 flex items-center justify-center">
          {/* Partner 1 (Kolte Patil Position placement left edge arc) */}
          <div className="absolute top-[30%] left-[6%] -translate-x-1/2 bg-white rounded-full p-2 w-16 h-16 md:w-20 md:h-20 shadow-md border border-gray-100 flex items-center justify-center z-20">
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden text-[9px] font-bold text-center text-gray-600">
              KOLTE PATIL
            </div>
          </div>

          {/* Partner 3 (Trade Centre Position placement right edge arc) */}
          <div className="absolute top-[30%] right-[6%] translate-x-1/2 bg-white rounded-full p-2 w-16 h-16 md:w-20 md:h-20 shadow-md border border-gray-100 flex items-center justify-center z-20">
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden text-[9px] font-bold text-center text-gray-600">
              TRADE CTR
            </div>
          </div>

          {/* Mid Ring Arc */}
          <div className="w-[70%] aspect-square rounded-full border-2 border-[#B58A3D]/50 flex items-center justify-center relative">
            {/* Partner 2 (Godrej Position placement dead top center) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 w-14 h-14 md:w-16 md:h-16 shadow-md border border-gray-100 flex items-center justify-center z-20">
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden text-[9px] font-bold text-[#E53935] tracking-tight">
                Godrej
              </div>
            </div>

            {/* Inner Base Arc */}
            <div className="w-[55%] aspect-square rounded-full border border-[#B58A3D]/30" />
          </div>
        </div>

      </div>
    </section>
  );
}