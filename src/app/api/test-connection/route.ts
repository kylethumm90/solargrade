import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const results: Record<string, unknown> = {}

  // Test 1: Can we read vendors?
  const { data: vendors, error: readError } = await supabase
    .from('vendors')
    .select('id, name')
    .limit(3)
  results.readVendors = readError ? { error: readError.message } : { count: vendors?.length, sample: vendors }

  // Test 2: Can we insert into vendors?
  const { error: insertError } = await supabase.from('vendors').insert({
    slug: 'test-connection-delete-me',
    name: 'TEST CONNECTION DELETE ME',
    category: 'installers',
    approved: false,
  })
  results.insertVendor = insertError ? { error: insertError.message, code: insertError.code, details: insertError.details } : { success: true }

  // Cleanup test row
  if (!insertError) {
    await supabase.from('vendors').delete().eq('slug', 'test-connection-delete-me')
  }

  // Test 3: Can we insert into reviews?
  const { error: reviewInsertError } = await supabase.from('reviews').insert({
    vendor_id: '00000000-0000-0000-0000-000000000000',
    reviewer_name: 'test',
    review_text: 'test',
    ratings: {},
  })
  results.insertReview = reviewInsertError
    ? { error: reviewInsertError.message, code: reviewInsertError.code, details: reviewInsertError.details }
    : { success: true }

  return NextResponse.json(results, { status: 200 })
}
