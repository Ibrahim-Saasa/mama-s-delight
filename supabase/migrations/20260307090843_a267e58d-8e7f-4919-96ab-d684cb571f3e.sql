
-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Everyone can read blog posts
CREATE POLICY "Blog posts are publicly readable"
  ON public.blog_posts FOR SELECT
  USING (true);

-- Authenticated users can create their own posts
CREATE POLICY "Users can insert their own blog posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users can update their own blog posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete their own blog posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Update trigger
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
