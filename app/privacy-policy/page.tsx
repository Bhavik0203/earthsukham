import React from "react";
import Navbar from "../components/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FCF9F4] text-[#2D2D2D] font-sans antialiased pb-20">
      <Navbar />

      {/* --- HERO BANNER --- */}
      <section className="relative overflow-hidden rounded-2xl m-4 bg-[#0D0D11]">
        <div className="relative h-[200px] w-full flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 text-center px-4">
            <h1 className="text-3xl md:text-4xl font-serif text-white font-normal tracking-wide">
              Privacy Policy
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
              1. Introduction
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Welcome to Earth Sukham. We value your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website and use our real estate services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              2. Information We Collect
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              We may collect personal identification information, including but not limited to, your name, email 
              address, phone number, and preferences when you fill out enquiry forms or subscribe to our updates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              3. How We Use Your Information
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              We use the information we collect to provide and improve our services, contact you regarding property enquiries, 
              provide updates or marketing communications, and comply with legal obligations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              4. Cookies and Tracking
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Our site may use cookies and similar tracking technologies to enhance user experience and analyze 
              traffic patterns. You can choose to disable cookies through your individual browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              5. Data Security
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              We implement industry-standard administrative, technical, and physical security measures to protect 
              your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900">
              6. Contact Us
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, please contact us at 
              support@earthsukham.com.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
