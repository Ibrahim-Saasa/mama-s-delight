import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface Sprinkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

const sprinkleColors = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--secondary))',
  'hsl(340 80% 70%)',
  'hsl(280 70% 70%)',
  'hsl(45 90% 65%)',
];

const MenuItemCard = ({ id, name, description, price, emoji, isSpicy, isVegetarian }: MenuItemCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [sprinkles, setSprinkles] = useState<Sprinkle[]>([]);

  const generateSprinkles = useCallback(() => {
    const newSprinkles: Sprinkle[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
    }));
    setSprinkles(newSprinkles);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    generateSprinkles();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setSprinkles([]);
  };

  return (
    <div
      className={cn(
        'relative bg-card rounded-3xl p-5 pb-6 shadow-card overflow-visible',
        'transition-all duration-500 cursor-pointer flex flex-col h-full',
        'hover:shadow-glow-pink hover:-translate-y-2 hover:scale-[1.02]',
        'group'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sprinkles/Sparkles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {sprinkles.map((sprinkle) => (
          <div
            key={sprinkle.id}
            className="absolute animate-sprinkle-pop"
            style={{
              left: `${sprinkle.x}%`,
              top: `${sprinkle.y}%`,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: sprinkle.size,
                height: sprinkle.size,
                backgroundColor: sprinkle.color,
                transform: `rotate(${sprinkle.rotation}deg)`,
                boxShadow: `0 0 ${sprinkle.size}px ${sprinkle.color}`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Emoji Header */}
      <div className="text-5xl text-center mb-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:animate-wiggle">
        {emoji}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="font-fredoka text-lg text-foreground mb-1 text-center group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="font-quicksand text-sm text-muted-foreground mb-3 line-clamp-2 text-center">
          {description}
        </p>

        {/* Tags */}
        <div className="flex justify-center gap-2 mb-3">
          {isSpicy && (
            <span className="text-xs px-2 py-1 rounded-full bg-destructive/20 text-destructive font-quicksand">
              🌶️ Spicy
            </span>
          )}
          {isVegetarian && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-600 font-quicksand">
              🌱 Veggie
            </span>
          )}
        </div>

        {/* Spacer to push price/button to bottom */}
        <div className="flex-1" />

        {/* Price & Add Button - Fixed at bottom */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/30">
          <span className="font-fredoka text-xl text-primary">${price.toFixed(2)}</span>
          <button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-9 h-9 flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 active:scale-95 shadow-md"
            onClick={() => addToCart(id)}
          >
            🛒
          </button>
        </div>
      </div>

      {/* Sparkle icon indicator */}
      <div className={cn(
        'absolute -top-2 -right-2 transition-all duration-300',
        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      )}>
        <Sparkles className="w-6 h-6 text-accent animate-pulse" />
      </div>
    </div>
  );
};

export default MenuItemCard;
