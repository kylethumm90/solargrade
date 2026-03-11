'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getCategoryLabel, getCategoryColor, getRatingFields, CATEGORIES } from '@/lib/constants'
import { StarRating } from '@/components/StarRating'
import { PendingVendor, PendingReview, Vendor, ReviewWithVendor } from '@/lib/types'

const ADMIN_PASSWORD = 'solargrade2026'

type Tab = 'pending' | 'listings' | 'reviews'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('pending')

  // Pending state
  const [pendingVendors, setPendingVendors] = useState<PendingVendor[]>([])
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([])

  // Listings state
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)

  // Reviews state
  const [reviews, setReviews] = useState<ReviewWithVendor[]>([])
  const [editingReview, setEditingReview] = useState<ReviewWithVendor | null>(null)

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
    loadVendors()
    loadReviews()
  }, [authenticated])

  // ---- Data loading ----

  async function loadPending() {
    setLoading(true)
    const { data: pVendors } = await supabase
      .from('pending_vendors')
      .select('*')
      .order('submitted_at', { ascending: false })

    const { data: pReviews } = await supabase
      .from('pending_reviews')
      .select('*, vendors(name, category)')
      .order('submitted_at', { ascending: false })

    setPendingVendors(pVendors || [])
    setPendingReviews(pReviews || [])
    setLoading(false)
  }

  async function loadVendors() {
    const { data } = await supabase
      .from('vendors')
      .select('*')
      .order('name', { ascending: true })
    setVendors(data || [])
  }

  async function loadReviews() {
    const { data } = await supabase
      .from('reviews')
      .select('*, vendors(name, category)')
      .order('created_at', { ascending: false })
    setReviews((data as ReviewWithVendor[]) || [])
  }

  // ---- Pending actions ----

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
      loadVendors()
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
      relationship: pr.relationship,
      ratings: pr.ratings,
      review_text: pr.review_text,
    })

    if (!error) {
      await supabase.from('pending_reviews').delete().eq('id', pr.id)
      loadPending()
      loadReviews()
    }
  }

  async function rejectReview(id: string) {
    await supabase.from('pending_reviews').delete().eq('id', id)
    loadPending()
  }

  // ---- Vendor CRUD ----

  async function saveVendor() {
    if (!editingVendor) return
    const { error } = await supabase
      .from('vendors')
      .update({
        name: editingVendor.name,
        category: editingVendor.category,
        website: editingVendor.website,
        description: editingVendor.description,
      })
      .eq('id', editingVendor.id)

    if (!error) {
      setEditingVendor(null)
      loadVendors()
    }
  }

  async function deleteVendor(id: string) {
    if (!confirm('Delete this listing and all its reviews? This cannot be undone.')) return
    await supabase.from('vendors').delete().eq('id', id)
    loadVendors()
    loadReviews()
  }

  // ---- Review CRUD ----

  async function saveReview() {
    if (!editingReview) return
    const { error } = await supabase
      .from('reviews')
      .update({
        reviewer_name: editingReview.reviewer_name,
        company: editingReview.company,
        relationship: editingReview.relationship,
        review_text: editingReview.review_text,
        ratings: editingReview.ratings,
      })
      .eq('id', editingReview.id)

    if (!error) {
      setEditingReview(null)
      loadReviews()
    }
  }

  async function deleteReview(id: string) {
    if (!confirm('Delete this review? This cannot be undone.')) return
    await supabase.from('reviews').delete().eq('id', id)
    loadReviews()
  }

  // ---- Auth screen ----

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

  // ---- Tab navigation ----

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'pending', label: 'Pending Approvals', count: pendingVendors.length + pendingReviews.length },
    { key: 'listings', label: 'Manage Listings', count: vendors.length },
    { key: 'reviews', label: 'Manage Reviews', count: reviews.length },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-6">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-[#e2e8f0]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.key
                ? 'bg-[#f8fafc] border border-[#e2e8f0] border-b-[#f8fafc] text-[#1e293b] -mb-px'
                : 'text-[#64748b] hover:text-[#1e293b]'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key ? 'bg-amber-100 text-amber-800' : 'bg-[#e2e8f0] text-[#64748b]'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading && activeTab === 'pending' ? (
        <p className="text-[#64748b]">Loading...</p>
      ) : (
        <>
          {/* ===== PENDING APPROVALS TAB ===== */}
          {activeTab === 'pending' && (
            <>
              <section className="mb-12">
                <h2 className="text-xl font-bold text-[#1e293b] mb-4">
                  Pending Vendors ({pendingVendors.length})
                </h2>
                {pendingVendors.length === 0 ? (
                  <p className="text-[#64748b]">No pending vendors.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingVendors.map((pv) => (
                      <div key={pv.id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-[#1e293b] text-lg">{pv.name}</h3>
                            <p className="text-[#64748b] text-sm">{getCategoryLabel(pv.category)}</p>
                          </div>
                          <span className="text-xs text-[#64748b]">
                            {new Date(pv.submitted_at).toLocaleDateString()}
                          </span>
                        </div>
                        {pv.website && <p className="text-amber-600 text-sm mb-2">{pv.website}</p>}
                        {pv.description && <p className="text-[#64748b] text-sm mb-4">{pv.description}</p>}
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
                        <div key={pr.id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-[#1e293b]">
                                {pr.vendors?.name || 'Unknown Vendor'}
                              </h3>
                              <p className="text-[#64748b] text-sm">
                                by {pr.reviewer_name}
                                {pr.relationship && (
                                  <span className="inline-block text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-2">
                                    {pr.relationship}
                                  </span>
                                )}
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

          {/* ===== MANAGE LISTINGS TAB ===== */}
          {activeTab === 'listings' && (
            <section>
              <h2 className="text-xl font-bold text-[#1e293b] mb-4">
                All Listings ({vendors.length})
              </h2>
              {vendors.length === 0 ? (
                <p className="text-[#64748b]">No listings yet.</p>
              ) : (
                <div className="space-y-4">
                  {vendors.map((v) => (
                    <div key={v.id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                      {editingVendor?.id === v.id ? (
                        /* ---- Editing mode ---- */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-[#1e293b] mb-1">Name</label>
                            <input
                              type="text"
                              value={editingVendor.name}
                              onChange={(e) => setEditingVendor({ ...editingVendor, name: e.target.value })}
                              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#1e293b] mb-1">Category</label>
                            <select
                              value={editingVendor.category}
                              onChange={(e) => setEditingVendor({ ...editingVendor, category: e.target.value })}
                              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                            >
                              {CATEGORIES.map((c) => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#1e293b] mb-1">Website</label>
                            <input
                              type="text"
                              value={editingVendor.website || ''}
                              onChange={(e) => setEditingVendor({ ...editingVendor, website: e.target.value || null })}
                              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#1e293b] mb-1">Description</label>
                            <textarea
                              value={editingVendor.description || ''}
                              onChange={(e) => setEditingVendor({ ...editingVendor, description: e.target.value || null })}
                              rows={3}
                              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={saveVendor}
                              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingVendor(null)}
                              className="px-4 py-2 bg-[#e2e8f0] text-[#1e293b] text-sm rounded-lg hover:bg-[#cbd5e1] transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* ---- Display mode ---- */
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-[#1e293b] text-lg">{v.name}</h3>
                              <span
                                className="inline-block text-xs font-medium text-white px-2 py-0.5 rounded-full mt-1"
                                style={{ backgroundColor: getCategoryColor(v.category) }}
                              >
                                {getCategoryLabel(v.category)}
                              </span>
                            </div>
                            <span className="text-xs text-[#64748b]">
                              {new Date(v.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          {v.website && <p className="text-amber-600 text-sm mb-1">{v.website}</p>}
                          {v.description && (
                            <p className="text-[#64748b] text-sm mb-4 line-clamp-2">{v.description}</p>
                          )}
                          <div className="flex gap-3">
                            <button
                              onClick={() => setEditingVendor({ ...v })}
                              className="px-4 py-2 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-400 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteVendor(v.id)}
                              className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ===== MANAGE REVIEWS TAB ===== */}
          {activeTab === 'reviews' && (
            <section>
              <h2 className="text-xl font-bold text-[#1e293b] mb-4">
                All Reviews ({reviews.length})
              </h2>
              {reviews.length === 0 ? (
                <p className="text-[#64748b]">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((r) => {
                    const vendorCategory = r.vendors?.category || 'installers'
                    const ratingFields = getRatingFields(vendorCategory)
                    const isEditing = editingReview?.id === r.id

                    return (
                      <div key={r.id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                        {isEditing && editingReview ? (
                          /* ---- Editing mode ---- */
                          <div className="space-y-4">
                            <p className="text-sm font-medium text-[#64748b]">
                              Review for <span className="text-[#1e293b]">{r.vendors?.name || 'Unknown Vendor'}</span>
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-[#1e293b] mb-1">Reviewer Name</label>
                                <input
                                  type="text"
                                  value={editingReview.reviewer_name}
                                  onChange={(e) => setEditingReview({ ...editingReview, reviewer_name: e.target.value })}
                                  className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-[#1e293b] mb-1">Company</label>
                                <input
                                  type="text"
                                  value={editingReview.company || ''}
                                  onChange={(e) => setEditingReview({ ...editingReview, company: e.target.value || null })}
                                  className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#1e293b] mb-1">Relationship</label>
                              <input
                                type="text"
                                value={editingReview.relationship || ''}
                                onChange={(e) => setEditingReview({ ...editingReview, relationship: e.target.value || null })}
                                className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#1e293b] mb-2">Ratings</label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {ratingFields.map((field) => (
                                  <div key={field.key} className="flex items-center justify-between gap-2">
                                    <span className="text-sm text-[#64748b]">{field.label}</span>
                                    <select
                                      value={editingReview.ratings[field.key] || 0}
                                      onChange={(e) =>
                                        setEditingReview({
                                          ...editingReview,
                                          ratings: { ...editingReview.ratings, [field.key]: Number(e.target.value) },
                                        })
                                      }
                                      className="bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-2 py-1 text-sm"
                                    >
                                      {[1, 2, 3, 4, 5].map((n) => (
                                        <option key={n} value={n}>{n} star{n !== 1 ? 's' : ''}</option>
                                      ))}
                                    </select>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#1e293b] mb-1">Review Text</label>
                              <textarea
                                value={editingReview.review_text}
                                onChange={(e) => setEditingReview({ ...editingReview, review_text: e.target.value })}
                                rows={4}
                                className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={saveReview}
                                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingReview(null)}
                                className="px-4 py-2 bg-[#e2e8f0] text-[#1e293b] text-sm rounded-lg hover:bg-[#cbd5e1] transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* ---- Display mode ---- */
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-[#1e293b]">
                                  {r.vendors?.name || 'Unknown Vendor'}
                                </h3>
                                <p className="text-[#64748b] text-sm">
                                  by {r.reviewer_name}
                                  {r.relationship && (
                                    <span className="inline-block text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-2">
                                      {r.relationship}
                                    </span>
                                  )}
                                  {r.company && ` at ${r.company}`}
                                </p>
                              </div>
                              <span className="text-xs text-[#64748b]">
                                {new Date(r.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                              {ratingFields.map((field) => {
                                const val = r.ratings[field.key]
                                if (val === undefined) return null
                                return (
                                  <div key={field.key} className="flex items-center gap-2 text-sm">
                                    <span className="text-[#64748b]">{field.label}:</span>
                                    <StarRating rating={val} size="sm" />
                                  </div>
                                )
                              })}
                            </div>
                            <p className="text-[#1e293b] text-sm mb-4">{r.review_text}</p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => setEditingReview({ ...r })}
                                className="px-4 py-2 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-400 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteReview(r.id)}
                                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  )
}
