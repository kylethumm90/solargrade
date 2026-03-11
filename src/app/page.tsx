import { supabase } from '@/lib/supabase'
import { CATEGORIES, getAverageRating } from '@/lib/constants'
import { CategoryBadge } from '@/components/CategoryBadge'
import { StarRating } from '@/components/StarRating'
import { Vendor, Review } from '@/lib/types'

export const revalidate = 60

async function getTopVendors() {
  const { data: vendors } = await supabase
    .from('vendors')
    .select('*')
    .eq('approved', true)

  const { data: reviews } = await supabase.from('reviews').select('*')

  if (!vendors || !reviews) return []

  const vendorMap = vendors.map((vendor: Vendor) => {
    const vendorReviews = reviews.filter((r: Review) => r.vendor_id === vendor.id)
    const avgRatings = vendorReviews.map((r: Review) => getAverageRating(r.ratings))
    const avgRating =
      avgRatings.length > 0
        ? avgRatings.reduce((a: number, b: number) => a + b, 0) / avgRatings.length
        : 0
    return { ...vendor, avg_rating: avgRating, review_count: vendorReviews.length }
  })

  return vendorMap
    .filter((v) => v.review_count > 0)
    .sort((a, b) => b.avg_rating - a.avg_rating)
    .slice(0, 5)
}

export default async function HomePage() {
  const topVendors = await getTopVendors()

  return (
    <div>
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-600 rounded-full uppercase tracking-wider mb-6">
            Beta
          </span>
          <h1 className="text-5xl font-bold text-[#1e293b] mb-4">
            Stop guessing. <span className="text-amber-500">Start grading.</span>
          </h1>
          <p className="text-lg text-[#64748b] mb-8 max-w-2xl mx-auto">
            The solar industry&apos;s first transparent review platform. Real ratings from real
            professionals on the installers, lead vendors, and tools that actually deliver.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/vendors"
              className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Browse Vendors
            </a>
            <a
              href="/review"
              className="px-6 py-3 border border-amber-500 text-amber-600 font-semibold rounded-lg hover:bg-amber-500/10 transition-colors"
            >
              Write a Review
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#1e293b] mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.value}
              href={`/vendors?category=${cat.value}`}
              className="group p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-amber-500/30 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              </div>
              <h3 className="font-semibold text-[#1e293b] group-hover:text-amber-500 transition-colors">
                {cat.label}
              </h3>
            </a>
          ))}
        </div>
      </section>

      {/* Top Rated */}
      {topVendors.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-6">Top Rated</h2>
          <div className="space-y-3">
            {topVendors.map((vendor, i) => (
              <a
                key={vendor.id}
                href={`/vendors/${vendor.slug}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-amber-500/30 transition-all duration-200"
              >
                <span className="text-2xl font-bold text-[#64748b] w-8 text-center">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#1e293b]">{vendor.name}</span>
                    <CategoryBadge category={vendor.category} />
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={vendor.avg_rating} size="sm" />
                    <span className="text-sm text-[#64748b]">
                      {vendor.avg_rating.toFixed(1)} ({vendor.review_count}{' '}
                      {vendor.review_count === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
