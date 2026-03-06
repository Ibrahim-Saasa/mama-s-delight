import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MenuItemDetail {
  id: string;
  name: string;
  description: string;
  long_description: string | null;
  price: number;
  emoji: string;
  category: string;
  is_spicy: boolean;
  is_vegetarian: boolean;
  image_url: string | null;
  ingredients: string[];
  preparation: string | null;
  fun_fact: string | null;
  slug: string | null;
}

export interface Review {
  id: string;
  menu_item_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profile?: { username: string | null; avatar_url: string | null };
}

export const useMenuItemDetail = (slug: string | undefined) => {
  const [item, setItem] = useState<MenuItemDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchItem = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching menu item:', error);
        setLoading(false);
        return;
      }

      setItem(data as MenuItemDetail | null);

      if (data) {
        // Fetch reviews separately, then enrich with profiles
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('*')
          .eq('menu_item_id', data.id)
          .order('created_at', { ascending: false });

        if (reviewsData && reviewsData.length > 0) {
          // Get unique user IDs
          const userIds = [...new Set(reviewsData.map(r => r.user_id))];
          const { data: profiles } = await supabase
            .from('profiles')
            .select('user_id, username, avatar_url')
            .in('user_id', userIds);

          const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

          const enriched = reviewsData.map(r => ({
            ...r,
            profile: profileMap.get(r.user_id) || { username: null, avatar_url: null },
          }));
          setReviews(enriched as Review[]);
        } else {
          setReviews([]);
        }
      }

      setLoading(false);
    };

    fetchItem();
  }, [slug]);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return { item, reviews, loading, averageRating, refetchReviews: () => {} };
};
