import { type TimelineEvent } from '@/data/cuisineDetails';
import { Clock, Utensils, Flame, Globe, Heart, Leaf, Coffee, Sparkles, Users, Award, Calendar, ChefHat, Wheat, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Clock, Utensils, Flame, Globe, Heart, Leaf, Coffee, Sparkles, Users, Award, Calendar, ChefHat, Wheat,
};

interface TimelineSectionProps {
  events: TimelineEvent[];
}

const TimelineSection = ({ events }: TimelineSectionProps) => {
  return (
    <section className="container mx-auto px-4 mb-16">
      <h2 className="font-fredoka text-3xl mb-10 text-center">
        <span className="text-gradient-pink">A Tasty Timeline</span> 📜
      </h2>
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

        {events.map((event, i) => {
          const Icon = iconMap[event.icon] || Sparkles;
          const isLeft = i % 2 === 0;

          return (
            <div
              key={i}
              className={cn(
                'relative flex items-start mb-10 last:mb-0',
                'md:flex-row',
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse',
                'opacity-0 animate-bounce-in'
              )}
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shadow-glow-pink border-2 border-primary/30">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Content card */}
              <div
                className={cn(
                  'ml-16 md:ml-0 md:w-[calc(50%-2.5rem)]',
                  isLeft ? 'md:pr-4 md:text-right' : 'md:pl-4 md:text-left',
                  isLeft ? 'md:mr-auto' : 'md:ml-auto'
                )}
              >
                <div className={cn(
                  'bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-5 shadow-soft',
                  'hover:shadow-card hover:-translate-y-1 transition-all duration-300'
                )}>
                  <span className="font-fredoka text-sm text-accent-foreground bg-accent/80 px-3 py-1 rounded-full">
                    {event.year}
                  </span>
                  <h3 className="font-fredoka text-lg text-foreground mt-2">{event.title}</h3>
                  <p className="font-quicksand text-sm text-muted-foreground mt-1">{event.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TimelineSection;
