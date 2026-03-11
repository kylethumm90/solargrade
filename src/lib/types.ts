export interface Company {
  id: string
  slug: string
  name: string
  category: string
  website: string | null
  description: string | null
  approved: boolean
  created_at: string
}

export interface Review {
  id: string
  company_id: string
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
  companies?: { name: string; category: string }
}

export interface PendingReview {
  id: string
  company_id: string
  reviewer_name: string
  company: string | null
  relationship: string | null
  ratings: Record<string, number>
  review_text: string
  submitted_at: string
  companies?: { name: string; category: string }
}
