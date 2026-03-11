'use client'

import { useEffect, useRef, useState } from 'react'
import { StarRating } from '@/components/StarRating'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

type RecentReview = {
  id: string
  reviewer_name: string
  review_text: string
  ratings: Record<string, number>
  created_at: string
  company_name: string
  company_slug: string
  avg_rating: number
}

function timeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks} week${weeks === 1 ? '' : 's'} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`
  const years = Math.floor(days / 365)
  return `${years} year${years === 1 ? '' : 's'} ago`
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

export function RecentReviewsSection({ reviews }: { reviews: RecentReview[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [scrollWidth, setScrollWidth] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const measure = () => {
      // The track contains 2 copies of the reviews. Half = one set width.
      setScrollWidth(el.scrollWidth / 2)
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [reviews.length])

  // Duplicate for seamless loop
  const displayReviews = [...reviews, ...reviews]

  // Consistent speed: ~40px/s
  const duration = scrollWidth > 0 ? scrollWidth / 40 : 30

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1e293b]">Recent Reviews</h2>
        <a
          href="/companies"
          className="text-sm font-medium text-amber-500 hover:text-amber-600 transition-colors"
        >
          View all →
        </a>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-4 w-max"
          style={{
            ['--scroll-width' as string]: scrollWidth,
            animation: scrollWidth > 0 ? `ticker-scroll ${duration}s linear infinite` : 'none',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {displayReviews.map((review, i) => {
            const wouldRecommend = review.ratings.wouldRecommend
            const showRecommend = wouldRecommend !== undefined

            return (
              <a
                key={`${review.id}-${i}`}
                href={`/companies/${review.company_slug}`}
                className="shrink-0 w-[300px] p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-amber-500/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer block"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#1e293b] text-sm truncate mr-2">
                    {review.company_name}
                  </span>
                  {showRecommend && (
                    <span className="shrink-0">
                      {wouldRecommend >= 4 ? (
                        <ThumbsUp size={14} className="text-green-500" />
                      ) : wouldRecommend <= 2 ? (
                        <ThumbsDown size={14} className="text-red-500" />
                      ) : null}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mb-2">
                  <StarRating rating={review.avg_rating} size="sm" />
                  <span className="text-xs text-[#64748b]">{review.avg_rating.toFixed(1)}</span>
                </div>

                <p className="text-sm text-[#64748b] mb-3 leading-relaxed min-h-[3rem]">
                  {truncateText(review.review_text, 100)}
                </p>

                <div className="text-xs text-[#94a3b8]">
                  {review.reviewer_name} · {timeAgo(review.created_at)}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
