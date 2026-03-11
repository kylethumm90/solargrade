-- Migration: Add social media link fields to vendors table
-- Run this in the Supabase SQL Editor

alter table vendors add column if not exists facebook_url text;
alter table vendors add column if not exists instagram_url text;
alter table vendors add column if not exists linkedin_url text;
alter table vendors add column if not exists youtube_url text;
alter table vendors add column if not exists tiktok_url text;
alter table vendors add column if not exists twitter_url text;
alter table vendors add column if not exists website_url text;
