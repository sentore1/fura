-- Services table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price_rwf INTEGER NOT NULL,
    description TEXT,
    garment_type TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    pickup_address TEXT,
    delivery_address TEXT,
    special_instructions TEXT,
    pickup_date DATE,
    pickup_time TEXT,
    is_express BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'pending_approval',
    total_amount INTEGER DEFAULT 0,
    payment_method TEXT DEFAULT 'momo',
    payment_status TEXT DEFAULT 'pending',
    admin_notes TEXT,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id),
    service_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_price INTEGER NOT NULL,
    subtotal INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blocked time slots
CREATE TABLE IF NOT EXISTS public.blocked_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blocked_date DATE NOT NULL,
    blocked_time TEXT,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed services data
INSERT INTO public.services (name, category, price_rwf, description, garment_type) VALUES
-- Wash & Fold
('Wash & Fold - Small Load', 'wash_fold', 3000, 'Up to 3kg of mixed clothing', 'mixed'),
('Wash & Fold - Medium Load', 'wash_fold', 5000, 'Up to 6kg of mixed clothing', 'mixed'),
('Wash & Fold - Large Load', 'wash_fold', 8000, 'Up to 10kg of mixed clothing', 'mixed'),
-- Wash & Iron Per Item
('Shirt/Blouse', 'wash_iron', 1000, 'Professional wash and iron', 'tops'),
('Trousers/Pants', 'wash_iron', 1200, 'Professional wash and iron', 'bottoms'),
('Dress', 'wash_iron', 1500, 'Professional wash and iron', 'dresses'),
('Suit (2-piece)', 'wash_iron', 3500, 'Professional wash and iron', 'formal'),
('Suit (3-piece)', 'wash_iron', 4500, 'Professional wash and iron', 'formal'),
('Jacket/Blazer', 'wash_iron', 2500, 'Professional wash and iron', 'outerwear'),
('Coat', 'wash_iron', 3000, 'Professional wash and iron', 'outerwear'),
('T-Shirt', 'wash_iron', 800, 'Professional wash and iron', 'tops'),
('Jeans', 'wash_iron', 1500, 'Professional wash and iron', 'bottoms'),
('Skirt', 'wash_iron', 1200, 'Professional wash and iron', 'bottoms'),
('Sweater/Pullover', 'wash_iron', 1500, 'Professional wash and iron', 'tops'),
-- Iron Only
('Shirt/Blouse (Iron)', 'iron_only', 500, 'Professional ironing only', 'tops'),
('Trousers/Pants (Iron)', 'iron_only', 600, 'Professional ironing only', 'bottoms'),
('Dress (Iron)', 'iron_only', 800, 'Professional ironing only', 'dresses'),
('Suit (Iron)', 'iron_only', 1500, 'Professional ironing only', 'formal'),
('T-Shirt (Iron)', 'iron_only', 400, 'Professional ironing only', 'tops'),
('Skirt (Iron)', 'iron_only', 600, 'Professional ironing only', 'bottoms'),
-- Specialty
('Wedding Dress', 'specialty', 15000, 'Delicate cleaning for wedding dresses', 'specialty'),
('Carpet (Small)', 'specialty', 5000, 'Up to 2x3m carpet cleaning', 'home'),
('Carpet (Large)', 'specialty', 10000, 'Up to 3x4m carpet cleaning', 'home'),
('Curtains (per panel)', 'specialty', 2000, 'Curtain washing and pressing', 'home'),
('Duvet/Comforter', 'specialty', 4000, 'Duvet and comforter cleaning', 'bedding'),
('Bed Sheet Set', 'specialty', 2500, 'Full bed sheet set wash and press', 'bedding')
ON CONFLICT DO NOTHING;

-- Enable realtime for orders
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_items;
