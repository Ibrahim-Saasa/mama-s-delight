import { useState } from 'react';
import LemonButton from './LemonButton';
import { cn } from '@/lib/utils';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={cn(
            'max-w-2xl mx-auto text-center p-10 rounded-[3rem]',
            'bg-card/80 backdrop-blur-sm shadow-card',
            'border border-primary/20'
          )}
        >
          {/* Header */}
          <div className="mb-8">
            <span className="text-6xl mb-4 block animate-float">💌</span>
            <h2 
              className="font-fredoka text-3xl md:text-4xl text-gradient-pink mb-3 opacity-0 animate-slide-up"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              Stay in the Loop!
            </h2>
            <p 
              className="font-quicksand text-muted-foreground opacity-0 animate-slide-up"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              Get first dibs on new treats, secret recipes, and exclusive deals. 
              <span className="font-semibold text-primary"> Donut miss out!</span> 🍩
            </p>
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center opacity-0 animate-bounce-in"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@yummy.com"
              className={cn(
                'w-full sm:w-80 px-6 py-4 rounded-full',
                'bg-background border-2 border-primary/30',
                'font-quicksand text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20',
                'transition-all duration-300'
              )}
              required
            />
            <LemonButton type="submit" size="md">
              {isSubmitted ? 'Yay! 🎉' : 'Subscribe 🍋'}
            </LemonButton>
          </form>

          {/* Success message */}
          <div
            className={cn(
              'mt-4 font-fredoka text-primary transition-all duration-300',
              isSubmitted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            )}
          >
            Sweet! You're on the list! 🧁✨
          </div>

          {/* Fun footer text */}
          <p 
            className="mt-6 text-sm text-muted-foreground font-quicksand opacity-0 animate-fade-in"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            No spam, we promise! Just tasty updates. 🤞
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
