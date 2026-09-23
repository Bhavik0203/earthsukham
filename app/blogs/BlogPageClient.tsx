'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchApi } from '../lib/api';

interface BlogApiItem {
  _id: string;
  title: string;
  slug: string;
  uploadImage?: string;
  coverImage?: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  categories?: string[];
  readTime?: number;
  createdAt?: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
}

const gridLayout = [
  'col-span-6 lg:col-span-4 lg:row-span-2',
  'col-span-6 lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-1',
  'col-span-6 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-3',
  'col-span-6 lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-3',
  'col-span-6 lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-3',
  'col-span-6 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-5',
  'col-span-6 lg:col-span-4 lg:row-span-2 lg:col-start-3 lg:row-start-5',
  'col-span-6 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-7',
  'col-span-6 lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-7',
  'col-span-6 lg:col-span-2 lg:row-span-2 lg:col-start-5 lg:row-start-7',
];

const normalizeTags = (value: string[] | undefined): string[] => {
  if (!value) return [];
  return value
    .flatMap((item) => {
      if (!item) return [];
      try {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed)) return parsed;
        return [parsed];
      } catch {
        return [item];
      }
    })
    .filter(Boolean)
    .map((tag) => String(tag).replaceAll('"', '').trim())
    .filter(Boolean);
};

