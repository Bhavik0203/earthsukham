'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown, IndianRupee, Home, BarChart2 } from 'lucide-react';


interface PropertyItem {
  id: string;
  title: string;
  image: string;
  type: string;
  location: string;
  price: string;
  slug: string;
  description: string;
}

const DUMMY_PROPERTIES: PropertyItem[] = [
  {
    id: "1",
    title: "Earth Sukham - Phase 1",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=60",
    type: "2 & 3 BHK Apartments",
    location: "Kharadi, Pune",
    price: "₹75 Lakhs Onwards",
    slug: "earth-sukham-phase-1",
    description: "Experience luxurious living with world-class amenities in the heart of Kharadi."
  },
  {
    id: "2",
    title: "Sukham Elite",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60",
    type: "3 & 4 BHK Villas",
    location: "Wakad, Pune",
    price: "₹1.5 Cr Onwards",
    slug: "sukham-elite",
    description: "Premium villas designed for those who appreciate the finer things in life."
  },
  {
    id: "3",
    title: "Earth Meadows",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=60",
    type: "1 & 2 BHK Apartments",
    location: "Hinjewadi, Pune",
    price: "₹45 Lakhs Onwards",
    slug: "earth-meadows",
    description: "Smart homes with beautiful landscapes, perfect for the modern professional."
  },
  {
    id: "4",
    title: "Sukham Signature",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60",
    type: "4 BHK Penthouse",
    location: "Baner, Pune",
    price: "₹3.2 Cr Onwards",
    slug: "sukham-signature",
    description: "Exclusive penthouses offering panoramic city views and private pools."
  },
  {
    id: "5",
    title: "Earth Residency",
    image: "https://images.unsplash.com/photo-1600566753086-00f18efc2297?w=600&auto=format&fit=crop&q=60",
    type: "2 BHK Apartments",
    location: "Viman Nagar, Pune",
    price: "₹85 Lakhs Onwards",
    slug: "earth-residency",
    description: "Comfortable and spacious living in one of Pune's most vibrant neighborhoods."
  },
  {
    id: "6",
    title: "Sukham Heights",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=60",
    type: "3 BHK Apartments",
    location: "Kothrud, Pune",
    price: "₹1.2 Cr Onwards",
    slug: "sukham-heights",
    description: "High-rise living that combines luxury, convenience, and tranquility."
  }
];

export default function PropertyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<PropertyItem[]>(DUMMY_PROPERTIES);

  const filteredProperties = properties.filter(property => {
    const query = searchQuery.toLowerCase();
    return (
      property.title.toLowerCase().includes(query) || 
      property.location.toLowerCase().includes(query) ||
      property.type.toLowerCase().includes(query)
    );
  });

  const sidebarProperties = properties.slice(0, 6);

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

      {/* --- SEARCH COMPONENT --- */}
      <div className="max-w-5xl mx-auto px-4 relative z-10 -mt-20 mb-8">
        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] p-4 md:p-5 w-full border border-gray-100">
          {/* Top Row: Search Input & Button */}
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 stroke-[1.5]" />
              </div>
              <input 
                type="text" 
                placeholder="Search by Location, Projects or Builders" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#f8f9fa] border-0 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#b38e41]/30 focus:outline-none transition-all"
              />
            </div>
            <button className="bg-[#a37f37] text-white px-8 py-3 rounded-lg text-sm font-semibold shadow-sm hover:bg-[#8f6f2e] transition-colors whitespace-nowrap">
              Search
            </button>
          </div>

          {/* Bottom Row: Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Budget Filter */}
            <button className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] text-gray-600 hover:border-gray-300 transition-colors min-w-[120px]">
              <div className="flex items-center gap-1.5">
                <IndianRupee className="h-3.5 w-3.5 text-[#d4af37]" />
                <span>Budget</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </button>

            {/* Property Type Filter */}
            <button className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] text-gray-600 hover:border-gray-300 transition-colors min-w-[140px]">
              <div className="flex items-center gap-1.5">
                <Home className="h-3.5 w-3.5 text-[#d4af37]" />
                <span>Property Type</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </button>

            {/* Project Status Filter */}
            <button className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] text-gray-600 hover:border-gray-300 transition-colors min-w-[140px]">
              <div className="flex items-center gap-1.5">
                <BarChart2 className="h-3.5 w-3.5 text-[#d4af37]" />
                <span>Project Status</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <h2 className="text-2xl md:text-3xl font-serif text-zinc-800 mb-8">
          Explore Luxury Properties
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: MAIN LISTINGS CONTAINER (2 Columns wide) */}
          <div className="lg:col-span-2 space-y-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Link 
                  href={`/properties/${property.slug}`}
                  key={property.id} 
                  className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 flex flex-col md:flex-row gap-6 transition-all hover:shadow-md hover:border-[#b38e41]/30 block group"
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
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-5 line-clamp-2">
                      {property.description}
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
                    <span className="inline-block bg-gradient-to-r from-[#c49a45] to-[#785921] group-hover:brightness-105 text-white text-sm font-semibold px-8 py-3 rounded-lg shadow-md transition-all active:scale-[0.98]">
                      Enquire Now
                    </span>
                  </div>
                </div>
              </Link>
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[#b38e41]/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-[#b38e41]" />
                </div>
                <h3 className="text-2xl font-serif text-gray-900 mb-2">Couldn't find your property?</h3>
                <p className="text-sm text-gray-500 mb-8 max-w-md">
                  Don't worry! Leave your details below and our experts will contact you with properties matching <strong>"{searchQuery}"</strong> or similar nearby options.
                </p>
                
                <form className="w-full max-w-md space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="text-left">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#b38e41]/30 focus:border-[#b38e41] transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="text-left">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#b38e41]/30 focus:border-[#b38e41] transition-all outline-none"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#c49a45] to-[#785921] hover:brightness-105 text-white font-semibold py-3.5 rounded-lg shadow-md transition-all active:scale-[0.98] mt-2"
                  >
                    Request a Callback
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="mt-4 text-sm text-gray-500 hover:text-[#b38e41] transition-colors underline block mx-auto"
                  >
                    Or clear search and try again
                  </button>
                </form>
              </div>
            )}
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
            {sidebarProperties.map((property) => (
              <Link 
                href={`/properties/${property.slug}`}
                key={property.id} 
                className="flex flex-col gap-1 p-3 rounded-xl hover:bg-[#b38e41]/5 border border-transparent hover:border-[#b38e41]/20 transition-all cursor-pointer block"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded overflow-hidden shrink-0">
                      <Image 
                        src={property.image} 
                        alt={property.title} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-800">{property.price}</p>
                      <p className="text-[11px] text-gray-500 line-clamp-1 max-w-[120px]">{property.title}</p>
                      <p className="text-[10px] text-gray-400">{property.location}</p>
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
              </Link>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}