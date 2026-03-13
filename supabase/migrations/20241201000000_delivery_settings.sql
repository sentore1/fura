-- Create delivery_settings table
CREATE TABLE IF NOT EXISTS delivery_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  base_fee INTEGER NOT NULL DEFAULT 3000,
  additional_km_fee INTEGER NOT NULL DEFAULT 2000,
  free_distance_km DECIMAL(3,1) NOT NULL DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default values
INSERT INTO delivery_settings (id, base_fee, additional_km_fee, free_distance_km)
VALUES (1, 3000, 2000, 1.0)
ON CONFLICT (id) DO NOTHING;

-- Add RLS policy
ALTER TABLE delivery_settings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read settings
CREATE POLICY "Allow authenticated users to read delivery settings" ON delivery_settings
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to update settings (for admin)
CREATE POLICY "Allow authenticated users to update delivery settings" ON delivery_settings
  FOR ALL TO authenticated USING (true);