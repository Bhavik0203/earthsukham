"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Plus, Share2, MessageCircle, Check, Trash2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '../lib/api';

const CompareProperties = () => {
    const [comparisons, setComparisons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Define the attributes to display in the table
    const attributes = [
        { label: "Carpet Area", key: "carpetArea", format: (v: any) => v ? `${v} Sq. Feet` : "--" },
        { label: "Floor", key: "floor", format: (v: any) => v || "--" },
        { label: "Furn/Unfurnished", key: "furnishingStatus", format: (v: any) => v || "--" },
        { label: "Seat in Office", key: "seatInOffice", format: (v: any) => v || "--" },
        { label: "No. of Cabin", key: "noOfCabin", format: (v: any) => v || "--" },
        { label: "Building Structure", key: "buildingStructure", format: (v: any) => v || "--" },
        { label: "Floor Plan", key: "floorPlan", format: (v: any) => v || "--" },
        { label: "Car Park", key: "parking", format: (v: any) => v || "--" },
        { label: "Availability Time", key: "possession", format: (v: any) => v || "--" },
        { label: "Chargeable Area", key: "chargeableArea", format: (v: any) => v || "--" },
        { label: "Efficiency", key: "efficiency", format: (v: any) => v || "--" },
        { label: "Quoted Renting / Towards", key: "price", format: (v: any) => v ? `₹ ${Number(v).toLocaleString('en-IN')}` : "--" },
        { label: "Maintenance", key: "maintenance", format: (v: any) => v ? `₹ ${v}` : "--" },
        { label: "Taxes", key: "taxes", format: (v: any) => v || "--" },
    ];

    // State for toggling attribute visibility (initially all visible)
    const [visibleAttrs, setVisibleAttrs] = useState(attributes.map(a => a.key));

    const toggleAttribute = (key: string) => {
        setVisibleAttrs(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        );
    };

    const fetchComparedProperties = async () => {
        setLoading(true);
        try {
            let url = `${API_BASE_URL}/user-properties/property-comparisons`;

            // Get logged-in user
            const storedUser = localStorage.getItem('webUser');
            let userId = null;
            if (storedUser) {
                try {
                    const userObj = JSON.parse(storedUser);
                    userId = userObj.id;
                } catch (e) {
                    console.error("Error parsing user for comparison fetch");
                }
            }

            if (userId) {
                url += `?webUserId=${userId}`;
            } else {
                // If not logged in, technically we should show nothing or prompt login.
                // For now, let's just return empty to avoid showing all users' data.
                setComparisons([]);
                setLoading(false);
                return;
            }

            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch property comparisons");
            const allComparisons = await res.json();

            // Parse propertyData if it's a string
            const parsedComparisons = allComparisons.map((item: any) => {
                let pData = item.property || item.propertyData || {};

                // Safety parsing
                if (typeof pData === 'string') {
                    try {
                        pData = JSON.parse(pData);
                    } catch (e) {
                        console.error("Error parsing propertyData", e);
                        pData = {};
                    }
                }

                // Normalize images: `multipleImages` (array of objs) -> `images` (array of strings)
                // If `multipleImages` exists, use its `path` property.
                if (pData?.multipleImages && Array.isArray(pData.multipleImages)) {
                    pData.images = pData.multipleImages.map((img: any) => img.path || img);
                } else if (!pData?.images) {
                    pData.images = [];
                }

                return { ...item, propertyData: pData };
            });

            console.log("Fetched userId:", userId, "Comparisons:", parsedComparisons);
            setComparisons(parsedComparisons);
        } catch (error) {
            console.error("Error fetching compared properties:", error);
            toast.error("Failed to load compared properties");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComparedProperties();
    }, []);

    const handleRemove = async (id: string | number) => {
        try {
            const res = await fetch(`${API_BASE_URL}/user-properties/property-comparisons/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to remove property");
            toast.success("Property removed from comparison");
            // Remove from state immediately for UI responsiveness
            setComparisons(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove property");
        }
    };

    const handleClearAll = async () => {
        // In a real scenario, we might want to batch delete or just clear local state if this was local.
        // Since it's API based, we'd need to delete each.
        // For now, I'll just clear the UI and pretend, or loop delete? 
        // Loop delete for correctness:
        const promises = comparisons.map(c =>
            fetch(`${API_BASE_URL}/user-properties/property-comparisons/${c.id}`, { method: 'DELETE' })
        );
        await Promise.all(promises);
        setComparisons([]);
        toast.success("All properties cleared");
    };

    // Helper to share on WhatsApp
    const shareOnWhatsapp = (property: any) => {
        const text = `Check out this property: ${property.propertyName} at ${property.location}. Price: ${property.price}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const contactUs = () => {
        window.open(`https://wa.me/918384848485?text=${encodeURIComponent("I need help choosing a property from the comparison list.")}`, '_blank');
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans" style={{ fontFamily: 'Lato, sans-serif' }}>
            <Toaster />

            {/* --- HERO BANNER --- */}
            <section className="relative overflow-hidden rounded-2xl m-2">
                <div className="relative h-[200px] w-full md:h-[300px]">
                    <Image
                        src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&auto=format&fit=crop&q=80"
                        alt="Compare Properties Background"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="absolute inset-0 flex items-center">
                    <div className="w-full px-6">
                        <div className="mx-auto w-full max-w-7xl">
                            <div className="max-w-3xl">
                                <div className="text-sm font-semibold tracking-[0.2em] text-[#ffee50] font-sans">
                                    Home / Compare Properties
                                </div>
                                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl font-sans uppercase">
                                    Compare Properties
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex-1 p-4 md:p-8">
                {/* Top Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 max-w-[1400px] mx-auto bg-[#F8F9FB]">
                    <button
                        onClick={handleClearAll}
                        className="px-6 py-2 bg-white border border-[#172747] text-[#172747] font-semibold rounded hover:bg-gray-50 transition-colors uppercase text-sm tracking-wider shadow-sm"
                    >
                        Clear All
                    </button>

                    <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-gray-700 text-base">Want Help Choosing Property ??</span>
                        <button
                            onClick={contactUs}
                            className="px-8 py-2.5 bg-[#172747] text-white rounded hover:bg-[#111e36] transition-colors text-sm font-medium tracking-wide shadow-md"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto overflow-x-auto pb-8">
                    <div className="min-w-max">
                        {/* Grid/Table Layout */}
                        <div className="flex gap-6">

                            {/* Fixed Left Column - Labels */}
                            <div className="w-[280px] flex-shrink-0 flex flex-col gap-6">
                                {/* Add New Property Card Placeholder */}
                                <Link href="/properties" className="block">
                                    <div className="h-[420px] bg-[#EAEEF6] border-[3px] border-[#172747] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors shadow-sm">
                                        <div className="w-14 h-14 bg-[#172747] rounded-full flex items-center justify-center text-white mb-4">
                                            <Plus size={28} />
                                        </div>
                                        <span className="text-[#172747] font-medium text-lg">Add New Property</span>
                                    </div>
                                </Link>

                                {/* Labels List with Checkboxes */}
                                <div className="space-y-0 bg-[#EAEEF6] rounded-xl py-4 overflow-hidden border border-gray-100 shadow-sm">
                                    {attributes.map((attr, idx) => {
                                        const isVisible = visibleAttrs.includes(attr.key);
                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => toggleAttribute(attr.key)}
                                                className="h-14 px-6 flex items-center gap-3 text-gray-600 font-medium text-[15px] cursor-pointer hover:bg-gray-200 transition-colors select-none"
                                            >
                                                <div className={`w-5 h-5 rounded border-[2px] flex items-center justify-center transition-colors ${isVisible ? 'bg-[#172747] border-[#172747]' : 'border-gray-400 bg-transparent'}`}>
                                                    {isVisible && <Check size={14} className="text-white" />}
                                                </div>
                                                <span className={isVisible ? "text-[#172747] font-semibold" : ""}>{attr.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Property Columns */}
                            {comparisons.map((item) => {
                                const data = item.propertyData || {};
                                return (
                                    <div key={item.id} className="w-[340px] flex-shrink-0 flex flex-col">
                                        {/* Combined Card Container */}
                                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">

                                            {/* Property Header Section */}
                                            <div className="p-5 pb-0 relative bg-white">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-[#172747] truncate w-48" title={data.propertyName}>
                                                            {data.propertyName || "Property Name"}
                                                        </h3>
                                                        <div className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                            {data.location || "Location"}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        className="text-red-500 text-xs font-semibold hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>

                                                <div className="relative h-44 w-full mb-4 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={(() => {
                                                            const img = data.images?.[0];
                                                            if (!img) return "/images/placeholder.jpg";
                                                            // If it starts with http, it's a full URL
                                                            if (img.startsWith('http')) return img;
                                                            // Normalize path: replace backslashes with forward slashes and ensure leading slash
                                                            const cleanPath = img.replace(/\\/g, '/');
                                                            const finalPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
                                                            // If it's a relative path (e.g. from multer), prepend backend URL
                                                            return `${API_BASE_URL.replace('/api', '')}${finalPath}`;
                                                        })()}
                                                        alt={data.propertyName}
                                                        fill
                                                        className="object-cover"
                                                        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image" }}
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <div className="flex justify-between items-end mb-3">
                                                        <div>
                                                            <div className="text-xl font-bold text-[#172747]">
                                                                {data.price ? `₹ ${Number(data.price).toLocaleString('en-IN')}` : "Price TBD"}
                                                            </div>
                                                            <div className="text-[10px] text-[#172747] font-medium opacity-80">
                                                                rent/month
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => shareOnWhatsapp(data)}
                                                                className="w-8 h-8 rounded bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm"
                                                            >
                                                                <MessageCircle size={18} fill="white" className="stroke-none" />
                                                            </button>
                                                            <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
                                                                <Share2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-3 mb-2 h-[48px]">
                                                        {data.description || `Beautiful property at ${data.location}. Contact for more details.`}
                                                    </p>
                                                    <button className="text-[#172747] text-[11px] font-bold hover:underline">Read More</button>
                                                </div>
                                            </div>

                                            {/* Attributes Values Section (Merged) */}
                                            <div className="space-y-0 bg-white border-t border-gray-100">
                                                {attributes.map((attr, idx) => {
                                                    if (!visibleAttrs.includes(attr.key)) return null;
                                                    return (
                                                        <div key={idx} className={`h-11 px-4 flex items-center justify-between text-[13px] border-b border-gray-100 last:border-0`}>
                                                            <span className="text-gray-500 font-medium">{attr.label}</span>
                                                            <span className="text-[#172747] font-semibold">{attr.format(data[attr.key])}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Empty Slot */}
                            <div className="w-[340px] flex-shrink-0">
                                <Link href="/properties" className="block h-[420px]">
                                    <div className="h-full bg-[#EAEEF6] border-[2px] border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:bg-gray-200 transition-colors">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-400 mb-3 shadow-sm">
                                            <Plus size={24} />
                                        </div>
                                        <span className="text-gray-500 text-sm text-center px-4 font-medium">Choose from saved<br />properties</span>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompareProperties;
