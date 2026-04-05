-- Migration: Add profiles table and link reviews to authenticated users
-- Run this in the Supabase SQL Editor

-- 1. Create profiles table (extends auth.users with app-specific data)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  company text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

alter table profiles enable row level security;

-- Anyone can read profiles (for displaying reviewer names)
create policy "Public can read profiles" on profiles
  for select using (true);

-- Users can update their own profile
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- 2. Auto-create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Add user_id to reviews and pending_reviews
alter table reviews add column user_id uuid references auth.users(id);
alter table pending_reviews add column user_id uuid references auth.users(id);

-- Index for looking up reviews by user
create index idx_reviews_user_id on reviews(user_id);

-- 4. Tighten RLS policies on reviews
-- Drop the old wide-open policies
drop policy if exists "Anyone can insert reviews" on reviews;
drop policy if exists "Anyone can update reviews" on reviews;
drop policy if exists "Anyone can delete reviews" on reviews;

-- Authenticated users can insert reviews (must set their own user_id)
create policy "Authenticated users can insert reviews" on reviews
  for insert with check (auth.uid() = user_id);

-- Users can update their own reviews
create policy "Users can update own reviews" on reviews
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Users can delete their own reviews
create policy "Users can delete own reviews" on reviews
  for delete using (auth.uid() = user_id);

-- Admins can manage all reviews
create policy "Admins can manage reviews" on reviews
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- 5. Tighten RLS on companies (admin-only writes)
drop policy if exists "Anyone can insert companies" on companies;
drop policy if exists "Anyone can update companies" on companies;
drop policy if exists "Anyone can delete companies" on companies;

create policy "Admins can insert companies" on companies
  for insert with check (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update companies" on companies
  for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can delete companies" on companies
  for delete using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- 6. Pending tables: authenticated users can submit, admins can manage
drop policy if exists "Anyone can submit companies" on pending_companies;
drop policy if exists "Anyone can submit reviews" on pending_reviews;

-- Add user_id to pending tables for tracking
alter table pending_companies add column user_id uuid references auth.users(id);

create policy "Authenticated users can submit companies" on pending_companies
  for insert with check (auth.uid() is not null);

create policy "Authenticated users can submit reviews" on pending_reviews
  for insert with check (auth.uid() is not null);
