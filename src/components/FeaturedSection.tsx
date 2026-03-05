import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import LemonButton from './LemonButton';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const featuredItems = [
  {
    name: 'Mama\'s Pancakes',
    description: 'Fluffy stacks of joy drizzled with love (and maple syrup)!',
    pun: 'Flippin\' delicious!',
    price: '₹12.99',
    emoji: '🥞',
  },
  {
    name: 'Cozy Cupcakes',
    description: 'Frosted dreams in every bite. Warning: May cause happiness.',
    pun: 'Life is what you bake it!',
    price: '₹4.99',
    emoji: '🧁',
  },
  {
    name: 'Sunshine Lemonade',
    description: 'When life gives you lemons, we make this liquid gold!',
    pun: 'Sip happens!',
    price: '₹6.99',
    emoji: '🍋',
  },
  {
    name: 'Dumpling Dreams',
    description: 'Little pockets of heaven, steamed to perfection.',
    pun: 'Dim sum-thing special!',
    price: '₹14.99',
    emoji: '🥟',
  },
  {
    name: 'Berry Bliss Smoothie',
    description: 'A burst of berries blended to perfection!',
    pun: 'Berry nice to meet you!',
    price: '₹8.99',
    emoji: '🍓',
  },
  {
    name: 'Honey Toast',
    description: 'Crispy bread drizzled with golden honey goodness.',
    pun: 'Honey, I\'m home!',
    price: '₹9.99',
    emoji: '🍯',
  },
];

const FeaturedSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 1 },
      }
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-gradient-card relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-fredoka text-4xl md:text-5xl text-gradient-pink mb-4 flex items-center justify-center gap-3">
            Today's Specials! <Sparkles className="w-10 h-10 text-accent animate-pulse" />
          </h2>
          <p className="font-quicksand text-lg text-muted-foreground max-w-xl mx-auto">
            Hand-picked goodies that'll make your taste buds dance. <span className="font-semibold text-primary">You butter believe it!</span>
          </p>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <button
            onClick={scrollPrev}
            className="p-3 rounded-full bg-card shadow-soft border border-primary/20 hover:bg-primary/10 hover:shadow-glow-pink transition-all duration-300 group"
            aria-label="Previous items"
          >
            <ChevronLeft className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={scrollNext}
            className="p-3 rounded-full bg-card shadow-soft border border-primary/20 hover:bg-primary/10 hover:shadow-glow-pink transition-all duration-300 group"
            aria-label="Next items"
          >
            <ChevronRight className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Featured Carousel */}
        <div className="overflow-visible py-16" ref={emblaRef}>
          <div className="flex touch-pan-y -ml-6">
            {featuredItems.map((item, index) => (
              <div
                key={item.name}
                className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_45%] lg:flex-[0_0_25%] pl-6"
              >
                <div
                  className={cn(
                    'relative bg-card rounded-3xl p-6 shadow-card flex flex-col h-full',
                    'transition-all duration-500 cursor-pointer',
                    'hover:shadow-glow-pink hover:-translate-y-3 hover:scale-[1.02]'
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Pun tooltip */}
                  <div
                    className={cn(
                      'absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full',
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
                  <p className="font-quicksand text-sm text-muted-foreground text-center mb-4 flex-grow">
                    {item.description}
                  </p>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <span className="font-fredoka text-2xl text-gradient-accent">
                      {item.price}
                    </span>
                    <button className="btn-teacup text-sm px-4 py-2">
                      Add 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {featuredItems.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                selectedIndex === index 
                  ? 'bg-primary w-8 shadow-glow-pink' 
                  : 'bg-primary/30 hover:bg-primary/50'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <LemonButton size="lg" onClick={() => navigate('/menu')}>
            See Full Menu 🍽️
          </LemonButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
