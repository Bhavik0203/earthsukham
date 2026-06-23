import React from "react";
import Navbar from "../components/Navbar";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#FCF9F4] text-[#2D2D2D] font-sans antialiased pb-20">
      <Navbar />

      {/* --- HERO BANNER --- */}
      <section className="relative overflow-hidden rounded-2xl m-4 bg-[#0D0D11]">
        <div className="relative h-[200px] w-full flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 text-center px-4">
            <h1 className="text-3xl md:text-4xl font-serif text-white font-normal tracking-wide">
              Terms & Conditions
            </h1>
            <p className="text-xs text-[#ffee50] font-semibold tracking-[0.2em] mt-2 uppercase">
              Last Updated: June 2026
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT CONTAINER --- */}
      <main className="max-w-4xl mx-auto px-6 md:px-8 mt-12">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200/50 space-y-8">
          
          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              1. Acceptance of Terms
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              By accessing and using this website, you agree to comply with and be bound by the following terms 
              and conditions of use. If you disagree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              2. Intellectual Property Rights
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              All content, brand design, layout, graphics, and images displayed on this site are the property 
              of Earth Sukham and are protected by intellectual property laws. You may not reproduce or distribute 
              them without prior written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              3. User Responsibilities
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              You agree to use this site for lawful purposes only and in a way that does not infringe on the 
              rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              4. Disclaimer of Warranties
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              The property details and general information provided on this website are for informational purposes 
              only. While we strive to ensure accuracy, we make no warranties or representations of any kind regarding 
              the availability, completeness, or reliability of the listings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              5. Limitation of Liability
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Earth Sukham shall not be liable for any direct, indirect, incidental, or consequential damages 
              arising out of your access to, or use of, this website or the information contained herein.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              6. Amendments
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              We reserve the right to amend or update these terms at any time without prior notice. By continuing 
              to use the site, you agree to be bound by the updated terms.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
