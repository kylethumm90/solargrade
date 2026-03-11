export interface Company {
  id: string
  slug: string
  name: string
  category: string
  website: string | null
  description: string | null
  facebook_url: string | null
  instagram_url: string | null
  linkedin_url: string | null
  youtube_url: string | null
  tiktok_url: string | null
  twitter_url: string | null
  website_url: string | null
  approved: boolean
  created_at: string
}

export interface Review {
  id: string
  vendor_id: string
  reviewer_name: string
  company: string | null
  relationship: string | null
  ratings: Record<string, number>
  review_text: string
  created_at: string
}

export interface CompanyWithReviews extends Company {
  reviews: Review[]
  avg_rating: number
  review_count: number
}

export interface PendingCompany {
  id: string
  name: string
  category: string
  website: string | null
  description: string | null
  submitted_at: string
}

export interface ReviewWithCompany extends Review {
  vendors?: { name: string; category: string }
}

export interface PendingReview {
  id: string
  vendor_id: string
  reviewer_name: string
  company: string | null
  relationship: string | null
  ratings: Record<string, number>
  review_text: string
  submitted_at: string
  vendors?: { name: string; category: string }
}
