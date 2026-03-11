'use client'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

export function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-base'

  return (
    <span className={`inline-flex gap-0.5 ${sizeClass}`} aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star
        const half = !filled && rating >= star - 0.5
        return (
          <span key={star} className={filled || half ? 'text-amber-500' : 'text-gray-600'}>
            {filled ? '\u2605' : half ? '\u2605' : '\u2606'}
          </span>
        )
      })}
    </span>
  )
}

interface StarInputProps {
  value: number
  onChange: (value: number) => void
  label: string
}

export function StarInput({ value, onChange, label }: StarInputProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-[#e2e8f0] min-w-[160px]">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-2xl transition-colors hover:text-amber-400 ${
              star <= value ? 'text-amber-500' : 'text-gray-600'
            }`}
          >
            {star <= value ? '\u2605' : '\u2606'}
          </button>
        ))}
      </div>
    </div>
  )
}
