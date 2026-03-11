import { getCategoryColor, getCategoryLabel } from '@/lib/constants'

interface CategoryBadgeProps {
  category: string
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const color = getCategoryColor(category)

  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {getCategoryLabel(category)}
    </span>
  )
}
