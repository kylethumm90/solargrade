-- Add logo_url column to vendors table (called "companies" in app code)
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS logo_url text;

-- Create a storage bucket for company logos (run in Supabase dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('company-logos', 'company-logos', true);

-- Allow public read access to company logos
-- CREATE POLICY "Public can read company logos" ON storage.objects FOR SELECT USING (bucket_id = 'company-logos');

-- Allow authenticated uploads (or use anon for admin uploads)
-- CREATE POLICY "Anyone can upload company logos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'company-logos');
-- CREATE POLICY "Anyone can update company logos" ON storage.objects FOR UPDATE USING (bucket_id = 'company-logos');
-- CREATE POLICY "Anyone can delete company logos" ON storage.objects FOR DELETE USING (bucket_id = 'company-logos');
