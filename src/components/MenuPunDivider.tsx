import { cn } from '@/lib/utils';

interface MenuPunDividerProps {
  pun: string;
  emoji?: string;
}

const MenuPunDivider = ({ pun, emoji = '✨' }: MenuPunDividerProps) => {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      {/* Left decorative line */}
      <div className="h-0.5 w-16 md:w-32 bg-gradient-to-r from-transparent via-primary/50 to-primary rounded-full" />
      
      {/* Pun bubble */}
      <div className={cn(
        'px-6 py-3 rounded-full',
        'bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20',
        'border-2 border-dashed border-primary/30',
        'transform hover:scale-105 transition-transform duration-300 cursor-default'
      )}>
        <span className="font-fredoka text-lg md:text-xl text-foreground">
          {emoji} {pun} {emoji}
        </span>
      </div>
      
      {/* Right decorative line */}
      <div className="h-0.5 w-16 md:w-32 bg-gradient-to-l from-transparent via-primary/50 to-primary rounded-full" />
    </div>
  );
};

export default MenuPunDivider;
