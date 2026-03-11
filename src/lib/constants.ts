export const CATEGORIES = [
  { value: 'installers', label: 'Installers / EPCs', color: '#f59e0b' },
  { value: 'leads', label: 'Lead Companies', color: '#3b82f6' },
  { value: 'crm', label: 'CRM Systems', color: '#8b5cf6' },
  { value: 'callcenter', label: 'Call Centers', color: '#10b981' },
  { value: 'financing', label: 'Financing', color: '#ec4899' },
  { value: 'software', label: 'Software Tools', color: '#6366f1' },
  { value: 'salesorg', label: 'Sales Orgs', color: '#f97316' },
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

export const SALESORG_RATINGS = [
  { key: 'leadQuality', label: 'Lead Quality' },
  { key: 'closingSupport', label: 'Closing Support' },
  { key: 'communication', label: 'Communication' },
  { key: 'payReliability', label: 'Payment Reliability' },
  { key: 'transparency', label: 'Transparency' },
  { key: 'wouldRecommend', label: 'Would Recommend' },
] as const

export function getRatingFields(category: string) {
  if (category === 'installers') return INSTALLER_RATINGS
  if (category === 'crm') return CRM_RATINGS
  if (category === 'software') return SOFTWARE_RATINGS
  if (category === 'salesorg') return SALESORG_RATINGS
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

export function getAverageRating(ratings: Record<string, number>): number {
  const values = Object.values(ratings)
  if (values.length === 0) return 0
  return values.reduce((a, b) => a + b, 0) / values.length
}
