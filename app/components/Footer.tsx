import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-[#FBF9F4] text-[#2C2C2C] pt-12 pb-12 overflow-hidden border-t border-gray-200/50">
      
      {/* 1. MASSIVE BACKGROUND WATERMARK TEXT */}
      <div className="w-full text-center pointer-events-none select-none z-0 mb-6 mt-4">
        <h1 className="text-[12vw] font-black tracking-normal text-[#EDEAE1] uppercase leading-none">
          EARTH SUKHAM
        </h1>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* 2. CENTERED LOGO & DIVIDER LINE ACCENT */}
        <div className="flex items-center justify-between gap-8 mb-16 w-full">
          <div className="hidden sm:block h-[1px] bg-[#D4C3A3] flex-grow" />
          
          {/* Main Structural Logo Mark */}
          <div className="flex flex-col items-center shrink-0 mx-auto sm:mx-0">
            <img src="/images/Logo.png" alt="Earth Sukham" className="h-20 w-auto object-contain" />
          </div>
          
          <div className="hidden sm:block h-[1px] bg-[#D4C3A3] flex-grow" />
        </div>

        {/* 3. TRIPLE COLUMN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          
          {/* COLUMN A: About Site Description */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-[#B58A3D] text-lg">
              About Site
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm">
              Lorem Ipsum is simply dummy text of the printing and industry. Lorem Ipsum has been the Bride Printing Library. Lorem Ipsum is simply dummy text of the printing and industry. Lorem Ipsum has been the Bride Printing Library.
            </p>
            {/* Social Media Monochromatic Icon Badges */}
            <div className="flex items-center gap-3 pt-2">
              <Link href="#" className="bg-[#B58A3D] text-white p-2 rounded hover:bg-[#967132] transition">
                <FiFacebook size={14} fill="currentColor" stroke="none" />
              </Link>
              <Link href="#" className="bg-[#B58A3D] text-white p-2 rounded hover:bg-[#967132] transition">
                <FiTwitter size={14} fill="currentColor" stroke="none" />
              </Link>
              <Link href="#" className="bg-[#B58A3D] text-white p-2 rounded hover:bg-[#967132] transition">
                <FiInstagram size={14} />
              </Link>
              <Link href="#" className="bg-[#B58A3D] text-white p-2 rounded hover:bg-[#967132] transition">
                <FiYoutube size={14} fill="currentColor" stroke="none" />
              </Link>
            </div>
          </div>

          {/* COLUMN B: Fast Navigation Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-[#B58A3D] text-lg">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-700 font-medium">
              <li><Link href="#" className="hover:text-[#B58A3D] transition">Home</Link></li>
              <li><Link href="#" className="hover:text-[#B58A3D] transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-[#B58A3D] transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#B58A3D] transition">Terms & Condition</Link></li>
              <li><Link href="#" className="hover:text-[#B58A3D] transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* COLUMN C: Office Directory Info & Contacts */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold text-[#B58A3D] text-lg">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-600">
              {/* Address Row */}
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#B58A3D] shrink-0 mt-0.5" />
                <span className="leading-normal">
                  Office 254, Vision 9, Pimple Saudagar, Pune, Maharashtra - 411027
                </span>
              </li>
              {/* Telephone Dial Row */}
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#B58A3D] shrink-0" />
                <a href="tel:+919923901000" className="hover:text-[#B58A3D] transition">
                  +91 9923 90 1000
                </a>
              </li>
              {/* Electronic Mailing Address Row */}
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#B58A3D] shrink-0" />
                <a href="mailto:earthsukham@gmail.com" className="hover:text-[#B58A3D] transition">
                  earthsukham@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}