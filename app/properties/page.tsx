import React from 'react';
import Image from 'next/image';

// --- Mock Data ---
const MAIN_PROPERTIES = [
  {
    id: 1,
    title: "Godrej Township, VTP Blue Waters Township",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60",
    type: "3 & 4 BHK Apartments",
    location: "Pimple Nilakh, Pune",
    price: "₹1.75Cr* Onwards"
  },
  {
    id: 2,
    title: "Godrej Township, VTP Blue Waters Township",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=60",
    type: "3 & 4 BHK Apartments",
    location: "Pimple Nilakh, Pune",
    price: "₹1.75Cr* Onwards"
  },
  {
    id: 3,
    title: "Godrej Township, VTP Blue Waters Township",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=60",
    type: "3 & 4 BHK Apartments",
    location: "Pimple Nilakh, Pune",
    price: "₹1.75Cr* Onwards"
  },
  {
    id: 4,
    title: "Shapoorji Pallonji Joyville, Sensorium",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60",
    type: "2 & 3 BHK Smart Homes",
    location: "Hinjawadi, Pune",
    price: "₹85L* Onwards"
  },
  {
    id: 5,
    title: "Kolte Patil Life Republic",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=60",
    type: "1, 2 & 3 BHK Apartments",
    location: "Marunji, Hinjawadi, Pune",
    price: "₹45L - 1.2Cr* Onwards"
  },
  {
    id: 6,
    title: "Kharadi Premium Towers, Kohinoor Presidential",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60",
    type: "3 & 4.5 BHK Ultra-Luxury",
    location: "Kharadi, Pune",
    price: "₹2.45Cr* Onwards"
  },
  {
    id: 7,
    title: "Lush Meadows Villas, Sobha Elite",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=60",
    type: "4 BHK Duplex Villas",
    location: "Undri, Pune",
    price: "₹3.80Cr* Onwards"
  }
];

const SIDEBAR_PROPERTIES = [
  { id: 1, price: "₹ 99.0L - 1.56Cr", title: "Godrej Township,", location: "Wakad, Pune" },
  { id: 2, price: "₹ 99.0L - 1.56Cr", title: "Godrej Township,", location: "Wakad, Pune" },
  { id: 3, price: "₹ 1.25L - 1.56Cr", title: "Godrej Township,", location: "Wakad, Pune" },
  { id: 4, price: "₹ 1.10Cr - 2.10Cr", title: "Lupine Vista Apartments", location: "Baner, Pune" },
  { id: 5, price: "₹ 75.0L - 1.30Cr", title: "Pride World City, Kingsbury", location: "Charholi Budruk, Pune" },
  { id: 6, price: "₹ 1.65Cr - 3.20Cr", title: "Gera World of Joy", location: "Kharadi, Pune" }
];

export default function PropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-12">
      
      {/* --- HERO BANNER --- */}
      <section className="relative overflow-hidden rounded-2xl m-2">
               <div className="relative h-[260px] w-full md:h-[420px]">
                 <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80" 
                   alt="Blog banner"
                   fill
                   priority
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-black/70" />
               </div>
     
               <div className="absolute inset-0 flex items-center">
                 <div className="w-full px-6">
                   <div className="mx-auto w-full max-w-7xl">
                     <div className="max-w-3xl">
                       <div className="text-sm font-semibold tracking-[0.2em] text-[#ffee50]">
                         Home / Properties
                       </div>
                       <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl font-raleway">
                        Our Properties
                       </h1>
                     </div>
                   </div>
                 </div>
               </div>
             </section>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <h2 className="text-2xl md:text-3xl font-serif text-zinc-800 mb-8">
          Explore Luxury Properties
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: MAIN LISTINGS CONTAINER (2 Columns wide) */}
          <div className="lg:col-span-2 space-y-6">
            {MAIN_PROPERTIES.map((property) => (
              <div 
                key={property.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 flex flex-col md:flex-row gap-6 transition-all hover:shadow-md"
              >
                {/* Property Image */}
                <div className="relative w-full md:w-[240px] h-[200px] md:h-[270px] shrink-0 rounded-xl overflow-hidden shadow-sm">
                  <Image 
                    src={property.image} 
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Property Details */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl md:text-[22px] font-serif font-medium text-zinc-900 leading-snug mb-3">
                      {property.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem is simply dummytheprintinglorem Ipsum is simply dummy text of the printing and typesetting industry Lorem ipsum simply dummy text.
                    </p>
                  </div>

                  {/* Specification Box */}
                  <div className="grid grid-cols-3 border border-[#b38e41]/30 rounded-xl overflow-hidden mb-5 bg-white">
                    <div className="p-3.5 border-r border-[#b38e41]/20 text-left">
                      <span className="block text-[11px] uppercase tracking-wider text-[#b38e41] font-bold mb-1">Type</span>
                      <span className="text-xs md:text-[13px] font-semibold text-zinc-800 leading-tight block">{property.type}</span>
                    </div>
                    <div className="p-3.5 border-r border-[#b38e41]/20 text-left">
                      <span className="block text-[11px] uppercase tracking-wider text-[#b38e41] font-bold mb-1">Location</span>
                      <span className="text-xs md:text-[13px] font-semibold text-zinc-800 leading-tight block">{property.location}</span>
                    </div>
                    <div className="p-3.5 text-left">
                      <span className="block text-[11px] uppercase tracking-wider text-[#b38e41] font-bold mb-1">Price</span>
                      <span className="text-xs md:text-[13px] font-semibold text-zinc-800 leading-tight block">{property.price}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    <button className="bg-gradient-to-r from-[#c49a45] to-[#785921] hover:brightness-105 text-white text-sm font-semibold px-8 py-3 rounded-lg shadow-md transition-all active:scale-[0.98]">
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: SIDEBAR WIDGETS (1 Column wide) */}
          <div className="space-y-4 lg:sticky lg:top-6">
            
            {/* Featured New Launch Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative">
              <div className="relative h-[220px] w-full bg-zinc-900">
                <Image 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80" 
                  alt="New Launch" 
                  fill
                  className="object-cover opacity-70"
                />
                {/* Yellow Tag */}
                <div className="absolute top-0 left-0 bg-[#d4af37] text-white text-[10px] font-bold px-4 py-1 tracking-wider uppercase">
                  New Launch
                </div>
                
                {/* Bottom Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold">99.0L - 1.56Cr</p>
                    <p className="text-[11px] opacity-80">Godrej Township, Wakad, Pune</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="bg-[#b38e41] text-white text-[10px] px-3 py-1.5 rounded font-medium">
                      View Details
                    </button>
                    <button className="bg-zinc-800 text-white p-1.5 rounded" aria-label="Call">
                      📞
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Mini-Listings */}
            {SIDEBAR_PROPERTIES.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex items-center justify-between gap-3 hover:border-amber-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded overflow-hidden shrink-0">
                    <Image 
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&auto=format&fit=crop&q=60" 
                      alt="Thumbnail" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800">{item.price}</p>
                    <p className="text-[11px] text-gray-500">{item.title}</p>
                    <p className="text-[10px] text-gray-400">{item.location}</p>
                  </div>
                </div>
                
                {/* Arrow Action Icon */}
                <button 
                  className="w-7 h-7 rounded-full border border-amber-200 flex items-center justify-center text-[#b38e41] hover:bg-amber-50 text-sm transition-colors"
                  aria-label="View Info"
                >
                  ↗
                </button>
              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}