-- Fix: Add storage bucket and RLS policies for logo uploads
-- Run this in the Supabase SQL Editor to fix "new row violates row-level security policy" error

-- Create the logos bucket (public so getPublicUrl works)
insert into storage.buckets (id, name, public) values ('logos', 'logos', true)
on conflict (id) do nothing;

-- Allow public read access to logos
create policy "Public can read logos" on storage.objects for select using (bucket_id = 'logos');

-- Allow anyone to upload logos
create policy "Anyone can upload logos" on storage.objects for insert with check (bucket_id = 'logos');

-- Allow anyone to update/overwrite logos (needed for upsert)
create policy "Anyone can update logos" on storage.objects for update using (bucket_id = 'logos') with check (bucket_id = 'logos');

-- Allow anyone to delete logos
create policy "Anyone can delete logos" on storage.objects for delete using (bucket_id = 'logos');
