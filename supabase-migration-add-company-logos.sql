-- Migration: Add logo_url column to companies and set up storage bucket
-- Run this in the Supabase SQL Editor

-- Add logo_url column to companies
alter table companies add column logo_url text;

-- Create a public storage bucket for company logos
insert into storage.buckets (id, name, public) values ('logos', 'logos', true);

-- Allow public read access to logos
create policy "Public can read logos" on storage.objects for select using (bucket_id = 'logos');

-- Allow public uploads to logos bucket
create policy "Anyone can upload logos" on storage.objects for insert with check (bucket_id = 'logos');

-- Allow public deletes (for admin re-uploads)
create policy "Anyone can delete logos" on storage.objects for delete using (bucket_id = 'logos');

-- Allow public updates (for overwrites)
create policy "Anyone can update logos" on storage.objects for update using (bucket_id = 'logos') with check (bucket_id = 'logos');
