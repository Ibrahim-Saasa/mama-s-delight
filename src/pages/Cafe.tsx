import backgroundPattern from '@/assets/background-pattern.png';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import { Coffee, CupSoda, Leaf } from 'lucide-react';
import { useMenuItems } from '@/hooks/useMenuItems';
import { cn } from '@/lib/utils';

const cafeCategories = [
  { id: 'all', label: 'All', icon: '☕' },
  { id: 'coffee', label: 'Coffee', icon: '☕' },
  { id: 'tea', label: 'Tea & Chai', icon: '🫖' },
  { id: 'specialty', label: 'Specialty', icon: '✨' },
];

const coffeeItems = ['classic-espresso', 'cappuccino', 'cafe-latte', 'iced-americano', 'caramel-macchiato', 'mocha', 'turkish-coffee', 'dalgona-coffee', 'affogato'];
const teaItems = ['karak-chai', 'masala-chai', 'mint-green-tea', 'matcha-latte'];
const specialtyItems = ['saffron-latte', 'hot-chocolate', 'iced-rose-lemonade'];

import { useState } from 'react';

const Cafe = () => {
  const { menuItems, loading } = useMenuItems();
  const [activeCategory, setActiveCategory] = useState('all');

  const cafeItems = menuItems.filter(item => item.category === 'cafe');

  const filteredItems = cafeItems.filter(item => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'coffee') return coffeeItems.includes(item.slug || '');
    if (activeCategory === 'tea') return teaItems.includes(item.slug || '');
    if (activeCategory === 'specialty') return specialtyItems.includes(item.slug || '');
    return true;
  });

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <div className="fixed inset-0 bg-background/60 pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main className="pt-28 pb-20">
          {/* Hero Section */}
          <div className="container mx-auto px-4 text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-accent/20 border border-accent/30">
              <Coffee className="w-5 h-5 text-accent-foreground" />
              <span className="font-quicksand font-semibold text-sm text-accent-foreground">Now Brewing</span>
            </div>
            <h1 className="font-fredoka text-5xl md:text-6xl text-shimmer mb-4 flex items-center justify-center gap-3">
              Our Café <span className="text-4xl md:text-5xl">☕</span>
            </h1>
            <p className="font-quicksand text-lg text-muted-foreground max-w-2xl mx-auto">
              From bold espressos to soothing karak chai — every sip tells a story. Brewed with love! 💕
            </p>
          </div>

          {/* Category Filter */}
          <div className="container mx-auto px-4 mb-10">
            <div className="flex flex-wrap justify-center gap-3">
              {cafeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'font-quicksand font-semibold px-5 py-2.5 rounded-full transition-all duration-300',
                    'border-2 text-sm',
                    activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                      : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-primary'
                  )}
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Items Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="container mx-auto px-4">
              {filteredItems.length === 0 ? (
                <p className="text-center font-quicksand text-muted-foreground py-12">
                  No items found in this category yet! ☕
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredItems.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      emoji={item.emoji}
                      isSpicy={item.is_spicy}
                      isVegetarian={item.is_vegetarian}
                      slug={item.slug}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Cafe;
