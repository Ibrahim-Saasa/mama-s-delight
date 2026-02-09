import { type InfographicStat } from '@/data/cuisineDetails';
import { Clock, Utensils, Flame, Globe, Heart, Leaf, Coffee, Sparkles, Users, Award, Calendar, ChefHat, Wheat, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Clock, Utensils, Flame, Globe, Heart, Leaf, Coffee, Sparkles, Users, Award, Calendar, ChefHat, Wheat,
};

interface InfographicSectionProps {
  stats: InfographicStat[];
  cuisineName: string;
}

const InfographicSection = ({ stats, cuisineName }: InfographicSectionProps) => {
  return (
    <section className="container mx-auto px-4 mb-16">
      <h2 className="font-fredoka text-3xl text-gradient-pink mb-8 text-center">
        {cuisineName} By The Numbers 📊
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon] || Sparkles;
          return (
            <div
              key={i}
              className={cn(
                'relative group flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl',
                'bg-card/80 backdrop-blur-sm border border-border/50',
                'shadow-soft hover:shadow-glow-pink transition-all duration-500',
                'hover:-translate-y-2 hover:scale-105',
                'opacity-0 animate-bounce-in'
              )}
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                <Icon className="w-7 h-7 text-primary group-hover:animate-icon-bounce" />
              </div>
              <span className="font-fredoka text-3xl md:text-4xl text-gradient-pink font-bold">
                {stat.value}
              </span>
              <span className="font-quicksand text-sm text-muted-foreground mt-1 text-center">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InfographicSection;
