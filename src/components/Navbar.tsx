'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/companies', label: 'Browse Companies' },
  { href: '/review', label: 'Write a Review' },
  { href: '/submit', label: 'Submit Company' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu on route change (anchor clicks) and lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <nav className="border-b border-[#e2e8f0] bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="SolarGrade" className="h-10" />
          <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-600 rounded-full uppercase tracking-wider">
            Beta
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#64748b] hover:text-[#1e293b] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2 text-[#64748b] hover:text-[#1e293b] transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 top-[73px] bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 right-0 bg-white border-b border-[#e2e8f0] shadow-lg z-50 md:hidden animate-fade-in">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-3 rounded-lg text-[#64748b] hover:text-[#1e293b] hover:bg-[#f8fafc] transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
