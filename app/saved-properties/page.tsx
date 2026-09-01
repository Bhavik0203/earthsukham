"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Share2, MessageCircle, Heart } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '../lib/api';

const SavedProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSavedProperties = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/user-properties/saved-properties`;

      const storedUser = localStorage.getItem('webUser');
      let userId = null;
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          userId = userObj.id;
        } catch (e) {
          console.error("Error parsing user", e);
        }
      }

      if (userId) {
        url += `?webUserId=${userId}`;
      } else {
        setProperties([]);
        setLoading(false);
        return;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch saved properties");
      const data = await res.json();
      
      const parsedProps = data.map((item: any) => {
        let pData = item.property || item.propertyData || {};
        if (typeof pData === 'string') {
          try {
            pData = JSON.parse(pData);
          } catch (e) {
            pData = {};
          }
        }
        if (pData?.multipleImages && Array.isArray(pData.multipleImages)) {
          pData.images = pData.multipleImages.map((img: any) => img.path || img);
        } else if (!pData?.images) {
          pData.images = [];
        }
        return { ...item, propertyData: pData };
      });

      setProperties(parsedProps);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load saved properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/user-properties/saved-properties/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove property");
      toast.success("Property removed from saved list");
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove property");
    }
  };

  const handleClearAll = async () => {
    try {
      const promises = properties.map(p =>
        fetch(`${API_BASE_URL}/user-properties/saved-properties/${p.id}`, { method: 'DELETE' })
      );
      await Promise.all(promises);
      setProperties([]);
      toast.success("All saved properties cleared");
    } catch (error) {
      toast.error("Failed to clear properties");
    }
  };

  const shareOnWhatsapp = (property: any) => {
    const text = `Check out this property: ${property.propertyName} at ${property.location}. Price: ${property.price}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FBF9F4]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8c6b23]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans" style={{ fontFamily: 'Lato, sans-serif' }}>
      <Toaster />

      {/* --- HERO BANNER --- */}
      <section className="relative overflow-hidden rounded-2xl m-2">
        <div className="relative h-[200px] w-full md:h-[300px]">
          <Image
            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&auto=format&fit=crop&q=80" 
            alt="Saved Properties Background"
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
                  Home / Saved Properties
                </div>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl font-sans uppercase">
                  Saved Properties
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 max-w-[1400px] mx-auto mt-8">
          <h2 className="text-2xl font-bold text-[#2C2C2C] uppercase tracking-wide">Your List</h2>
        {properties.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-6 py-2 bg-white border border-red-200 text-red-600 font-semibold rounded hover:bg-red-50 transition-colors uppercase text-sm tracking-wider shadow-sm"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto pb-8">
        {properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-[#e6dcc6] shadow-sm">
            <Heart size={48} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-500 mb-2">No Saved Properties</h2>
            <p className="text-gray-400 text-sm mb-6">You haven't saved any properties yet.</p>
            <Link href="/properties" className="px-6 py-2 bg-[#8c6b23] text-white rounded hover:bg-[#7a5d1e] transition-colors font-medium">
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((item) => {
              const data = item.propertyData || {};
              return (
                <div key={item.id} className="bg-white rounded-xl border border-[#e6dcc6] shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={(() => {
                        const img = data.images?.[0];
                        if (!img) return "/images/placeholder.jpg";
                        if (img.startsWith('http')) return img;
                        const cleanPath = img.replace(/\\/g, '/');
                        const finalPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
                        return `${API_BASE_URL.replace('/api', '')}${finalPath}`;
                      })()}
                      alt={data.propertyName || "Property"}
                      fill
                      className="object-cover"
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image" }}
                    />
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                      title="Remove from saved"
                    >
                      <Heart size={16} fill="currentColor" />
                    </button>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-[#2C2C2C] line-clamp-1" title={data.propertyName}>
                          {data.propertyName || "Property Name"}
                        </h3>
                        <div className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          {data.location || "Location"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 mb-4 flex-1">
                      <div className="text-xl font-bold text-[#8c6b23]">
                        {data.price ? `₹ ${Number(data.price).toLocaleString('en-IN')}` : "Price TBD"}
                      </div>
                      <div className="text-[10px] text-gray-500 font-medium mb-2 uppercase">
                        {data.rentOrSale === 'rent' ? 'rent/month' : 'For Sale'}
                      </div>
                      <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">
                        {data.description || `Beautiful property at ${data.location}. Contact for more details.`}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                      <button
                        onClick={() => shareOnWhatsapp(data)}
                        className="flex-1 py-2 rounded bg-[#25D366] flex items-center justify-center gap-2 text-white hover:opacity-90 transition-opacity shadow-sm text-sm font-medium"
                      >
                        <MessageCircle size={16} fill="white" className="stroke-none" />
                        WhatsApp
                      </button>
                      <button className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shadow-sm">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default SavedProperties;
