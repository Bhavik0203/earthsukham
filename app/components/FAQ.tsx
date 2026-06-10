"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open the first one like the design image

  const faqs: FAQItem[] = [
    {
      question: "What is Earth Sukham?",
      answer: "Earth Sukham is a real estate platform that helps homebuyers discover verified residential properties with expert guidance and investment opportunities.",
    },
    {
      question: "What types of properties do you offer?",
      answer: "We offer a diverse portfolio ranging from premium 2 & 3 BHK residences, luxury townships, upcoming modern launches, and ready-to-move-in possession spaces across Pune and Delhi NCR.",
    },
    {
      question: "Do you assist first-time home buyers?",
      answer: "Yes, we provide end-to-end guidance including project shortlisting, transparent market insights, site consultations, and continuous documentation assistance.",
    },
    {
      question: "How do I choose the right property?",
      answer: "Our experts narrow choices down based on preferred structural tier locations, family spacing configurations, allocated budgets, and projected long-term asset valuations.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Header Text */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#B58A3D]">FAQ'S</span>
          <h2 className="text-3xl font-serif text-[#2C2C2C] leading-tight">
            Frequently <br />Asked <br />Questions
          </h2>
        </div>

        {/* Right Side Stacked Accordions */}
        <div className="lg:col-span-8 space-y-3 w-full">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`transition-all duration-300 rounded overflow-hidden ${
                  isOpen 
                    ? "bg-[#91713B] text-white shadow-md" 
                    : "bg-transparent text-[#2C2C2C] border-b border-gray-200"
                }`}
              >
                {/* Accordion Toggle Banner bar */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left px-5 py-4 font-serif text-sm md:text-base font-medium tracking-wide transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="shrink-0 ml-4">
                    {isOpen ? <Minus size={18} className="text-white" /> : <Plus size={18} className="text-gray-500" />}
                  </span>
                </button>

                {/* Collapsible Content Wrapper */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className={`px-5 pb-5 pt-1 text-xs md:text-sm leading-relaxed ${isOpen ? "text-white/80" : "text-gray-600"}`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}