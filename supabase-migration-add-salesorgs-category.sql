-- Migration: Add 'salesorgs' to the category check constraint on the companies table
-- Run this in the Supabase SQL Editor

-- Step 1: Drop the existing constraint
alter table companies drop constraint vendors_category_check;

-- Step 2: Fix any rows with invalid category values (set them to a valid default)
update companies
set category = 'installers'
where category not in ('installers', 'leads', 'crm', 'callcenter', 'financing', 'software', 'salesorgs');

-- Step 3: Re-create the constraint with 'salesorgs' included
alter table companies add constraint vendors_category_check
  check (category in ('installers', 'leads', 'crm', 'callcenter', 'financing', 'software', 'salesorgs'));
