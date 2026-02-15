-- Slides table for hero and carousel
CREATE TABLE IF NOT EXISTS public.slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('hero', 'carousel')),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default hero slides
INSERT INTO public.slides (image_url, type, display_order) VALUES
('/New folder/slide/35977.jpg', 'hero', 1),
('/New folder/slide/51763.jpg', 'hero', 2),
('/New folder/slide/53202.jpg', 'hero', 3);

-- Insert default carousel slides
INSERT INTO public.slides (image_url, type, display_order) VALUES
('/New folder/slide/35977.jpg', 'carousel', 1),
('/New folder/slide/51763.jpg', 'carousel', 2),
('/New folder/slide/53202.jpg', 'carousel', 3),
('/New folder/laundry/35977.jpg', 'carousel', 4),
('/New folder/laundry/51763.jpg', 'carousel', 5),
('/New folder/laundry/53202.jpg', 'carousel', 6),
('/New folder/ironning/170680750_10556978.png', 'carousel', 7),
('/New folder/ironning/405497144_aedb29a7-05ad-441a-a00d-1d128bc0ef7e-removebg-preview.png', 'carousel', 8),
('/New folder/ironning/405497202_d98b8013-a8a0-4604-8a0a-6864fed22e61-removebg-preview.png', 'carousel', 9);
