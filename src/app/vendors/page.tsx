'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CATEGORIES, getAverageRating } from '@/lib/constants'
import { CategoryBadge } from '@/components/CategoryBadge'
import { StarRating } from '@/components/StarRating'
import { Vendor, Review } from '@/lib/types'

interface VendorWithStats extends Vendor {
  avg_rating: number
  review_count: number
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<VendorWithStats[]>([])
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('rating')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get('category')
    if (cat) setCategory(cat)
  }, [])

  useEffect(() => {
    async function load() {
      setLoading(true)
      let query = supabase.from('vendors').select('*').eq('approved', true)
      if (category) query = query.eq('category', category)
      const { data: vendorData } = await query
      const { data: reviewData } = await supabase.from('reviews').select('*')

      if (!vendorData) {
        setLoading(false)
        return
      }

      const mapped = vendorData.map((v: Vendor) => {
        const vReviews = (reviewData || []).filter((r: Review) => r.vendor_id === v.id)
        const avgRatings = vReviews.map((r: Review) => getAverageRating(r.ratings))
        const avg = avgRatings.length > 0
          ? avgRatings.reduce((a: number, b: number) => a + b, 0) / avgRatings.length
          : 0
        return { ...v, avg_rating: avg, review_count: vReviews.length }
      })

      mapped.sort((a, b) => {
        if (sort === 'rating') return b.avg_rating - a.avg_rating
        if (sort === 'reviews') return b.review_count - a.review_count
        return a.name.localeCompare(b.name)
      })

      setVendors(mapped)
      setLoading(false)
    }
    load()
  }, [category, sort])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-8">Vendor Directory</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-2 text-sm"
        >
          <option value="rating">Sort by Rating</option>
          <option value="reviews">Sort by Reviews</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {loading ? (
        <p className="text-[#64748b]">Loading vendors...</p>
      ) : vendors.length === 0 ? (
        <p className="text-[#64748b]">No vendors found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {vendors.map((vendor) => (
            <a
              key={vendor.id}
              href={`/vendors/${vendor.slug}`}
              className="p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-amber-500/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-[#1e293b] text-lg">{vendor.name}</h3>
                <CategoryBadge category={vendor.category} />
              </div>
              {vendor.description && (
                <p className="text-[#64748b] text-sm mb-3 line-clamp-2">{vendor.description}</p>
              )}
              <div className="flex items-center gap-2">
                <StarRating rating={vendor.avg_rating} size="sm" />
                <span className="text-sm text-[#64748b]">
                  {vendor.avg_rating > 0 ? vendor.avg_rating.toFixed(1) : 'No ratings'} ({vendor.review_count}{' '}
                  {vendor.review_count === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
