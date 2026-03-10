import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cuisineDetails } from '@/data/cuisineDetails';

export interface SearchResult {
  id: string;
  type: 'menu' | 'blog' | 'cuisine';
  title: string;
  subtitle: string;
  path: string;
  emoji?: string;
}

export const useSearch = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        // Cuisine matches (local)
        const cuisineResults: SearchResult[] = cuisineDetails
          .filter(c => c.name.toLowerCase().includes(trimmed.toLowerCase()))
          .map(c => ({
            id: c.slug,
            type: 'cuisine' as const,
            title: c.name,
            subtitle: c.tagline,
            path: `/cuisines/${c.slug}`,
          }));

        // Menu items + blog posts in parallel
        const [menuRes, blogRes] = await Promise.all([
          supabase
            .from('menu_items')
            .select('id, name, category, emoji, slug')
            .ilike('name', `%${trimmed}%`)
            .limit(5),
          supabase
            .from('blog_posts')
            .select('id, title, excerpt')
            .ilike('title', `%${trimmed}%`)
            .limit(5),
        ]);

        const menuResults: SearchResult[] = (menuRes.data ?? []).map(item => ({
          id: item.id,
          type: 'menu' as const,
          title: item.name,
          subtitle: item.category,
          path: item.slug ? `/menu/${item.slug}` : `/menu/${item.id}`,
          emoji: item.emoji,
        }));

        const blogResults: SearchResult[] = (blogRes.data ?? []).map(post => ({
          id: post.id,
          type: 'blog' as const,
          title: post.title,
          subtitle: post.excerpt.slice(0, 60) + '…',
          path: `/blog/${post.id}`,
        }));

        setResults([...menuResults, ...cuisineResults.slice(0, 3), ...blogResults]);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  return { results, loading };
};
