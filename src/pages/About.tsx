import backgroundPattern from '@/assets/background-pattern.png';
import aboutKitchen from '@/assets/about-kitchen.png';
import aboutReading from '@/assets/about-reading.png';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Sparkles, Clock, Users, ChefHat, MapPin } from 'lucide-react';

const About = () => {
  const highlights = [
    { icon: Clock, label: '35+ Years', subtitle: 'Of Cooking with Love', emoji: '⏰' },
    { icon: Users, label: '3 Sisters', subtitle: 'Raised in Kutch', emoji: '👩‍👩‍👧' },
    { icon: ChefHat, label: 'Multi-Cuisine', subtitle: 'Mastery by Heart', emoji: '👩‍🍳' },
    { icon: MapPin, label: 'Bhuj, Kutch', subtitle: 'Where It All Began', emoji: '📍' },
  ];

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <div className="fixed inset-0 bg-background/60 pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main className="pt-24 pb-16">
          {/* Hero Banner */}
          <section className="container mx-auto px-4 mb-16">
            <div className="text-center mb-12 animate-fade-in" style={{ opacity: 1 }}>
              <span className="inline-block text-4xl mb-3">💕</span>
              <h1 className="font-fredoka text-4xl md:text-5xl lg:text-6xl mb-2">
                <span className="text-gradient-pink">Her Story</span>
              </h1>
              <p className="font-fredoka text-2xl md:text-3xl text-primary/80 mb-3">Alifiya Saasa</p>
              <p className="font-quicksand text-muted-foreground text-lg max-w-xl mx-auto">
                A lifetime of love, told through food
              </p>
            </div>

            {/* Main Portrait + Opening */}
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-20">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <img
                  src={aboutKitchen}
                  alt="In her kitchen, holding a bowl of spices"
                  className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[3/4] border-4 border-white/50"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary/90 text-primary-foreground rounded-full px-5 py-2 font-fredoka text-sm shadow-lg">
                  <span>Mama's Kitchen</span> <span className="ml-1">🌶️</span>
                </div>
              </div>

              <div className="space-y-6">
                <blockquote className="border-l-4 border-primary/50 pl-5">
                  <p className="font-quicksand text-lg leading-relaxed text-foreground/90 italic">
                    "She was born in Bhuj, in the heart of Kutch, where food is not merely eaten, but remembered."
                  </p>
                </blockquote>
                <p className="font-quicksand text-foreground/80 leading-relaxed">
                  Raised as one of three sisters in a close-knit Gujarati household, she learned early that the kitchen was more than a room—it was a language of love, patience, and quiet resilience.
                </p>
                <p className="font-quicksand text-foreground/80 leading-relaxed">
                  From a young age, she found solace and joy in cooking. While life unfolded with its responsibilities and challenges, the act of preparing food became her refuge and her strength.
                </p>
              </div>
            </div>

            {/* Highlight Stats */}
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 text-center border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-3xl block mb-2">{item.emoji}</span>
                  <h3 className="font-fredoka text-xl text-primary">{item.label}</h3>
                  <p className="font-quicksand text-xs text-muted-foreground mt-1">{item.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Middle Story Section */}
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-20">
              <div className="space-y-6 order-2 md:order-1">
                <p className="font-quicksand text-foreground/80 leading-relaxed">
                  Cooking was how she expressed care when words were not enough, how she brought smiles to tired faces, and how she transformed ordinary days into moments worth cherishing.
                </p>
                <p className="font-quicksand text-foreground/80 leading-relaxed">
                  Over the years, she mastered a wide range of cuisines—each shaped by her own hands, her instincts, and her unwavering respect for authenticity. Her food carries stories: of long afternoons spent perfecting a spice blend, of meals cooked slowly for family gatherings, of recipes refined not from books, but from experience and heart.
                </p>
                <p className="font-quicksand text-foreground/80 leading-relaxed font-semibold">
                  For over 35 years, she has cooked for her family, nourishing generations with consistency, warmth, and unmistakable soul.
                </p>
              </div>

              <div className="relative group order-1 md:order-2">
                <div className="absolute -inset-3 bg-gradient-to-br from-accent/30 to-primary/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <img
                  src={aboutReading}
                  alt="Relaxing with a recipe book"
                  className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[3/4] border-4 border-white/50"
                />
                <div className="absolute -bottom-4 -left-4 bg-accent/90 text-accent-foreground rounded-full px-5 py-2 font-fredoka text-sm shadow-lg">
                  <span>Moments of Peace</span> <span className="ml-1">📖</span>
                </div>
              </div>
            </div>

            {/* Closing Message */}
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <Sparkles className="w-8 h-8 text-primary/60 mx-auto mb-4" />
                <p className="font-quicksand text-foreground/85 leading-relaxed text-lg mb-6">
                  Now, after decades of cooking for the people she loves most, she wishes to open her kitchen to many more. This is not a business born from trends or ambition—it is an extension of who she has always been.
                </p>
                <p className="font-quicksand text-foreground/85 leading-relaxed text-lg mb-8">
                  A woman who believes food should comfort, connect, and carry joy from one home to another.
                </p>
                <blockquote className="font-fredoka text-xl md:text-2xl text-primary italic">
                  "Through every dish, she shares a piece of where she comes from, and a lifetime of love that has always been meant to be passed on."
                </blockquote>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
                  <span className="font-quicksand text-muted-foreground text-sm">Made with love, always.</span>
                  <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default About;
