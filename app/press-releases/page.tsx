'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PressRelease {
  _id: string;
  title: string;
  slug: string;
  content: string;
  source: string;
  publishedDate: string;
}

export default function PressReleasesPage() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from the backend:
    // fetch('http://localhost:8000/api/press-releases')
    //   .then(res => res.json())
    //   .then(data => setPressReleases(data.data));
    
    const mockPRs = [
      {
        _id: '1',
        title: 'Earth Sukham Announces New Luxury Township in Kharadi',
        slug: 'earth-sukham-announces-new-luxury-township',
        content: 'Pune-based real estate developer Earth Sukham has announced the launch of its newest luxury township...',
        source: 'The Economic Times',
        publishedDate: '2026-08-15T00:00:00.000Z'
      },
      {
        _id: '2',
        title: 'Real Estate Sales Surge in Pune IT Corridors',
        slug: 'real-estate-sales-surge-pune-it',
        content: 'Recent reports indicate a massive 40% surge in residential property sales across Pune\'s major IT corridors...',
        source: 'Financial Express',
        publishedDate: '2026-07-22T00:00:00.000Z'
      }
    ];
    setPressReleases(mockPRs);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Press Releases & Media</h1>
        <p className="text-gray-600 mb-10">Stay updated with the latest news, announcements, and media coverage.</p>
        
        <div className="space-y-6">
          {pressReleases.map((pr) => (
            <Link href={`/press-releases/${pr.slug}`} key={pr._id} className="block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#b38e41]/10 text-[#b38e41] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {pr.source || 'News'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(pr.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#b38e41] transition-colors">
                    {pr.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {pr.content}
                  </p>
                  <span className="text-[#b38e41] font-medium text-sm flex items-center gap-1 hover:underline">
                    Read Full Story →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
