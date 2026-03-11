'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CATEGORIES, getAverageRating } from '@/lib/constants'
import { CategoryBadge } from '@/components/CategoryBadge'
import { StarRating } from '@/components/StarRating'
import { Company, Review } from '@/lib/types'

interface CompanyWithStats extends Company {
  avg_rating: number
  review_count: number
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyWithStats[]>([])
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('rating')
  const [search, setSearch] = useState('')
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
      const { data: companyData } = await query
      const { data: reviewData } = await supabase.from('reviews').select('*')

      if (!companyData) {
        setLoading(false)
        return
      }

      const mapped = companyData.map((v: Company) => {
        const vReviews = (reviewData || []).filter((r: Review) => r.company_id === v.id)
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

      setCompanies(mapped)
      setLoading(false)
    }
    load()
  }, [category, sort])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-8">Company Directory</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search companies..."
          className="bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-2 text-sm flex-1 min-w-[200px]"
        />

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

      <p className="text-sm text-[#64748b] mb-6 -mt-4">
        Don&apos;t see who you&apos;re looking for?{' '}
        <a href="/submit" className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
          Add them &rarr;
        </a>
      </p>

      {loading ? (
        <p className="text-[#64748b]">Loading companies...</p>
      ) : companies.length === 0 ? (
        <p className="text-[#64748b]">No companies found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {companies.filter((company) =>
            company.name.toLowerCase().includes(search.toLowerCase())
          ).map((company) => (
            <a
              key={company.id}
              href={`/companies/${company.slug}`}
              className="p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-amber-500/30 transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-2">
                {company.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt=""
                    className="w-10 h-10 rounded-lg object-contain border border-[#e2e8f0] bg-white p-0.5 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-[#e2e8f0] flex items-center justify-center text-sm font-semibold text-[#94a3b8] shrink-0">
                    {company.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 flex items-start justify-between">
                  <h3 className="font-semibold text-[#1e293b] text-lg">{company.name}</h3>
                  <CategoryBadge category={company.category} />
                </div>
              </div>
              {company.description && (
                <p className="text-[#64748b] text-sm mb-3 line-clamp-2">{company.description}</p>
              )}
              <div className="flex items-center gap-2">
                <StarRating rating={company.avg_rating} size="sm" />
                <span className="text-sm text-[#64748b]">
                  {company.avg_rating > 0 ? company.avg_rating.toFixed(1) : 'No ratings'} ({company.review_count}{' '}
                  {company.review_count === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      {!loading && (
        <div
          className="mt-8 rounded-xl p-8 text-center animate-fade-up-delay"
          style={{
            border: '2px dashed rgba(245,158,11,0.35)',
            background: 'rgba(245,158,11,0.03)',
          }}
        >
          <h3 className="text-xl font-bold text-[#1e293b] mb-2">Missing a company?</h3>
          <p className="text-[#64748b] text-sm max-w-md mx-auto mb-5">
            If you&apos;ve worked with an installer, company, or tool that isn&apos;t listed yet, add
            it. Takes 30 seconds.
          </p>
          <a
            href="/submit"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Submit a Company
          </a>
        </div>
      )}
    </div>
  )
}
