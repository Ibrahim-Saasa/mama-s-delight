import backgroundPattern from '@/assets/background-pattern.png';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuSection from '@/components/MenuSection';
import MenuPunDivider from '@/components/MenuPunDivider';
import { Flame, Leaf, Soup, Cookie, IceCream, Coffee } from 'lucide-react';

const chineseItems = [
  { name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts', price: '$14', emoji: '🍗', isSpicy: true },
  { name: 'Dim Sum Platter', description: 'Assorted steamed dumplings', price: '$16', emoji: '🥟' },
  { name: 'Sweet & Sour Pork', description: 'Crispy pork in tangy sauce', price: '$15', emoji: '🍖' },
  { name: 'Veggie Spring Rolls', description: 'Crispy rolls with fresh vegetables', price: '$8', emoji: '🥢', isVegetarian: true },
  { name: 'Mapo Tofu', description: 'Silky tofu in spicy bean sauce', price: '$12', emoji: '🍲', isSpicy: true, isVegetarian: true },
];

const mexicanItems = [
  { name: 'Street Tacos', description: 'Three authentic corn tortilla tacos', price: '$12', emoji: '🌮' },
  { name: 'Loaded Nachos', description: 'Chips with cheese, beans & jalapeños', price: '$14', emoji: '🧀', isSpicy: true },
  { name: 'Burrito Bowl', description: 'Rice, beans, and all the fixings', price: '$13', emoji: '🥗' },
  { name: 'Churros', description: 'Cinnamon sugar fried dough', price: '$7', emoji: '🍩', isVegetarian: true },
  { name: 'Guacamole Fresh', description: 'Made tableside with chips', price: '$10', emoji: '🥑', isVegetarian: true },
];

const indianItems = [
  { name: 'Butter Chicken', description: 'Creamy tomato curry with tender chicken', price: '$16', emoji: '🍛' },
  { name: 'Samosa Trio', description: 'Crispy pastries with spiced potatoes', price: '$8', emoji: '🥟', isVegetarian: true },
  { name: 'Vindaloo', description: 'Fiery Goan-style curry', price: '$17', emoji: '🔥', isSpicy: true },
  { name: 'Palak Paneer', description: 'Creamy spinach with cottage cheese', price: '$14', emoji: '🧀', isVegetarian: true },
  { name: 'Naan Basket', description: 'Assorted fresh-baked breads', price: '$6', emoji: '🍞', isVegetarian: true },
];

const middleEasternItems = [
  { name: 'Falafel Wrap', description: 'Crispy chickpea balls in warm pita', price: '$11', emoji: '🧆', isVegetarian: true },
  { name: 'Shawarma Plate', description: 'Spiced meat with rice and salad', price: '$15', emoji: '🥙' },
  { name: 'Hummus Supreme', description: 'Creamy dip with olive oil drizzle', price: '$9', emoji: '🫘', isVegetarian: true },
  { name: 'Lamb Kofta', description: 'Grilled spiced lamb skewers', price: '$18', emoji: '🍢', isSpicy: true },
  { name: 'Baklava', description: 'Honey-soaked phyllo pastry', price: '$6', emoji: '🍯', isVegetarian: true },
];

const dessertsItems = [
  { name: 'Mochi Ice Cream', description: 'Japanese rice cake with ice cream', price: '$8', emoji: '🍡', isVegetarian: true },
  { name: 'Churro Sundae', description: 'Warm churros with ice cream', price: '$10', emoji: '🍨', isVegetarian: true },
  { name: 'Mango Sticky Rice', description: 'Thai coconut rice with fresh mango', price: '$9', emoji: '🥭', isVegetarian: true },
  { name: 'Gulab Jamun', description: 'Rose-syrup soaked milk balls', price: '$7', emoji: '🧁', isVegetarian: true },
  { name: 'Fortune Cookie Stack', description: 'Fresh-baked with custom fortunes', price: '$5', emoji: '🥠', isVegetarian: true },
];

const drinksItems = [
  { name: 'Mango Lassi', description: 'Creamy yogurt mango smoothie', price: '$5', emoji: '🥤', isVegetarian: true },
  { name: 'Thai Iced Tea', description: 'Sweet and creamy orange tea', price: '$4', emoji: '🧋', isVegetarian: true },
  { name: 'Horchata', description: 'Sweet cinnamon rice milk', price: '$4', emoji: '🥛', isVegetarian: true },
  { name: 'Mint Lemonade', description: 'Fresh mint with citrus', price: '$4', emoji: '🍋', isVegetarian: true },
  { name: 'Vietnamese Coffee', description: 'Strong brew with condensed milk', price: '$5', emoji: '☕', isVegetarian: true },
];

const menuPuns = [
  { pun: "Wok's cooking? Everything delicious!", emoji: '🥡' },
  { pun: "Lettuce taco 'bout these flavors!", emoji: '🌮' },
  { pun: "Curry on, nothing to see here!", emoji: '🍛' },
  { pun: "Pita the fool who skips this section!", emoji: '🥙' },
  { pun: "Life is short, eat dessert first!", emoji: '🍰' },
];

const Menu = () => {
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

          {/* Menu Sections */}
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
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Menu;
