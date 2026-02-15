-- Create holidays table
CREATE TABLE IF NOT EXISTS public.holidays (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 31),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(month, day)
);

-- Enable RLS
ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.holidays
  FOR SELECT USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to manage holidays" ON public.holidays
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert Rwanda holidays (recurring every year)
INSERT INTO public.holidays (name, month, day) VALUES
  ('New Year''s Day', 1, 1),
  ('National Heroes Day', 2, 1),
  ('Genocide Memorial Day', 4, 7),
  ('Genocide Memorial Day (Week)', 4, 13),
  ('Labour Day', 5, 1),
  ('Independence Day', 7, 1),
  ('Liberation Day', 7, 4),
  ('Assumption Day', 8, 15),
  ('Christmas Day', 12, 25),
  ('Boxing Day', 12, 26)
ON CONFLICT (month, day) DO NOTHING;
