
-- Create data_assets table
CREATE TABLE IF NOT EXISTS public.data_assets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    type text NOT NULL,
    domain text NOT NULL,
    classification text[] NOT NULL,
    cloud_platform text NOT NULL,
    owner_id uuid REFERENCES auth.users(id),
    owner_name text,
    last_updated timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.data_assets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow users to view all data assets" 
ON public.data_assets 
FOR SELECT 
USING (true);

CREATE POLICY "Allow users to insert their own data assets" 
ON public.data_assets 
FOR INSERT 
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Allow users to update their own data assets" 
ON public.data_assets 
FOR UPDATE 
USING (auth.uid() = owner_id);

CREATE POLICY "Allow users to delete their own data assets" 
ON public.data_assets 
FOR DELETE 
USING (auth.uid() = owner_id);
