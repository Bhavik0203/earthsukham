import { MapPin } from "lucide-react";

export default function ExploreByLocation() {
  const locations = [
    { name: "HINJEWADI", count: 24 },
    { name: "WAKAD", count: 24 },
    { name: "PUNAWALE", count: 24 },
    { name: "BANER", count: 24 },
    { name: "BALEWADI", count: 24 },
    { name: "TATHWADE", count: 24 },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#A68037] via-[#7D5F23] to-[#543F14] py-16 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Heading */}
        <h2 className="text-center font-serif text-2xl md:text-3xl tracking-wide text-[#FDF6E2]">
          Explore by Location
        </h2>

        {/* Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center py-10 px-4 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-center border border-white/10 group cursor-pointer"
            >
              <div className="flex items-center gap-2 font-semibold text-sm md:text-base tracking-widest text-white group-hover:text-[#FDF6E2] transition-colors">
                <MapPin size={16} className="text-white/80" />
                {loc.name}
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-1">
                {loc.count} Projects
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}