import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { cuisineDetails } from '@/data/cuisineDetails';

const CuisinesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="font-fredoka text-4xl md:text-5xl text-gradient-pink mb-4 flex items-center justify-center gap-3">
          Explore World Flavors! 
          <Globe className="inline-block w-10 h-10 md:w-12 md:h-12 text-accent animate-spin" style={{ animationDuration: '8s' }} />
        </h2>
        <p className="font-quicksand text-lg text-muted-foreground max-w-xl mx-auto">
          From dumplings to tacos, we've got your cravings covered. <span className="font-semibold text-primary">Stir-crazy good!</span>
        </p>
      </div>

      {/* Cuisine Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {cuisineDetails.map((cuisine, index) => (
            <Link
              key={cuisine.slug}
              to={`/cuisine/${cuisine.slug}`}
              className="relative group cursor-pointer block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Pun tooltip */}
              <div
                className={cn(
                  'absolute -top-14 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full',
                  'font-fredoka text-base whitespace-nowrap z-20',
                  'bg-accent text-accent-foreground shadow-glow-yellow',
                  'transition-all duration-300 transform',
                  hoveredIndex === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'
                )}
              >
                {cuisine.tagline} ✨
              </div>

              {/* Cuisine Image Card */}
              <div 
                className={cn(
                  'relative w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden',
                  'transition-all duration-500',
                  'group-hover:scale-105 group-hover:-translate-y-2'
                )}
              >
                <img 
                  src={cuisine.image}
                  alt={`${cuisine.name} cuisine`}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Quick Fun Fact */}
              <p className="font-quicksand text-sm text-muted-foreground text-center mt-3 max-w-56 md:max-w-64 mx-auto leading-snug">
                {cuisine.quickFact}
              </p>

              {/* Name badge on hover */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <span className="font-fredoka text-lg font-semibold text-primary-foreground bg-primary px-6 py-2 rounded-full shadow-soft whitespace-nowrap">
                  Explore {cuisine.name}!
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuisinesSection;
