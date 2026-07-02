"use client";

import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import FAQ from '../components/FAQ';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#FBF9F4]">
      {/* --- HERO BANNER --- */}
      <section className="relative overflow-hidden rounded-2xl m-2">
        <div className="relative h-[260px] w-full md:h-[420px]">
          <Image
            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&auto=format&fit=crop&q=80" 
            alt="Contact Us Background"
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
                <div className="text-sm font-semibold tracking-[0.2em] text-[#ffee50] font-sans">
                  Home / Contact Us
                </div>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl font-sans">
                  Contact Us
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Side: Form */}
        <div>
          <h2 className="text-3xl font-serif text-gray-800 mb-4 tracking-wide uppercase">WE&apos;D LOVE TO HEAR FROM YOU</h2>
          <p className="text-[13px] text-gray-500 mb-8 leading-relaxed max-w-md">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem is simply dummy text of the printing.
          </p>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-[#efe9d6] text-gray-800 border-none rounded-sm focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-[#efe9d6] text-gray-800 border-none rounded-sm focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]" />
            </div>
            <input type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 bg-[#efe9d6] text-gray-800 border-none rounded-sm focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]" />
            
            <div className="relative">
              <select defaultValue="" className="w-full px-4 py-3 bg-[#efe9d6] text-gray-500 border-none rounded-sm focus:outline-none focus:ring-1 focus:ring-[#9c7827] text-[14px] appearance-none cursor-pointer">
                <option value="" disabled>Select Project</option>
                <option value="project1">Project 1</option>
                <option value="project2">Project 2</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            
            <textarea placeholder="Message" rows={6} className="w-full px-4 py-3 bg-[#efe9d6] text-gray-800 border-none rounded-sm focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px] resize-none"></textarea>
            
            <button type="submit" className="w-full bg-[#8c6b23] hover:bg-[#73581c] text-white font-medium py-3.5 rounded-sm transition-colors text-[15px] shadow-sm">
              Send a message
            </button>
          </form>
        </div>

        {/* Right Side: Contact Info */}
        <div className="md:pl-12 md:border-l-2 border-[#e6dcc6] space-y-10">
          
          <div>
            <h3 className="text-[22px] font-serif text-gray-800 mb-3">Corporate office</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing.
            </p>
          </div>

          <div>
            <h3 className="text-[22px] font-serif text-gray-800 mb-2">For sales/ Marketing queries</h3>
            <p className="text-[14px] text-gray-600">+91 000 000 0000</p>
          </div>

          <div>
            <h3 className="text-[22px] font-serif text-gray-800 mb-2">Email</h3>
            <a href="mailto:INFO@EARTHSUKHAM.COM" className="text-[12px] text-gray-500 hover:text-[#9c7827] transition-colors uppercase tracking-widest">
              INFO@EARTHSUKHAM.COM
            </a>
          </div>

          <div>
            <h3 className="text-[22px] font-serif text-gray-800 mb-2">Social Connects</h3>
            <a href="mailto:INFO@EARTHSUKHAM.COM" className="text-[12px] text-gray-500 hover:text-[#9c7827] transition-colors uppercase tracking-widest block mb-4">
              INFO@EARTHSUKHAM.COM
            </a>
            <div className="flex gap-3">
              <a href="#" className="w-[30px] h-[30px] rounded flex items-center justify-center bg-[#1877F2] text-white hover:bg-blue-700 transition-colors">
                <FaFacebookF className="w-[14px] h-[14px]" />
              </a>
              <a href="#" className="w-[30px] h-[30px] rounded flex items-center justify-center bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90 transition-opacity">
                <FaInstagram className="w-[16px] h-[16px]" />
              </a>
              <a href="#" className="w-[30px] h-[30px] rounded flex items-center justify-center bg-[#FF0000] text-white hover:bg-red-700 transition-colors">
                <FaYoutube className="w-[14px] h-[14px]" />
              </a>
              <a href="#" className="w-[30px] h-[30px] rounded flex items-center justify-center bg-[#0A66C2] text-white hover:bg-blue-800 transition-colors">
                <FaLinkedinIn className="w-[14px] h-[14px]" />
              </a>
            </div>
          </div>

        </div>

      </div>
      
      <FAQ />
    </div>
  );
}
