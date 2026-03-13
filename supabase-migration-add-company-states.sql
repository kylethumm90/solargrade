-- Migration: Add company_states junction table for state coverage
-- Run this in the Supabase SQL Editor

-- Junction table: which states each company serves
create table company_states (
  company_id uuid references companies(id) on delete cascade,
  state text not null,
  primary key (company_id, state)
);

-- Enable RLS
alter table company_states enable row level security;

-- Public read access
create policy "Public can read company_states" on company_states for select using (true);

-- Public insert (for company submission)
create policy "Anyone can insert company_states" on company_states for insert with check (true);

-- Admin operations
create policy "Anyone can update company_states" on company_states for update using (true) with check (true);
create policy "Anyone can delete company_states" on company_states for delete using (true);

-- Index for fast lookups by state
create index idx_company_states_state on company_states(state);
create index idx_company_states_company_id on company_states(company_id);
