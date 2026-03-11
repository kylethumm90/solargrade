'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getCategoryLabel, getCategoryColor, getRatingFields, CATEGORIES } from '@/lib/constants'
import { StarRating } from '@/components/StarRating'
import { PendingCompany, PendingReview, Company, ReviewWithCompany } from '@/lib/types'

const ADMIN_PASSWORD = 'solargrade2026'

type Tab = 'pending' | 'listings' | 'reviews'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('sg_admin') === 'true'
    }
    return false
  })
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('pending')

  // Pending state
  const [pendingCompanies, setPendingCompanies] = useState<PendingCompany[]>([])
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([])

  // Listings state
  const [companies, setCompanies] = useState<Company[]>([])
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)

  // Reviews state
  const [reviews, setReviews] = useState<ReviewWithCompany[]>([])
  const [editingReview, setEditingReview] = useState<ReviewWithCompany | null>(null)

  const [loading, setLoading] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      sessionStorage.setItem('sg_admin', 'true')
    }
  }

  useEffect(() => {
    if (!authenticated) return
    loadPending()
    loadCompanies()
    loadReviews()
  }, [authenticated])

  // ---- Data loading ----

  async function loadPending() {
    setLoading(true)
    const { data: pCompanies } = await supabase
      .from('pending_companies')
      .select('*')
      .order('submitted_at', { ascending: false })

    const { data: pReviews } = await supabase
      .from('pending_reviews')
      .select('*, companies(name, category)')
      .order('submitted_at', { ascending: false })

    setPendingCompanies(pCompanies || [])
    setPendingReviews(pReviews || [])
    setLoading(false)
  }

  async function loadCompanies() {
    const { data } = await supabase
      .from('companies')
      .select('*')
      .order('name', { ascending: true })
    setCompanies(data || [])
  }

  async function loadReviews() {
    const { data } = await supabase
      .from('reviews')
      .select('*, companies(name, category)')
      .order('created_at', { ascending: false })
    setReviews((data as ReviewWithCompany[]) || [])
  }

  // ---- Pending actions ----

  async function approveCompany(pc: PendingCompany) {
    const slug = pc.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    const { error } = await supabase.from('companies').insert({
      slug,
      name: pc.name,
      category: pc.category,
      website: pc.website,
      description: pc.description,
      approved: true,
    })

    if (!error) {
      await supabase.from('pending_companies').delete().eq('id', pc.id)
      loadPending()
      loadCompanies()
    }
  }

  async function rejectCompany(id: string) {
    await supabase.from('pending_companies').delete().eq('id', id)
    loadPending()
  }

  async function approveReview(pr: PendingReview) {
    const { error } = await supabase.from('reviews').insert({
      company_id: pr.company_id,
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

  // ---- Company CRUD ----

  function isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  async function saveCompany() {
    if (!editingCompany) return

    const socialFields = [
      { key: 'facebook_url', label: 'Facebook' },
      { key: 'instagram_url', label: 'Instagram' },
      { key: 'linkedin_url', label: 'LinkedIn' },
      { key: 'youtube_url', label: 'YouTube' },
      { key: 'tiktok_url', label: 'TikTok' },
      { key: 'twitter_url', label: 'Twitter/X' },
      { key: 'website_url', label: 'Website' },
    ] as const

    for (const field of socialFields) {
      const val = editingCompany[field.key]
      if (val && !isValidUrl(val)) {
        alert(`Invalid URL for ${field.label}: ${val}`)
        return
      }
    }

    const { error } = await supabase
      .from('companies')
      .update({
        name: editingCompany.name,
        category: editingCompany.category,
        website: editingCompany.website,
        description: editingCompany.description,
        facebook_url: editingCompany.facebook_url,
        instagram_url: editingCompany.instagram_url,
        linkedin_url: editingCompany.linkedin_url,
        youtube_url: editingCompany.youtube_url,
        tiktok_url: editingCompany.tiktok_url,
        twitter_url: editingCompany.twitter_url,
        website_url: editingCompany.website_url,
      })
      .eq('id', editingCompany.id)

    if (!error) {
      setEditingCompany(null)
      loadCompanies()
    }
  }

  async function deleteCompany(id: string) {
    if (!confirm('Delete this listing and all its reviews? This cannot be undone.')) return
    const { error } = await supabase.from('companies').delete().eq('id', id)
    if (error) {
      alert('Failed to delete company: ' + error.message)
      return
    }
    loadCompanies()
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
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) {
      alert('Failed to delete review: ' + error.message)
      return
    }
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
    { key: 'pending', label: 'Pending Approvals', count: pendingCompanies.length + pendingReviews.length },
    { key: 'listings', label: 'Manage Listings', count: companies.length },
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
                  Pending Companies ({pendingCompanies.length})
                </h2>
                {pendingCompanies.length === 0 ? (
                  <p className="text-[#64748b]">No pending companies.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingCompanies.map((pc) => (
                      <div key={pc.id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-[#1e293b] text-lg">{pc.name}</h3>
                            <p className="text-[#64748b] text-sm">{getCategoryLabel(pc.category)}</p>
                          </div>
                          <span className="text-xs text-[#64748b]">
                            {new Date(pc.submitted_at).toLocaleDateString()}
                          </span>
                        </div>
                        {pc.website && <p className="text-amber-600 text-sm mb-2">{pc.website}</p>}
                        {pc.description && <p className="text-[#64748b] text-sm mb-4">{pc.description}</p>}
                        <div className="flex gap-3">
                          <button
                            onClick={() => approveCompany(pc)}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectCompany(pc.id)}
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
                      const companyCategory = pr.companies?.category || 'installers'
                      const ratingFields = getRatingFields(companyCategory)
                      return (
                        <div key={pr.id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-[#1e293b]">
                                {pr.companies?.name || 'Unknown Company'}
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
                All Listings ({companies.length})
              </h2>
              {companies.length === 0 ? (
                <p className="text-[#64748b]">No listings yet.</p>
              ) : (
                <div className="space-y-4">
                  {companies.map((v) => (
                    <div key={v.id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                      {editingCompany?.id === v.id ? (
                        /* ---- Editing mode ---- */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-[#1e293b] mb-1">Name</label>
                            <input
                              type="text"
                              value={editingCompany.name}
                              onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#1e293b] mb-1">Category</label>
                            <select
                              value={editingCompany.category}
                              onChange={(e) => setEditingCompany({ ...editingCompany, category: e.target.value })}
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
                              value={editingCompany.website || ''}
                              onChange={(e) => setEditingCompany({ ...editingCompany, website: e.target.value || null })}
                              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#1e293b] mb-1">Description</label>
                            <textarea
                              value={editingCompany.description || ''}
                              onChange={(e) => setEditingCompany({ ...editingCompany, description: e.target.value || null })}
                              rows={3}
                              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="border-t border-[#e2e8f0] pt-4">
                            <label className="block text-sm font-medium text-[#1e293b] mb-3">Social Links</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {([
                                { key: 'facebook_url' as const, label: 'Facebook' },
                                { key: 'instagram_url' as const, label: 'Instagram' },
                                { key: 'linkedin_url' as const, label: 'LinkedIn' },
                                { key: 'youtube_url' as const, label: 'YouTube' },
                                { key: 'tiktok_url' as const, label: 'TikTok' },
                                { key: 'twitter_url' as const, label: 'Twitter/X' },
                                { key: 'website_url' as const, label: 'Website' },
                              ]).map((field) => (
                                <div key={field.key}>
                                  <label className="block text-xs text-[#64748b] mb-1">{field.label}</label>
                                  <input
                                    type="url"
                                    value={editingCompany[field.key] || ''}
                                    onChange={(e) => setEditingCompany({ ...editingCompany, [field.key]: e.target.value || null })}
                                    placeholder={`https://...`}
                                    className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-3 py-2 text-sm"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={saveCompany}
                              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCompany(null)}
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
                              onClick={() => setEditingCompany({ ...v })}
                              className="px-4 py-2 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-400 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteCompany(v.id)}
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
                    const companyCategory = r.companies?.category || 'installers'
                    const ratingFields = getRatingFields(companyCategory)
                    const isEditing = editingReview?.id === r.id

                    return (
                      <div key={r.id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6">
                        {isEditing && editingReview ? (
                          /* ---- Editing mode ---- */
                          <div className="space-y-4">
                            <p className="text-sm font-medium text-[#64748b]">
                              Review for <span className="text-[#1e293b]">{r.companies?.name || 'Unknown Company'}</span>
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
                                  {r.companies?.name || 'Unknown Company'}
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
