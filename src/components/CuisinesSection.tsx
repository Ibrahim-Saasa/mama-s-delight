import cuisineIcons from '@/assets/cuisine-icons.png';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const cuisines = [
  { 
    name: 'Chinese', 
    pun: 'Wok this way!', 
    position: 'left-0 top-0',
    bgPosition: '0% 0%'
  },
  { 
    name: 'Mexican', 
    pun: 'Taco \'bout flavor!', 
    position: 'right-0 top-0',
    bgPosition: '100% 0%'
  },
  { 
    name: 'Indian', 
    pun: 'Curry up & order!', 
    position: 'left-0 bottom-0',
    bgPosition: '0% 100%'
  },
  { 
    name: 'Middle Eastern', 
    pun: 'Falafel in love!', 
    position: 'right-0 bottom-0',
    bgPosition: '100% 100%'
  },
];

const CuisinesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="font-fredoka text-4xl md:text-5xl text-gradient-pink mb-4">
          Explore World Flavors! 🌍
        </h2>
        <p className="font-quicksand text-lg text-muted-foreground max-w-xl mx-auto">
          From dumplings to tacos, we've got your cravings covered. <span className="font-semibold text-primary">Stir-crazy good!</span>
        </p>
      </div>

      {/* Cuisine Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {cuisines.map((cuisine, index) => (
            <div
              key={cuisine.name}
              className="relative group cursor-pointer"
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
                {cuisine.pun} ✨
              </div>

              {/* Cuisine Image Card */}
              <div 
                className={cn(
                  'relative w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden',
                  'shadow-card transition-all duration-500',
                  'group-hover:shadow-glow-pink group-hover:scale-105 group-hover:-translate-y-2'
                )}
              >
                <div 
                  className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${cuisineIcons})`,
                    backgroundSize: '200%',
                    backgroundPosition: cuisine.bgPosition,
                  }}
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Name badge - visible by default since it's in the image */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <span className="font-fredoka text-lg font-semibold text-primary-foreground bg-primary px-6 py-2 rounded-full shadow-soft whitespace-nowrap">
                  Order {cuisine.name}!
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuisinesSection;
