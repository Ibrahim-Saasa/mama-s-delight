import { cn } from '@/lib/utils';
import MenuItemCard from './MenuItemCard';
import { LucideIcon } from 'lucide-react';
import { MenuItem } from '@/hooks/useMenuItems';

interface MenuSectionProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  items: MenuItem[];
  accentColor?: 'pink' | 'yellow' | 'purple';
}

const MenuSection = ({ title, subtitle, icon: Icon, items, accentColor = 'pink' }: MenuSectionProps) => {
  const gradientClass = {
    pink: 'text-gradient-pink',
    yellow: 'text-gradient-accent',
    purple: 'from-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent',
  }[accentColor];

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-3 mb-2">
          <Icon className={cn(
            'w-8 h-8 md:w-10 md:h-10',
            accentColor === 'pink' && 'text-primary',
            accentColor === 'yellow' && 'text-accent',
            accentColor === 'purple' && 'text-secondary'
          )} />
          <h2 className={cn('font-fredoka text-3xl md:text-4xl', gradientClass)}>
            {title}
          </h2>
          <Icon className={cn(
            'w-8 h-8 md:w-10 md:h-10',
            accentColor === 'pink' && 'text-primary',
            accentColor === 'yellow' && 'text-accent',
            accentColor === 'purple' && 'text-secondary'
          )} />
        </div>
        <p className="font-quicksand text-muted-foreground max-w-md mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((item) => (
          <MenuItemCard 
            key={item.id} 
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            emoji={item.emoji}
            isSpicy={item.is_spicy}
            isVegetarian={item.is_vegetarian}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
