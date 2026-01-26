import backgroundPattern from '@/assets/background-pattern.png';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuSection from '@/components/MenuSection';
import MenuPunDivider from '@/components/MenuPunDivider';
import { Flame, Leaf, Soup, IceCream, Coffee } from 'lucide-react';
import { useMenuItems } from '@/hooks/useMenuItems';

const menuPuns = [
  { pun: "Wok's cooking? Everything delicious!", emoji: '🥡' },
  { pun: "Lettuce taco 'bout these flavors!", emoji: '🌮' },
  { pun: "Curry on, nothing to see here!", emoji: '🍛' },
  { pun: "Pita the fool who skips this section!", emoji: '🥙' },
  { pun: "Life is short, eat dessert first!", emoji: '🍰' },
];

const Menu = () => {
  const { getItemsByCategory, loading } = useMenuItems();

  const chineseItems = getItemsByCategory('chinese');
  const mexicanItems = getItemsByCategory('mexican');
  const indianItems = getItemsByCategory('indian');
  const middleEasternItems = getItemsByCategory('middle-eastern');
  const dessertsItems = getItemsByCategory('desserts');
  const drinksItems = getItemsByCategory('drinks');

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
      {/* Subtle overlay for readability */}
      <div className="fixed inset-0 bg-background/60 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <main className="pt-28 pb-20">
          {/* Page Header */}
          <div className="container mx-auto px-4 text-center mb-12">
            <h1 className="font-fredoka text-5xl md:text-6xl text-shimmer mb-4 flex items-center justify-center gap-3">
              Our Yummy Menu! <Soup className="inline-block w-12 h-12 text-primary" />
            </h1>
            <p className="font-quicksand text-lg text-muted-foreground max-w-2xl mx-auto">
              From sizzling stir-fries to tantalizing tacos, every dish is made with love and a sprinkle of magic! ✨
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            /* Menu Sections */
            <div className="container mx-auto px-4">
              <MenuSection
                title="Chinese Delights"
                subtitle="Wok-tastic flavors from the East!"
                icon={Soup}
                items={chineseItems}
                accentColor="pink"
              />

              <MenuPunDivider pun={menuPuns[0].pun} emoji={menuPuns[0].emoji} />

              <MenuSection
                title="Mexican Fiesta"
                subtitle="Spice up your life, amigo!"
                icon={Flame}
                items={mexicanItems}
                accentColor="yellow"
              />

              <MenuPunDivider pun={menuPuns[1].pun} emoji={menuPuns[1].emoji} />

              <MenuSection
                title="Indian Treasures"
                subtitle="A symphony of aromatic spices!"
                icon={Flame}
                items={indianItems}
                accentColor="purple"
              />

              <MenuPunDivider pun={menuPuns[2].pun} emoji={menuPuns[2].emoji} />

              <MenuSection
                title="Middle Eastern Magic"
                subtitle="Ancient flavors, timeless taste!"
                icon={Leaf}
                items={middleEasternItems}
                accentColor="pink"
              />

              <MenuPunDivider pun={menuPuns[3].pun} emoji={menuPuns[3].emoji} />

              <MenuSection
                title="Sweet Endings"
                subtitle="Because you deserve a treat!"
                icon={IceCream}
                items={dessertsItems}
                accentColor="yellow"
              />

              <MenuPunDivider pun={menuPuns[4].pun} emoji={menuPuns[4].emoji} />

              <MenuSection
                title="Refreshing Sips"
                subtitle="Cool down with our signature drinks!"
                icon={Coffee}
                items={drinksItems}
                accentColor="purple"
              />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Menu;
