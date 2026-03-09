import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-image.png';
import FloatingElements from './FloatingElements';
import SparkleParticles from './SparkleParticles';
import { Cake, Coffee, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Delicious homemade treats" 
          className="w-full h-full object-cover object-center"
        />
        {/* Animated gradient color shift overlay - lighter on mobile for better image visibility */}
        <div className="absolute inset-0 bg-gradient-color-shift opacity-25 md:opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 md:from-background/40 via-transparent to-transparent" />
      </div>

      {/* Sparkle Particles */}
      <SparkleParticles />

      {/* Floating Food Elements with Lucide Icons */}
      <FloatingElements />

      {/* Hero Content - Centered */}
      <div className="relative z-30 container mx-auto px-4 text-center flex flex-col items-center justify-center">
        {/* Content Box with backdrop */}
        <div className="bg-background/70 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 max-w-3xl mx-auto shadow-card border border-primary/20">
          {/* Animated Tagline */}
          <h1 
            className="font-fredoka text-3xl md:text-5xl lg:text-6xl mb-6 opacity-0 animate-slide-up"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            <span className="text-shimmer">Homemade Happiness</span>
            <br />
            <span className="text-foreground text-2xl md:text-3xl lg:text-4xl">
              straight from Mama's Kitchen! 
            </span>
            <Sparkles className="inline-block ml-2 text-accent animate-sparkle" size={32} />
          </h1>

          {/* Pun subtitle */}
          <p 
            className="font-quicksand text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 animate-slide-up"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            Where every bite tells a story, and every meal is a{' '}
            <span className="text-gradient-animated font-semibold">batch made in heaven!</span>
          </p>

          {/* CTA Buttons with Enhanced Animations */}
          <div 
            className="flex flex-wrap items-center justify-center gap-6 pt-2 opacity-0 animate-slide-up"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            <button onClick={() => navigate('/desserts')} className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 font-fredoka font-bold text-xl bg-gradient-to-r from-primary to-pink-medium text-primary-foreground rounded-[2rem_2rem_3rem_3rem] shadow-glow-pink hover:shadow-[0_0_40px_hsl(340_70%_75%_/_0.6)] hover:scale-110 hover:-rotate-2 active:scale-95 transition-all duration-300 border-4 border-primary/30 overflow-hidden">
              {/* Shimmer overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Cake className="group-hover:animate-icon-bounce transition-transform" size={24} />
              Bite Me!
            </button>

            <button onClick={() => navigate('/cafe')} className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 font-fredoka font-bold text-xl bg-gradient-to-r from-accent to-yellow-medium text-accent-foreground rounded-lemon shadow-glow-yellow hover:shadow-[0_0_40px_hsl(45_90%_70%_/_0.7)] hover:scale-110 hover:rotate-3 active:scale-95 transition-all duration-300 overflow-hidden">
              {/* Steam effect on hover */}
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 text-2xl">
                ☁️
              </span>
              <Coffee className="group-hover:animate-icon-bounce transition-transform" size={24} />
              Sip Happens
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce z-30">
        <div className="w-8 h-12 rounded-full border-2 border-primary bg-background/50 backdrop-blur-sm flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-20" />
    </section>
  );
};

export default HeroSection;
