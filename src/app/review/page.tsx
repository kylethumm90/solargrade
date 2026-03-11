'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CATEGORIES, getRatingFields, INSTALLER_RELATIONSHIPS, DURATION_OPTIONS, PROJECT_COUNT_OPTIONS } from '@/lib/constants'
import { StarInput } from '@/components/StarRating'
import { Vendor } from '@/lib/types'

export default function ReviewPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [selectedVendor, setSelectedVendor] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [company, setCompany] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [relationship, setRelationship] = useState('')
  const [duration, setDuration] = useState('')
  const [projectCount, setProjectCount] = useState('')
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('vendors')
        .select('*')
        .eq('approved', true)
        .order('name')
      if (data) setVendors(data)

      const params = new URLSearchParams(window.location.search)
      const vendorSlug = params.get('vendor')
      if (vendorSlug && data) {
        const found = data.find((v: Vendor) => v.slug === vendorSlug)
        if (found) setSelectedVendor(found.id)
      }
    }
    load()
  }, [])

  const vendor = vendors.find((v) => v.id === selectedVendor)
  const ratingFields = vendor ? getRatingFields(vendor.category) : []

  const isInstaller = vendor?.category === 'installers'

  useEffect(() => {
    setRatings({})
    setRelationship('')
    setDuration('')
    setProjectCount('')
    setWouldRecommend(null)
  }, [selectedVendor])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!selectedVendor || !reviewerName || !reviewText) {
      setError('Please fill in all required fields.')
      return
    }

    const missingRatings = ratingFields.filter((f) => !ratings[f.key])
    if (missingRatings.length > 0) {
      setError('Please provide all ratings.')
      return
    }

    if (isInstaller && !relationship) {
      setError('Please select your relationship to this company.')
      return
    }

    setSubmitting(true)
    const { error: submitError } = await supabase.from('reviews').insert({
      vendor_id: selectedVendor,
      reviewer_name: reviewerName,
      company: company || null,
      relationship: isInstaller ? relationship : null,
      ratings,
      review_text: reviewText,
      duration: duration || null,
      project_count: isInstaller ? (projectCount || null) : null,
      would_recommend: wouldRecommend,
    })

    if (submitError) {
      console.error('Review submission error:', submitError)
      setError(`Failed to submit review: ${submitError.message || submitError.details || submitError.hint || JSON.stringify(submitError)}`)
      setSubmitting(false)
      return
    }

    setSuccess(true)
    setSubmitting(false)
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-8">
          <div className="text-4xl mb-4">&#10003;</div>
          <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Review Submitted!</h2>
          <p className="text-[#64748b] mb-6">
            Your review has been published. Thank you for your feedback!
          </p>
          <a
            href="/vendors"
            className="text-amber-600 hover:text-amber-500"
          >
            Back to Vendors
          </a>
        </div>
      </div>
    )
  }

  // Group vendors by category for optgroup
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    vendors: vendors.filter((v) => v.category === cat.value),
  })).filter((g) => g.vendors.length > 0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-8">Write a Review</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vendor selector */}
        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">
            Select Vendor *
          </label>
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
            required
          >
            <option value="">Choose a vendor...</option>
            {grouped.map((group) => (
              <optgroup key={group.value} label={group.label}>
                {group.vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Ratings */}
        {vendor && (
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
            <h3 className="text-sm font-medium text-[#1e293b] mb-4">Ratings *</h3>
            <div className="space-y-4">
              {ratingFields.map((field) => (
                <StarInput
                  key={field.key}
                  label={field.label}
                  value={ratings[field.key] || 0}
                  onChange={(val) => setRatings({ ...ratings, [field.key]: val })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Relationship (installers only) */}
        {isInstaller && (
          <div>
            <label className="block text-sm font-medium text-[#1e293b] mb-2">
              Your Relationship *
            </label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
              required
            >
              <option value="">Select your relationship...</option>
              {INSTALLER_RELATIONSHIPS.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">Your Name *</label>
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
            placeholder="e.g. Jason M."
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">
            Company (optional)
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
            placeholder="e.g. SunWorks Electric"
          />
        </div>

        {/* Duration */}
        {vendor && (
          <div>
            <label className="block text-sm font-medium text-[#1e293b] mb-2">
              How long did you work with this company? (optional)
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
            >
              <option value="">Select duration...</option>
              {DURATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Project Count (installers only) */}
        {isInstaller && (
          <div>
            <label className="block text-sm font-medium text-[#1e293b] mb-2">
              How many installs/projects together? (optional)
            </label>
            <select
              value={projectCount}
              onChange={(e) => setProjectCount(e.target.value)}
              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
            >
              <option value="">Select count...</option>
              {PROJECT_COUNT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">Your Review *</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3 min-h-[120px]"
            placeholder="Share your experience..."
            required
          />
        </div>

        {/* Would Recommend - Yes/No Toggle */}
        {vendor && (
          <div>
            <label className="block text-sm font-medium text-[#1e293b] mb-3">
              Would you recommend this company? (optional)
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setWouldRecommend(wouldRecommend === true ? null : true)}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-colors border-2 ${
                  wouldRecommend === true
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white border-[#e2e8f0] text-[#64748b] hover:border-green-300'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setWouldRecommend(wouldRecommend === false ? null : false)}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-colors border-2 ${
                  wouldRecommend === false
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-white border-[#e2e8f0] text-[#64748b] hover:border-red-300'
                }`}
              >
                No
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
}
