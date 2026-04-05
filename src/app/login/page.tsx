'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase'
import { useAuth } from '@/components/AuthProvider'

export default function LoginPage() {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSending(true)

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setSending(false)
      return
    }

    setSent(true)
    setSending(false)
  }

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-2">You&apos;re logged in</h2>
          <p className="text-[#64748b] mb-4">Signed in as {user.email}</p>
          <a href="/" className="text-amber-600 hover:text-amber-500">
            Go to Homepage
          </a>
        </div>
      </div>
    )
  }

  if (sent) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-8">
          <div className="text-4xl mb-4">&#9993;</div>
          <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Check your email</h2>
          <p className="text-[#64748b] mb-4">
            We sent a magic login link to <strong>{email}</strong>. Click the link in the email to sign in.
          </p>
          <p className="text-[#94a3b8] text-sm">
            Didn&apos;t get it? Check your spam folder or{' '}
            <button
              onClick={() => { setSent(false); setEmail('') }}
              className="text-amber-600 hover:text-amber-500 underline"
            >
              try again
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-8">
        <h1 className="text-2xl font-bold text-[#1e293b] mb-2 text-center">Log in to SolarGrade</h1>
        <p className="text-[#64748b] text-sm text-center mb-6">
          Enter your email and we&apos;ll send you a magic link to sign in. No password needed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1e293b] mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#e2e8f0] text-[#1e293b] rounded-lg px-4 py-3"
              placeholder="you@company.com"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={sending}
            className="w-full px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
      </div>
    </div>
  )
}
