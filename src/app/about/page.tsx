import { ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'About - SolarGrade',
  description: 'How SolarGrade ratings work and our commitment to transparency.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <ShieldCheck size={22} className="text-amber-500" />
        </div>
        <h1 className="text-3xl font-bold text-[#1e293b]">Trust &amp; Transparency</h1>
      </div>

      <div className="space-y-6 text-[#475569] leading-relaxed">
        <p>
          SolarGrade ratings are based entirely on reviews from solar professionals. Companies
          cannot pay to improve their scores, remove negative reviews, or influence their ratings
          in any way.
        </p>
        <p>
          We may offer enhanced listings or visibility features in the future, but ratings and
          reviews will always reflect real experiences from real people in the industry.
        </p>
        <p className="text-[#64748b] text-sm border-t border-[#e2e8f0] pt-6 mt-8">
          SolarGrade is a Solar Growth Project initiative.
        </p>
      </div>
    </div>
  )
}
