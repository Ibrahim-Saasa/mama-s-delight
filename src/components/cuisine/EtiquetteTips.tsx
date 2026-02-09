import { type EtiquetteTip } from '@/data/cuisineDetails';
import { Clock, Utensils, Flame, Globe, Heart, Leaf, Coffee, Sparkles, Users, Award, Calendar, ChefHat, Wheat, ThumbsUp, ThumbsDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Clock, Utensils, Flame, Globe, Heart, Leaf, Coffee, Sparkles, Users, Award, Calendar, ChefHat, Wheat,
};

interface EtiquetteTipsProps {
  tips: EtiquetteTip[];
  cuisineName: string;
}

const EtiquetteTips = ({ tips, cuisineName }: EtiquetteTipsProps) => {
  return (
    <section className="container mx-auto px-4 mb-16">
      <h2 className="font-fredoka text-3xl text-gradient-pink mb-3 text-center">
        Table Manners 101 🍽️
      </h2>
      <p className="font-quicksand text-muted-foreground text-center mb-8">
        How to dine like a {cuisineName} local
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {tips.map((tip, i) => {
          const Icon = iconMap[tip.icon] || Sparkles;
          const isDo = tip.doOrDont === 'do';

          return (
            <div
              key={i}
              className={cn(
                'relative rounded-2xl p-5 border shadow-soft',
                'hover:shadow-card hover:-translate-y-1 transition-all duration-300',
                'bg-card/80 backdrop-blur-sm',
                isDo ? 'border-primary/30' : 'border-destructive/30',
                'opacity-0 animate-bounce-in'
              )}
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Do/Don't badge */}
              <div className={cn(
                'absolute -top-3 right-4 px-3 py-1 rounded-full font-fredoka text-xs font-semibold flex items-center gap-1',
                isDo
                  ? 'bg-primary/20 text-primary'
                  : 'bg-destructive/20 text-destructive'
              )}>
                {isDo ? <ThumbsUp className="w-3 h-3" /> : <ThumbsDown className="w-3 h-3" />}
                {isDo ? 'DO' : "DON'T"}
              </div>

              <div className="flex items-start gap-3 mt-1">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  isDo ? 'bg-primary/15' : 'bg-destructive/15'
                )}>
                  <Icon className={cn('w-5 h-5', isDo ? 'text-primary' : 'text-destructive')} />
                </div>
                <div>
                  <h3 className="font-fredoka text-base text-foreground">{tip.title}</h3>
                  <p className="font-quicksand text-sm text-muted-foreground mt-1 leading-relaxed">
                    {tip.tip}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EtiquetteTips;
