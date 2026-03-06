
-- Add extended fields to menu_items
ALTER TABLE public.menu_items 
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS long_description TEXT,
  ADD COLUMN IF NOT EXISTS ingredients TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS preparation TEXT,
  ADD COLUMN IF NOT EXISTS fun_fact TEXT,
  ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create unique index on slug
CREATE UNIQUE INDEX IF NOT EXISTS menu_items_slug_idx ON public.menu_items(slug);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(menu_item_id, user_id)
);

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Reviews policies
CREATE POLICY "Reviews are publicly readable" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert their own reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON public.reviews FOR DELETE TO authenticated USING (auth.uid() = user_id);
