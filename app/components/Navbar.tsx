"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we have scrolled past the hero section threshold
      if (currentScrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide second header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* HEADER 1: Transparent over Hero Section */}
      <header 
        className={`absolute top-0 left-0 w-full z-50 bg-transparent px-6 py-2 md:px-12 flex items-center justify-between transition-opacity duration-300 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Brand Logo (White) */}
        <Link href="/" className="flex items-center">
          <Image src="/images/logo-white.png" alt="Earth Sukham" width={200} height={80} className="h-10 sm:h-16 w-auto object-contain" />
        </Link>

        {/* Navigation Links (White) */}
        <nav className="hidden md:flex items-center gap-8 text-white font-medium text-sm">
          <Link href="#" className="text-[#D4A373]">Home</Link>
          <Link href="#" className="hover:text-[#D4A373] transition">Properties</Link>
          <Link href="#" className="hover:text-[#D4A373] transition">Pune Projects</Link>
          <Link href="#" className="hover:text-[#D4A373] transition">Delhi NCR Projects</Link>
          <Link href="#" className="hover:text-[#D4A373] transition">Blogs</Link>
        </nav>

        {/* CTA Button */}
        <button className="bg-[#B58A3D] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#967132] transition shadow-md">
          Contact Us
        </button>
      </header>


      {/* HEADER 2: Sticky Header (Like Image) */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 bg-[#FBF9F4] px-6 py-2 md:px-12 flex items-center justify-between shadow-sm transition-transform duration-300 ${
          isScrolled 
            ? (isVisible ? 'translate-y-0' : '-translate-y-full') 
            : '-translate-y-full'
        }`}
      >
        {/* Brand Logo (Dark) */}
        <Link href="/" className="flex items-center">
          <Image src="/images/Logo.png" alt="Earth Sukham" width={200} height={80} className="h-10 sm:h-14 w-auto object-contain" />
        </Link>

        {/* Navigation Links (Dark) */}
        <nav className="hidden md:flex items-center gap-8 text-[#2C2C2C] font-medium text-sm">
          <Link href="#" className="text-[#C19B54]">Home</Link>
          <Link href="#" className="hover:text-[#C19B54] transition">Properties</Link>
          <Link href="#" className="hover:text-[#C19B54] transition">Pune Projects</Link>
          <Link href="#" className="hover:text-[#C19B54] transition">Delhi NCR Projects</Link>
          <Link href="#" className="hover:text-[#C19B54] transition">Blogs</Link>
        </nav>

        {/* CTA Button */}
        <button className="bg-[#C19B54] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-[#A88648] transition">
          Contact Us
        </button>
      </header>
    </>
  );
}