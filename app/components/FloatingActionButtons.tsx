'use client';
import React, { useState, useEffect } from 'react';
import { MessageSquare, Bot, ArrowDown, ArrowUp, X } from 'lucide-react';
import Link from 'next/link';

export default function FloatingActionButtons() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled down a bit (e.g., 200px)
      if (window.scrollY > 200) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTopOrBottom = () => {
    if (isScrolledDown) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Left side buttons */}
      <div className="fixed right-6 bottom-20 z-50 flex flex-col items-center gap-4">
        <button 
          onClick={scrollToTopOrBottom}
          className="w-11 h-11 bg-[#0A0E17] rounded shadow-[0_4px_14px_rgba(0,0,0,0.3)] flex items-center justify-center text-white hover:bg-black transition-transform hover:-translate-y-1"
        >
          {isScrolledDown ? <ArrowUp size={22} /> : <ArrowDown size={22} />}
        </button>
      
      </div>

      {/* Right side form and button */}
      <div className="fixed left-6 bottom-6 z-50 flex flex-col items-end">
        
        {/* The Quick Consultation Form Popup */}
        {isFormOpen && (
          <div className="bg-white rounded-xl shadow-2xl w-[320px] mb-4 overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-[#0A2540] text-[15px]">Quick Consultation</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-3.5">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#D32F2F] focus:border-[#D32F2F] transition-shadow placeholder:text-gray-400"
              />
              <div className="flex gap-2">
                <div className="px-3 py-2.5 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-500 flex items-center justify-center w-16 select-none font-medium">
                  +91
                </div>
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#D32F2F] focus:border-[#D32F2F] transition-shadow placeholder:text-gray-400"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#D32F2F] focus:border-[#D32F2F] transition-shadow placeholder:text-gray-400"
              />
              
              <div className="flex items-start gap-2 pt-1 pb-1">
                <input type="checkbox" id="quick-consent" className="mt-1 cursor-pointer accent-[#D32F2F]" />
                <label htmlFor="quick-consent" className="text-xs text-gray-500 cursor-pointer">
                  I accept <Link href="/terms-conditions" className="underline hover:text-[#D32F2F]">Terms</Link> & <Link href="/privacy-policy" className="underline hover:text-[#D32F2F]">Privacy</Link>
                </label>
              </div>

              <button className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white py-3 rounded-md font-semibold text-[15px] transition-colors cursor-pointer shadow-sm">
                Submit Request
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">OR</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <button 
                onClick={() => window.open('https://wa.me/919923901000', '_blank', 'noopener,noreferrer')}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-md font-semibold text-[15px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.128.552 4.195 1.6 6.012L.15 24l6.104-1.6c1.76.953 3.755 1.455 5.777 1.455 6.645 0 12.03-5.384 12.03-12.031C24 5.385 18.614 0 12.031 0zm-1.127 18.528c-1.802 0-3.568-.484-5.114-1.4l-.367-.217-3.8.997 1.015-3.705-.238-.378C1.4 12.188 1.4 9.948 2.378 8.13c1.742-3.23 5.093-5.317 8.526-5.317 4.975 0 9.02 4.045 9.02 9.02 0 4.976-4.045 9.02-9.02 9.02zM17.06 14.522c-.276-.138-1.633-.806-1.886-.898-.253-.092-.437-.138-.62.138-.184.276-.713.898-.874 1.082-.16.184-.32.207-.597.07-2.164-1.083-3.64-2.023-5.07-4.5-.16-.276.08-.276.324-.761.115-.23.115-.437.057-.598-.057-.16-.62-1.5-.85-2.05-.23-.55-.46-.475-.62-.483h-.53c-.23 0-.6.092-.92.437C5.07 7.37 4.15 8.245 4.15 9.97c0 1.725 1.08 3.393 1.23 3.588.15.2 2.45 3.738 5.92 5.23 2.115.908 2.92.8 3.99.667 1.07-.138 2.35-.966 2.68-1.9.33-.93.33-1.724.23-1.9-.09-.16-.32-.253-.59-.39z"/>
                </svg>
                Chat on WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* The Toggle Button */}
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="w-16 h-16 bg-[#D32F2F] rounded-full shadow-[0_4px_14px_rgba(211,47,47,0.4)] flex items-center justify-center text-white hover:bg-[#B71C1C] transition-transform hover:-translate-y-1 cursor-pointer"
        >
          {isFormOpen ? <X size={28} /> : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
