'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getCategoryLabel, getRatingFields } from '@/lib/constants'
import { StarRating } from '@/components/StarRating'
import { PendingVendor, PendingReview } from '@/lib/types'

const ADMIN_PASSWORD = 'solargrade2026'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [pendingVendors, setPendingVendors] = useState<PendingVendor[]>([])
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([])
  const [loading, setLoading] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    }
  }

  useEffect(() => {
    if (!authenticated) return
    loadPending()
  }, [authenticated])

  async function loadPending() {
    setLoading(true)
    const { data: vendors } = await supabase
      .from('pending_vendors')
      .select('*')
      .order('submitted_at', { ascending: false })

    const { data: reviews } = await supabase
      .from('pending_reviews')
      .select('*, vendors(name, category)')
      .order('submitted_at', { ascending: false })

    setPendingVendors(vendors || [])
    setPendingReviews(reviews || [])
    setLoading(false)
  }

  async function approveVendor(pv: PendingVendor) {
    const slug = pv.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    const { error } = await supabase.from('vendors').insert({
      slug,
      name: pv.name,
      category: pv.category,
      website: pv.website,
      description: pv.description,
      approved: true,
    })

    if (!error) {
      await supabase.from('pending_vendors').delete().eq('id', pv.id)
      loadPending()
    }
  }

  async function rejectVendor(id: string) {
    await supabase.from('pending_vendors').delete().eq('id', id)
    loadPending()
  }

  async function approveReview(pr: PendingReview) {
    const { error } = await supabase.from('reviews').insert({
      vendor_id: pr.vendor_id,
      reviewer_name: pr.reviewer_name,
      company: pr.company,
      ratings: pr.ratings,
      review_text: pr.review_text,
    })

    if (!error) {
      await supabase.from('pending_reviews').delete().eq('id', pr.id)
      loadPending()
    }
  }

  async function rejectReview(id: string) {
    await supabase.from('pending_reviews').delete().eq('id', id)
    loadPending()
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-8">
          <h1 className="text-2xl font-bold text-[#1e293b] mb-6 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
              placeholder="Enter password"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-8">Admin Panel</h1>

      {loading ? (
        <p className="text-[#64748b]">Loading...</p>
      ) : (
        <>
          {/* Pending Vendors */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[#1e293b] mb-4">
              Pending Vendors ({pendingVendors.length})
            </h2>
            {pendingVendors.length === 0 ? (
              <p className="text-[#64748b]">No pending vendors.</p>
            ) : (
              <div className="space-y-4">
                {pendingVendors.map((pv) => (
                  <div
                    key={pv.id}
                    className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-[#1e293b] text-lg">{pv.name}</h3>
                        <p className="text-[#64748b] text-sm">{getCategoryLabel(pv.category)}</p>
                      </div>
                      <span className="text-xs text-[#64748b]">
                        {new Date(pv.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                    {pv.website && (
                      <p className="text-amber-600 text-sm mb-2">{pv.website}</p>
                    )}
                    {pv.description && (
                      <p className="text-[#64748b] text-sm mb-4">{pv.description}</p>
                    )}
                    <div className="flex gap-3">
                      <button
                        onClick={() => approveVendor(pv)}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectVendor(pv.id)}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Pending Reviews */}
          <section>
            <h2 className="text-xl font-bold text-[#1e293b] mb-4">
              Pending Reviews ({pendingReviews.length})
            </h2>
            {pendingReviews.length === 0 ? (
              <p className="text-[#64748b]">No pending reviews.</p>
            ) : (
              <div className="space-y-4">
                {pendingReviews.map((pr) => {
                  const vendorCategory = pr.vendors?.category || 'installers'
                  const ratingFields = getRatingFields(vendorCategory)
                  return (
                    <div
                      key={pr.id}
                      className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-[#1e293b]">
                            {pr.vendors?.name || 'Unknown Vendor'}
                          </h3>
                          <p className="text-[#64748b] text-sm">
                            by {pr.reviewer_name}
                            {pr.company && ` at ${pr.company}`}
                          </p>
                        </div>
                        <span className="text-xs text-[#64748b]">
                          {new Date(pr.submitted_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                        {ratingFields.map((field) => {
                          const val = pr.ratings[field.key]
                          if (val === undefined) return null
                          return (
                            <div key={field.key} className="flex items-center gap-2 text-sm">
                              <span className="text-[#64748b]">{field.label}:</span>
                              <StarRating rating={val} size="sm" />
                            </div>
                          )
                        })}
                      </div>

                      <p className="text-[#1e293b] text-sm mb-4">{pr.review_text}</p>

                      <div className="flex gap-3">
                        <button
                          onClick={() => approveReview(pr)}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectReview(pr.id)}
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}
