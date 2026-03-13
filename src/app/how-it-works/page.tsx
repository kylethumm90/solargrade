import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How SolarGrade Works - Solar Industry Review Platform',
  description:
    'Learn how SolarGrade brings transparency to the solar industry through verified reviews from real professionals.',
}

export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#1e293b] mb-4">How SolarGrade Works</h1>
        <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
          Built to protect reviewers, be fair to companies, and bring transparency to an industry that needs it.
        </p>
      </div>

      <div className="space-y-16">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e293b] mb-4">What Is SolarGrade?</h2>
          <div className="text-[#475569] leading-relaxed space-y-4">
            <p>
              SolarGrade is a review platform where solar professionals rate the companies they work with.
              Installers, lead vendors, CRMs, call centers, financing companies, and software tools &mdash; all
              rated by people in the industry who have real experience.
            </p>
            <p>
              Think of it as Glassdoor for the solar industry. Instead of employees rating employers, solar
              professionals rate the companies they partner with, sub for, or buy services from.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e293b] mb-4">Who Can Leave a Review?</h2>
          <div className="text-[#475569] leading-relaxed space-y-4">
            <p>
              Anyone with real experience working with a company in the solar industry. That includes
              subcontractors, installation crews, sales reps, dealers, homeowners, and other industry
              professionals.
            </p>
            <p>
              When you leave a review, you select your relationship to the company (subcontractor, sales rep,
              homeowner, etc.) so readers can understand the perspective it&rsquo;s coming from.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e293b] mb-6">How Are Reviews Verified?</h2>
          <div className="space-y-6">
            {/* Stage 1 */}
            <div className="relative pl-8 border-l-2 border-amber-400">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500" />
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Stage 1 &mdash; Manual Review</h3>
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                </div>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Every review goes through a manual approval process before it&rsquo;s published. Nothing goes
                  live automatically. Obvious spam, fake reviews, and bad-faith submissions are filtered out.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative pl-8 border-l-2 border-[#e2e8f0]">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#e2e8f0]" />
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Stage 2 &mdash; Authenticated Reviews</h3>
                  <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Reviews will be tied to a verified login. Your email won&rsquo;t be displayed publicly, but it
                  adds a layer of accountability and prevents duplicate submissions.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#e2e8f0]" />
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Stage 3 &mdash; Verified Reviews</h3>
                  <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    The Goal
                  </span>
                </div>
                <p className="text-[#475569] text-sm leading-relaxed">
                  Reviewers will be able to privately submit proof of their relationship with a company &mdash; a
                  subcontractor agreement, an invoice, a dealer contract. That information stays private, but
                  verified reviews earn a badge and carry more weight in the rating system. Real credibility
                  without exposing your identity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e293b] mb-4">
            For Companies: Why SolarGrade Is Good For You
          </h2>
          <p className="text-[#475569] leading-relaxed mb-6">
            If you&rsquo;re running a good operation, SolarGrade is an asset, not a threat. Here&rsquo;s why:
          </p>

          <div className="space-y-6">
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
              <h3 className="font-semibold text-[#1e293b] mb-2">
                Your reputation becomes searchable and permanent.
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                Right now, your reputation lives in Facebook groups and word of mouth. Posts disappear, context
                gets lost, and one bad anonymous post can define you. On SolarGrade, a strong track record of
                positive reviews is documented and visible to anyone evaluating whether to work with you.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
              <h3 className="font-semibold text-[#1e293b] mb-2">
                Structured reviews show the full picture.
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                SolarGrade doesn&rsquo;t give companies a single score. Reviews break down into specific
                categories like Payment Reliability, Communication, Install Quality, Warranty Support,
                Transparency, and Install Speed. One bad score in communication doesn&rsquo;t tank your profile
                if everything else is strong. Nuance matters and the rating system reflects that.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
              <h3 className="font-semibold text-[#1e293b] mb-2">
                Volume favors good companies.
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                One negative review is one data point. Twenty positive reviews from long-term subcontractors
                who&rsquo;ve done 50+ installs with you is a pattern nobody can argue with. Good companies
                benefit from review volume because the truth trends in their favor.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
              <h3 className="font-semibold text-[#1e293b] mb-2">
                Context is visible.
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                Every review shows the reviewer&rsquo;s relationship to the company, how long they worked
                together, and how many projects they completed. A one-star review from someone who did a single
                job carries visibly less weight than years of five-star reviews from experienced subs.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
              <h3 className="font-semibold text-[#1e293b] mb-2">
                Company responses are coming.
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                We&rsquo;re building the ability for companies to respond to reviews publicly. If someone posts
                something you disagree with, you&rsquo;ll have a voice.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e293b] mb-4">
            Can Companies Pay to Change Their Rating?
          </h2>
          <div className="text-[#475569] leading-relaxed space-y-4">
            <p>
              No. Ratings and reviews are based entirely on what real people submit. Companies cannot pay to
              improve their scores, remove negative reviews, or influence their ratings in any way.
            </p>
            <p>
              We may offer optional features in the future like enhanced company profiles or visibility, but the
              scores can never be bought. The moment that changes, the platform is worthless. We know that.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-3">Have a Question?</h2>
          <p className="text-[#475569] leading-relaxed max-w-lg mx-auto">
            SolarGrade is a work in progress and we&rsquo;re building it in public. If you have feedback,
            questions, or ideas, reach out at{' '}
            <a href="mailto:hello@solargrade.com" className="text-amber-600 hover:text-amber-500">
              hello@solargrade.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
