-- Locations table
CREATE TABLE IF NOT EXISTS public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial location
INSERT INTO public.locations (name, address, phone, whatsapp) VALUES
('Main Branch', 'kn 4 St, Between Rwanda National Post Office and Hotel Pana Africa Kigali, Rwanda', '+250 784 649 169', '+250 784 649 169')
ON CONFLICT DO NOTHING;
