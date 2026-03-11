'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CATEGORIES } from '@/lib/constants'
import { Upload, X } from 'lucide-react'

export default function SubmitPage() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleLogoSelect(file: File) {
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  function removeLogo() {
    setLogoFile(null)
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview)
      setLogoPreview(null)
    }
  }

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

    let logo_url: string | null = null

    if (logoFile) {
      const ext = logoFile.name.split('.').pop()
      const filePath = `${slug}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, logoFile, { upsert: true })

      if (uploadError) {
        setError('Logo upload failed: ' + uploadError.message)
        setSubmitting(false)
        return
      }

      const { data } = supabase.storage.from('logos').getPublicUrl(filePath)
      logo_url = data.publicUrl
    }

    const { error: submitError } = await supabase.from('vendors').insert({
      slug,
      name,
      category,
      website: website || null,
      description: description || null,
      logo_url,
      approved: true,
    })

    if (submitError) {
      console.error('Supabase submit error:', submitError)
      setError(`Failed to submit: ${submitError.message || 'Unknown error'}`)
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
          <label className="block text-sm font-medium text-[#1e293b] mb-2">Logo</label>
          <div className="flex items-center gap-4">
            {logoPreview ? (
              <div className="relative">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-16 h-16 rounded-lg object-contain border border-[#e2e8f0] bg-white p-1"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-400"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg border-2 border-dashed border-[#e2e8f0] flex items-center justify-center text-[#94a3b8]">
                <Upload size={20} />
              </div>
            )}
            <label className="cursor-pointer px-4 py-2 bg-[#e2e8f0] text-[#1e293b] text-sm rounded-lg hover:bg-[#cbd5e1] transition-colors">
              {logoPreview ? 'Change Logo' : 'Upload Logo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleLogoSelect(file)
                }}
              />
            </label>
          </div>
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
