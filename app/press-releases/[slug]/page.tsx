'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function PressReleaseDetails() {
  const params = useParams();
  const router = useRouter();
  const [pr, setPr] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    const mockData = {
      title: 'Earth Sukham Announces New Luxury Township in Kharadi',
      slug: 'earth-sukham-announces-new-luxury-township',
      content: 'Pune-based real estate developer Earth Sukham has announced the launch of its newest luxury township in Kharadi. The project spans over 20 acres and will feature premium 3 and 4 BHK residences designed for modern living.\n\nThe development emphasizes sustainable architecture and features world-class amenities including a clubhouse, olympic-sized swimming pool, and extensive green cover.\n\n"We are thrilled to bring this flagship project to Kharadi, a micro-market that continues to see tremendous demand from IT professionals," said the CEO.',
      source: 'The Economic Times',
      publishedDate: '2026-08-15T00:00:00.000Z'
    };
    
    setPr(mockData);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!pr) {
    return <div className="min-h-screen flex items-center justify-center">Press Release not found</div>;
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-[#b38e41] transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Press Releases
        </button>

        <div className="mb-8 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#b38e41]/10 text-[#b38e41] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {pr.source || 'News'}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {new Date(pr.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6">
            {pr.title}
          </h1>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {pr.content.split('\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
