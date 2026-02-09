import { type Ingredient } from '@/data/cuisineDetails';
import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface IngredientSpotlightProps {
  ingredients: Ingredient[];
}

const IngredientSpotlight = ({ ingredients }: IngredientSpotlightProps) => {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section className="container mx-auto px-4 mb-16">
      <h2 className="font-fredoka text-3xl text-gradient-pink mb-3 text-center">
        Ingredient Spotlight 🧂
      </h2>
      <p className="font-quicksand text-muted-foreground text-center mb-8">
        Tap a card to reveal a fun fact!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {ingredients.map((ingredient, i) => (
          <div
            key={i}
            className="perspective-1000 cursor-pointer"
            onClick={() => setFlipped(flipped === i ? null : i)}
          >
            <div
              className={cn(
                'relative w-full h-52 transition-transform duration-500 preserve-3d',
                flipped === i && 'rotate-y-180'
              )}
              style={{
                transformStyle: 'preserve-3d',
                transform: flipped === i ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front */}
              <div
                className={cn(
                  'absolute inset-0 rounded-2xl p-5 flex flex-col items-center justify-center',
                  'bg-card/80 backdrop-blur-sm border border-border/50 shadow-soft',
                  'hover:shadow-card transition-shadow duration-300'
                )}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-5xl mb-3">{ingredient.emoji}</span>
                <h3 className="font-fredoka text-lg text-foreground text-center">{ingredient.name}</h3>
                <p className="font-quicksand text-xs text-muted-foreground text-center mt-1">
                  {ingredient.description}
                </p>
              </div>

              {/* Back */}
              <div
                className={cn(
                  'absolute inset-0 rounded-2xl p-5 flex flex-col items-center justify-center',
                  'bg-primary/10 backdrop-blur-sm border border-primary/30 shadow-glow-pink'
                )}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <Lightbulb className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-fredoka text-sm text-primary mb-1">Fun Fact!</h3>
                <p className="font-quicksand text-sm text-foreground/85 text-center leading-relaxed">
                  {ingredient.funFact}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IngredientSpotlight;
