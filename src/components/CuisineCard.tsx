import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CuisineCardProps {
  name: string;
  pun: string;
  imagePosition: { x: number; y: number; width: number; height: number };
  cuisineImage: string;
  delay?: number;
}

const CuisineCard = ({ name, pun, imagePosition, cuisineImage, delay = 0 }: CuisineCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'cuisine-card relative group cursor-pointer',
        'opacity-0 animate-bounce-in'
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with clipping for individual cuisine */}
      <div 
        className="relative w-64 h-48 overflow-hidden rounded-3xl shadow-card transition-all duration-300 group-hover:shadow-glow-pink"
        style={{
          backgroundImage: `url(${cuisineImage})`,
          backgroundPosition: `-${imagePosition.x}px -${imagePosition.y}px`,
          backgroundSize: '512px auto',
        }}
      >
        <img 
          src={cuisineImage} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            objectPosition: `${-imagePosition.x + 128}px center`
          }}
        />
      </div>

      {/* Pun tooltip */}
      <div
        className={cn(
          'absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full',
          'font-fredoka text-sm whitespace-nowrap z-20',
          'bg-accent text-accent-foreground shadow-glow-yellow',
          'transition-all duration-300 transform',
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        )}
      >
        {pun} ✨
      </div>

      {/* Name label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className="font-fredoka text-xl font-semibold text-primary-foreground bg-primary/90 px-6 py-2 rounded-full shadow-soft backdrop-blur-sm">
          {name}
        </span>
      </div>
    </div>
  );
};

export default CuisineCard;
