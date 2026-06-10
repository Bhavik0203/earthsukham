"use test";
import { X } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center bg-black">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600')" }}
      />
      
      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-24 pb-12">
        {/* Left Copy */}
        <div className="lg:col-span-7 text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            Find Your <span className="text-[#E5BA73] font-bold">Dream Home</span> <br />
            in Pune & Delhi NCR
          </h1>
          <p className="text-gray-300 max-w-lg text-sm md:text-base font-light leading-relaxed">
            At Earth Sukham, we believe a home is more than a property. It's a legacy. 
            Our commitment to trust, transparency, and market expertise.
          </p>
          <button className="bg-[#B58A3D] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[#967132] transition">
            Explore Properties
          </button>
        </div>

        {/* Right Floating Card / Form Container */}
        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-lg relative max-w-md mx-auto w-full">
          <button className="absolute top-4 right-4 text-white/70 hover:text-white">
            <X size={18} />
          </button>
          
          <h3 className="text-center font-serif text-white text-xl mb-4 tracking-wide">Earth Sukham</h3>
          <div className="bg-[#B58A3D] text-white text-center py-2 text-xs font-semibold uppercase tracking-wider mb-4 rounded-sm">
            Find Your Dream Home
          </div>

          <form className="space-y-3">
            <select className="w-full bg-white/20 border border-white/30 rounded px-3 py-2 text-white text-sm focus:outline-none placeholder-gray-300">
              <option className="text-black">Choose Project</option>
            </select>
            <input type="text" placeholder="Name*" className="w-full bg-white/20 border border-white/30 rounded px-3 py-2 text-white text-sm focus:outline-none placeholder-white/70" required />
            <input type="email" placeholder="Email*" className="w-full bg-white/20 border border-white/30 rounded px-3 py-2 text-white text-sm focus:outline-none placeholder-white/70" required />
            <div className="flex gap-2">
              <span className="bg-white/20 border border-white/30 rounded px-2 py-2 text-white text-sm flex items-center">+91</span>
              <input type="tel" placeholder="Mobile Number*" className="w-full bg-white/20 border border-white/30 rounded px-3 py-2 text-white text-sm focus:outline-none placeholder-white/70" required />
            </div>
            <textarea placeholder="Message" rows={2} className="w-full bg-white/20 border border-white/30 rounded px-3 py-2 text-white text-sm focus:outline-none placeholder-white/70" />
            
            <button type="submit" className="w-full bg-[#B58A3D] text-white py-2.5 rounded font-medium text-sm hover:bg-[#967132] transition shadow-lg mt-2">
              Submit
            </button>

            <div className="flex items-start gap-2 mt-4">
              <input type="checkbox" id="terms" className="mt-1 accent-[#B58A3D]" required />
              <label htmlFor="terms" className="text-[10px] text-white/60 leading-tight">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}