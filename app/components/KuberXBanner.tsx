"use client";
import React, { useState } from 'react';
import EnquiryModal from './EnquiryModal';

const KuberXBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#2C2C2C] shadow-2xl flex flex-col md:flex-row items-stretch">
        
        {/* Background image for right side (blended) */}
        <div 
          className="absolute inset-0 md:left-1/3 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
            backgroundPosition: "center right",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Gradient overlay to blend seamlessly with the dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C2C2C] via-[#2C2C2C]/90 md:via-[#2C2C2C]/70 to-transparent"></div>
        </div>
        
        {/* Top Right Label */}
        <div className="absolute top-4 right-6 md:top-6 md:right-8 z-10 flex items-center">
            <div className="flex items-center font-bold text-[#C19B54] bg-white/10 px-3 py-1 rounded-full text-xs md:text-sm tracking-wide border border-[#C19B54]/30 backdrop-blur-sm">
                Exclusive Partner Offers
            </div>
        </div>

        {/* Content on Left */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16 md:w-3/5 lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Get <span className="text-[#C19B54]">₹50,000 OFF</span>
          </h2>
          <p className="text-white text-base md:text-xl font-medium mb-8 max-w-lg leading-relaxed">
            Along with <span className="text-[#C19B54]">Lowest interest</span> and <span className="text-[#C19B54]">Exclusive benefits</span> on home loans today!
          </p>
          <div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#C19B54] cursor-pointer text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#A88648] transition-colors duration-300 text-sm md:text-base"
            >
              Explore Home Loans
            </button>
          </div>
        </div>
      </div>
      
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default KuberXBanner;
