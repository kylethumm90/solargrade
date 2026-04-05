'use client'

import { useAuth } from './AuthProvider'

export function NavAuth() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return <span className="text-sm text-[#94a3b8]">...</span>
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#64748b] hidden sm:inline">{user.email}</span>
        <button
          onClick={() => signOut()}
          className="text-sm text-[#64748b] hover:text-[#1e293b] transition-colors"
        >
          Log Out
        </button>
      </div>
    )
  }

  return (
    <a
      href="/login"
      className="px-4 py-2 text-sm font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition-colors"
    >
      Log In
    </a>
  )
}
