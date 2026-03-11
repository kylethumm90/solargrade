import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Policy - SolarGrade',
  description: 'Content policy and review guidelines for the SolarGrade solar industry review platform.',
}

export default function ContentPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Content Policy</h1>
      <p className="text-[#64748b] text-sm mb-12">Last updated: March 11, 2026</p>

      <div className="space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">What We Allow</h2>
          <ul className="space-y-3 text-[#475569] leading-relaxed">
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold mt-0.5 shrink-0">&check;</span>
              <span>Honest reviews based on real experiences with companies in the solar industry.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold mt-0.5 shrink-0">&check;</span>
              <span>
                Critical reviews, including negative experiences, as long as they describe genuine experiences.
                We don&apos;t remove reviews just because they&apos;re unfavorable.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 font-bold mt-0.5 shrink-0">&check;</span>
              <span>
                Reviews from any solar industry participant — subcontractors, sales reps, dealers, homeowners,
                employees, and partners are all welcome.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">What We Don&apos;t Allow</h2>
          <ul className="space-y-3 text-[#475569] leading-relaxed">
            <li className="flex gap-3">
              <span className="text-red-500 font-bold mt-0.5 shrink-0">&times;</span>
              <span>Fake or fabricated reviews with no basis in real experience.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold mt-0.5 shrink-0">&times;</span>
              <span>
                Reviews submitted by a company about itself, or by competitors to harm a rival.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold mt-0.5 shrink-0">&times;</span>
              <span>
                Personal attacks, threats, or harassment directed at specific individuals. Naming a company
                is fine — targeting an individual employee by full name with threats is not.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold mt-0.5 shrink-0">&times;</span>
              <span>Hate speech, discriminatory language, or illegal content.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold mt-0.5 shrink-0">&times;</span>
              <span>Spam, promotional content, or reviews that are actually advertisements.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500 font-bold mt-0.5 shrink-0">&times;</span>
              <span>
                Confidential information like social security numbers, personal addresses, or private
                financial details.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">Moderation Process</h2>
          <div className="space-y-4 text-[#475569] leading-relaxed">
            <p>
              All reviews are manually reviewed before publication. We reserve the right to reject or remove
              any review that violates this policy.
            </p>
            <p>
              If a company believes a review contains factually false statements, they can contact us at{' '}
              <a href="mailto:admin@solargrade.com" className="text-amber-600 hover:text-amber-700 underline">
                admin@solargrade.com
              </a>{' '}
              with specific claims and supporting documentation. We will review the claim, but we are not
              obligated to remove content based solely on a company&apos;s objection.
            </p>
            <p>
              We do not remove reviews simply because a company disagrees with them or finds them unfavorable.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">For Companies</h2>
          <div className="space-y-4 text-[#475569] leading-relaxed">
            <p>
              If you are listed on SolarGrade and want to respond to a review, contact us. We plan to add
              company response features in the future.
            </p>
            <p>
              Sending legal threats to suppress legitimate reviews will not result in content removal. We take
              our obligations under Section 230 and the Consumer Review Fairness Act seriously.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
