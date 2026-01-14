import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CupcakeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const CupcakeButton = forwardRef<HTMLButtonElement, CupcakeButtonProps>(
  ({ children, className, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-5 py-2.5 text-sm',
      md: 'px-8 py-4 text-lg',
      lg: 'px-10 py-5 text-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'btn-cupcake squish wiggle-hover',
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

CupcakeButton.displayName = 'CupcakeButton';

export default CupcakeButton;
