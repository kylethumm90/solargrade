export const CATEGORIES = [
  { value: 'installers', label: 'Installers / EPCs', color: '#f59e0b' },
  { value: 'leads', label: 'Lead Companies', color: '#3b82f6' },
  { value: 'crm', label: 'CRM Systems', color: '#8b5cf6' },
  { value: 'callcenter', label: 'Call Centers', color: '#10b981' },
  { value: 'financing', label: 'Financing', color: '#ec4899' },
  { value: 'software', label: 'Software Tools', color: '#6366f1' },
  { value: 'salesorgs', label: 'Sales Orgs', color: '#f97316' },
] as const

export type Category = (typeof CATEGORIES)[number]['value']

export const INSTALLER_RATINGS = [
  { key: 'payReliability', label: 'Payment Reliability' },
  { key: 'communication', label: 'Communication' },
  { key: 'installQuality', label: 'Install Quality' },
  { key: 'customerSupport', label: 'Customer Support' },
  { key: 'installSpeed', label: 'Install Speed' },
  { key: 'wouldRecommend', label: 'Would Recommend' },
] as const

export const VENDOR_RATINGS = [
  { key: 'leadQuality', label: 'Lead Quality' },
  { key: 'support', label: 'Customer Support' },
  { key: 'integration', label: 'Integration / Ease of Use' },
  { key: 'roi', label: 'ROI' },
  { key: 'transparency', label: 'Transparency' },
  { key: 'reliability', label: 'Reliability' },
] as const

export const CRM_RATINGS = [
  { key: 'customization', label: 'Customization' },
  { key: 'support', label: 'Customer Support' },
  { key: 'integration', label: 'Integration / Ease of Use' },
  { key: 'roi', label: 'ROI' },
  { key: 'reporting', label: 'Reporting / Analytics' },
  { key: 'reliability', label: 'Reliability' },
] as const

export const SOFTWARE_RATINGS = [
  { key: 'easeOfUse', label: 'Ease of Use' },
  { key: 'support', label: 'Customer Support' },
  { key: 'accuracy', label: 'Data Accuracy' },
  { key: 'integration', label: 'Integration / Compatibility' },
  { key: 'roi', label: 'ROI' },
  { key: 'reliability', label: 'Reliability' },
] as const

export const SALES_ORG_RATINGS = [
  { key: 'leadHandling', label: 'Lead Handling' },
  { key: 'payReliability', label: 'Payment Reliability' },
  { key: 'communication', label: 'Communication' },
  { key: 'transparency', label: 'Transparency' },
  { key: 'repSupport', label: 'Rep Support' },
  { key: 'wouldRecommend', label: 'Would Recommend' },
] as const

export function getRatingFields(category: string) {
  if (category === 'installers') return INSTALLER_RATINGS
  if (category === 'crm') return CRM_RATINGS
  if (category === 'software') return SOFTWARE_RATINGS
  if (category === 'salesorgs') return SALES_ORG_RATINGS
  return VENDOR_RATINGS
}

export function getCategoryLabel(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value
}

export function getCategoryColor(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.color ?? '#94a3b8'
}

export const INSTALLER_RELATIONSHIPS = [
  'Subcontractor / Install Crew',
  'Sales Rep / Dealer',
  'Homeowner',
  'Other',
] as const

export type InstallerRelationship = (typeof INSTALLER_RELATIONSHIPS)[number]

export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
] as const

export function getStateLabel(value: string) {
  return US_STATES.find((s) => s.value === value)?.label ?? value
}

export function getAverageRating(ratings: Record<string, number>): number {
  const values = Object.values(ratings)
  if (values.length === 0) return 0
  return values.reduce((a, b) => a + b, 0) / values.length
}
