import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface Sprinkle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

interface MenuItemCardProps {
  name: string;
  description: string;
  price: string;
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

const MenuItemCard = ({ name, description, price, emoji, isSpicy, isVegetarian }: MenuItemCardProps) => {
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
        'relative bg-card rounded-3xl p-5 shadow-card overflow-visible',
        'transition-all duration-500 cursor-pointer',
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
      <div className="text-center">
        <h3 className="font-fredoka text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="font-quicksand text-sm text-muted-foreground mb-3 line-clamp-2">
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

        {/* Price & Add Button */}
        <div className="flex items-center justify-between">
          <span className="font-fredoka text-xl text-primary">{price}</span>
          <button className="btn-cupcake text-xs px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add 🧁
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
