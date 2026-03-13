'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CATEGORIES, US_STATES } from '@/lib/constants'

export default function SubmitPage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name || !category) {
      setError('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    // Upload logo if provided
    let logoUrl: string | null = null
    if (logoFile) {
      const fileExt = logoFile.name.split('.').pop()?.toLowerCase() || 'png'
      const filePath = `${slug}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, logoFile, { upsert: true })
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from('logos').getPublicUrl(filePath)
        logoUrl = publicUrlData.publicUrl
      }
    }

    const { data: insertedCompany, error: submitError } = await supabase.from('companies').insert({
      slug,
      name,
      category,
      website: website || null,
      description: description || null,
      logo_url: logoUrl,
      approved: true,
    }).select('id').single()

    if (submitError || !insertedCompany) {
      console.error('Supabase submit error:', submitError)
      setError(`Failed to submit: ${submitError?.message || 'Unknown error'}`)
      setSubmitting(false)
      return
    }

    // Insert states served
    if (selectedStates.length > 0) {
      const stateRows = selectedStates.map((state) => ({
        company_id: insertedCompany.id,
        state,
      }))
      await supabase.from('company_states').insert(stateRows)
    }

    setSuccess(true)
    setSubmitting(false)
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-8">
          <div className="text-4xl mb-4">&#10003;</div>
          <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Company Added!</h2>
          <p className="text-[#64748b] mb-6">
            Your company has been added to the directory.
          </p>
          <a href="/companies" className="text-amber-600 hover:text-amber-500">
            Browse Companies
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-8">Submit a Company</h1>
      <p className="text-[#64748b] mb-8">
        Know a solar company that should be on SolarGrade? Submit it for review.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">Company Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">Company Logo</label>
          <div className="flex items-center gap-4">
            {logoPreview ? (
              <div className="relative">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-16 h-16 rounded-lg object-contain border border-[#e2e8f0] bg-white"
                />
                <button
                  type="button"
                  onClick={() => { setLogoFile(null); setLogoPreview(null) }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-400"
                >
                  &times;
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg border-2 border-dashed border-[#e2e8f0] flex items-center justify-center text-[#94a3b8]">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" /></svg>
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    if (file.size > 2 * 1024 * 1024) {
                      setError('Logo must be under 2MB.')
                      return
                    }
                    setLogoFile(file)
                    setLogoPreview(URL.createObjectURL(file))
                  }
                }}
                className="text-sm text-[#64748b] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 file:cursor-pointer"
              />
              <p className="text-xs text-[#94a3b8] mt-1">PNG, JPG, WebP, or SVG. Max 2MB.</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">Category *</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              if (e.target.value !== 'installers' && e.target.value !== 'salesorgs') {
                setSelectedStates([])
              }
            }}
            className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
            required
          >
            <option value="">Select a category...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">Website</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3 min-h-[100px]"
            placeholder="Brief description of the company..."
          />
        </div>

        {(category === 'installers' || category === 'salesorgs') && <div>
          <label className="block text-sm font-medium text-[#1e293b] mb-2">States Served</label>
          <p className="text-xs text-[#64748b] mb-2">Select all states this company operates in.</p>
          <div className="bg-white border border-[#e2e8f0] rounded-lg p-3 max-h-[200px] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {US_STATES.map((st) => (
                <label key={st.value} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-[#f8fafc] cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={selectedStates.includes(st.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStates([...selectedStates, st.value])
                      } else {
                        setSelectedStates(selectedStates.filter((s) => s !== st.value))
                      }
                    }}
                    className="accent-amber-500"
                  />
                  <span className="text-[#1e293b]">{st.value}</span>
                  <span className="text-[#64748b] text-xs hidden md:inline">- {st.label}</span>
                </label>
              ))}
            </div>
          </div>
          {selectedStates.length > 0 && (
            <p className="text-xs text-[#64748b] mt-2">{selectedStates.length} state{selectedStates.length !== 1 ? 's' : ''} selected</p>
          )}
        </div>}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Company'}
        </button>
      </form>
    </div>
  )
}
