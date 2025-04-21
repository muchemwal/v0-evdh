
import { createClient } from '@supabase/supabase-js';

// Get URL and anon key from environment variables or use the direct values
// since we now have the project connected
const supabaseUrl = "https://nsocsvrphyrmdhifhyie.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zb2NzdnJwaHlybWRoaWZoeWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzUyODIsImV4cCI6MjA2MDY1MTI4Mn0.sgJgkzI1GZ8V2fhObdzDHRPTc5qwjMC18HrTLvwm2h8";

// Create and export the supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SQL to create necessary tables in Supabase:
/*
-- Schema changes tracking
create table schema_changes (
  id uuid default uuid_generate_v4() primary key,
  connector_id uuid references connectors(id),
  connector_name text not null,
  changes_count int not null,
  changes jsonb not null,
  detected_at timestamp with time zone default now()
);

-- Data classifications
create table data_classifications (
  id uuid default uuid_generate_v4() primary key,
  connector_id uuid references connectors(id),
  field_name text not null,
  field_type text not null,
  classification text not null,
  confidence float not null,
  created_at timestamp with time zone default now()
);

-- Connectors metadata
create table connectors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text not null,
  description text,
  connection_details jsonb not null,
  status text not null default 'inactive',
  last_sync timestamp with time zone,
  sync_frequency text,
  tags text[],
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table schema_changes enable row level security;
alter table data_classifications enable row level security;
alter table connectors enable row level security;

-- Create RLS policies
create policy "Public read access"
  on schema_changes for select
  using (true);

create policy "Public read access"
  on data_classifications for select
  using (true);

create policy "Public read access"
  on connectors for select
  using (true);
*/
