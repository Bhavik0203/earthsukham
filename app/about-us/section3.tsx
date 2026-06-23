"use client";

import Image from "next/image";
import Link from "next/link";

import { SectionReveal } from "./SectionReveal";

import { coreValues } from "../lib/case-studies";

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[#FCF9F4] px-4 py-12 md:px-8 md:py-16">
      <main className="mx-auto max-w-7xl">
        {/* Header */}
        {/* <SectionReveal className="mb-12 w-full">
          <header className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest">
              <span className="bg-gradient-to-r from-[#3B3808] to-[#5BA3E8] bg-clip-text text-transparent">
                - CASE STUDY
              </span>
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#3B3808] md:text-4xl">
              Client Success Stories
            </h1>
          </header>
        </SectionReveal> */}
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-raleway">
             Our Mission & Vision
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-raleway">
              Discover the core principles and aspirations that guide Earth Sukham in crafting exceptional spaces and communities.
               </p>
            </div>

        {/* Cards */}
        <div className="space-y-12 md:space-y-16">
          {coreValues.map((value, idx) => {
            const isRight = idx % 2 === 1;

            return (
              <SectionReveal key={value.id} className="w-full" delay={idx * 0.06}>
              <article
                key={value.id}
                className={`relative mx-auto max-w-6xl px-6 py-10 md:px-12 md:py-14 overflow-hidden ${
                  isRight
                    ? "rounded-2xl md:rounded-l-[32px] md:rounded-r-full bg-[linear-gradient(to_right,#FCF9F4_0%,#A17725_20%,#664D1B_50%,#664D1B_100%)]"
                    : "rounded-2xl md:rounded-r-[32px] md:rounded-l-full bg-[linear-gradient(to_left,#FCF9F4_0%,#A17725_20%,#664D1B_50%,#664D1B_100%)]"
                }`}
              >
                <div className="relative z-10 grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
                  {/* Image */}
                  <div
                    className={`flex justify-center ${
                      isRight
                        ? "md:order-2 md:justify-end"
                        : "md:order-1 md:justify-start"
                    }`}
                  >
                    <div className="relative">
                      {/* Outer circle (gold/brown ring) */}
                      <div className="absolute -inset-6 rounded-full bg-[#664D1B]" />

                      {/* Middle circle (white ring) */}
                      <div className="absolute -inset-4 rounded-full bg-white" />

                      {/* Image */}
                      <div className="relative h-[240px] w-[240px] overflow-hidden rounded-full bg-white">
                        <Image
                          src={value.image}
                          alt={value.heading}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`${
                      isRight ? "md:order-1 text-right" : "md:order-2 text-left"
                    }`}
                  >
                    <div className={`max-w-xl ${isRight ? "ml-auto" : "mr-auto"}`}>
                      

                      <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl font-serif">
                        {value.heading}
                      </h2>

                      <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base font-sans">
                        {value.description}
                      </p>

                   
                    </div>
                  </div>
                </div>
              </article>
              </SectionReveal>
            );
          })}
        </div>
      </main>
    </div>
  );
}