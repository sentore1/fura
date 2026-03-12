-- Enable RLS on slides table if not already enabled
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to insert slides" ON public.slides;
DROP POLICY IF EXISTS "Allow authenticated users to update slides" ON public.slides;
DROP POLICY IF EXISTS "Allow authenticated users to delete slides" ON public.slides;
DROP POLICY IF EXISTS "Allow public to view slides" ON public.slides;

-- Allow authenticated users to insert slides
CREATE POLICY "Allow authenticated users to insert slides" 
ON public.slides FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update slides
CREATE POLICY "Allow authenticated users to update slides" 
ON public.slides FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete slides
CREATE POLICY "Allow authenticated users to delete slides" 
ON public.slides FOR DELETE 
USING (auth.role() = 'authenticated');

-- Allow everyone to view slides (for public display)
CREATE POLICY "Allow public to view slides" 
ON public.slides FOR SELECT 
USING (true);