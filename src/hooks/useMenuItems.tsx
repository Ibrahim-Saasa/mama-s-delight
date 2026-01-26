import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: string;
  is_spicy: boolean;
  is_vegetarian: boolean;
}

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('category', { ascending: true });

        if (error) throw error;

        setMenuItems(data || []);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching menu items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const getItemsByCategory = (category: string) => {
    return menuItems.filter(item => item.category === category);
  };

  return { menuItems, loading, error, getItemsByCategory };
};
