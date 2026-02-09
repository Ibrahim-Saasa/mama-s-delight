import { useParams, Link } from 'react-router-dom';
import { getCuisineBySlug } from '@/data/cuisineDetails';
import backgroundPattern from '@/assets/background-pattern.png';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Clock } from 'lucide-react';
import InfographicSection from '@/components/cuisine/InfographicSection';
import TimelineSection from '@/components/cuisine/TimelineSection';
import IngredientSpotlight from '@/components/cuisine/IngredientSpotlight';
import EtiquetteTips from '@/components/cuisine/EtiquetteTips';
import { cn } from '@/lib/utils';
import { Clock as ClockIcon, Utensils, Flame, Globe, Heart, Leaf, Coffee, Sparkles, Users, Award, Calendar, ChefHat, Wheat, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Clock: ClockIcon, Utensils, Flame, Globe, Heart, Leaf, Coffee, Sparkles, Users, Award, Calendar, ChefHat, Wheat,
  Candy: Sparkles,
  Pepper: Flame,
};

const CuisineDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const cuisine = getCuisineBySlug(slug || '');

  if (!cuisine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-fredoka text-4xl text-primary mb-4">Oops! Cuisine not found 🍽️</h1>
          <Link to="/" className="btn-cupcake">Back to Home</Link>
        </div>
      </div>
    );
  }

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

        <main className="pt-28 pb-20">
          {/* Back Link */}
          <div className="container mx-auto px-4 mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-quicksand font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Hero Banner */}
          <section className="container mx-auto px-4 mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                <img
                  src={cuisine.image}
                  alt={`${cuisine.name} cuisine`}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="font-fredoka text-4xl md:text-6xl text-shimmer mb-3">
                  {cuisine.name} Cuisine
                </h1>
                <p className="font-fredoka text-xl md:text-2xl text-primary/80">
                  {cuisine.tagline}
                </p>
              </div>
            </div>
          </section>

          {/* Infographic Stats */}
          <InfographicSection stats={cuisine.infographicStats} cuisineName={cuisine.name} />

          {/* History Section */}
          <section className="container mx-auto px-4 mb-16">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h2 className="font-fredoka text-3xl text-gradient-pink mb-6 flex items-center gap-3">
                  <Clock className="w-8 h-8 text-primary" />
                  The Story So Far...
                </h2>
                <p className="font-quicksand text-lg leading-relaxed text-foreground/85">
                  {cuisine.history}
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Timeline */}
          <TimelineSection events={cuisine.timeline} />

          {/* Fun Facts Grid */}
          <section className="container mx-auto px-4 mb-16">
            <h2 className="font-fredoka text-3xl text-gradient-pink mb-8 text-center">
              Did You Know? 🤓
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cuisine.funFacts.map((fact, i) => {
                const Icon = iconMap[fact.icon] || Sparkles;
                return (
                  <Card
                    key={i}
                    className={cn(
                      'bg-card/80 backdrop-blur-sm border-border/50 shadow-soft',
                      'hover:shadow-card hover:-translate-y-1 transition-all duration-300'
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-fredoka text-lg text-foreground">{fact.title}</h3>
                      </div>
                      <p className="font-quicksand text-muted-foreground leading-relaxed">
                        {fact.fact}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Ingredient Spotlight */}
          <IngredientSpotlight ingredients={cuisine.ingredients} />

          {/* Etiquette Tips */}
          <EtiquetteTips tips={cuisine.etiquetteTips} cuisineName={cuisine.name} />

          {/* Signature Dishes */}
          <section className="container mx-auto px-4 mb-16">
            <h2 className="font-fredoka text-3xl text-gradient-pink mb-8 text-center">
              Signature Dishes 🍽️
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {cuisine.signatureDishes.map((dish, i) => (
                <Card
                  key={i}
                  className={cn(
                    'bg-card/80 backdrop-blur-sm border-border/50 shadow-soft',
                    'hover:shadow-card hover:-translate-y-1 transition-all duration-300'
                  )}
                >
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{dish.emoji}</div>
                    <h3 className="font-fredoka text-xl text-foreground mb-2">{dish.name}</h3>
                    <p className="font-quicksand text-muted-foreground leading-relaxed">
                      {dish.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="container mx-auto px-4 text-center">
            <h2 className="font-fredoka text-2xl text-foreground mb-4">
              Ready to taste the magic? ✨
            </h2>
            <Link to="/menu" className="btn-cupcake inline-block">
              Order {cuisine.name} Now!
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CuisineDetail;
