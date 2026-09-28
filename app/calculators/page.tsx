import React from 'react';
import Calculators from '../components/Calculators';
import Image from 'next/image';

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans" style={{ fontFamily: 'Lato, sans-serif' }}>
      
      {/* --- HERO BANNER --- */}
      <section className="relative overflow-hidden rounded-2xl m-2">
        <div className="relative h-[200px] w-full md:h-[300px]">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80" 
            alt="Financial Calculators Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-6">
            <div className="mx-auto w-full max-w-7xl">
              <div className="max-w-3xl">
                <div className="text-sm font-semibold tracking-[0.2em] text-[#ffee50] font-sans uppercase">
                  Home / Calculators
                </div>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl font-sans uppercase">
                  Financial Calculators
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1 py-12 px-4 md:px-8 max-w-[1400px] mx-auto w-full">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-gray-600 text-base md:text-lg">
            Use our interactive financial calculators to estimate your monthly loan EMIs or calculate the Return on Investment (ROI) for your property investments.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Calculators />
        </div>
      </div>
      
    </div>
  );
}
