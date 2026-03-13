-- Migration: Add 'salesorgs' to the category check constraint on the companies table
-- Run this in the Supabase SQL Editor

-- Drop the existing constraint
alter table companies drop constraint vendors_category_check;

-- Re-create it with 'salesorgs' included
alter table companies add constraint vendors_category_check
  check (category in ('installers', 'leads', 'crm', 'callcenter', 'financing', 'software', 'salesorgs'));
