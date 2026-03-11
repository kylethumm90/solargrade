-- SolarGrade Database Schema
-- Run this in the Supabase SQL Editor

-- Vendors listed on the platform
create table vendors (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('installers', 'leads', 'crm', 'callcenter', 'financing', 'software')),
  website text,
  description text,
  logo_url text,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  youtube_url text,
  tiktok_url text,
  twitter_url text,
  website_url text,
  approved boolean default true,
  created_at timestamptz default now()
);

-- Approved reviews
create table reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references vendors(id) on delete cascade,
  reviewer_name text not null,
  company text,
  relationship text,
  ratings jsonb not null,
  review_text text not null,
  created_at timestamptz default now()
);

-- Pending vendor submissions (awaiting admin approval)
create table pending_vendors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  website text,
  description text,
  submitted_at timestamptz default now()
);

-- Pending review submissions (awaiting admin approval)
create table pending_reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references vendors(id) on delete cascade,
  reviewer_name text not null,
  company text,
  relationship text,
  ratings jsonb not null,
  review_text text not null,
  submitted_at timestamptz default now()
);

-- Enable RLS
alter table vendors enable row level security;
alter table reviews enable row level security;
alter table pending_vendors enable row level security;
alter table pending_reviews enable row level security;

-- Public read for approved vendors and reviews
create policy "Public can read vendors" on vendors for select using (approved = true);
create policy "Public can read reviews" on reviews for select using (true);

-- Public can submit vendors and reviews directly
create policy "Anyone can insert vendors" on vendors for insert with check (true);
create policy "Anyone can insert reviews" on reviews for insert with check (true);

-- Anyone can submit to pending tables
create policy "Anyone can submit vendors" on pending_vendors for insert with check (true);
create policy "Anyone can submit reviews" on pending_reviews for insert with check (true);

-- Admin operations: update and delete vendors and reviews
create policy "Anyone can update vendors" on vendors for update using (true) with check (true);
create policy "Anyone can delete vendors" on vendors for delete using (true);
create policy "Anyone can update reviews" on reviews for update using (true) with check (true);
create policy "Anyone can delete reviews" on reviews for delete using (true);

-- Admin operations: read and delete pending submissions
create policy "Anyone can read pending vendors" on pending_vendors for select using (true);
create policy "Anyone can delete pending vendors" on pending_vendors for delete using (true);
create policy "Anyone can read pending reviews" on pending_reviews for select using (true);
create policy "Anyone can delete pending reviews" on pending_reviews for delete using (true);

-- Create indexes
create index idx_vendors_category on vendors(category);
create index idx_vendors_slug on vendors(slug);
create index idx_reviews_company_id on reviews(company_id);
