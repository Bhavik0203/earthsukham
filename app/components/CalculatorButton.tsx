import Link from 'next/link';
import React from 'react';

export default function CalculatorButton() {
  return (
    <Link
      href="/calculators"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[#B58A3D] hover:bg-[#967132] text-white py-8 px-2 rounded-l-2xl transition-all shadow-md flex items-center justify-center cursor-pointer"
    >
      <span 
        className="font-bold text-sm tracking-widest uppercase whitespace-nowrap"
        style={{ writingMode: 'vertical-rl' }}
      >
        Calculator
      </span>
    </Link>
  );
}
