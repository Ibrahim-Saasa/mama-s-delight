import heroImage from '@/assets/hero-image.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Delicious homemade treats" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-transparent" />
      </div>

      {/* Hero Content - Centered */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center">
        {/* Content Box with backdrop */}
        <div className="bg-background/70 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 max-w-3xl mx-auto shadow-soft">
          {/* Tagline */}
          <p 
            className="font-fredoka text-2xl md:text-4xl text-foreground mb-6 opacity-0 animate-slide-up"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            Homemade Happiness straight from Mama's Kitchen! 💕
          </p>

          {/* Pun subtitle */}
          <p 
            className="font-quicksand text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 animate-slide-up"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            Where every bite tells a story, and every meal is a <span className="text-gradient-accent font-semibold">batch made in heaven!</span> 🧁
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
            <button className="relative inline-flex items-center justify-center px-10 py-5 font-fredoka font-bold text-xl bg-primary text-primary-foreground rounded-[2rem_2rem_3rem_3rem] shadow-glow-pink hover:scale-110 hover:-rotate-2 active:scale-95 transition-all duration-300 border-4 border-primary/30">
              Bite Me! 🧁
            </button>

            <button className="relative inline-flex items-center justify-center px-10 py-5 font-fredoka font-bold text-xl bg-accent text-accent-foreground rounded-lemon shadow-glow-yellow hover:scale-110 hover:rotate-3 active:scale-95 transition-all duration-300">
              Sip Happens ☕
            </button>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 text-4xl animate-float" style={{ animationDelay: '0s' }}>🍰</div>
        <div className="absolute top-1/3 right-16 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🥟</div>
        <div className="absolute bottom-1/3 left-20 text-3xl animate-float" style={{ animationDelay: '1s' }}>🌮</div>
        <div className="absolute bottom-1/4 right-10 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🧆</div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-8 h-12 rounded-full border-2 border-primary flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
