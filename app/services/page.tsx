"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FAQ from '../components/FAQ';

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState('service-1');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['service-1', 'service-2', 'service-3'];
      let current = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F4] font-sans">
      
      {/* --- HERO BANNER --- */}
      <section className="relative overflow-hidden rounded-2xl m-2">
        <div className="relative h-[260px] w-full md:h-[420px]">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80" 
            alt="Services Background"
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
                <div className="text-sm font-semibold tracking-[0.2em] text-[#ffee50] font-sans uppercase">
                  Home / Services
                </div>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl font-sans">
                  Our Services
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4 relative">
            <div className="sticky top-32 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              
              <div 
                onClick={() => scrollToSection('service-1')}
                className={`min-w-[220px] lg:min-w-0 border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  activeSection === 'service-1' 
                    ? 'bg-[#f0e8d5] border-transparent shadow-sm' 
                    : 'bg-white border-gray-200 hover:border-[#C19B54]'
                }`}
              >
                <div className={`font-bold text-sm mb-1 ${activeSection === 'service-1' ? 'text-[#C19B54]' : 'text-gray-900'}`}>01</div>
                <div className={`font-bold text-sm uppercase tracking-wide ${activeSection === 'service-1' ? 'text-[#C19B54]' : 'text-gray-900'}`}>PROPERTY SALES</div>
              </div>

              <div 
                onClick={() => scrollToSection('service-2')}
                className={`min-w-[220px] lg:min-w-0 border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  activeSection === 'service-2' 
                    ? 'bg-[#f0e8d5] border-transparent shadow-sm' 
                    : 'bg-white border-gray-200 hover:border-[#C19B54]'
                }`}
              >
                <div className={`font-bold text-sm mb-1 ${activeSection === 'service-2' ? 'text-[#C19B54]' : 'text-gray-900'}`}>02</div>
                <div className={`font-bold text-sm ${activeSection === 'service-2' ? 'text-[#C19B54]' : 'text-gray-900'}`}>Reselling and Purchasing</div>
              </div>

              <div 
                onClick={() => scrollToSection('service-3')}
                className={`min-w-[220px] lg:min-w-0 border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  activeSection === 'service-3' 
                    ? 'bg-[#f0e8d5] border-transparent shadow-sm' 
                    : 'bg-white border-gray-200 hover:border-[#C19B54]'
                }`}
              >
                <div className={`font-bold text-sm mb-1 ${activeSection === 'service-3' ? 'text-[#C19B54]' : 'text-gray-900'}`}>03</div>
                <div className={`font-bold text-sm ${activeSection === 'service-3' ? 'text-[#C19B54]' : 'text-gray-900'}`}>Construction</div>
              </div>

            </div>
          </div>

          {/* Content Areas */}
          <div className="lg:w-3/4 space-y-24">
            
            {/* Service 1 */}
            <div id="service-1" className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
              <div className="w-full md:w-1/2 h-[260px] md:h-[320px] relative rounded-2xl overflow-hidden shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80" 
                  alt="Selling Properties" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-[28px] md:text-3xl font-serif text-[#C19B54] mb-6 leading-snug">Selling Properties <br/> & Plots</h2>
                <div className="pl-5 md:pl-6 border-l-2 md:border-l-[3px] border-[#C19B54]">
                  <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed font-medium">
                    Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the printing And industry. Lorem Ipsum is of the and it is LoremIpsum is simply dummy text of the printing and typesetting dummy text of the printing And industry. Lorem Ipsum is of the and it is LoremIpsum is of the and it is Lorem Ipsum is simply dummy text the printing and typesetting dummy text of the printing industry. Lorem Ipsum is of the and it.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div id="service-2" className="flex flex-col md:flex-row-reverse gap-8 lg:gap-12 items-center">
              <div className="w-full md:w-1/2 h-[260px] md:h-[320px] relative rounded-2xl overflow-hidden shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80" 
                  alt="Reselling and Purchasing" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start md:items-end">
                <h2 className="text-[28px] md:text-3xl font-serif text-[#C19B54] mb-6 leading-snug md:text-right">Reselling and <br/> Purchasing</h2>
                <div className="pr-5 md:pr-6 border-l-2 md:border-l-0 md:border-r-[3px] border-[#C19B54]">
                  <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed font-medium md:text-right">
                    Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the printing And industry. Lorem Ipsum is of the and it is LoremIpsum is simply dummy text of the printing and typesetting dummy text of the printing And industry. Lorem Ipsum is of the and it is LoremIpsum is of the and it is Lorem Ipsum is simply dummy text the printing and typesetting dummy text of the printing industry. Lorem Ipsum is of the and it.
                  </p>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div id="service-3" className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
              <div className="w-full md:w-1/2 h-[260px] md:h-[320px] relative rounded-2xl overflow-hidden shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356f58?w=800&auto=format&fit=crop&q=80" 
                  alt="Construction Projects" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-[28px] md:text-3xl font-serif text-[#C19B54] mb-6 leading-snug">Construction <br/> Projects</h2>
                <div className="pl-5 md:pl-6 border-l-2 md:border-l-[3px] border-[#C19B54]">
                  <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed font-medium">
                    Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the printing And industry. Lorem Ipsum is of the and it is LoremIpsum is simply dummy text of the printing and typesetting dummy text of the printing And industry. Lorem Ipsum is of the and it is LoremIpsum is of the and it is Lorem Ipsum is simply dummy text the printing and typesetting dummy text of the printing industry. Lorem Ipsum is of the and it.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      
      <FAQ />
    </div>
  );
}
