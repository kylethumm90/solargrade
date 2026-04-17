import type { Metadata } from 'next'
import { getAllPosts, formatPostDate, CATEGORY_COLORS } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog & News - SolarGrade',
  description:
    'Updates, insights, and industry commentary from the team building the solar industry\'s transparent review platform.',
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="mb-12">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-600 rounded-full uppercase tracking-wider mb-4">
          Blog &amp; News
        </span>
        <h1 className="text-4xl font-bold text-[#1e293b] mb-3">The SolarGrade Journal</h1>
        <p className="text-lg text-[#64748b] max-w-2xl">
          Updates from the platform, commentary on the solar industry, and the thinking behind how
          we build.
        </p>
      </div>

      {/* Featured post */}
      {featured && (
        <a
          href={`/blog/${featured.slug}`}
          className="group block mb-16 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] overflow-hidden hover:border-amber-500/30 transition-all duration-200"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div
              className="flex items-center justify-center p-12 text-7xl md:text-8xl"
              style={{
                background: `linear-gradient(135deg, ${CATEGORY_COLORS[featured.category]}15 0%, ${CATEGORY_COLORS[featured.category]}05 100%)`,
              }}
            >
              <span aria-hidden>{featured.coverEmoji}</span>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${CATEGORY_COLORS[featured.category]}20`,
                    color: CATEGORY_COLORS[featured.category],
                  }}
                >
                  {featured.category}
                </span>
                <span className="text-xs text-[#64748b]">Featured</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-3 group-hover:text-amber-500 transition-colors">
                {featured.title}
              </h2>
              <p className="text-[#64748b] leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-[#64748b]">
                <span>{featured.author}</span>
                <span>&middot;</span>
                <span>{formatPostDate(featured.date)}</span>
                <span>&middot;</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </div>
        </a>
      )}

      {/* Post grid */}
      {rest.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-[#1e293b] mb-6">Latest Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-[#e2e8f0] bg-[#f8fafc] overflow-hidden hover:border-amber-500/30 transition-all duration-200"
              >
                <div
                  className="flex items-center justify-center p-8 text-5xl"
                  style={{
                    background: `linear-gradient(135deg, ${CATEGORY_COLORS[post.category]}15 0%, ${CATEGORY_COLORS[post.category]}05 100%)`,
                  }}
                >
                  <span aria-hidden>{post.coverEmoji}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span
                    className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full self-start mb-3"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS[post.category]}20`,
                      color: CATEGORY_COLORS[post.category],
                    }}
                  >
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-2 group-hover:text-amber-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#64748b] text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#64748b] mt-auto">
                    <span>{formatPostDate(post.date)}</span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter / CTA */}
      <section className="mt-16">
        <div
          className="rounded-2xl p-10 md:p-12 text-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 50%, rgba(245,158,11,0.06) 100%)',
            border: '1px solid rgba(245,158,11,0.2)',
          }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest text-amber-500 uppercase mb-4">
            Stay in the loop
          </span>
          <h2 className="text-2xl font-bold text-[#1e293b] mb-3">
            Have a story or tip for us?
          </h2>
          <p className="text-[#64748b] max-w-xl mx-auto mb-6 leading-relaxed">
            We cover the companies, tools, and trends shaping the solar industry. If something
            deserves a spotlight - good or bad - we want to hear about it.
          </p>
          <a
            href="mailto:hello@solargrade.com"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}
