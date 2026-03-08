import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User as UserIcon, Trash2, Heart, MessageCircle, Send } from 'lucide-react';
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

interface Comment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: { username: string | null; avatar_url: string | null };
}

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [profile, setProfile] = useState<{ username: string | null; avatar_url: string | null } | null>(null);
  const [menuItem, setMenuItem] = useState<{ name: string; emoji: string; slug: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  // Likes state
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
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
    fetchPost();
  }, [id]);

  // Fetch likes & comments
  useEffect(() => {
    if (!id) return;
    const fetchLikesAndComments = async () => {
      const [{ count }, { data: commentsData }] = await Promise.all([
        supabase.from('blog_likes').select('*', { count: 'exact', head: true }).eq('blog_post_id', id),
        supabase.from('blog_comments').select('*').eq('blog_post_id', id).order('created_at', { ascending: true }),
      ]);
      setLikeCount(count || 0);

      if (user) {
        const { data: myLike } = await supabase.from('blog_likes').select('id').eq('blog_post_id', id).eq('user_id', user.id).maybeSingle();
        setHasLiked(!!myLike);
      }

      if (commentsData && commentsData.length > 0) {
        const userIds = [...new Set(commentsData.map(c => c.user_id))];
        const { data: profiles } = await supabase.from('profiles').select('user_id, username, avatar_url').in('user_id', userIds);
        const profileMap = new Map((profiles || []).map(p => [p.user_id, p] as const));
        setComments(commentsData.map(c => ({
          ...c,
          profile: profileMap.get(c.user_id) || { username: null, avatar_url: null },
        })));
      } else {
        setComments([]);
      }
    };
    fetchLikesAndComments();
  }, [id, user]);

  const toggleLike = async () => {
    if (!user) { toast.error('Sign in to like posts'); return; }
    if (!id || likeLoading) return;
    setLikeLoading(true);

    if (hasLiked) {
      await supabase.from('blog_likes').delete().eq('blog_post_id', id).eq('user_id', user.id);
      setHasLiked(false);
      setLikeCount(c => c - 1);
    } else {
      await supabase.from('blog_likes').insert({ blog_post_id: id, user_id: user.id });
      setHasLiked(true);
      setLikeCount(c => c + 1);
    }
    setLikeLoading(false);
  };

  const submitComment = async () => {
    if (!user) { toast.error('Sign in to comment'); return; }
    if (!id || !newComment.trim() || commentLoading) return;
    if (newComment.trim().length > 2000) { toast.error('Comment too long (max 2000 chars)'); return; }
    setCommentLoading(true);

    const { data, error } = await supabase.from('blog_comments').insert({
      blog_post_id: id,
      user_id: user.id,
      content: newComment.trim(),
    }).select().single();

    if (error) { toast.error('Failed to post comment'); setCommentLoading(false); return; }

    const { data: prof } = await supabase.from('profiles').select('user_id, username, avatar_url').eq('user_id', user.id).maybeSingle();
    setComments(prev => [...prev, { ...data, profile: prof || { username: null, avatar_url: null } }]);
    setNewComment('');
    setCommentLoading(false);
  };

  const deleteComment = async (commentId: string) => {
    const { error } = await supabase.from('blog_comments').delete().eq('id', commentId);
    if (error) { toast.error('Failed to delete comment'); return; }
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

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

          {/* Like & Comment Counts Bar */}
          <div className="flex items-center gap-6 pt-2 border-t border-border/30">
            <button
              onClick={toggleLike}
              disabled={likeLoading}
              className="flex items-center gap-2 font-quicksand text-sm transition-colors hover:text-primary disabled:opacity-50"
            >
              <Heart className={`h-5 w-5 transition-all ${hasLiked ? 'fill-primary text-primary scale-110' : 'text-muted-foreground'}`} />
              <span className={hasLiked ? 'text-primary font-semibold' : 'text-muted-foreground'}>{likeCount}</span>
            </button>
            <span className="flex items-center gap-2 text-sm text-muted-foreground font-quicksand">
              <MessageCircle className="h-5 w-5" /> {comments.length}
            </span>
          </div>

          {/* Delete if owner */}
          {user?.id === post.user_id && (
            <div className="pt-2 border-t border-border/30">
              <Button variant="destructive" size="sm" className="rounded-full gap-2" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" /> Delete Post
              </Button>
            </div>
          )}

          {/* Comments Section */}
          <div className="pt-4 border-t border-border/30 space-y-6">
            <h2 className="font-fredoka text-xl text-foreground flex items-center gap-2">
              💬 Comments ({comments.length})
            </h2>

            {/* Add Comment */}
            {user ? (
              <div className="flex gap-3">
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    maxLength={2000}
                    className="w-full rounded-2xl border border-border/50 bg-card p-3 font-quicksand text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px]"
                  />
                </div>
                <Button
                  onClick={submitComment}
                  disabled={!newComment.trim() || commentLoading}
                  size="icon"
                  className="rounded-full self-end h-10 w-10 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="rounded-full font-fredoka text-sm">Sign in to comment</Button>
              </Link>
            )}

            {/* Comments List */}
            {comments.length === 0 ? (
              <p className="text-sm text-muted-foreground font-quicksand text-center py-6">No comments yet — be the first! 🍽️</p>
            ) : (
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="bg-card rounded-2xl p-4 space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-quicksand">
                        {comment.profile?.avatar_url ? (
                          <img src={comment.profile.avatar_url} alt="" className="h-6 w-6 rounded-full object-cover" />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <UserIcon className="h-3 w-3 text-primary" />
                          </div>
                        )}
                        <span className="font-semibold text-foreground">{comment.profile?.username || 'Food Lover'}</span>
                        <span className="text-muted-foreground text-xs">{new Date(comment.created_at).toLocaleDateString()}</span>
                      </div>
                      {user?.id === comment.user_id && (
                        <button onClick={() => deleteComment(comment.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="font-quicksand text-sm text-foreground/90 whitespace-pre-wrap">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostDetail;
