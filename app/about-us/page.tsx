"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import CaseStudiesPage from './section3';
import Achievements from '../components/Achievements';
import TeamSection from '../components/TeamSection';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';
// import CoreValues from '../components/CoreValues';

const valuesData = [
  {
    title: "Integrity",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the printing industry Lorem Ipsum is of the and it.",
  },
  {
    title: "Innovation",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the printing industry Lorem Ipsum is of the and it.",
  },
  {
    title: "Customer-Centric",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the printing industry Lorem Ipsum is of the and it.",
  },
  {
    title: "Excellence",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the printing industry Lorem Ipsum is of the and it.",
  },
];

// Simple reusable counting hook component for clean structure
const CounterItem = ({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let started = false;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !started) {
          started = true;
          let startTimestamp: number | null = null;
          const duration = 1500; // Animation duration in milliseconds (1.5s)

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing function for smooth slowing down at the end
            const easeOutQuad = progress * (2 - progress);
            setCount(Math.floor(easeOutQuad * target));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={elementRef}>
      <div className="text-[44px] md:text-[52px] font-light text-[#C59B27] leading-none mb-3 select-none">
        {count}{suffix}
      </div>
      <div className="text-[13px] md:text-sm text-[#444] font-serif tracking-wide">
        {label}
      </div>
    </div>
  );
};

export default function AboutUsPage() {
  return (
    <div className="bg-[#FCF9F4] min-h-screen font-serif text-[#2D2D2D] w-full overflow-x-hidden">
      
      {/* Hero Header Section */}
      <div className="relative h-[450px] w-full bg-[#0D0D11] overflow-hidden">
        {/* Dark dimming overlay layer */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Background Hero Image */}
        <Image
          src="/images/aboutbanner.jpg"
          alt="Earth Sukham Architecture"
          fill
          className="object-cover opacity-75"
          priority
        />
        
        {/* Centered Hero Title */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif font-normal tracking-wide text-center">
            About US Earth Sukham
          </h1>
        </div>
      </div>

      {/* Main Structural Content Wrapper */}
      <div className="w-full relative z-30 -mt-24">
        
        {/* Top Card: Flushed directly to the left edge of the screen */}
        {/* Reverted back to pure bg-white to cleanly overlap the hero background asset */}
         <div className="bg-[#FCF9F4] pt-12  pl-6 sm:pl-12 md:pl-24 lg:pl-30 pr-12 w-full lg:w-[87%] ">
          <span className="text-[#C59B27] font-sans text-base font-medium block mb-4">
            About Earth Sukham
          </span>
          
          <h2 className="text-3xl md:text-[42px] text-[#1A1A1A] font-serif font-normal leading-tight mb-6 tracking-normal">
            Building Dreams,Creating Landmarks
          </h2>
          
          <p className="font-sans text-[#5A5A5A] text-sm md:text-[15px] leading-relaxed max-w-[950px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy 
            theprintingLorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum simply 
            dummy text of the printingLorem Ipsum is simply dummy text of the printing and typesetting industry Lorm
          </p>
        </div>

        {/* Interior Container: Restores the standard page alignment margin grid for elements below */}
        <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 lg:px-6 mt-10 pb-20">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
            <div className="md:col-span-5">
              <span className="text-[#C59B27] font-sans text-base font-medium block mb-3">
                Our Story
              </span>
              <h3 className="text-3xl md:text-[38px] text-[#1A1A1A] font-serif font-normal leading-tight tracking-normal">
                Building Dreams,<br /> Creating Landmarks
              </h3>
            </div>
            
            <div className="md:col-span-7 font-sans text-[#5A5A5A] text-sm md:text-[15px] leading-relaxed md:pt-10">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the printing industry 
                Lorem Ipsum is of the and it is printingLorem Ipsum is simply dummy text of the printing and typesetting 
                dummy text of the printing industr...{' '}
                <a href="#" className="text-[#C59B27] hover:underline font-medium inline-block transition-colors ml-1">
                  Read more
                </a>
              </p>
            </div>
          </div>

          {/* Active Quantitative Performance Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 text-center ">
            <CounterItem target={10} label="Years of Experience" />
            <CounterItem target={500} suffix="+" label="Happy Families" />
            <CounterItem target={15} suffix="+" label="Completed Projects" />
            <CounterItem target={100} suffix="%" label="Commitment to Quality" />
          </div>

        </div>
      </div>
      <CaseStudiesPage/>
      {/* <CoreValues/> */}
       <section className="bg-[#FAF6F0] text-zinc-900 py-24 px-6 sm:px-12 lg:px-20 font-sans min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full">
              
              {/* Left and Right Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Left Side Container: Heading and Image Frame */}
                <div className="lg:col-span-5 flex flex-col">
                  <span className="text-[#C5A880] text-sm font-medium tracking-wide mb-3 font-serif">
                    Our Core Values
                  </span>
                  
                  <h2 className="text-4xl md:text-5xl font-normal text-zinc-950 font-serif mb-10 tracking-tight">
                    Our Core Values
                  </h2>
                  
                  <div className="relative w-full aspect-[4/3] sm:aspect-[1.15/1] rounded-[2rem] overflow-hidden shadow-sm">
                    <Image
                      src="/images/core.png"
                      alt="Modern High-Rise Development Layout"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
      
                {/* Right Side Container: Global paragraph and value stack rows */}
                <div className="lg:col-span-7 flex flex-col ">
                  
                  {/* Global Description paragraph at top */}
                  <p className="text-zinc-600 text-[15px] leading-relaxed mb-10 max-w-2xl font-light">
                    Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the printing industry Lorem Ipsum is of the and it is
                  </p>
      
                  {/* List Array Separated Rows */}
                  <div className="w-full flex flex-col border-t border-zinc-300/60">
                    {valuesData.map((item, index) => (
                      <div 
                        key={index} 
                        className="border-b border-zinc-300/60 py-6 flex flex-col gap-2"
                      >
                        <h3 className="text-2xl font-normal text-zinc-950 font-serif tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-zinc-500 text-[13.5px] leading-relaxed max-w-xl font-light">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
      
                </div>
      
              </div>
              
            </div>
          </section>
          <Achievements/>
          <TeamSection/>
          <FAQ/>
          <CallToAction/>
    </div>
  );
}