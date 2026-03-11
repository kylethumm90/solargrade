import { getCategoryColor } from '@/lib/constants'

type Size = 'sm' | 'md' | 'lg'

const SIZE_MAP: Record<Size, { container: string; text: string }> = {
  sm: { container: 'w-8 h-8', text: 'text-xs' },
  md: { container: 'w-10 h-10', text: 'text-sm' },
  lg: { container: 'w-16 h-16', text: 'text-xl' },
}

export function CompanyLogo({
  name,
  logoUrl,
  category,
  size = 'md',
}: {
  name: string
  logoUrl?: string | null
  category: string
  size?: Size
}) {
  const { container, text } = SIZE_MAP[size]
  const color = getCategoryColor(category)
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className={`${container} rounded-lg object-cover shrink-0`}
      />
    )
  }

  return (
    <div
      className={`${container} rounded-lg flex items-center justify-center shrink-0 font-bold ${text}`}
      style={{ backgroundColor: `${color}20`, color }}
    >
      {initials}
    </div>
  )
}
