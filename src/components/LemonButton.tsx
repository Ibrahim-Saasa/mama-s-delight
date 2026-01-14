import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LemonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const LemonButton = forwardRef<HTMLButtonElement, LemonButtonProps>(
  ({ children, className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-5 py-2 text-sm',
      md: 'px-8 py-3 text-base',
      lg: 'px-10 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'btn-lemon squish wiggle-hover',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

LemonButton.displayName = 'LemonButton';

export default LemonButton;
