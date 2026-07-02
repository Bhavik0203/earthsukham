"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Share2, Heart, Phone, Download, Bed, Bath, Maximize, CalendarDays, Check, Car, ArrowUp, ArrowDown, Sofa, Dumbbell, Waves, Footprints, Gamepad2, GlassWater, ChevronUp, ChevronDown, QrCode } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const SIMILAR_PROPERTIES = [
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

export default function PropertyDetailsPage() {
  const [isProsOpen, setIsProsOpen] = useState(false);
  const [isConsOpen, setIsConsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'location', 'pros-and-cons', 'amenities', 'pricing-and-unit-plans'];
      let current = 'Overview';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 140) {
            if (section === 'overview') current = 'Overview';
            if (section === 'location') current = 'Location';
            if (section === 'pros-and-cons') current = 'Pros & Cons';
            if (section === 'amenities') current = 'Amenities';
            if (section === 'pricing-and-unit-plans') current = 'Pricing & Unit Plans';
          }
        }
      }
      
      setActiveTab(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (tab: string) => {
    setActiveTab(tab);
    let id = '';
    if (tab === 'Overview') id = 'overview';
    if (tab === 'Location') id = 'location';
    if (tab === 'Pros & Cons') id = 'pros-and-cons';
    if (tab === 'Amenities') id = 'amenities';
    if (tab === 'Pricing & Unit Plans') id = 'pricing-and-unit-plans';
    
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Banner Section */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <Image 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80" 
          alt="Property Banner" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto rounded-xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.06)] bg-white border border-gray-100 -mt-16 md:-mt-38 relative z-10 mx-4 xl:mx-auto">
        
        {/* Header Section */}
        <div className="bg-white px-6 py-5 border-b border-gray-100">
          
          {/* Top Info Bar (Breadcrumbs & Last Updated) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[12px] md:text-[13px] text-gray-500 mb-4 gap-2">
            <div className="flex items-center flex-wrap gap-1">
              <span className="hover:text-purple-600 cursor-pointer transition-colors">Home</span>
              <span>/</span>
              <span className="hover:text-purple-600 cursor-pointer transition-colors">Pune</span>
              <span>/</span>
              <span className="hover:text-purple-600 cursor-pointer transition-colors">Baner</span>
              <span>/</span>
              <span className="hover:text-purple-600 cursor-pointer transition-colors">House for Sale in Baner</span>
              <span>/</span>
              <span className="text-gray-800">4.5 BHK Independent House</span>
             
            </div>
            <div>Last updated: Jun 26, 2026</div>
          </div>

          {/* Main Header Content */}
          <div className="flex flex-col md:flex-row justify-between items-start">
            
            {/* Left Column */}
            <div className="flex-1 pr-4">
              <div className="flex items-center flex-wrap gap-4 mb-2">
                <h1 className="text-2xl md:text-[28px] font-semibold text-gray-900 leading-tight">
                  4.5 BHK Independent House
                </h1>
                <div className="flex items-center gap-1.5 text-[#6c2bd9]">
                  <button className="hover:bg-purple-50 p-1.5 rounded-full transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                 
                </div>
              </div>
              <p className="text-[13px] text-gray-900 mb-2 font-medium">
                By <span className="text-[#6c2bd9] uppercase tracking-wide cursor-pointer hover:underline">PARANJAPE SCHEMES CONSTRUCTION LTD.</span>
              </p>
              <p className="text-[14px] text-gray-500">
                Paranjape Vasant Vihar, Vasant Vihar, Baner, Pune
              </p>
            </div>
            
            {/* Right Column */}
            <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end w-full md:w-auto">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-[28px] md:text-[32px] font-bold text-gray-900 leading-none tracking-tight">₹10.0 Cr</span>
                <span className="text-[14px] text-[#6c2bd9] font-medium mb-1">EMI starts at ₹4.96 Lacs</span>
              </div>
              <div className="text-[13px] text-gray-500 mb-4 w-full md:text-right">
                ₹22.22 K/sq.ft
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#6c2bd9] hover:bg-[#5b21b6] text-white text-[15px] font-medium rounded-md shadow-sm transition-colors w-full md:w-auto">
                <Phone className="w-4 h-4" />
                Contact Seller
              </button>
            </div>
            
          </div>
        </div>

        {/* Image Gallery */}
        <div className="p-4 md:p-5">
          <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[420px]">
            {/* Main Image */}
            <div className="lg:w-[58%] h-[300px] lg:h-full relative rounded-lg overflow-hidden shadow-sm">
              <Image 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80" 
                alt="Property Main View" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Right Grid */}
            <div className="lg:w-[42%] grid grid-cols-2 grid-rows-2 gap-3 h-[400px] lg:h-full">
              <div className="relative rounded-lg overflow-hidden shadow-sm">
                <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=60" alt="Gallery 1" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative rounded-lg overflow-hidden shadow-sm">
                <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=60" alt="Gallery 2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative rounded-lg overflow-hidden shadow-sm">
                <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60" alt="Gallery 3" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="relative rounded-lg overflow-hidden shadow-sm">
                <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=60" alt="Gallery 4" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
        
      </div>
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 max-w-7xl mx-auto mt-8 bg-[#b38e41] rounded-t-xl px-6 py-4 flex flex-wrap gap-x-8 gap-y-3 text-white font-medium text-[15px] shadow-md">
        {['Overview', 'Location', 'Video', 'Pros & Cons', 'Amenities', 'Master & Floor Plans', 'Pricing & Unit Plans'].map((tab) => (
          <span 
            key={tab}
            onClick={() => handleScrollTo(tab)}
            className={`cursor-pointer transition-colors ${activeTab === tab ? 'border-b-[3px] border-white pb-1 font-semibold' : 'hover:text-gray-200'}`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Overview & Location) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Overview Card */}
          <div id="overview" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-28">
            <div className="bg-[#fbf9f4] px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-[22px] font-serif text-gray-900 font-semibold">KP Life Republic Township Overview</h2>
              <button className="flex items-center gap-2 px-5 py-2 bg-[#15803d] text-white text-[14px] font-medium rounded shadow-sm hover:bg-green-700 transition-colors">
                Brochure <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Row 1 */}
                <div className="border border-[#b38e41]/30 rounded-md flex items-center justify-center gap-3 p-3">
                  <Bed className="w-8 h-8 text-[#b38e41] font-light stroke-[1.5]" />
                  <div className="text-center leading-tight">
                    <span className="block text-[14px] font-bold text-gray-800">4</span>
                    <span className="block text-[12px] text-[#b38e41] font-medium">Beds</span>
                  </div>
                </div>
                <div className="border border-[#b38e41]/30 rounded-md flex items-center justify-center gap-3 p-3">
                  <Bath className="w-8 h-8 text-[#b38e41] font-light stroke-[1.5]" />
                  <div className="text-center leading-tight">
                    <span className="block text-[14px] font-bold text-gray-800">3</span>
                    <span className="block text-[12px] text-[#b38e41] font-medium">Beds</span>
                  </div>
                </div>
                <div className="border border-[#b38e41]/30 rounded-md flex items-center justify-center gap-3 p-3 col-span-2 md:col-span-1">
                  <Bath className="w-8 h-8 text-[#b38e41] font-light stroke-[1.5]" />
                  <div className="text-center leading-tight">
                    <span className="block text-[13px] font-bold text-gray-800 tracking-tight">769sq.ft - 1599sq.ft</span>
                    <span className="block text-[12px] text-[#b38e41] font-medium">Baths</span>
                  </div>
                </div>
                <div className="border border-[#b38e41]/30 rounded-md flex items-center justify-center gap-3 p-3">
                  <Bath className="w-8 h-8 text-[#b38e41] font-light stroke-[1.5]" />
                  <div className="text-center leading-tight">
                    <span className="block text-[14px] font-bold text-gray-800">2026</span>
                    <span className="block text-[12px] text-[#b38e41] font-medium">Year</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="border border-[#b38e41]/30 rounded-md flex items-center justify-center gap-3 p-3">
                  <Bed className="w-8 h-8 text-[#b38e41] font-light stroke-[1.5]" />
                  <div className="text-center leading-tight">
                    <span className="block text-[14px] font-bold text-gray-800">4</span>
                    <span className="block text-[12px] text-[#b38e41] font-medium">Beds</span>
                  </div>
                </div>
                <div className="border border-[#b38e41]/30 rounded-md flex items-center justify-center gap-3 p-3">
                  <Bath className="w-8 h-8 text-[#b38e41] font-light stroke-[1.5]" />
                  <div className="text-center leading-tight">
                    <span className="block text-[14px] font-bold text-gray-800">3</span>
                    <span className="block text-[12px] text-[#b38e41] font-medium">Beds</span>
                  </div>
                </div>
                <div className="border border-[#b38e41]/30 rounded-md flex items-center justify-center gap-3 p-3 col-span-2 md:col-span-1">
                  <Bath className="w-8 h-8 text-[#b38e41] font-light stroke-[1.5]" />
                  <div className="text-center leading-tight">
                    <span className="block text-[13px] font-bold text-gray-800 tracking-tight">769sq.ft - 1599sq.ft</span>
                    <span className="block text-[12px] text-[#b38e41] font-medium">Baths</span>
                  </div>
                </div>
                <div className="border border-[#b38e41]/30 rounded-md flex items-center justify-center gap-3 p-3">
                  <Bath className="w-8 h-8 text-[#b38e41] font-light stroke-[1.5]" />
                  <div className="text-center leading-tight">
                    <span className="block text-[14px] font-bold text-gray-800">2026</span>
                    <span className="block text-[12px] text-[#b38e41] font-medium">Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div id="location" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-28">
            <div className="bg-[#fbf9f4] px-6 py-4 border-b border-gray-100">
              <h2 className="text-[22px] font-serif text-gray-900 font-semibold">KP Life Republic Township Location</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side: Data */}
                <div className="flex flex-col justify-center gap-6">
                  <p className="text-gray-800 text-xl font-bold">Near Nargis Dutt Rd, Chowk, Pali Hill, Pune</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2.5 text-gray-800 font-semibold text-[15px]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#b38e41]" /> Linking Road Market - 2km
                    </li>
                    <li className="flex items-center gap-2.5 text-gray-800 font-semibold text-[15px]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#b38e41]" /> S.V Road - 1km
                    </li>
                    <li className="flex items-center gap-2.5 text-gray-800 font-semibold text-[15px]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#b38e41]" /> Khar Railway Station - 1.5 Km
                    </li>
                  </ul>
                </div>

                {/* Right Side: Map */}
                <div className="relative h-[250px] md:h-full min-h-[250px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <iframe
                    src="https://maps.google.com/maps?q=Baner,+Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Pros & Cons Card */}
          <div id="pros-and-cons" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-28">
            <div className="bg-[#fbf9f4] px-6 py-4 border-b border-gray-100">
              <h2 className="text-[22px] font-serif text-gray-900 font-semibold">KP Life Republic Township Pro & Cons</h2>
            </div>
            <div className="p-6 space-y-4">
              <div 
                className="space-y-3"
                onMouseEnter={() => setIsProsOpen(true)}
                onMouseLeave={() => setIsProsOpen(false)}
              >
                <div className="bg-[#dcfce7] rounded-md px-5 py-3 flex justify-between items-center cursor-pointer hover:bg-[#cbf7d8] transition-colors">
                  <span className="text-gray-800 font-semibold text-[15px]">👍 Pros</span>
                  {isProsOpen ? <ArrowUp className="w-4 h-4 text-gray-800" /> : <ArrowDown className="w-4 h-4 text-gray-800" />}
                </div>
                {isProsOpen && (
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-[14px] px-2 pb-2">
                    <li>Excellent location with easy access to major highways and city centers.</li>
                    <li>Spacious layouts offering premium quality fittings and modern amenities.</li>
                  </ul>
                )}
              </div>

              <div 
                className="space-y-3"
                onMouseEnter={() => setIsConsOpen(true)}
                onMouseLeave={() => setIsConsOpen(false)}
              >
                <div className="bg-[#cda4a4] rounded-md px-5 py-3 flex justify-between items-center cursor-pointer hover:bg-[#bf9797] transition-colors">
                  <span className="text-gray-900 font-semibold text-[15px]">👎 Cons</span>
                  {isConsOpen ? <ArrowUp className="w-4 h-4 text-gray-900" /> : <ArrowDown className="w-4 h-4 text-gray-900" />}
                </div>
                {isConsOpen && (
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-[14px] px-2 pb-2">
                    <li>Traffic congestion during peak office hours in the vicinity.</li>
                    <li>Slightly higher maintenance charges compared to the market average.</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Unit Plan Card */}
          <div id="pricing-and-unit-plans" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-28">
            <div className="bg-[#fbf9f4] px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-[22px] font-serif text-gray-900 font-semibold">KP Life Republic Township Pricing & Unit Plan</h2>
              <button className="flex items-center gap-1.5 px-4 py-1.5 bg-[#15803d] text-white text-[13px] font-medium rounded shadow-sm hover:bg-green-700 transition-colors">
                Price Sheet <Download className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Side: Tabs and Specs */}
                <div>
                  <div className="flex gap-6 border-b border-gray-200 mb-6">
                    <button className="text-[17px] font-bold text-gray-900 pb-2">3BHK</button>
                    <button className="text-[17px] font-bold text-[#b38e41] border-b-2 border-[#b38e41] pb-2">4BHK</button>
                  </div>
                  
                  <p className="text-gray-700 font-medium text-[15px] mb-8">1768 Sqft</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="border border-[#b38e41]/50 rounded-sm px-4 py-2 flex flex-col items-center justify-center min-w-[70px]">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Bed className="w-4 h-4 text-[#b38e41] stroke-[1.5]" />
                        <span className="text-[13px] font-bold text-gray-800">4</span>
                      </div>
                      <span className="text-[10px] text-[#b38e41] font-semibold">Beds</span>
                    </div>
                    <div className="border border-[#b38e41]/50 rounded-sm px-4 py-2 flex flex-col items-center justify-center min-w-[70px]">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Bath className="w-4 h-4 text-[#b38e41] stroke-[1.5]" />
                        <span className="text-[13px] font-bold text-gray-800">3</span>
                      </div>
                      <span className="text-[10px] text-[#b38e41] font-semibold">Baths</span>
                    </div>
                    <div className="border border-[#b38e41]/50 rounded-sm px-4 py-2 flex flex-col items-center justify-center min-w-[70px]">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Sofa className="w-4 h-4 text-[#b38e41] stroke-[1.5]" />
                        <span className="text-[13px] font-bold text-gray-800">1</span>
                      </div>
                      <span className="text-[10px] text-[#b38e41] font-semibold">Hall</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Floor Plan */}
                <div className="relative h-[220px] w-full rounded-lg overflow-hidden mix-blend-multiply">
                  <Image src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop&q=80" alt="Floor Plan" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Card */}
          <div id="amenities" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-28">
            <div className="bg-[#fbf9f4] px-6 py-4 border-b border-gray-100">
              <h2 className="text-[22px] font-serif text-gray-900 font-semibold">KP Life Republic Township Amenities</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { icon: Dumbbell, label: 'Gymnasium' },
                  { icon: Waves, label: 'Swimming Pool' },
                  { icon: Footprints, label: 'Jogging Track' },
                  { icon: Dumbbell, label: 'Gymnasium' },
                  { icon: Waves, label: 'Swimming Pool' },
                  { icon: Footprints, label: 'Jogging Track' },
                  { icon: Car, label: 'Car Parking' },
                  { icon: Gamepad2, label: 'Indoor Games' },
                  { icon: GlassWater, label: 'Party Hall' },
                  { icon: Car, label: 'Car Parking' },
                  { icon: Gamepad2, label: 'Indoor Games' },
                  { icon: GlassWater, label: 'Party Hall' },
                ].map((amenity, idx) => (
                  <div key={idx} className="border border-[#b38e41]/30 rounded-md p-3 flex flex-col items-center justify-center gap-2">
                    <amenity.icon className="w-6 h-6 text-[#b38e41] stroke-[1.5]" />
                    <span className="text-[11px] text-[#b38e41] font-medium text-center">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QR Codes Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#fbf9f4] px-6 py-4 border-b border-gray-100">
              <h2 className="text-[22px] font-serif text-gray-900 font-semibold">KP Life Republic Township QR Codes</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="w-24 h-24 bg-white border border-gray-200 p-1 rounded-md">
                <QrCode className="w-full h-full text-gray-800 stroke-[1]" />
              </div>
              <p className="text-[12px] text-gray-600">
                KP Life Republic Township details are available at: https://maharera.mahaonline.gov.in under registered project.
              </p>
            </div>
          </div>

          {/* Project Approved By Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#fbf9f4] px-6 py-4 border-b border-gray-100">
              <h2 className="text-[22px] font-serif text-gray-900 font-semibold">Project Approved By</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-4">
                {['citibank', 'Bank of Baroda', 'Bank of India', 'Union Bank'].map((bank, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-md px-4 py-3 min-w-[120px] flex items-center justify-center shadow-sm">
                    <span className="text-sm font-bold text-gray-700">{bank}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#fbf9f4] px-6 py-4 border-b border-gray-100">
              <h2 className="text-[22px] font-serif text-gray-900 font-semibold">Frequently Asked Question</h2>
            </div>
            <div className="p-6 space-y-3">
              {[
                {
                  q: 'Which Is The Largest Kolte-Patil Project?',
                  a: "Life Republic In Hinjewadi Is One Of Kolte-Patil's Largest Integrated Townships, Spread Across Approximately 390-400 Acres."
                },
                {
                  q: 'Which Are The Luxury Projects By Kolte-Patil?',
                  a: 'Information about luxury projects can be found on our main website.'
                },
                {
                  q: 'Which Are The Luxury Projects By Kolte-Patil?',
                  a: 'Information about luxury projects can be found on our main website.'
                },
                {
                  q: 'Which Are The Luxury Projects By Kolte-Patil?',
                  a: 'Information about luxury projects can be found on our main website.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="border border-[#e6dcc6] rounded-md overflow-hidden">
                  <div 
                    className={`px-5 py-4 flex justify-between items-center cursor-pointer transition-colors ${openFaq === idx ? 'bg-[#fbf9f4]' : 'bg-[#fdfcf9] hover:bg-[#fbf9f4]'}`}
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className="text-[14px] font-medium text-[#b38e41]">{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-[#b38e41]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#b38e41]" />
                    )}
                  </div>
                  {openFaq === idx && (
                    <div className="px-5 py-4 border-t border-[#e6dcc6] bg-white">
                      <p className="text-[13px] text-gray-800 font-medium leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Form) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-[0_4px_25px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sticky top-6">
            <h3 className="text-[22px] font-serif text-center text-gray-900 mb-6 font-semibold">Call Me Instantly</h3>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input type="text" placeholder="Enter Your Name" className="w-full px-4 py-3 border border-gray-200 rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-[#b38e41] focus:border-[#b38e41] transition-colors" />
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-3 border border-gray-200 rounded-md text-[14px] bg-gray-50 flex items-center font-medium text-gray-700">
                  +91
                </div>
                <input type="tel" placeholder="Enter Your Phone Number" className="flex-1 px-4 py-3 border border-gray-200 rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-[#b38e41] focus:border-[#b38e41] transition-colors" />
              </div>
              
              <button className="w-full bg-[#9c7827] hover:bg-[#85651f] text-white py-3.5 rounded-md text-[16px] font-semibold shadow-md transition-colors mt-2">
                Request CallBack
              </button>
            </form>

            <div className="mt-5 text-[12px] text-gray-500 leading-snug">
              By Continuing, You,Rr Agreeing To The <a href="#" className="text-[#0ea5e9] hover:underline">Terms And Conditions</a>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-gray-800 mt-0.5 shrink-0" />
                <span className="text-[13px] text-gray-800 font-semibold">Assured Callback In 5 Mins</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-gray-800 mt-0.5 shrink-0" />
                <span className="text-[13px] text-gray-800 font-semibold leading-snug">We Are Authorised Channel Partner For This Project</span>
              </div>
            </div>

            <div className="mt-6 bg-[#f4f4f4] rounded-lg p-4 flex items-center gap-3">
              <div className="w-11 h-11 bg-[#25d366] rounded-full flex items-center justify-center shrink-0 text-white shadow-sm">
                <FaWhatsapp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[15px] font-bold text-gray-900">+91 000 000 0000</div>
                <div className="text-[12px] text-gray-600 font-medium">Contact Helpdesk (Chat Only)</div>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* Similar Properties Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-[28px] font-serif text-gray-900 font-semibold mb-8 text-center md:text-left">Similar Properties in Pune</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIMILAR_PROPERTIES.slice(0, 4).map((property) => (
            <a href={`/properties/${property.id}`} key={property.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={property.image} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-1">{property.title}</h3>
                <div className="text-[13px] font-medium text-[#b38e41] mb-1">{property.type}</div>
                <div className="text-[13px] text-gray-500 mb-4">{property.location}</div>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-gray-500 font-medium">Starting at</div>
                    <div className="font-bold text-gray-900">{property.price}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#fbf9f4] flex items-center justify-center text-[#b38e41] group-hover:bg-[#b38e41] group-hover:text-white transition-colors">
                    <ArrowUp className="w-4 h-4 rotate-45" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
