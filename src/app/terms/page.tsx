import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - SolarGrade',
  description: 'Terms of Service for using the SolarGrade solar industry review platform.',
}

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Terms of Service</h1>
      <p className="text-[#64748b] text-sm mb-12">Last updated: March 11, 2026</p>

      <div className="space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">Platform Overview</h2>
          <p className="text-[#475569] leading-relaxed">
            SolarGrade is a platform for user-generated reviews and content about companies in the solar industry.
            We provide the space for people to share their experiences — but we do not author, endorse, or guarantee
            the accuracy of any review posted on the platform. Reviews represent the personal opinions and experiences
            of individual users, and SolarGrade is not responsible for the content of user submissions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">Section 230 Protection</h2>
          <p className="text-[#475569] leading-relaxed">
            SolarGrade operates as a platform for user-generated content and is protected under Section 230 of
            the Communications Decency Act. We are not the publisher or speaker of any review submitted by our users.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">Content Moderation</h2>
          <p className="text-[#475569] leading-relaxed">
            All reviews submitted to SolarGrade go through a moderation process. We reserve the right to remove
            content that violates our{' '}
            <a href="/content-policy" className="text-amber-600 hover:text-amber-700 underline">
              Content Policy
            </a>
            . However, moderation does not constitute endorsement or verification of any review. Moderation is
            about enforcing our guidelines — not fact-checking every claim.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">User Responsibilities</h2>
          <p className="text-[#475569] leading-relaxed">
            By submitting a review on SolarGrade, you agree to submit only honest reviews based on genuine
            experiences. Submitting fake, defamatory, or misleading reviews is prohibited and may result in
            your content being removed.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">Rating Integrity</h2>
          <p className="text-[#475569] leading-relaxed">
            Companies listed on SolarGrade cannot pay to influence ratings, remove reviews, or alter their
            scores in any way. Our ratings reflect genuine user feedback, and that&apos;s non-negotiable.
            SolarGrade may offer optional enhanced listing features in the future, but these will never
            impact ratings or review visibility.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">Changes to These Terms</h2>
          <p className="text-[#475569] leading-relaxed">
            SolarGrade reserves the right to modify these terms at any time. We&apos;ll update the
            &quot;Last updated&quot; date at the top of this page when we do. Continued use of the platform
            after changes are posted constitutes your acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">Disclaimer of Warranties</h2>
          <p className="text-[#475569] leading-relaxed">
            SolarGrade is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any
            kind, whether express or implied. We make no guarantees about the completeness, reliability, or
            accuracy of the content on this platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">Limitation of Liability</h2>
          <p className="text-[#475569] leading-relaxed">
            SolarGrade and its operators are not liable for any damages arising from your use of the platform
            or your reliance on user-generated content. This includes direct, indirect, incidental,
            consequential, or punitive damages of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#1e293b] mb-3">Governing Law</h2>
          <p className="text-[#475569] leading-relaxed">
            These terms are governed by the laws of the State of Alabama, United States, without regard to
            conflict of law principles.
          </p>
        </section>
      </div>
    </div>
  )
}
