'use client'

import { useState } from 'react'
import { CATEGORIES } from '@/lib/constants'
import { CategoryBadge } from '@/components/CategoryBadge'
import { StarRating } from '@/components/StarRating'
import { CompanyLogo } from '@/components/CompanyLogo'

type RatedCompany = {
  id: string
  slug: string
  name: string
  category: string
  logo_url?: string | null
  avg_rating: number
  review_count: number
}

const FILTERS = [
  { value: 'all', label: 'All' },
  ...CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
]

export function TopRatedSection({ companies }: { companies: RatedCompany[] }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? companies.slice(0, 5)
      : companies.filter((v) => v.category === activeFilter).slice(0, 5)

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-[#1e293b] mb-6">Top Rated</h2>

      {/* Filter Pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shrink-0 ${
              activeFilter === filter.value
                ? 'bg-amber-500 text-white shadow-sm'
                : 'border border-[#e2e8f0] text-[#64748b] hover:border-amber-500/40 hover:text-amber-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Company List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-[#64748b] text-sm py-8 text-center">
            No rated companies in this category yet.
          </p>
        ) : (
          filtered.map((company, i) => (
            <a
              key={company.id}
              href={`/companies/${company.slug}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-amber-500/30 transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-2xl font-bold text-[#64748b] w-8 text-center">
                {i + 1}
              </span>
              <CompanyLogo
                name={company.name}
                logoUrl={company.logo_url}
                category={company.category}
                size="sm"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#1e293b]">{company.name}</span>
                  <CategoryBadge category={company.category} />
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={company.avg_rating} size="sm" />
                  <span className="text-sm text-[#64748b]">
                    {company.avg_rating.toFixed(1)} ({company.review_count}{' '}
                    {company.review_count === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </section>
  )
}
