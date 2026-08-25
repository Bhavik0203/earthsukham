"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    GitCompare,
    Search,
    User,
    Heart,
    LogOut,
    MapPin,
    CheckCircle,
    Loader2
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { API_BASE_URL } from "../lib/api";

interface UserData {
    id: number;
    name: string;
    email: string;
    number: string;
    city?: string;
    role?: string;
    createdAt?: string;
}

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [savedCount, setSavedCount] = useState<number>(0);
    const [compareCount, setCompareCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("webUser");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                fetchStats(parsedUser.id);
            } catch (err) {
                console.error("Error parsing user data", err);
                router.push("/login");
            }
        } else {
            router.push("/login");
        }
        setIsLoading(false);
    }, [router]);

    const fetchStats = async (userId: string) => {
        try {
            // Fetch Saved Properties
            const savedRes = await fetch(`${API_BASE_URL}/user-properties/saved-properties?webUserId=${userId}`);
            if (savedRes.ok) {
                const savedData = await savedRes.json();
                setSavedCount(savedData.length);
            }

            // Fetch Compared Properties
            const compareRes = await fetch(`${API_BASE_URL}/user-properties/property-comparisons?webUserId=${userId}`);
            if (compareRes.ok) {
                const compareData = await compareRes.json();
                setCompareCount(compareData.length);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("webUser");
        window.dispatchEvent(new Event('userStateChange'));
        toast.success("Logged out successfully");
        setTimeout(() => {
            router.push("/login");
        }, 1000);
    };

    const handleClearAll = async () => {
        if (!user) return;

        if (!confirm("Are you sure you want to clear all saved and compared properties?")) {
            return;
        }

        const toastId = toast.loading("Clearing data...");

        try {
            const [savedRes, compareRes] = await Promise.all([
                fetch(`${API_BASE_URL}/user-properties/saved-properties?webUserId=${user.id}`),
                fetch(`${API_BASE_URL}/user-properties/property-comparisons?webUserId=${user.id}`)
            ]);

            const savedAll = savedRes.ok ? await savedRes.json() : [];
            const compareAll = compareRes.ok ? await compareRes.json() : [];

            const deletePromises = [
                ...savedAll.map((item: any) => fetch(`${API_BASE_URL}/user-properties/saved-properties/${item.id}`, { method: 'DELETE' })),
                ...compareAll.map((item: any) => fetch(`${API_BASE_URL}/user-properties/property-comparisons/${item.id}`, { method: 'DELETE' }))
            ];

            await Promise.all(deletePromises);

            setSavedCount(0);
            setCompareCount(0);
            toast.success("All cleared successfully", { id: toastId });

        } catch (error) {
            console.error("Error clearing data:", error);
            toast.error("Failed to clear data", { id: toastId });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-[#FBF9F4]">
                <Loader2 className="w-8 h-8 animate-spin text-[#8c6b23]" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
            <Toaster position="top-right" />

            {/* --- HERO BANNER --- */}
            <section className="relative overflow-hidden rounded-2xl m-2">
              <div className="relative h-[200px] w-full md:h-[300px]">
                <Image
                  src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&auto=format&fit=crop&q=80" 
                  alt="Profile Background"
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
                        Home / Profile
                      </div>
                      <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl font-sans uppercase">
                        My Profile
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-1 max-w-7xl mx-auto w-full">
                {/* Sidebar */}
                <aside className="w-64 bg-transparent hidden md:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
                <div className="p-6">
                    <nav className="space-y-6 mt-4">
                        <Link href="/profile" className="flex items-center space-x-3 text-gray-600 hover:text-[#8c6b23] transition-colors font-medium">
                            <GitCompare className="w-5 h-5" />
                            <span>Compare Properties</span>
                        </Link>

                        <Link href="/properties" className="flex items-center space-x-3 text-gray-600 hover:text-[#8c6b23] transition-colors font-medium">
                            <Search className="w-5 h-5" />
                            <span>Explore More</span>
                        </Link>

                        <div className="flex items-center space-x-3 text-[#8c6b23] font-bold border-r-4 border-[#8c6b23] -mr-6 py-2">
                            <User className="w-5 h-5" />
                            <span>Profile</span>
                        </div>

                        <Link href="/profile" className="flex items-center space-x-3 text-gray-600 hover:text-[#8c6b23] transition-colors font-medium">
                            <Heart className="w-5 h-5" />
                            <span>Saved Properties</span>
                        </Link>

                        <div className="pt-10">
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 text-red-500 hover:text-red-600 transition-colors font-medium w-full text-left"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10">
                <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6 uppercase tracking-wide">Account Dashboard</h2>

                <div className="bg-white rounded-xl shadow-sm border border-[#e6dcc6] p-8">
                    <div className="flex flex-col md:flex-row gap-10">

                        {/* Left Column: User Card */}
                        <div className="md:w-1/4 flex flex-col items-center md:border-r md:border-[#e6dcc6] md:pr-10">
                            <div className="w-32 h-32 bg-[#efe9d6] rounded-full flex items-center justify-center mb-4 border-2 border-[#8c6b23]">
                                <User className="w-16 h-16 text-[#8c6b23]" />
                            </div>
                            <h2 className="text-xl font-bold text-[#2C2C2C]">{user.name}</h2>
                            <p className="text-gray-500 mb-6">{user.role || 'User'}</p>

                            <div className="flex items-center text-gray-500 gap-2 w-full justify-center md:justify-start pl-4">
                                <MapPin className="w-4 h-4" />
                                <span>{user.city || 'Pune'}</span>
                            </div>
                        </div>

                        {/* Right Column: Details & Stats */}
                        <div className="md:w-3/4 flex flex-col gap-8">

                            {/* Account Info Box */}
                            <div className="bg-[#FBF9F4] rounded-lg p-6 border border-[#e6dcc6]">
                                <h3 className="font-bold text-[#2C2C2C] mb-4">Account Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Full Name</p>
                                        <p className="text-[#2C2C2C] font-medium">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Mobile Number</p>
                                        <p className="text-[#2C2C2C] font-medium">{user.number}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Account Status</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span className="text-[#2C2C2C] font-medium">Active</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Verification</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <CheckCircle className="w-4 h-4 text-blue-500" />
                                            <span className="text-[#2C2C2C] font-medium">Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Saved Properties */}
                                <div className="border border-[#e6dcc6] bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-sm">
                                    <h3 className="font-bold text-[#2C2C2C] mb-2">Saved Properties</h3>
                                    <div className="text-3xl font-bold text-[#8c6b23] mb-2">{savedCount}</div>
                                    <p className="text-sm text-gray-500 mb-4">Properties saved to your list</p>
                                    <Link href="/saved-properties" className="text-[#8c6b23] text-sm font-medium hover:underline">
                                        View all saved properties
                                    </Link>
                                </div>

                                {/* Compare Properties */}
                                <div className="border border-[#e6dcc6] bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-sm">
                                    <h3 className="font-bold text-[#2C2C2C] mb-2">Compare Properties</h3>
                                    <div className="text-3xl font-bold text-[#8c6b23] mb-2">{compareCount}</div>
                                    <p className="text-sm text-gray-500 mb-4">Properties in your comparison list</p>
                                    <Link href="/compareproperties" className="text-[#8c6b23] text-sm font-medium hover:underline">
                                        View comparison
                                    </Link>
                                </div>
                            </div>

                            {/* Clear Action */}
                            <div className="mt-auto">
                                <button
                                    onClick={handleClearAll}
                                    className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 px-6 py-3 rounded-sm shadow-sm font-medium transition-colors"
                                >
                                    Clear All Saved & Compared
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            </div>
        </div>
    );
}
