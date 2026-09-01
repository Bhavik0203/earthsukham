"use client";
import React from 'react';
import Link from 'next/link';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="bg-[#FBF9F4] p-6 text-center border-b border-[#e6dcc6]">
          <h2 className="text-2xl font-serif text-[#C19B54]">Enquire Now</h2>
          <p className="text-sm text-gray-500 mt-1">Please fill in your details and we'll get back to you.</p>
        </div>
        
        <div className="p-6">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div>
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-[#f8f9fa] text-gray-800 border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]" required />
            </div>
            <div>
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-[#f8f9fa] text-gray-800 border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]" required />
            </div>
            <div>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                className="w-full px-4 py-3 bg-[#f8f9fa] text-gray-800 border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9c7827] placeholder:text-gray-500 text-[14px]" 
                required 
                pattern="[0-9]{10}"
                maxLength={10}
                minLength={10}
                title="Please enter a valid 10-digit mobile number"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                }}
              />
            </div>
            
            <div className="flex items-start gap-2 pt-2">
              <input 
                type="checkbox" 
                id="consent" 
                required 
                className="mt-1 min-w-[16px] h-4 w-4 cursor-pointer accent-[#B58A3D]"
              />
              <label htmlFor="consent" className="text-xs text-gray-600 cursor-pointer leading-tight">
                I agree to the <Link href="/terms-conditions" className="text-[#B58A3D] hover:underline">terms and conditions</Link> and <Link href="/privacy-policy" className="text-[#B58A3D] hover:underline">privacy policy</Link> and consent to being contacted regarding my enquiry.
              </label>
            </div>
            
            <button type="submit" className="w-full bg-[#B58A3D] hover:bg-[#967132] text-white font-semibold py-3.5 rounded-lg transition-colors text-[15px] shadow-sm mt-4 cursor-pointer">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
