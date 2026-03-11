import { supabase } from '@/lib/supabase'
import { CATEGORIES, getAverageRating } from '@/lib/constants'
import { Company, Review } from '@/lib/types'
import { TopRatedSection } from '@/components/TopRatedSection'
import { RecentReviewsSection } from '@/components/RecentReviewsSection'
import { Wrench, Megaphone, Users, Phone, DollarSign, Code } from 'lucide-react'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  installers: <Wrench size={20} />,
  leads: <Megaphone size={20} />,
  crm: <Users size={20} />,
  callcenter: <Phone size={20} />,
  financing: <DollarSign size={20} />,
  software: <Code size={20} />,
}

export const revalidate = 60

async function getTopCompanies() {
  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .eq('approved', true)

  const { data: reviews } = await supabase.from('reviews').select('*')

  if (!companies || !reviews) return []

  const companyMap = companies.map((company: Company) => {
    const companyReviews = reviews.filter((r: Review) => r.company_id === company.id)
    const avgRatings = companyReviews.map((r: Review) => getAverageRating(r.ratings))
    const avgRating =
      avgRatings.length > 0
        ? avgRatings.reduce((a: number, b: number) => a + b, 0) / avgRatings.length
        : 0
    return { ...company, avg_rating: avgRating, review_count: companyReviews.length }
  })

  return companyMap
    .filter((v) => v.review_count > 0)
    .sort((a, b) => b.avg_rating - a.avg_rating)
}

async function getRecentReviews() {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  if (!reviews || reviews.length < 5) return []

  const companyIds = [...new Set(reviews.map((r: Review) => r.company_id))]
  const { data: companies } = await supabase
    .from('companies')
    .select('id, name, slug')
    .in('id', companyIds)
    .eq('approved', true)

  if (!companies) return []

  const companyMap = new Map(companies.map((c: { id: string; name: string; slug: string }) => [c.id, c]))

  return reviews
    .filter((r: Review) => companyMap.has(r.company_id))
    .map((r: Review) => {
      const company = companyMap.get(r.company_id)!
      return {
        id: r.id,
        reviewer_name: r.reviewer_name,
        review_text: r.review_text,
        ratings: r.ratings,
        created_at: r.created_at,
        company_name: company.name,
        company_slug: company.slug,
        avg_rating: getAverageRating(r.ratings),
      }
    })
}

export default async function HomePage() {
  const [topCompanies, recentReviews] = await Promise.all([
    getTopCompanies(),
    getRecentReviews(),
  ])

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
            professionals on the installers, lead companies, and tools that actually deliver.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/companies"
              className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Browse Companies
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
              href={`/companies?category=${cat.value}`}
              className="group p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-amber-500/30 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
              >
                {CATEGORY_ICONS[cat.value]}
              </div>
              <h3 className="font-semibold text-[#1e293b] group-hover:text-amber-500 transition-colors">
                {cat.label}
              </h3>
            </a>
          ))}
        </div>
      </section>

      {/* Top Rated */}
      {topCompanies.length > 0 && <TopRatedSection companies={topCompanies} />}

      {/* Recent Reviews */}
      {recentReviews.length >= 5 && <RecentReviewsSection reviews={recentReviews} />}

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="border-t border-amber-500/30 pt-16">
          <div
            className="relative rounded-2xl p-10 md:p-14 text-center overflow-hidden animate-fade-up"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 50%, rgba(245,158,11,0.06) 100%)',
              border: '1px solid rgba(245,158,11,0.2)',
              boxShadow: '0 0 60px rgba(245,158,11,0.06)',
            }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-amber-500 uppercase mb-4">
              Know something we don&apos;t?
            </span>
            <h2 className="text-2xl md:text-[28px] font-bold text-[#1e293b] mb-3">
              Don&apos;t see a company you want to review?
            </h2>
            <p className="text-[#64748b] max-w-xl mx-auto mb-8 leading-relaxed">
              SolarGrade only works if the industry contributes. Add the installers, companies, and
              tools you actually use so others can rate them too.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/submit"
                className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors"
              >
                Add a Company
              </a>
              <a
                href="/review"
                className="px-6 py-3 border border-amber-500 text-amber-600 font-semibold rounded-lg hover:bg-amber-500/10 transition-colors"
              >
                Write a Review
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
