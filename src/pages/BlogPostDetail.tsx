import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User as UserIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface BlogPostData {
  id: string;
  user_id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  menu_item_id: string | null;
  created_at: string;
}

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [profile, setProfile] = useState<{ username: string | null; avatar_url: string | null } | null>(null);
  const [menuItem, setMenuItem] = useState<{ name: string; emoji: string; slug: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await supabase.from('blog_posts').select('*').eq('id', id).maybeSingle();
      if (!data) { setLoading(false); return; }
      setPost(data);

      const [{ data: prof }, { data: mi }] = await Promise.all([
        supabase.from('profiles').select('username, avatar_url').eq('user_id', data.user_id).maybeSingle(),
        data.menu_item_id
          ? supabase.from('menu_items').select('name, emoji, slug').eq('id', data.menu_item_id).maybeSingle()
          : Promise.resolve({ data: null }),
      ]);
      setProfile(prof || { username: null, avatar_url: null });
      setMenuItem(mi || null);
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleDelete = async () => {
    if (!post) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', post.id);
    if (error) { toast.error('Failed to delete post'); return; }
    toast.success('Post deleted');
    navigate('/blog');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="h-8 w-48 bg-muted rounded-full animate-pulse" />
            <div className="h-64 bg-muted rounded-3xl animate-pulse" />
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-16 text-center space-y-4">
          <p className="text-6xl">😢</p>
          <p className="font-fredoka text-xl text-muted-foreground">Post not found</p>
          <Link to="/blog"><Button variant="outline" className="rounded-full font-fredoka">Back to Blog</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 space-y-8">
        <button onClick={() => navigate('/blog')} className="flex items-center gap-2 font-quicksand text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </button>

        <article className="max-w-2xl mx-auto space-y-6">
          {/* Image */}
          {post.image_url && (
            <div className="rounded-3xl overflow-hidden shadow-card">
              <img src={post.image_url} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
            </div>
          )}

          {/* Title & Meta */}
          <div className="space-y-3">
            {menuItem && (
              <Link to={`/menu/${menuItem.slug}`} className="inline-block text-sm font-quicksand font-semibold text-primary hover:underline">
                {menuItem.emoji} {menuItem.name}
              </Link>
            )}
            <h1 className="font-fredoka text-3xl md:text-4xl text-foreground">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-quicksand">
              <span className="flex items-center gap-1"><UserIcon className="h-4 w-4" /> {profile?.username || 'Food Lover'}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Content */}
          <div className="font-quicksand text-foreground/90 leading-relaxed whitespace-pre-wrap text-base">
            {post.content}
          </div>

          {/* Delete if owner */}
          {user?.id === post.user_id && (
            <div className="pt-4 border-t border-border/30">
              <Button variant="destructive" size="sm" className="rounded-full gap-2" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" /> Delete Post
              </Button>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostDetail;
