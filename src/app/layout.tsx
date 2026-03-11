import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SolarGrade - Solar Industry Review Platform',
  description:
    'The solar industry\'s first transparent review platform. Real ratings from real professionals on the installers, lead vendors, and tools that actually deliver.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* DM Sans loaded via Google Fonts CDN at runtime */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <nav className="border-b border-[#e2e8f0] bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="SolarGrade" className="h-10" />
              <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-600 rounded-full uppercase tracking-wider">
                Beta
              </span>
            </a>
            <div className="flex items-center gap-6 text-sm">
              <a href="/vendors" className="text-[#64748b] hover:text-[#1e293b] transition-colors">
                Browse Vendors
              </a>
              <a href="/review" className="text-[#64748b] hover:text-[#1e293b] transition-colors">
                Write a Review
              </a>
              <a href="/submit" className="text-[#64748b] hover:text-[#1e293b] transition-colors">
                Submit Company
              </a>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-[#e2e8f0] bg-[#f8fafc] py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <img src="/logo.png" alt="SolarGrade" className="h-8 mx-auto mb-3" />
            <p className="text-[#64748b] text-sm">
              SolarGrade -- Built for solar professionals, by solar professionals
            </p>
            <p className="text-[#64748b]/60 text-xs mt-2">A Solar Growth Project initiative</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
