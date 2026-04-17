import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, getPostBySlug, getAllPosts, formatPostDate, CATEGORY_COLORS } from '@/lib/blog'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found - SolarGrade' }
  return {
    title: `${post.title} - SolarGrade`,
    description: post.excerpt,
  }
}

function renderInline(text: string): React.ReactNode {
  const regex = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|\*([^*\n]+)\*/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>)
    } else if (match[2] !== undefined && match[3] !== undefined) {
      const href = match[3]
      const external = /^https?:\/\//.test(href)
      nodes.push(
        <a
          key={key++}
          href={href}
          className="text-amber-600 hover:text-amber-500 underline"
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {match[2]}
        </a>,
      )
    } else if (match[4] !== undefined) {
      nodes.push(<em key={key++}>{match[4]}</em>)
    }
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes.length > 0 ? nodes : text
}

function renderContent(content: string) {
  const blocks = content.split(/\n\n+/)
  return blocks.map((block, i) => {
    const trimmed = block.trim()
    if (trimmed === '---') {
      return <hr key={i} className="my-10 border-t border-[#e2e8f0]" />
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="text-2xl font-bold text-[#1e293b] mt-10 mb-4">
          {renderInline(trimmed.replace(/^##\s+/, ''))}
        </h2>
      )
    }
    if (trimmed.startsWith('# ')) {
      return (
        <h1 key={i} className="text-3xl font-bold text-[#1e293b] mt-10 mb-4">
          {renderInline(trimmed.replace(/^#\s+/, ''))}
        </h1>
      )
    }
    if (/^[-*]\s+/.test(trimmed)) {
      const items = trimmed.split('\n').map((line) => line.replace(/^[-*]\s+/, ''))
      return (
        <ul key={i} className="list-disc pl-6 space-y-2 my-4 text-[#475569] leading-relaxed">
          {items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </ul>
      )
    }
    return (
      <p key={i} className="text-[#475569] leading-relaxed my-4">
        {renderInline(trimmed)}
      </p>
    )
  })
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Back link */}
      <a
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-[#64748b] hover:text-amber-500 transition-colors mb-8"
      >
        &larr; Back to Blog
      </a>

      {/* Cover */}
      <div
        className="flex items-center justify-center p-16 rounded-2xl mb-8 text-8xl"
        style={{
          background: `linear-gradient(135deg, ${CATEGORY_COLORS[post.category]}15 0%, ${CATEGORY_COLORS[post.category]}05 100%)`,
        }}
      >
        <span aria-hidden>{post.coverEmoji}</span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${CATEGORY_COLORS[post.category]}20`,
            color: CATEGORY_COLORS[post.category],
          }}
        >
          {post.category}
        </span>
        <span className="text-xs text-[#64748b]">{post.readTime}</span>
      </div>

      {/* Title + excerpt */}
      <h1 className="text-4xl font-bold text-[#1e293b] mb-4">{post.title}</h1>
      <p className="text-lg text-[#64748b] leading-relaxed mb-6">{post.excerpt}</p>

      {/* Byline */}
      <div className="flex items-center gap-3 text-sm text-[#64748b] pb-8 mb-8 border-b border-[#e2e8f0]">
        <span className="font-medium text-[#1e293b]">{post.author}</span>
        <span>&middot;</span>
        <span>{formatPostDate(post.date)}</span>
      </div>

      {/* Body */}
      <div className="prose-content">{renderContent(post.content)}</div>

      {/* CTA */}
      <div className="mt-12 pt-8 border-t border-[#e2e8f0]">
        <div
          className="rounded-xl p-8 text-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 50%, rgba(245,158,11,0.06) 100%)',
            border: '1px solid rgba(245,158,11,0.2)',
          }}
        >
          <h3 className="text-xl font-bold text-[#1e293b] mb-2">
            Know a company worth reviewing?
          </h3>
          <p className="text-[#64748b] text-sm mb-5 max-w-md mx-auto">
            SolarGrade only works if the industry contributes. Add your experience.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="/review"
              className="px-5 py-2.5 bg-amber-500 text-white font-semibold text-sm rounded-lg hover:bg-amber-400 transition-colors"
            >
              Write a Review
            </a>
            <a
              href="/companies"
              className="px-5 py-2.5 border border-amber-500 text-amber-600 font-semibold text-sm rounded-lg hover:bg-amber-500/10 transition-colors"
            >
              Browse Companies
            </a>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-[#1e293b] mb-6">Keep Reading</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {related.map((p) => (
              <a
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block p-5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:border-amber-500/30 transition-all duration-200"
              >
                <span
                  className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
                  style={{
                    backgroundColor: `${CATEGORY_COLORS[p.category]}20`,
                    color: CATEGORY_COLORS[p.category],
                  }}
                >
                  {p.category}
                </span>
                <h3 className="font-semibold text-[#1e293b] mb-2 group-hover:text-amber-500 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-[#64748b]">{formatPostDate(p.date)}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
