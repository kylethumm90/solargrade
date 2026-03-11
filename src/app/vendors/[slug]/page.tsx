import { supabase } from '@/lib/supabase'
import { getRatingFields, getAverageRating } from '@/lib/constants'
import { CategoryBadge } from '@/components/CategoryBadge'
import { StarRating } from '@/components/StarRating'
import { Vendor, Review } from '@/lib/types'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function VendorDetailPage({ params }: { params: { slug: string } }) {
  const { data: vendor } = await supabase
    .from('vendors')
    .select('*')
    .eq('slug', params.slug)
    .eq('approved', true)
    .single()

  if (!vendor) notFound()

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('vendor_id', vendor.id)
    .order('created_at', { ascending: false })

  const typedVendor = vendor as Vendor
  const typedReviews = (reviews || []) as Review[]
  const ratingFields = getRatingFields(typedVendor.category)

  // Calculate overall average
  const allAvgs = typedReviews.map((r) => getAverageRating(r.ratings))
  const overallAvg =
    allAvgs.length > 0 ? allAvgs.reduce((a, b) => a + b, 0) / allAvgs.length : 0

  // Calculate per-field averages
  const fieldAverages = ratingFields.map((field) => {
    const values = typedReviews
      .map((r) => r.ratings[field.key])
      .filter((v) => v !== undefined)
    const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0
    return { ...field, average: avg }
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-[#1e293b]">{typedVendor.name}</h1>
          <CategoryBadge category={typedVendor.category} />
        </div>
        {typedVendor.description && (
          <p className="text-[#64748b] mb-3">{typedVendor.description}</p>
        )}
        {typedVendor.website && (
          <a
            href={typedVendor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-500 text-sm"
          >
            {typedVendor.website} &#8599;
          </a>
        )}
      </div>

      {/* Overall Rating */}
      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl font-bold text-amber-500">
            {overallAvg > 0 ? overallAvg.toFixed(1) : '--'}
          </span>
          <div>
            <StarRating rating={overallAvg} size="lg" />
            <p className="text-[#64748b] text-sm mt-1">
              {typedReviews.length} {typedReviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>

        {/* Rating Breakdown */}
        {typedReviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fieldAverages.map((field) => (
              <div key={field.key} className="bg-white rounded-lg p-3">
                <p className="text-xs text-[#64748b] mb-1">{field.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-[#1e293b]">
                    {field.average.toFixed(1)}
                  </span>
                  <StarRating rating={field.average} size="sm" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Review CTA */}
      <div className="mb-8">
        <a
          href={`/review?vendor=${typedVendor.slug}`}
          className="inline-block px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors"
        >
          Write a Review
        </a>
      </div>

      {/* Reviews */}
      <h2 className="text-xl font-bold text-[#1e293b] mb-4">Reviews</h2>
      {typedReviews.length === 0 ? (
        <p className="text-[#64748b]">No reviews yet. Be the first to write one!</p>
      ) : (
        <div className="space-y-4">
          {typedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[#1e293b]">{review.reviewer_name}</span>
                  {review.relationship && (
                    <span className="inline-block text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      {review.relationship}
                    </span>
                  )}
                  {review.company && (
                    <span className="text-[#64748b] text-sm">at {review.company}</span>
                  )}
                </div>
                <span className="text-xs text-[#64748b]">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                {ratingFields.map((field) => {
                  const val = review.ratings[field.key]
                  if (val === undefined) return null
                  return (
                    <div key={field.key} className="flex items-center gap-2 text-sm">
                      <span className="text-[#64748b]">{field.label}:</span>
                      <StarRating rating={val} size="sm" />
                    </div>
                  )
                })}
              </div>

              <p className="text-[#1e293b] text-sm leading-relaxed">{review.review_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
