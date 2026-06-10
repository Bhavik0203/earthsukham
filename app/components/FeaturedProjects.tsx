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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Heading Info Block */}
        <div className="lg:col-span-4 flex flex-col justify-between py-2">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A3D]">Featured Projects</span>
            <h2 className="text-4xl font-serif text-[#2C2C2C] leading-tight">
              SPACES <br />That Define <br />Excellence
            </h2>
          </div>
          <button className="mt-8 self-start border border-[#B58A3D] text-[#B58A3D] px-5 py-2.5 rounded text-xs font-semibold flex items-center gap-2 hover:bg-[#B58A3D] hover:text-white transition">
            View All Projects <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Right Complex Structural Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Large Card */}
          <div className="md:col-span-1 h-[400px] relative group overflow-hidden rounded shadow-sm">
            <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${cards[0].img})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white"><ArrowUpRight size={16} /></span>
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="font-semibold text-sm tracking-wide">{cards[0].title}</h4>
              <p className="text-xs text-gray-300">{cards[0].desc}</p>
            </div>
          </div>

          {/* Center Column: Two Stacked Row Cards */}
          <div className="md:col-span-1 flex flex-col gap-4">
            {[cards[1], cards[2]].map((card) => (
              <div key={card.id} className="h-[192px] relative group overflow-hidden rounded shadow-sm">
                <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${card.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white"><ArrowUpRight size={16} /></span>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold text-xs tracking-wide">{card.title}</h4>
                  <p className="text-[10px] text-gray-300">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Tall Card */}
          <div className="md:col-span-1 h-[400px] relative group overflow-hidden rounded shadow-sm">
            <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${cards[3].img})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white"><ArrowUpRight size={16} /></span>
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="font-semibold text-sm tracking-wide">{cards[3].title}</h4>
              <p className="text-xs text-gray-300">{cards[3].desc}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}