const formatDate = (value?: string) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const DUMMY_BLOGS: BlogPost[] = [
  {
    id: 'dummy-1',
    title: 'The Future of Real Estate: Trends to Watch in 2026',
    slug: 'future-of-real-estate-trends',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Explore the latest innovations and market trends shaping the future of real estate development and investment across the globe.',
    tag: 'Market Trends',
    date: 'Oct 12, 2026',
    readTime: '5 min read',
  },
  {
    id: 'dummy-2',
    title: 'Sustainable Living: Eco-Friendly Home Upgrades',
    slug: 'sustainable-living-eco-friendly-upgrades',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Discover easy and effective ways to make your home more energy-efficient, environmentally friendly, and sustainable.',
    tag: 'Sustainability',
    date: 'Oct 05, 2026',
    readTime: '4 min read',
  },
  {
    id: 'dummy-3',
    title: 'Top 10 Neighborhoods for Families in 2026',
    slug: 'top-10-neighborhoods-for-families',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Looking to settle down? We break down the most family-friendly neighborhoods based on schools, safety, and amenities.',
    tag: 'Lifestyle',
    date: 'Sep 28, 2026',
    readTime: '6 min read',
  },
  {
    id: 'dummy-4',
    title: 'How to Maximize Your Property Value Before Selling',
    slug: 'maximize-property-value-before-selling',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Simple renovations and staging tips that can dramatically increase your home\'s market value before you list it for sale.',
    tag: 'Selling Tips',
    date: 'Sep 20, 2026',
    readTime: '7 min read',
  },
  {
    id: 'dummy-5',
    title: 'The Rise of Smart Homes: Integration and Automation',
    slug: 'rise-of-smart-homes-automation',
    image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&auto=format&fit=crop&q=80',
    excerpt: 'From voice-controlled lighting to automated security systems, learn how smart technology is redefining modern living.',
    tag: 'Technology',
    date: 'Sep 15, 2026',
    readTime: '5 min read',
  },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Categories');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadBlogs = async () => {
      try {
        const data = await fetchApi('/blogs');
        if (!isMounted) return;
        
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((post: BlogApiItem) => {
            const apiTags = normalizeTags(post.tags || post.categories || []);
            const tag = apiTags[0] || 'General';
            const excerpt = post.excerpt || (post.content ? post.content.replace(/<[^>]+>/g, '').slice(0, 180) : '');

            return {
              id: post._id || post.slug,
              title: post.title,
              slug: post.slug,
              image: post.uploadImage || post.coverImage || '/images/blogimage/blog.png',
              excerpt,
              tag,
              date: formatDate(post.createdAt),
              readTime: post.readTime ? `${post.readTime} min read` : '5 min read',
            };
          });
          setBlogs(formatted);
        } else {
          // Fallback to dummy blogs if API returns empty array
          setBlogs(DUMMY_BLOGS);
        }
      } catch (error) {
        console.error('Failed to load blogs, falling back to dummy data:', error);
        if (isMounted) setBlogs(DUMMY_BLOGS);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadBlogs();
    return () => { isMounted = false; };
  }, []);

  const topics = ['All Categories', ...Array.from(new Set(blogs.map((post) => post.tag)))];

  const filtered = blogs.filter((post) => {
    const matchesTopic = selectedTopic === 'All Categories' || post.tag === selectedTopic;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="bg-[#f5f3f3]">
      <div className="bg-[#f5f3f3] p-2">
        {/* <Navbar /> */}

        <section className="relative overflow-hidden rounded-2xl">
          <div className="relative h-[260px] w-full md:h-[420px]">
            <Image
              src="/images/bg3.png"
              alt="Blog banner"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-6">
              <div className="mx-auto w-full max-w-7xl">
                <div className="max-w-3xl">
                  <div className="text-sm font-semibold tracking-[0.2em] text-[#ffee50]">
                    Home / Blogs
                  </div>
                  <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl font-raleway">
                    Blogs & Articles
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-6">
                <div className="rounded-2xl bg-[#f7f5ef] p-5">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-full bg-white px-4 py-3 pr-10 text-sm text-[#101010] outline-none ring-1 ring-black/5 placeholder:text-[#6b6b6b] font-raleway"
                    />
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <svg className="h-5 w-5 text-[#6b6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-xs cursor-pointer font-semibold uppercase tracking-widest text-[#6b6b6b] font-raleway">Categories</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {topics.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTopic(t)}
                          className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors font-raleway ${selectedTopic === t
                            ? 'bg-[#3b3808] text-[#ffee50]'
                            : 'bg-[#efe9dd] text-[#3b3808] hover:bg-[#ffee50]'
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-black/10 pt-6">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b] font-raleway">Featured Articles</div>
                    <div className="mt-4 space-y-4">
                      {blogs.slice(0, 5).map((p) => (
                        <Link key={p.id} href={`/blogs/${p.slug}`} className="block group cursor-pointer">
                          <div className="mt-1 text-sm font-semibold leading-snug text-[#1b1b1b] group-hover:text-[#3B3808] transition-colors font-raleway">
                            {p.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              {loading ? (
                <div className="flex h-64 items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
                  <p className="text-gray-500 font-raleway">Loading blogs...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm h-64">
                  <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-semibold text-gray-600 font-raleway">No blogs found</p>
                  <p className="text-sm text-gray-500 mt-1 font-raleway">Try adjusting your search query or selecting a different category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-6 lg:grid-rows-8">
                  {filtered.map((post, idx) => {
                    const layoutClass = gridLayout[idx % gridLayout.length];
                    return (
                      <article
                        key={`${post.id}-${idx}`}
                        className={`${layoutClass} rounded-xl bg-white p-4 shadow-sm group hover:shadow-md transition-shadow duration-300`}
                      >
                        <Link href={`/blogs/${post.slug}`} className="block h-full cursor-pointer">
                          <div className="overflow-hidden rounded-2xl">
                            <div className="relative h-[220px] w-full lg:h-[240px]">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          </div>

                          <div className="px-2 pb-2 pt-5">
                            <div className="inline-flex rounded-md bg-[#ffee50] px-3 py-1 text-xs font-semibold text-[#3B3808]">
                              {post.tag}
                            </div>
                            <h3 className="mt-3 text-base font-semibold leading-snug text-[#2b2b2b] group-hover:text-[#3B3808] transition-colors duration-200 md:text-lg font-raleway">
                              {post.title}
                            </h3>
                            <div className="mt-3 flex items-center gap-3 text-xs text-[#8b8b8b] font-raleway">
                              <span>{post.date}</span>
                              <span>·</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
