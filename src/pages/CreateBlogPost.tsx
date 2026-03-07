import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useMenuItems } from '@/hooks/useMenuItems';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner';

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { menuItems } = useMenuItems();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [menuItemId, setMenuItemId] = useState<string>('none');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.from('blog_posts').insert({
      user_id: user.id,
      title: title.trim(),
      excerpt: excerpt.trim() || content.trim().slice(0, 150) + '...',
      content: content.trim(),
      image_url: imageUrl.trim() || null,
      menu_item_id: menuItemId !== 'none' ? menuItemId : null,
    }).select('id').single();

    setSubmitting(false);
    if (error) { toast.error('Failed to publish post'); return; }
    toast.success('Post published! 🎉');
    navigate(`/blog/${data.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 space-y-8">
        <button onClick={() => navigate('/blog')} className="flex items-center gap-2 font-quicksand text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </button>

        <div className="max-w-2xl mx-auto">
          <h1 className="font-fredoka text-3xl text-foreground mb-8">✍️ Write a Food Story</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-fredoka">Title</Label>
              <Input
                id="title"
                placeholder="My Amazing Butter Chicken Experience..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="rounded-2xl font-quicksand"
                maxLength={200}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="font-fredoka">Short Preview (optional)</Label>
              <Input
                id="excerpt"
                placeholder="A brief teaser for the blog card..."
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                className="rounded-2xl font-quicksand"
                maxLength={300}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="menuItem" className="font-fredoka">Related Dish (optional)</Label>
              <Select value={menuItemId} onValueChange={setMenuItemId}>
                <SelectTrigger className="rounded-2xl font-quicksand">
                  <SelectValue placeholder="Link to a menu item..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {menuItems.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.emoji} {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="font-fredoka">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/my-food-photo.jpg"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="rounded-2xl font-quicksand"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="font-fredoka">Your Story</Label>
              <Textarea
                id="content"
                placeholder="Share your experience, recipe, tips, or story about this dish..."
                value={content}
                onChange={e => setContent(e.target.value)}
                className="rounded-2xl font-quicksand min-h-[250px]"
                required
              />
            </div>

            <Button type="submit" disabled={submitting} className="rounded-full font-fredoka text-lg px-8 py-5 gap-2 w-full">
              <Send className="h-5 w-5" /> {submitting ? 'Publishing...' : 'Publish Story'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateBlogPost;
