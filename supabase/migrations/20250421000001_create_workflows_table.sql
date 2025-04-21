
-- Create workflows table
CREATE TABLE IF NOT EXISTS public.workflows (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    status text NOT NULL,
    owner_id uuid REFERENCES auth.users(id),
    owner_name text,
    created_at timestamp with time zone DEFAULT now(),
    due_date timestamp with time zone,
    asset_id uuid REFERENCES public.data_assets(id),
    workflow_type text NOT NULL
);

-- Enable RLS
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow users to view all workflows" 
ON public.workflows 
FOR SELECT 
USING (true);

CREATE POLICY "Allow users to insert their own workflows" 
ON public.workflows 
FOR INSERT 
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Allow users to update their own workflows" 
ON public.workflows 
FOR UPDATE 
USING (auth.uid() = owner_id);

CREATE POLICY "Allow users to delete their own workflows" 
ON public.workflows 
FOR DELETE 
USING (auth.uid() = owner_id);
