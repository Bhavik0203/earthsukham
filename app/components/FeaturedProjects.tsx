import { ArrowUpRight } from "lucide-react";

export default function FeaturedProjects() {
  const cards = [
    { id: 1, size: "large", title: "GODREJ TOWNSHIP", desc: "2 & 3 Bed Residences", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600" },
    { id: 2, size: "small", title: "GODREJ TOWNSHIP", desc: "2 & 3 Bed Residences", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600" },
    { id: 3, size: "small", title: "GODREJ TOWNSHIP", desc: "2 & 3 Bed Residences", img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=600" },
    { id: 4, size: "tall", title: "GODREJ TOWNSHIP", desc: "2 & 3 Bed Residences", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left Heading Info Block */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <span className="text-sm font-serif uppercase tracking-widest font-semibold text-[#C19B54]">Featured Projects</span>
            <h2 className="text-5xl lg:text-6xl font-serif text-[#2C2C2C] leading-[1.15]">
              SPACES <br />That Define <br />Excellence
            </h2>
          </div>
          <button className="self-start border border-[#C19B54]/50 text-[#2C2C2C] bg-white px-6 py-3 text-sm font-semibold flex items-center gap-3 hover:bg-[#FBF9F4] transition shadow-sm">
            View All Projects <ArrowUpRight size={16} className="text-[#C19B54]" />
          </button>
        </div>

        {/* Right Complex Structural Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Main Large Card */}
          <div className="md:col-span-1 h-[420px] relative group overflow-hidden rounded-md shadow-sm">
            <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${cards[0].img})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent" />
            <span className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm rounded-full p-2 text-white shadow-sm"><ArrowUpRight size={16} /></span>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <h4 className="font-serif font-bold text-lg tracking-wide mb-1 shadow-sm">{cards[0].title}</h4>
              <div className="flex items-center gap-3">
                <p className="text-[11px] font-medium text-gray-200 tracking-wider uppercase">{cards[0].desc}</p>
                <div className="h-[1px] flex-grow bg-[#C19B54]"></div>
              </div>
            </div>
          </div>

          {/* Center Column: Two Stacked Row Cards */}
          <div className="md:col-span-1 flex flex-col gap-4">
            {[cards[1], cards[2]].map((card) => (
              <div key={card.id} className="h-[202px] relative group overflow-hidden rounded-md shadow-sm">
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${card.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent" />
                <span className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm rounded-full p-2 text-white shadow-sm"><ArrowUpRight size={16} /></span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-serif font-bold text-base tracking-wide mb-1 shadow-sm">{card.title}</h4>
                  <div className="flex items-center gap-3">
                    <p className="text-[9px] font-medium text-gray-200 tracking-wider uppercase">{card.desc}</p>
                    <div className="h-[1px] flex-grow bg-[#C19B54]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Tall Card */}
          <div className="md:col-span-1 h-[420px] relative group overflow-hidden rounded-md shadow-sm">
            <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${cards[3].img})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent" />
            <span className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm rounded-full p-2 text-white shadow-sm"><ArrowUpRight size={16} /></span>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <h4 className="font-serif font-bold text-lg tracking-wide mb-1 shadow-sm">{cards[3].title}</h4>
              <div className="flex items-center gap-3">
                <p className="text-[11px] font-medium text-gray-200 tracking-wider uppercase">{cards[3].desc}</p>
                <div className="h-[1px] flex-grow bg-[#C19B54]"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}