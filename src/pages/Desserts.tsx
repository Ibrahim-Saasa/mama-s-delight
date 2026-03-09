import backgroundPattern from '@/assets/background-pattern.png';
import dessertsHero from '@/assets/desserts-hero.jpg';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import { useMenuItems } from '@/hooks/useMenuItems';
import { IceCream, Sparkles, Globe, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const worldDessertCultures = [
{
  region: 'South Asia',
  emoji: '🇮🇳',
  title: 'Indian Sweets',
  description: 'From syrup-soaked Gulab Jamun to creamy Kheer, Indian desserts are a celebration of cardamom, saffron, and rose water.',
  funFact: 'India has over 200 varieties of traditional sweets, with each region having its own specialty!',
  color: 'primary' as const
},
{
  region: 'East Asia',
  emoji: '🇯🇵',
  title: 'Japanese Wagashi',
  description: 'Delicate mochi, airy castella cakes, and artistic wagashi — Japanese desserts are as beautiful as they are delicious.',
  funFact: 'Mochi was originally eaten by Japanese nobility and is pounded from glutinous rice in a ceremony called "mochitsuki".',
  color: 'accent' as const
},
{
  region: 'Middle East',
  emoji: '🇹🇷',
  title: 'Middle Eastern Delights',
  description: 'Baklava, kunafa, and Turkish delight — layers of phyllo, nuts, and honey create unforgettable textures.',
  funFact: 'Baklava has been made for over 800 years and was once reserved for royalty in the Ottoman Empire!',
  color: 'secondary' as const
},
{
  region: 'Latin America',
  emoji: '🇲🇽',
  title: 'Latin Treats',
  description: 'Churros dusted in cinnamon sugar, creamy tres leches, and dulce de leche — sweetness runs deep in Latin culture.',
  funFact: 'Churros were invented by Spanish shepherds as a substitute for fresh bakery goods in the mountains!',
  color: 'primary' as const
},
{
  region: 'Southeast Asia',
  emoji: '🇹🇭',
  title: 'Tropical Sweets',
  description: 'Mango sticky rice, pandan kueh, and coconut-based desserts — tropical ingredients create refreshing sweetness.',
  funFact: 'Thai Mango Sticky Rice is traditionally only eaten during the mango season from April to June.',
  color: 'accent' as const
}];


const Desserts = () => {
  const { getItemsByCategory, loading } = useMenuItems();
  const dessertItems = getItemsByCategory('desserts');

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}>
      
      <div className="fixed inset-0 bg-background/60 pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
            <img
              src={dessertsHero}
              alt="A beautiful spread of world desserts"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager" />
            
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-md text-foreground font-quicksand font-bold text-sm px-4 py-1.5 rounded-full mb-4 border border-border shadow-md">
                <Globe className="w-4 h-4" />
                Sweets from Around the World
              </div>
              <h1 className="font-fredoka text-5xl md:text-7xl text-white mb-3 drop-shadow-lg">
                Sweet Endings 
              </h1>
              <p className="font-quicksand text-lg md:text-xl text-white/90 max-w-2xl drop-shadow">
                Explore pastries, sweets & desserts from every corner of the globe — all 100% Halal!
              </p>
            </div>
          </section>

          {/* World Dessert Cultures */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-fredoka text-3xl md:text-4xl text-shimmer mb-3 flex items-center justify-center gap-2">
                  <Sparkles className="w-8 h-8 text-accent" />
                  A World of Sweetness
                  <Sparkles className="w-8 h-8 text-accent" />
                </h2>
                <p className="font-quicksand text-muted-foreground max-w-xl mx-auto">
                  Every culture has its own way of celebrating life's sweet moments. Here's a taste of dessert traditions from around the globe.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {worldDessertCultures.map((culture, idx) =>
                <div
                  key={culture.region}
                  className={cn(
                    'group bg-card rounded-3xl p-6 shadow-card transition-all duration-500',
                    'hover:shadow-glow-pink hover:-translate-y-1',
                    'border border-border/30 hover:border-primary/30'
                  )}>
                  
                    <div className="text-4xl mb-3">{culture.emoji}</div>
                    <h3 className="font-fredoka text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                      {culture.title}
                    </h3>
                    <p className="font-quicksand text-sm text-muted-foreground mb-4">
                      {culture.description}
                    </p>
                    <div className="bg-muted/50 rounded-2xl p-3 border border-border/30">
                      <p className="font-quicksand text-xs text-muted-foreground flex items-start gap-2">
                        <Star className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span><strong className="text-foreground">Fun fact:</strong> {culture.funFact}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Orderable Desserts */}
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-fredoka text-3xl md:text-4xl text-shimmer mb-3 flex items-center justify-center gap-2">
                  <IceCream className="w-8 h-8 text-primary" />
                  Order Our Desserts
                  <IceCream className="w-8 h-8 text-primary" />
                </h2>
                <p className="font-quicksand text-muted-foreground max-w-xl mx-auto">
                  Can't resist? Neither can we! Add these handcrafted halal treats to your cart.
                </p>
              </div>

              {loading ?
              <div className="flex justify-center py-20">
                  <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
                </div> :
              dessertItems.length > 0 ?
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {dessertItems.map((item) =>
                <MenuItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  emoji={item.emoji}
                  isSpicy={item.is_spicy}
                  isVegetarian={item.is_vegetarian}
                  slug={item.slug} />

                )}
                </div> :

              <p className="text-center font-quicksand text-muted-foreground py-10">
                  No desserts available right now — check back soon! 🍩
                </p>
              }
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>);

};

export default Desserts;