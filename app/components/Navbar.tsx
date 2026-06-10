import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent px-6 py-4 md:px-12 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#D4A373] rounded-full flex items-center justify-center text-white font-bold text-sm">
          ES
        </div>
        <span className="font-serif font-bold text-white text-lg leading-tight hidden sm:block">
          Earth<br /><span className="text-[#D4A373]">Sukham</span>
        </span>
      </div>

      {/* Navigation Links */}
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
  );
}