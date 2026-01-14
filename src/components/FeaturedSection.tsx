import { useState } from 'react';
import { cn } from '@/lib/utils';
import LemonButton from './LemonButton';

const featuredItems = [
  {
    name: 'Mama\'s Pancakes',
    description: 'Fluffy stacks of joy drizzled with love (and maple syrup)!',
    pun: 'Flippin\' delicious!',
    price: '$12.99',
    emoji: '🥞',
  },
  {
    name: 'Cozy Cupcakes',
    description: 'Frosted dreams in every bite. Warning: May cause happiness.',
    pun: 'Life is what you bake it!',
    price: '$4.99',
    emoji: '🧁',
  },
  {
    name: 'Sunshine Lemonade',
    description: 'When life gives you lemons, we make this liquid gold!',
    pun: 'Sip happens!',
    price: '$6.99',
    emoji: '🍋',
  },
  {
    name: 'Dumpling Dreams',
    description: 'Little pockets of heaven, steamed to perfection.',
    pun: 'Dim sum-thing special!',
    price: '$14.99',
    emoji: '🥟',
  },
];

const FeaturedSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-card relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-fredoka text-4xl md:text-5xl text-gradient-pink mb-4">
            Today's Specials! 🌟
          </h2>
          <p className="font-quicksand text-lg text-muted-foreground max-w-xl mx-auto">
            Hand-picked goodies that'll make your taste buds dance. <span className="font-semibold text-primary">You butter believe it!</span>
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item, index) => (
            <div
              key={item.name}
              className={cn(
                'relative bg-card rounded-3xl p-6 shadow-card',
                'transition-all duration-500 cursor-pointer',
                'hover:shadow-glow-pink hover:-translate-y-3'
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Pun tooltip */}
              <div
                className={cn(
                  'absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full',
                  'font-fredoka text-sm whitespace-nowrap z-20',
                  'bg-accent text-accent-foreground shadow-glow-yellow',
                  'transition-all duration-300 transform',
                  hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                )}
              >
                {item.pun} ✨
              </div>

              {/* Emoji Icon */}
              <div className="text-6xl mb-4 text-center animate-float" style={{ animationDelay: `${index * 200}ms` }}>
                {item.emoji}
              </div>

              {/* Content */}
              <h3 className="font-fredoka text-xl text-center text-foreground mb-2">
                {item.name}
              </h3>
              <p className="font-quicksand text-sm text-muted-foreground text-center mb-4">
                {item.description}
              </p>

              {/* Price & CTA */}
              <div className="flex items-center justify-between mt-auto">
                <span className="font-fredoka text-2xl text-gradient-accent">
                  {item.price}
                </span>
                <button className="btn-teacup text-sm px-4 py-2">
                  Add 🛒
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <LemonButton size="lg">
            See Full Menu 🍽️
          </LemonButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
