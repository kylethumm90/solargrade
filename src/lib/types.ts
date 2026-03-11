export interface Vendor {
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
  vendor_id: string
  reviewer_name: string
  company: string | null
  relationship: string | null
  ratings: Record<string, number>
  review_text: string
  created_at: string
}

export interface VendorWithReviews extends Vendor {
  reviews: Review[]
  avg_rating: number
  review_count: number
}

export interface PendingVendor {
  id: string
  name: string
  category: string
  website: string | null
  description: string | null
  submitted_at: string
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
