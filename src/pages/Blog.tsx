import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PenLine, Clock, User as UserIcon, Heart, MessageCircle } from 'lucide-react';

interface BlogPost {
  id: string;
  user_id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  menu_item_id: string | null;
  created_at: string;
  profile?: { username: string | null; avatar_url: string | null };
  menu_item?: { name: string; emoji: string } | null;
  like_count: number;
  comment_count: number;
}

const Blog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: postsData } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsData && postsData.length > 0) {
        const postIds = postsData.map(p => p.id);
        const userIds = [...new Set(postsData.map(p => p.user_id))];
        const menuItemIds = postsData.map(p => p.menu_item_id).filter(Boolean) as string[];

        const [{ data: profiles }, { data: menuItems }, { data: likes }, { data: comments }] = await Promise.all([
          supabase.from('profiles').select('user_id, username, avatar_url').in('user_id', userIds),
          menuItemIds.length > 0
            ? supabase.from('menu_items').select('id, name, emoji').in('id', menuItemIds)
            : Promise.resolve({ data: [] }),
          supabase.from('blog_likes').select('blog_post_id').in('blog_post_id', postIds),
          supabase.from('blog_comments').select('blog_post_id').in('blog_post_id', postIds),
        ]);

        const profileMap = new Map((profiles || []).map(p => [p.user_id, p] as const));
        const menuMap = new Map((menuItems || []).map(m => [m.id, m] as const));

        // Count likes and comments per post
        const likeCountMap = new Map<string, number>();
        (likes || []).forEach(l => likeCountMap.set(l.blog_post_id, (likeCountMap.get(l.blog_post_id) || 0) + 1));
        const commentCountMap = new Map<string, number>();
        (comments || []).forEach(c => commentCountMap.set(c.blog_post_id, (commentCountMap.get(c.blog_post_id) || 0) + 1));

        setPosts(postsData.map(p => ({
          ...p,
          profile: profileMap.get(p.user_id) || { username: null, avatar_url: null },
          menu_item: p.menu_item_id ? (menuMap.get(p.menu_item_id) as { name: string; emoji: string } | undefined) || null : null,
          like_count: likeCountMap.get(p.id) || 0,
          comment_count: commentCountMap.get(p.id) || 0,
        })));
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="font-fredoka text-4xl md:text-5xl text-foreground">
            📝 Food Stories & Recipes
          </h1>
          <p className="font-quicksand text-muted-foreground text-lg max-w-xl mx-auto">
            Discover dishes, share your culinary adventures, and read what fellow foodies are cooking up!
          </p>
          {user && (
            <Link to="/blog/new">
              <Button className="rounded-full font-fredoka text-lg px-8 py-5 gap-2">
                <PenLine className="h-5 w-5" /> Write a Post
              </Button>
            </Link>
          )}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card rounded-3xl h-72 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-6xl">🍳</p>
            <p className="font-fredoka text-xl text-muted-foreground">No posts yet — be the first to share!</p>
            {!user && (
              <Link to="/auth">
                <Button variant="outline" className="rounded-full font-fredoka">Sign in to write</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <article className="bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow-pink hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
                  {/* Image / Emoji Header */}
                  <div className="h-44 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                    {post.image_url ? (
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="text-6xl">{post.menu_item?.emoji || '🍽️'}</span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    {post.menu_item && (
                      <span className="text-xs font-quicksand font-semibold text-primary mb-1">
                        {post.menu_item.emoji} {post.menu_item.name}
                      </span>
                    )}
                    <h2 className="font-fredoka text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="font-quicksand text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground font-quicksand">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <UserIcon className="h-3.5 w-3.5" />
                          {post.profile?.username || 'Food Lover'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5" /> {post.like_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" /> {post.comment_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
