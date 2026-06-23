'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';

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
  content: string;
  tag: string;
  date: string;
  readTime: string;
}

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

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          'https://sunbrilo-dashboard.onrender.com/api/blogs/',
          { cache: 'no-store' }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data: BlogApiItem[] = await response.json();

        if (!isMounted || !Array.isArray(data)) return;

        const formatted = data.map((post) => {
          const apiTags = normalizeTags(post.tags || post.categories || []);
          const tag = apiTags[0] || 'General';
          const excerpt = post.excerpt || post.content?.replace(/<[^>]+>/g, '').slice(0, 180) || '';
          const content = post.content || '<p>No content available.</p>';

          return {
            id: post._id,
            title: post.title,
            slug: post.slug,
            image: post.uploadImage || post.coverImage || '/images/blogimage/blog.png',
            excerpt,
            content,
            tag,
            date: formatDate(post.createdAt),
            readTime: post.readTime ? `${post.readTime} min read` : '5 min read',
          };
        });

        setBlogs(formatted);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  const post = blogs.find((item) => item.slug === params.slug);

  useEffect(() => {
    if (!loading && !post) {
      notFound();
    }
  }, [loading, post]);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f3f3]">
        <p className="text-gray-600 font-raleway">Loading blog...</p>
      </div>
    );
  }

  const related = blogs.filter((p) => p.slug !== post.slug).slice(0, 3);
  const topPosts = blogs.slice(0, 5);
  const tags = [post.tag, ...(normalizeTags([]))].filter(Boolean);

  return (
    <div className="bg-[#f5f3f3]">
      <div className="bg-[#f5f3f3] p-4">
        <section className="relative overflow-hidden rounded-2xl">
          <div className="relative h-[260px] w-full md:h-[420px]">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/65" />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-6">
              <div className="mx-auto w-full max-w-7xl">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-[#ffee50]">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span>/</span>
                    <Link href="/blogs" className="hover:underline">Blog</Link>
                    <span>/</span>
                    <span className="text-white/70 truncate max-w-[200px]">{post.tag}</span>
                  </div>

                  <div className="mt-4 inline-flex rounded-md bg-[#ffee50] px-3 py-1 text-xs font-semibold text-[#3B3808]">
                    {post.tag}
                  </div>

                  <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl font-raleway">
                    {post.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70 font-raleway">
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Sunbrilo Editorial
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-6 space-y-4">
                <div className="rounded-2xl bg-[#f7f5ef] p-5">
                  <div className="mt-6 border-t border-black/10 pt-6">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b] font-raleway">Top Posts</div>
                    <div className="mt-4 space-y-4">
                      {topPosts.map((p) => (
                        <Link key={p.id} href={`/blogs/${p.slug}`} className="block group">
                          <div className={`text-sm font-semibold leading-snug transition-colors font-raleway ${p.slug === post.slug ? 'text-[#3B3808]' : 'text-[#1b1b1b] group-hover:text-[#3B3808]'
                            }`}>
                            {p.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#3B3808] p-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#ffee50] font-raleway mb-3">
                    Share this article
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                      target="_blank" rel="noopener noreferrer" aria-label="Share on X"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#ffee50] hover:text-[#3B3808] text-white transition-colors">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h7.068l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a href="https://linkedin.com/shareArticle" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#ffee50] hover:text-[#3B3808] text-white transition-colors">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <button onClick={handleCopy} aria-label="Copy link"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#ffee50] hover:text-[#3B3808] text-white transition-colors">
                      {copied ? (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <main className="lg:col-span-9">
              <article className="rounded-2xl bg-white p-6 md:p-10 shadow-sm">
                <p className="text-lg font-semibold leading-relaxed text-[#3B3808] border-l-4 border-[#ffee50] pl-4 mb-8 font-raleway">
                  {post.excerpt}
                </p>
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <div className="relative h-[280px] md:h-[400px] w-full">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                </div>
                <div
                  className="prose max-w-none [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:leading-relaxed [&_p]:text-[#4b4b4b] [&_p]:font-raleway"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <div className="mt-10 pt-6 border-t border-black/10 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-xl bg-[#efe9dd] px-3 py-1.5 text-xs font-semibold text-[#3b3808] font-raleway">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-4 rounded-2xl bg-[#f7f5ef] p-5">
                  <div className="h-14 w-14 rounded-full bg-[#3B3808] flex items-center justify-center text-[#ffee50] font-bold text-xl font-raleway">
                    SE
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1b1b1b] font-raleway">Sunbrilo Editorial</div>
                    <div className="text-xs text-[#6b6b6b] mt-0.5 font-raleway">Insights from the Sunbrilo team.</div>
                  </div>
                </div>
              </article>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-[#1b1b1b] mb-4 font-raleway">Related Articles</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {related.map((p) => (
                    <Link key={p.id} href={`/blogs/${p.slug}`}
                      className="group block rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-40 overflow-hidden">
                        <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <div className="inline-flex rounded-md bg-[#ffee50] px-2.5 py-0.5 text-[10px] font-semibold text-[#3B3808] mb-2">
                          {p.tag}
                        </div>
                        <h3 className="text-sm font-semibold leading-snug text-[#2b2b2b] group-hover:text-[#3B3808] transition-colors font-raleway line-clamp-2">
                          {p.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-3 text-xs text-[#8b8b8b] font-raleway">
                          <span>{p.date}</span>
                          <span>·</span>
                          <span>{p.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 mb-4">
                <Link href="/blogs"
                  className="inline-flex items-center gap-2 rounded-full bg-[#3B3808] px-6 py-3 text-sm font-semibold text-[#ffee50] hover:bg-[#4f4d10] transition-colors font-raleway">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
                  </svg>
                  Back to Blog
                </Link>
              </div>
            </main>
          </div>
        </section>
      </div>
    </div>
  );
}
