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

    const { data: insertedCompany, error: submitError } = await supabase.from('companies').insert({
      slug,
      name,
      category,
      website: website || null,
      description: description || null,
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
          <label className="block text-sm font-medium text-[#1e293b] mb-2">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

        <div>
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
        </div>

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
