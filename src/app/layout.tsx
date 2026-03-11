import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'SolarGrade - Solar Industry Review Platform',
  description:
    'The solar industry\'s first transparent review platform. Real ratings from real professionals on the installers, lead companies, and tools that actually deliver.',
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-[#e2e8f0] bg-[#f8fafc] py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <img src="/logo.svg" alt="SolarGrade" className="h-8 mx-auto mb-3" />
            <p className="text-[#64748b] text-sm">
              SolarGrade -- Built for solar professionals, by solar professionals
            </p>
            <p className="text-[#64748b]/60 text-xs mt-2">A Solar Growth Project initiative</p>
            <div className="flex items-center justify-center gap-3 mt-3 text-xs text-[#64748b]/60">
              <a href="/terms" className="hover:text-[#64748b] transition-colors">Terms of Service</a>
              <span>·</span>
              <a href="/content-policy" className="hover:text-[#64748b] transition-colors">Content Policy</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
