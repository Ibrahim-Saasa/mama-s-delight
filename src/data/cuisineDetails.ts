import chineseImg from '@/assets/cuisine-chinese.png';
import mexicanImg from '@/assets/cuisine-mexican.png';
import indianImg from '@/assets/cuisine-indian.png';
import middleEasternImg from '@/assets/cuisine-middle-eastern.png';

export interface CuisineFact {
  icon: string; // lucide icon name
  title: string;
  fact: string;
}

export interface SignatureDish {
  name: string;
  emoji: string;
  description: string;
}

export interface CuisineDetail {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  quickFact: string;
  menuCategory: string;
  history: string;
  funFacts: CuisineFact[];
  signatureDishes: SignatureDish[];
}

export const cuisineDetails: CuisineDetail[] = [
  {
    slug: 'chinese',
    name: 'Chinese',
    tagline: 'Wok this way to 5,000 years of flavor!',
    image: chineseImg,
    quickFact: 'Over 5,000 years of culinary history — older than chopsticks themselves!',
    menuCategory: 'chinese',
    history:
      "Chinese cuisine is one of the oldest and most diverse culinary traditions on the planet. With roots stretching back over five millennia, it's shaped by geography, climate, and a deep philosophy of balance — think yin and yang, but make it delicious. From the fiery kick of Sichuan peppercorns to the delicate art of Cantonese dim sum, every region brings its own plot twist to the table. The Chinese were also the first to master the wok, turning stir-frying into an art form that's fast, flavorful, and endlessly versatile.",
    funFacts: [
      {
        icon: 'Clock',
        title: 'Ancient Eats',
        fact: 'Chinese cuisine dates back over 5,000 years — making it older than the Great Wall itself!',
      },
      {
        icon: 'Utensils',
        title: 'Chopstick Chronicles',
        fact: 'Chopsticks were originally used for cooking, not eating. They only became utensils around 500 AD!',
      },
      {
        icon: 'Flame',
        title: 'Wok Star',
        fact: 'A properly seasoned wok can reach temperatures over 1,200°F — that\'s hotter than lava. Literally.',
      },
      {
        icon: 'Globe',
        title: '8 Great Cuisines',
        fact: 'China officially recognizes 8 regional cuisines, each with its own distinct flavors and techniques.',
      },
      {
        icon: 'Heart',
        title: 'Noodle Love',
        fact: 'The world\'s oldest known noodles were found in China, dating back about 4,000 years. OG carb lovers.',
      },
    ],
    signatureDishes: [
      {
        name: 'Kung Pao Chicken',
        emoji: '🍗',
        description: 'Spicy, nutty, and packed with enough flavor to make your taste buds do a happy dance.',
      },
      {
        name: 'Dim Sum',
        emoji: '🥟',
        description: 'Bite-sized bundles of joy — steamed, fried, or baked. One is never enough!',
      },
      {
        name: 'Mapo Tofu',
        emoji: '🌶️',
        description: 'Silky tofu swimming in a spicy, tingly Sichuan sauce. Warning: highly addictive.',
      },
      {
        name: 'Peking Duck',
        emoji: '🦆',
        description: 'Crispy skin, tender meat, wrapped in a thin pancake. Royalty-approved since the 1300s.',
      },
    ],
  },
  {
    slug: 'mexican',
    name: 'Mexican',
    tagline: "Taco 'bout a flavor fiesta!",
    image: mexicanImg,
    quickFact: 'Mexico gave the world chocolate. You\'re welcome, dessert lovers.',
    menuCategory: 'mexican',
    history:
      "Mexican cuisine is a UNESCO-recognized cultural treasure — yes, it's literally that important. Born from a fusion of ancient Mesoamerican cooking (hello, corn, beans, and chili peppers) and Spanish colonial influences, it's a cuisine that celebrates bold flavors, vibrant colors, and communal dining. The ancient Aztecs invented chocolate drinks, and Mexico gifted the world tomatoes, vanilla, and avocados. Every taco, tamale, and mole sauce carries centuries of tradition in every bite.",
    funFacts: [
      {
        icon: 'Candy',
        title: 'Chocolate Origins',
        fact: 'The Aztecs drank chocolate as a bitter, spicy beverage. They called it "xocolatl" — the drink of the gods!',
      },
      {
        icon: 'Award',
        title: 'UNESCO Certified',
        fact: 'Mexican cuisine is one of only a few cuisines recognized by UNESCO as an Intangible Cultural Heritage.',
      },
      {
        icon: 'Pepper',
        title: 'Chili Champions',
        fact: 'Mexico is home to over 60 varieties of chili peppers. That\'s a whole lotta heat!',
      },
      {
        icon: 'Calendar',
        title: 'Ancient Corn',
        fact: 'Corn has been cultivated in Mexico for over 7,000 years — the ultimate comfort food ingredient.',
      },
      {
        icon: 'Sparkles',
        title: 'Avocado Royalty',
        fact: 'The word "avocado" comes from the Aztec word "ahuacatl." Guac is basically ancient royalty.',
      },
    ],
    signatureDishes: [
      {
        name: 'Tacos al Pastor',
        emoji: '🌮',
        description: 'Spit-roasted pork with pineapple, cilantro, and onion. The street food GOAT.',
      },
      {
        name: 'Mole Poblano',
        emoji: '🫕',
        description: 'A complex sauce with chocolate, chilies, and 20+ ingredients. Labor of love on a plate.',
      },
      {
        name: 'Churros',
        emoji: '🍩',
        description: 'Crispy, cinnamon-sugar perfection. Best friends with chocolate sauce forever.',
      },
      {
        name: 'Guacamole',
        emoji: '🥑',
        description: 'Creamy, zesty, and worth the extra charge. Always.',
      },
    ],
  },
  {
    slug: 'indian',
    name: 'Indian',
    tagline: 'Curry up, the flavor train is leaving!',
    image: indianImg,
    quickFact: 'India uses over 30 different spices — talk about a flavor glow-up!',
    menuCategory: 'indian',
    history:
      "Indian cuisine is a spice-laden symphony that spans thousands of years and an entire subcontinent. From the creamy curries of the north to the coconut-kissed dishes of the south, every region is a flavor universe unto itself. The ancient spice trade made India the world's pantry, and the cuisine reflects influences from Persian, Mughal, Portuguese, and British cultures — all remixed into something uniquely delicious. Vegetarianism has deep roots here too, giving the world some of its most creative plant-based dishes long before it was trendy.",
    funFacts: [
      {
        icon: 'Leaf',
        title: 'Spice Paradise',
        fact: 'India produces over 70% of the world\'s spices. The original spice girls, if you will.',
      },
      {
        icon: 'ChefHat',
        title: 'Veggie Pioneers',
        fact: 'About 40% of Indians are vegetarian — making it the country with the most vegetarians worldwide!',
      },
      {
        icon: 'Flame',
        title: 'Tandoor Power',
        fact: 'A tandoor oven can reach 900°F. That naan gets its signature char in mere seconds!',
      },
      {
        icon: 'Globe',
        title: 'Regional Richness',
        fact: 'India has 29 states, and each one has its own distinct cuisine. One country, infinite flavors.',
      },
      {
        icon: 'Coffee',
        title: 'Chai Culture',
        fact: 'Indians drink over 830 million kilograms of tea a year. Chai is not a trend — it\'s a lifestyle.',
      },
    ],
    signatureDishes: [
      {
        name: 'Butter Chicken',
        emoji: '🍛',
        description: 'Creamy, tomato-y, buttery perfection. The dish that launched a thousand cravings.',
      },
      {
        name: 'Biryani',
        emoji: '🍚',
        description: 'Layers of fragrant rice, spiced meat, and saffron. Every grain tells a story.',
      },
      {
        name: 'Samosa',
        emoji: '🥟',
        description: 'Crispy, spiced potato-filled triangles of pure joy. The ultimate snack attack.',
      },
      {
        name: 'Masala Dosa',
        emoji: '🫓',
        description: 'A crispy crepe stuffed with spiced potatoes. South India\'s gift to breakfast.',
      },
    ],
  },
  {
    slug: 'middle-eastern',
    name: 'Middle Eastern',
    tagline: "Falafel in love with every bite!",
    image: middleEasternImg,
    quickFact: 'Hummus has been around since the 13th century. OG snack.',
    menuCategory: 'middle-eastern',
    history:
      "Middle Eastern cuisine is where culinary civilization began — literally. The Fertile Crescent gave humanity agriculture, bread, and beer (the real holy trinity). Spanning from Lebanon to Iran, this cuisine is built on pillars of fresh herbs, fragrant spices, olive oil, and the art of communal feasting. The mezze tradition — small dishes shared among friends — is basically the original tapas. With dishes perfected over millennia, Middle Eastern food proves that the classics never go out of style.",
    funFacts: [
      {
        icon: 'Wheat',
        title: 'Bread Birthplace',
        fact: 'The Middle East is where bread was first baked — over 14,000 years ago. Thank you, ancient bakers!',
      },
      {
        icon: 'Coffee',
        title: 'Coffee Creators',
        fact: 'Coffee was first brewed in the Middle East. Every morning latte owes its existence to this region.',
      },
      {
        icon: 'Heart',
        title: 'Hummus Wars',
        fact: 'Multiple countries claim to have invented hummus. The delicious debate rages on!',
      },
      {
        icon: 'Sparkles',
        title: 'Saffron Gold',
        fact: 'Saffron costs more per gram than gold. Middle Eastern desserts are literally priceless.',
      },
      {
        icon: 'Users',
        title: 'Mezze Magic',
        fact: 'A traditional mezze spread can have 20+ dishes. Sharing is caring — and very filling.',
      },
    ],
    signatureDishes: [
      {
        name: 'Falafel',
        emoji: '🧆',
        description: 'Crispy chickpea fritters that are crunchy on the outside, fluffy on the inside. Perfection.',
      },
      {
        name: 'Shawarma',
        emoji: '🌯',
        description: 'Slow-roasted, spiced meat carved fresh and wrapped in warm pita. Street food royalty.',
      },
      {
        name: 'Baklava',
        emoji: '🍯',
        description: 'Layers of flaky phyllo, nuts, and honey syrup. Sweet, sticky, and absolutely divine.',
      },
      {
        name: 'Hummus',
        emoji: '🫘',
        description: 'Silky chickpea dip drizzled with olive oil. The dip that conquered the world.',
      },
    ],
  },
];

export const getCuisineBySlug = (slug: string): CuisineDetail | undefined =>
  cuisineDetails.find((c) => c.slug === slug);
