import { Facebook, Instagram, Linkedin, Youtube, Twitter, Globe, Music } from 'lucide-react'

interface SocialLinksProps {
  facebook_url?: string | null
  instagram_url?: string | null
  linkedin_url?: string | null
  youtube_url?: string | null
  tiktok_url?: string | null
  twitter_url?: string | null
  website_url?: string | null
}

const SOCIAL_LINKS = [
  { key: 'facebook_url', label: 'Facebook', icon: Facebook },
  { key: 'instagram_url', label: 'Instagram', icon: Instagram },
  { key: 'linkedin_url', label: 'LinkedIn', icon: Linkedin },
  { key: 'youtube_url', label: 'YouTube', icon: Youtube },
  { key: 'tiktok_url', label: 'TikTok', icon: Music },
  { key: 'twitter_url', label: 'Twitter / X', icon: Twitter },
  { key: 'website_url', label: 'Website', icon: Globe },
] as const

export function SocialLinks(props: SocialLinksProps) {
  const links = SOCIAL_LINKS.filter(
    (link) => props[link.key as keyof SocialLinksProps]
  )

  if (links.length === 0) return null

  return (
    <div className="flex items-center gap-3">
      {links.map((link) => {
        const Icon = link.icon
        const url = props[link.key as keyof SocialLinksProps]!
        return (
          <a
            key={link.key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.label}
            className="text-[#64748b] hover:text-amber-500 transition-colors"
          >
            <Icon size={24} />
          </a>
        )
      })}
    </div>
  )
}
