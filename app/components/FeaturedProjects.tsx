"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import FeaturedCarousel from "./FeaturedCarousel";

const CARDS = [
    { id: "fallback-1", title: "Sadhna Obsidian", location: "Jagatpur, Ahmedabad", price: "₹ 1.9 Cr Onwards", config: "4,5 BHK Apartment | 3375 - 5544 sq ft", builder: "By Sadhna Reality", status: "Under Construction", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600", slug: "#" },
    { id: "fallback-2", title: "Dev The Galaxy", location: "Opp Orchid Sky, Club 07 Road, Shela...", price: "₹ 1.11 Cr Onwards", config: "3 BHK Apartment | 2010 sq ft", builder: "By Dev Infinity Buildcon", status: "Launch", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600", slug: "#" },
    { id: "fallback-3", title: "Shaligram Prestige", location: "Shela, Ahmedabad", price: "₹ 1.03 Cr Onwards", config: "3 BHK Apartment | Area on request", builder: "By Shaligram Developers", status: "Launch", img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=600", slug: "#" },
    { id: "fallback-4", title: "Ashapura Samarpan", location: "Shela, Ahmedabad", price: "₹ 90 Lac Onwards", config: "3 BHK Apartment | Area on request", builder: "By Ashapura buildspace", status: "Launch", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600", slug: "#" },
    { id: "fallback-5", title: "Earth Sapphire", location: "Bopal, Ahmedabad", price: "₹ 1.5 Cr Onwards", config: "4 BHK Premium | 4200 sq ft", builder: "By Earth Builders", status: "Launch", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600", slug: "#" },
    { id: "fallback-6", title: "Sukham Residency", location: "SG Highway, Ahmedabad", price: "₹ 2.2 Cr Onwards", config: "5 BHK Villa | 6000 sq ft", builder: "By Sukham Developers", status: "Under Construction", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600", slug: "#" },
  ];

function FeaturedProjectsContent() {
  const searchParams = useSearchParams();
  
  const filteredCards = useMemo(() => {
    const query = searchParams.get('query')?.toLowerCase() || "";
    const type = searchParams.get('type') || "";
    const status = searchParams.get('status') || "";

    let filtered = [...CARDS];
    
    if (query) {
      filtered = filtered.filter(c => c.title.toLowerCase().includes(query) || c.location.toLowerCase().includes(query) || c.builder.toLowerCase().includes(query));
    }
    if (type && type !== "Property Type") {
      filtered = filtered.filter(c => c.config.includes(type));
    }
    if (status && status !== "Property Status") {
      if (status === "Newly Launched") {
        filtered = filtered.filter(c => c.status.includes("Launch"));
      } else {
        filtered = filtered.filter(c => c.status === status);
      }
    }
    return filtered;
  }, [searchParams]);

  return <FeaturedCarousel cards={filteredCards} />;
}

export default function FeaturedProjects() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-gray-500">Loading featured projects...</div>}>
      <FeaturedProjectsContent />
    </Suspense>
  );
}