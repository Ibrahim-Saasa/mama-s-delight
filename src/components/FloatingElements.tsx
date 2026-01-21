import { Cake, Coffee, Cookie, Croissant, IceCream, Sparkles, UtensilsCrossed } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  Icon: React.ElementType;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

const FloatingElements = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const elements: FloatingElement[] = [
    { id: 1, Icon: Cake, x: 8, y: 20, size: 40, delay: 0, duration: 4, rotation: -15 },
    { id: 2, Icon: Coffee, x: 85, y: 25, size: 36, delay: 0.5, duration: 3.5, rotation: 10 },
    { id: 3, Icon: Cookie, x: 12, y: 60, size: 32, delay: 1, duration: 4.5, rotation: 20 },
    { id: 4, Icon: Croissant, x: 88, y: 55, size: 38, delay: 1.5, duration: 3, rotation: -10 },
    { id: 5, Icon: IceCream, x: 5, y: 40, size: 34, delay: 2, duration: 5, rotation: 15 },
    { id: 6, Icon: UtensilsCrossed, x: 92, y: 40, size: 30, delay: 0.8, duration: 4, rotation: -20 },
    { id: 7, Icon: Sparkles, x: 15, y: 75, size: 28, delay: 1.2, duration: 3.5, rotation: 0 },
    { id: 8, Icon: Sparkles, x: 82, y: 70, size: 26, delay: 2.2, duration: 4.2, rotation: 25 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {elements.map((element) => {
        const parallaxOffset = scrollY * 0.3 * (element.id % 2 === 0 ? 1 : -1);
        
        return (
          <div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: `translateY(${parallaxOffset}px) rotate(${element.rotation}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div
              className="animate-float-enhanced"
              style={{
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`,
              }}
            >
              <element.Icon
                size={element.size}
                className="text-primary/60 drop-shadow-lg hover:text-primary transition-colors duration-300"
                strokeWidth={1.5}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingElements;
