import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMenuItemDetail } from '@/hooks/useMenuItemDetail';
import { useMenuItems } from '@/hooks/useMenuItems';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import MenuItemCard from '@/components/MenuItemCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Star, ShoppingCart, Flame, Leaf, Lightbulb, ChefHat, Sparkles, Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Static image imports for items that have generated images
import butterChickenImg from '@/assets/food/butter-chicken.jpg';
import dimSumImg from '@/assets/food/dim-sum-platter.jpg';
import streetTacosImg from '@/assets/food/street-tacos.jpg';
import shawarmaImg from '@/assets/food/shawarma-plate.jpg';
import mochiImg from '@/assets/food/mochi-ice-cream.jpg';
import mangoLassiImg from '@/assets/food/mango-lassi.jpg';

const foodImages: Record<string, string> = {
  'butter-chicken': butterChickenImg,
  'dim-sum-platter': dimSumImg,
  'street-tacos': streetTacosImg,
  'shawarma-plate': shawarmaImg,
  'mochi-ice-cream': mochiImg,
  'mango-lassi': mangoLassiImg,
};

const categoryGradients: Record<string, string> = {
  chinese: 'from-red-500/20 to-amber-500/20',
  indian: 'from-orange-500/20 to-yellow-500/20',
  mexican: 'from-green-500/20 to-lime-500/20',
  'middle-eastern': 'from-amber-500/20 to-rose-500/20',
  desserts: 'from-pink-500/20 to-purple-500/20',
  drinks: 'from-cyan-500/20 to-blue-500/20',
};

const MenuItemDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { item, reviews, loading, averageRating } = useMenuItemDetail(slug);
  const { menuItems } = useMenuItems();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hoverStar, setHoverStar] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center pt-40">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-28 pb-16 text-center">
          <span className="text-7xl block mb-6">🤷</span>
          <h1 className="font-fredoka text-3xl text-foreground mb-4">Dish not found!</h1>
          <Button onClick={() => navigate('/menu')} className="rounded-full font-fredoka">
            Back to Menu
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const heroImage = slug ? foodImages[slug] : null;
  const gradient = categoryGradients[item.category] || 'from-primary/20 to-accent/20';

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error('Please sign in to leave a review');
      navigate('/auth');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('reviews').upsert(
      {
        menu_item_id: item.id,
        user_id: user.id,
        rating: reviewRating,
        comment: reviewComment || null,
      } as any,
      { onConflict: 'menu_item_id,user_id' }
    );
    if (error) {
      toast.error('Failed to submit review');
      console.error(error);
    } else {
      toast.success('Review submitted! ⭐');
      setReviewComment('');
      // Simple reload to refresh reviews
      window.location.reload();
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-5xl">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-quicksand"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Hero Section */}
        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${gradient} mb-8`}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image / Emoji side */}
            <div className="relative flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-[120px] md:text-[160px] select-none animate-wiggle">
                  {item.emoji}
                </div>
              )}
            </div>

            {/* Info side */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-quicksand font-semibold uppercase tracking-wider text-muted-foreground bg-background/50 px-3 py-1 rounded-full">
                  {item.category}
                </span>
                {item.is_spicy && (
                  <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-destructive/20 text-destructive font-quicksand">
                    <Flame className="h-3 w-3" /> Spicy
                  </span>
                )}
                {item.is_vegetarian && (
                  <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-600 font-quicksand">
                    <Leaf className="h-3 w-3" /> Veggie
                  </span>
                )}
              </div>

              <h1 className="font-fredoka text-4xl md:text-5xl text-foreground mb-2">
                {item.emoji} {item.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <span className="font-quicksand text-sm text-muted-foreground">
                  {averageRating > 0 ? `${averageRating.toFixed(1)} (${reviews.length} review${reviews.length !== 1 ? 's' : ''})` : 'No reviews yet'}
                </span>
              </div>

              <p className="font-quicksand text-muted-foreground mb-6 leading-relaxed">
                {item.long_description || item.description}
              </p>

              <div className="flex items-center gap-4">
                <span className="font-fredoka text-4xl text-primary">₹{item.price.toFixed(2)}</span>
                <Button
                  onClick={() => { addToCart(item.id); toast.success(`${item.name} added to cart! 🛒`); }}
                  className="rounded-full font-fredoka text-lg px-6 py-5"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="bg-card rounded-3xl p-6 border border-border/50 shadow-soft">
              <h2 className="font-fredoka text-xl text-foreground mb-4 flex items-center gap-2">
                <span className="text-2xl">🥘</span> Ingredients
              </h2>
              <ul className="space-y-2">
                {item.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 font-quicksand text-sm text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary/60 shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How It's Prepared */}
          {item.preparation && (
            <div className="bg-card rounded-3xl p-6 border border-border/50 shadow-soft">
              <h2 className="font-fredoka text-xl text-foreground mb-4 flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-primary" /> How It's Made
              </h2>
              <p className="font-quicksand text-sm text-muted-foreground leading-relaxed">
                {item.preparation}
              </p>
            </div>
          )}

          {/* Fun Fact */}
          {item.fun_fact && (
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl p-6 border border-primary/20 shadow-soft">
              <h2 className="font-fredoka text-xl text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-accent" /> Fun Fact
              </h2>
              <p className="font-quicksand text-sm text-muted-foreground leading-relaxed italic">
                "{item.fun_fact}"
              </p>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-card rounded-3xl p-6 md:p-8 border border-border/50 shadow-soft mb-8">
          <h2 className="font-fredoka text-2xl text-foreground mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" /> Reviews & Ratings
          </h2>

          {/* Write a Review */}
          <div className="bg-muted/30 rounded-2xl p-5 mb-6 border border-border/30">
            <h3 className="font-fredoka text-lg text-foreground mb-3">Leave a Review</h3>
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  onMouseEnter={() => setHoverStar(star)}
                  onMouseLeave={() => setHoverStar(0)}
                  className="transition-transform hover:scale-125"
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      star <= (hoverStar || reviewRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-quicksand text-sm text-muted-foreground">
                {reviewRating}/5
              </span>
            </div>
            <Textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Tell us what you think about this dish..."
              className="rounded-xl mb-3 min-h-[80px]"
            />
            <Button
              onClick={handleSubmitReview}
              disabled={submitting}
              className="rounded-full font-quicksand font-semibold"
            >
              <Send className="h-4 w-4 mr-2" />
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>

          {/* Review List */}
          {reviews.length === 0 ? (
            <p className="text-center text-muted-foreground font-quicksand py-8">
              No reviews yet. Be the first to share your thoughts! 🌟
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="flex gap-4 p-4 rounded-2xl bg-background/50 border border-border/30">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg shrink-0">
                    {review.profile?.avatar_url ? (
                      <img src={review.profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      '😋'
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-quicksand font-semibold text-sm text-foreground">
                        {review.profile?.username || 'Food Lover'}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/20'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="font-quicksand text-sm text-muted-foreground">{review.comment}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* You Might Also Like */}
        {item && (() => {
          const related = menuItems
            .filter(mi => mi.category === item.category && mi.id !== item.id)
            .slice(0, 4);
          if (related.length === 0) return null;
          return (
            <div>
              <h2 className="font-fredoka text-2xl text-foreground text-center mb-6">
                🍽️ You Might Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(ri => (
                  <MenuItemCard
                    key={ri.id}
                    id={ri.id}
                    name={ri.name}
                    description={ri.description}
                    price={ri.price}
                    emoji={ri.emoji}
                    isSpicy={ri.is_spicy}
                    isVegetarian={ri.is_vegetarian}
                    slug={ri.slug}
                  />
                ))}
              </div>
            </div>
          );
        })()}

        {/* Back to Menu CTA */}
        <div className="text-center mt-8">
          <Link to="/menu" className="mt-4">
            <Button variant="outline" className="rounded-full font-fredoka text-lg px-8 py-5">
              🍽️ Explore Full Menu
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuItemDetail;
