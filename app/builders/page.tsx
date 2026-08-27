'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Builder {
  _id: string;
  name: string;
  description: string;
  establishedYear: number;
  contactEmail: string;
  website: string;
}

export default function BuildersPage() {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from the backend:
    // fetch('http://localhost:8000/api/builders')
    //   .then(res => res.json())
    //   .then(data => setBuilders(data.data));
    
    // For now, mock data as backend might not be seeded
    const mockBuilders = [
      {
        _id: '1',
        name: 'Earth Sukham Developers',
        description: 'Creating sustainable and luxurious living spaces across Pune.',
        establishedYear: 2010,
        contactEmail: 'contact@earthsukham.com',
        website: 'https://earthsukham.com'
      },
      {
        _id: '2',
        name: 'Kolte-Patil Developers',
        description: 'Pune\'s leading real estate developer with over 2 decades of experience.',
        establishedYear: 1991,
        contactEmail: 'sales@koltepatil.com',
        website: 'https://koltepatil.com'
      }
    ];
    setBuilders(mockBuilders);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Our Builder Partners</h1>
        <p className="text-gray-600 mb-10">Discover the reputed developers behind our premium property listings.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {builders.map((builder) => (
            <div key={builder._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center relative">
                {/* Fallback avatar if no logo */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl font-bold text-[#b38e41]">
                  {builder.name.charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{builder.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{builder.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  {builder.establishedYear && <p><span className="font-semibold text-gray-700">Established:</span> {builder.establishedYear}</p>}
                  {builder.website && <p><span className="font-semibold text-gray-700">Website:</span> <a href={builder.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{builder.website.replace('https://', '')}</a></p>}
                </div>
                <button className="mt-6 w-full py-2 border border-[#b38e41] text-[#b38e41] rounded hover:bg-[#b38e41] hover:text-white transition-colors font-medium">
                  View Properties
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
