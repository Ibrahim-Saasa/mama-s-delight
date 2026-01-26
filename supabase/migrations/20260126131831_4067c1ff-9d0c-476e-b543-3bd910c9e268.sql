-- Create menu_items table to store all menu items
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  emoji TEXT NOT NULL,
  category TEXT NOT NULL,
  is_spicy BOOLEAN DEFAULT false,
  is_vegetarian BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on menu_items (public read)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Anyone can view menu items
CREATE POLICY "Menu items are publicly readable"
ON public.menu_items
FOR SELECT
USING (true);

-- Create cart_items table for user carts
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, menu_item_id)
);

-- Enable RLS on cart_items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Users can only view their own cart items
CREATE POLICY "Users can view their own cart items"
ON public.cart_items
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own cart items
CREATE POLICY "Users can insert their own cart items"
ON public.cart_items
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart items
CREATE POLICY "Users can update their own cart items"
ON public.cart_items
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own cart items
CREATE POLICY "Users can delete their own cart items"
ON public.cart_items
FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_cart_items_updated_at
BEFORE UPDATE ON public.cart_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed menu items with all the dishes
INSERT INTO public.menu_items (name, description, price, emoji, category, is_spicy, is_vegetarian) VALUES
-- Chinese
('Kung Pao Chicken', 'Spicy stir-fried chicken with peanuts', 14.00, '🍗', 'chinese', true, false),
('Dim Sum Platter', 'Assorted steamed dumplings', 16.00, '🥟', 'chinese', false, false),
('Sweet & Sour Pork', 'Crispy pork in tangy sauce', 15.00, '🍖', 'chinese', false, false),
('Veggie Spring Rolls', 'Crispy rolls with fresh vegetables', 8.00, '🥢', 'chinese', false, true),
('Mapo Tofu', 'Silky tofu in spicy bean sauce', 12.00, '🍲', 'chinese', true, true),
-- Mexican
('Street Tacos', 'Three authentic corn tortilla tacos', 12.00, '🌮', 'mexican', false, false),
('Loaded Nachos', 'Chips with cheese, beans & jalapeños', 14.00, '🧀', 'mexican', true, false),
('Burrito Bowl', 'Rice, beans, and all the fixings', 13.00, '🥗', 'mexican', false, false),
('Churros', 'Cinnamon sugar fried dough', 7.00, '🍩', 'mexican', false, true),
('Guacamole Fresh', 'Made tableside with chips', 10.00, '🥑', 'mexican', false, true),
-- Indian
('Butter Chicken', 'Creamy tomato curry with tender chicken', 16.00, '🍛', 'indian', false, false),
('Samosa Trio', 'Crispy pastries with spiced potatoes', 8.00, '🥟', 'indian', false, true),
('Vindaloo', 'Fiery Goan-style curry', 17.00, '🔥', 'indian', true, false),
('Palak Paneer', 'Creamy spinach with cottage cheese', 14.00, '🧀', 'indian', false, true),
('Naan Basket', 'Assorted fresh-baked breads', 6.00, '🍞', 'indian', false, true),
-- Middle Eastern
('Falafel Wrap', 'Crispy chickpea balls in warm pita', 11.00, '🧆', 'middle-eastern', false, true),
('Shawarma Plate', 'Spiced meat with rice and salad', 15.00, '🥙', 'middle-eastern', false, false),
('Hummus Supreme', 'Creamy dip with olive oil drizzle', 9.00, '🫘', 'middle-eastern', false, true),
('Lamb Kofta', 'Grilled spiced lamb skewers', 18.00, '🍢', 'middle-eastern', true, false),
('Baklava', 'Honey-soaked phyllo pastry', 6.00, '🍯', 'middle-eastern', false, true),
-- Desserts
('Mochi Ice Cream', 'Japanese rice cake with ice cream', 8.00, '🍡', 'desserts', false, true),
('Churro Sundae', 'Warm churros with ice cream', 10.00, '🍨', 'desserts', false, true),
('Mango Sticky Rice', 'Thai coconut rice with fresh mango', 9.00, '🥭', 'desserts', false, true),
('Gulab Jamun', 'Rose-syrup soaked milk balls', 7.00, '🧁', 'desserts', false, true),
('Fortune Cookie Stack', 'Fresh-baked with custom fortunes', 5.00, '🥠', 'desserts', false, true),
-- Drinks
('Mango Lassi', 'Creamy yogurt mango smoothie', 5.00, '🥤', 'drinks', false, true),
('Thai Iced Tea', 'Sweet and creamy orange tea', 4.00, '🧋', 'drinks', false, true),
('Horchata', 'Sweet cinnamon rice milk', 4.00, '🥛', 'drinks', false, true),
('Mint Lemonade', 'Fresh mint with citrus', 4.00, '🍋', 'drinks', false, true),
('Vietnamese Coffee', 'Strong brew with condensed milk', 5.00, '☕', 'drinks', false, true);