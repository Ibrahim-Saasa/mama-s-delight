import { Link } from 'react-router-dom';
import { UtensilsCrossed, BookOpen, Globe, Loader2 } from 'lucide-react';
import type { SearchResult } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';

const typeConfig = {
  menu: { icon: UtensilsCrossed, label: 'Menu', color: 'text-primary' },
  blog: { icon: BookOpen, label: 'Blog', color: 'text-accent' },
  cuisine: { icon: Globe, label: 'Cuisine', color: 'text-secondary-foreground' },
};

interface Props {
  results: SearchResult[];
  loading: boolean;
  query: string;
  onSelect: () => void;
  className?: string;
}

const SearchResults = ({ results, loading, query, onSelect, className }: Props) => {
  if (query.trim().length < 2) return null;

  return (
    <div className={cn(
      'bg-background border border-border/60 rounded-2xl shadow-lg overflow-hidden animate-fade-in',
      className
    )}>
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-6 text-muted-foreground font-quicksand text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching…
        </div>
      ) : results.length === 0 ? (
        <div className="py-6 text-center text-muted-foreground font-quicksand text-sm">
          No results for "{query}" 🍽️
        </div>
      ) : (
        <ul className="py-2 max-h-72 overflow-y-auto">
          {results.map((r) => {
            const cfg = typeConfig[r.type];
            const Icon = cfg.icon;
            return (
              <li key={`${r.type}-${r.id}`}>
                <Link
                  to={r.path}
                  onClick={onSelect}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors"
                >
                  <span className={cn('shrink-0', cfg.color)}>
                    {r.emoji ? <span className="text-lg">{r.emoji}</span> : <Icon className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-quicksand font-semibold text-sm text-foreground truncate">{r.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-quicksand font-bold uppercase tracking-wider text-muted-foreground/60 bg-muted/60 px-2 py-0.5 rounded-full">
                    {cfg.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
