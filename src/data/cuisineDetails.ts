import chineseImg from '@/assets/cuisine-chinese.png';
import mexicanImg from '@/assets/cuisine-mexican.png';
import indianImg from '@/assets/cuisine-indian.png';
import middleEasternImg from '@/assets/cuisine-middle-eastern.png';

export interface CuisineFact {
  icon: string;
  title: string;
  fact: string;
}

export interface SignatureDish {
  name: string;
  emoji: string;
  description: string;
}

export interface InfographicStat {
  icon: string;
  value: string;
  label: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Ingredient {
  name: string;
  emoji: string;
  description: string;
  funFact: string;
}

export interface EtiquetteTip {
  icon: string;
  title: string;
  tip: string;
  doOrDont: 'do' | 'dont';
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
  infographicStats: InfographicStat[];
  timeline: TimelineEvent[];
  ingredients: Ingredient[];
  etiquetteTips: EtiquetteTip[];
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
      { icon: 'Clock', title: 'Ancient Eats', fact: 'Chinese cuisine dates back over 5,000 years — making it older than the Great Wall itself!' },
      { icon: 'Utensils', title: 'Chopstick Chronicles', fact: 'Chopsticks were originally used for cooking, not eating. They only became utensils around 500 AD!' },
      { icon: 'Flame', title: 'Wok Star', fact: "A properly seasoned wok can reach temperatures over 1,200°F — that's hotter than lava. Literally." },
      { icon: 'Globe', title: '8 Great Cuisines', fact: 'China officially recognizes 8 regional cuisines, each with its own distinct flavors and techniques.' },
      { icon: 'Heart', title: 'Noodle Love', fact: "The world's oldest known noodles were found in China, dating back about 4,000 years. OG carb lovers." },
    ],
    signatureDishes: [
      { name: 'Kung Pao Chicken', emoji: '🍗', description: 'Spicy, nutty, and packed with enough flavor to make your taste buds do a happy dance.' },
      { name: 'Dim Sum', emoji: '🥟', description: 'Bite-sized bundles of joy — steamed, fried, or baked. One is never enough!' },
      { name: 'Mapo Tofu', emoji: '🌶️', description: 'Silky tofu swimming in a spicy, tingly Sichuan sauce. Warning: highly addictive.' },
      { name: 'Peking Duck', emoji: '🦆', description: 'Crispy skin, tender meat, wrapped in a thin pancake. Royalty-approved since the 1300s.' },
    ],
    infographicStats: [
      { icon: 'Clock', value: '5,000+', label: 'Years of History' },
      { icon: 'Globe', value: '8', label: 'Regional Cuisines' },
      { icon: 'Utensils', value: '1,200°F', label: 'Wok Temperature' },
      { icon: 'Users', value: '1.4B', label: 'People Fed Daily' },
    ],
    timeline: [
      { year: '3000 BC', title: 'The First Stir', description: 'Cooking with fire and pottery begins in ancient China. Food enters the chat.', icon: 'Flame' },
      { year: '2000 BC', title: 'Noodle Origins', description: 'The earliest noodles appear, made from millet. Carb culture is born.', icon: 'Wheat' },
      { year: '500 AD', title: 'Chopstick Era', description: 'Chopsticks transition from cooking tools to eating utensils. Game changer.', icon: 'Utensils' },
      { year: '1300s', title: 'Peking Duck Debut', description: 'Peking Duck becomes a royal delicacy. The crispy skin revolution begins.', icon: 'Award' },
      { year: '1900s', title: 'Global Takeover', description: 'Chinese restaurants spread worldwide. Takeout boxes become iconic.', icon: 'Globe' },
    ],
    ingredients: [
      { name: 'Sichuan Peppercorn', emoji: '🌶️', description: 'Creates a unique "numbing" sensation that makes your tongue tingle', funFact: "It's not actually a peppercorn — it's from a citrus family!" },
      { name: 'Star Anise', emoji: '⭐', description: 'A beautiful star-shaped spice with a warm, licorice-like flavor', funFact: 'Used in traditional Chinese medicine for over 3,000 years' },
      { name: 'Soy Sauce', emoji: '🫗', description: 'The umami powerhouse that ties every dish together', funFact: 'Some premium soy sauces are aged for 2-3 years, like fine wine' },
      { name: 'Ginger', emoji: '🫚', description: 'Fresh, zingy, and warming — the backbone of countless dishes', funFact: 'Ancient Chinese sailors used ginger to prevent seasickness!' },
    ],
    etiquetteTips: [
      { icon: 'Heart', title: 'Slurp Away!', tip: 'Slurping noodles is a compliment to the chef — it means the food is delicious!', doOrDont: 'do' },
      { icon: 'Utensils', title: 'No Stabbing!', tip: "Never stick chopsticks upright in rice — it resembles incense for the deceased.", doOrDont: 'dont' },
      { icon: 'Users', title: 'Spin the Lazy Susan', tip: 'Wait for the host to start eating first, then help yourself from the shared dishes.', doOrDont: 'do' },
      { icon: 'Coffee', title: 'Tea Tapping', tip: 'Tap the table with two fingers to say "thank you" when someone pours your tea.', doOrDont: 'do' },
    ],
  },
  {
    slug: 'mexican',
    name: 'Mexican',
    tagline: "Taco 'bout a flavor fiesta!",
    image: mexicanImg,
    quickFact: "Mexico gave the world chocolate. You're welcome, dessert lovers.",
    menuCategory: 'mexican',
    history:
      "Mexican cuisine is a UNESCO-recognized cultural treasure — yes, it's literally that important. Born from a fusion of ancient Mesoamerican cooking (hello, corn, beans, and chili peppers) and Spanish colonial influences, it's a cuisine that celebrates bold flavors, vibrant colors, and communal dining. The ancient Aztecs invented chocolate drinks, and Mexico gifted the world tomatoes, vanilla, and avocados. Every taco, tamale, and mole sauce carries centuries of tradition in every bite.",
    funFacts: [
      { icon: 'Sparkles', title: 'Chocolate Origins', fact: 'The Aztecs drank chocolate as a bitter, spicy beverage. They called it "xocolatl" — the drink of the gods!' },
      { icon: 'Award', title: 'UNESCO Certified', fact: 'Mexican cuisine is one of only a few cuisines recognized by UNESCO as an Intangible Cultural Heritage.' },
      { icon: 'Flame', title: 'Chili Champions', fact: "Mexico is home to over 60 varieties of chili peppers. That's a whole lotta heat!" },
      { icon: 'Calendar', title: 'Ancient Corn', fact: 'Corn has been cultivated in Mexico for over 7,000 years — the ultimate comfort food ingredient.' },
      { icon: 'Sparkles', title: 'Avocado Royalty', fact: 'The word "avocado" comes from the Aztec word "ahuacatl." Guac is basically ancient royalty.' },
    ],
    signatureDishes: [
      { name: 'Tacos al Pastor', emoji: '🌮', description: 'Spit-roasted pork with pineapple, cilantro, and onion. The street food GOAT.' },
      { name: 'Mole Poblano', emoji: '🫕', description: 'A complex sauce with chocolate, chilies, and 20+ ingredients. Labor of love on a plate.' },
      { name: 'Churros', emoji: '🍩', description: 'Crispy, cinnamon-sugar perfection. Best friends with chocolate sauce forever.' },
      { name: 'Guacamole', emoji: '🥑', description: 'Creamy, zesty, and worth the extra charge. Always.' },
    ],
    infographicStats: [
      { icon: 'Award', value: 'UNESCO', label: 'Cultural Heritage' },
      { icon: 'Flame', value: '60+', label: 'Chili Varieties' },
      { icon: 'Calendar', value: '7,000', label: 'Years of Corn' },
      { icon: 'Globe', value: '#1', label: 'Most-Eaten Cuisine' },
    ],
    timeline: [
      { year: '5000 BC', title: 'Corn is King', description: 'Mesoamericans begin cultivating corn. The tortilla saga begins.', icon: 'Wheat' },
      { year: '1400s', title: 'Aztec Chocolate', description: 'The Aztecs brew xocolatl — bitter, spicy, and divine. Willy Wonka found shook.', icon: 'Sparkles' },
      { year: '1521', title: 'Spanish Fusion', description: 'Spanish colonization introduces dairy, wheat, and new meats. Fusion cuisine is born.', icon: 'Globe' },
      { year: '1910', title: 'Taco Revolution', description: 'Street tacos become a staple during the Mexican Revolution. Food for the people!', icon: 'Heart' },
      { year: '2010', title: 'UNESCO Recognition', description: 'Mexican cuisine earns UNESCO Intangible Cultural Heritage status. Officially legendary.', icon: 'Award' },
    ],
    ingredients: [
      { name: 'Chipotle', emoji: '🌶️', description: 'Smoked and dried jalapeños with a deep, smoky heat', funFact: 'The name comes from Nahuatl "chīlpoctli" meaning smoked chili' },
      { name: 'Epazote', emoji: '🌿', description: 'A pungent herb that adds an earthy, minty kick to beans', funFact: "Ancient Aztecs used it as both seasoning and medicine — a two-for-one deal" },
      { name: 'Cacao', emoji: '🍫', description: 'The raw ingredient behind all chocolate — bitter and magical', funFact: 'Cacao beans were literally used as currency by the Aztecs' },
      { name: 'Tomatillo', emoji: '🟢', description: 'Tangy, bright, and wrapped in a papery husk — salsa verde MVP', funFact: 'Despite the name, they are NOT baby tomatoes. Plot twist!' },
    ],
    etiquetteTips: [
      { icon: 'Utensils', title: 'Hands-On Tacos', tip: 'Always eat tacos with your hands. Using a fork is a culinary crime here!', doOrDont: 'do' },
      { icon: 'Heart', title: 'Say "Provecho"', tip: 'When someone near you is eating, say "Buen provecho" — the Mexican "bon appétit."', doOrDont: 'do' },
      { icon: 'Flame', title: 'Salsa Test', tip: "Don't drown your food in salsa on the first bite — taste it first! Some salsas could fuel a rocket.", doOrDont: 'dont' },
      { icon: 'Users', title: 'Share the Guac', tip: 'Guacamole is meant to be shared. Hoarding it is socially unacceptable (and morally wrong).', doOrDont: 'do' },
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
      { icon: 'Leaf', title: 'Spice Paradise', fact: "India produces over 70% of the world's spices. The original spice girls, if you will." },
      { icon: 'ChefHat', title: 'Veggie Pioneers', fact: 'About 40% of Indians are vegetarian — making it the country with the most vegetarians worldwide!' },
      { icon: 'Flame', title: 'Tandoor Power', fact: 'A tandoor oven can reach 900°F. That naan gets its signature char in mere seconds!' },
      { icon: 'Globe', title: 'Regional Richness', fact: 'India has 29 states, and each one has its own distinct cuisine. One country, infinite flavors.' },
      { icon: 'Coffee', title: 'Chai Culture', fact: "Indians drink over 830 million kilograms of tea a year. Chai is not a trend — it's a lifestyle." },
    ],
    signatureDishes: [
      { name: 'Butter Chicken', emoji: '🍛', description: 'Creamy, tomato-y, buttery perfection. The dish that launched a thousand cravings.' },
      { name: 'Biryani', emoji: '🍚', description: 'Layers of fragrant rice, spiced meat, and saffron. Every grain tells a story.' },
      { name: 'Samosa', emoji: '🥟', description: 'Crispy, spiced potato-filled triangles of pure joy. The ultimate snack attack.' },
      { name: 'Masala Dosa', emoji: '🫓', description: "A crispy crepe stuffed with spiced potatoes. South India's gift to breakfast." },
    ],
    infographicStats: [
      { icon: 'Leaf', value: '70%', label: 'World Spice Production' },
      { icon: 'Users', value: '40%', label: 'Vegetarian Population' },
      { icon: 'Flame', value: '900°F', label: 'Tandoor Temperature' },
      { icon: 'Globe', value: '29', label: 'Regional Cuisines' },
    ],
    timeline: [
      { year: '3000 BC', title: 'Spice Trade Begins', description: 'India starts trading spices with Mesopotamia. The world gets flavor.', icon: 'Globe' },
      { year: '1500 BC', title: 'Ayurvedic Cooking', description: 'Food-as-medicine philosophy takes root. Every spice has a purpose.', icon: 'Leaf' },
      { year: '1500s', title: 'Portuguese Chilies', description: 'Portuguese traders bring chili peppers to India. Mind = blown. Palate = on fire.', icon: 'Flame' },
      { year: '1800s', title: 'Mughal Feasts', description: 'Mughal emperors perfect biryani, kebabs, and rich curries. Royal foodie culture peaks.', icon: 'Award' },
      { year: '1947', title: 'Global Curry Wave', description: 'Post-independence diaspora brings Indian cuisine worldwide. Tikka masala goes viral.', icon: 'Heart' },
    ],
    ingredients: [
      { name: 'Turmeric', emoji: '🟡', description: "The golden spice — earthy, warm, and the reason curry is yellow", funFact: "Called 'Indian saffron,' it's been used for 4,000 years in cooking and healing" },
      { name: 'Garam Masala', emoji: '✨', description: 'A warming spice blend that varies by family — every household has their secret recipe', funFact: '"Garam" means "hot" in Hindi, but it refers to warming the body, not burning heat' },
      { name: 'Cardamom', emoji: '💚', description: "The 'Queen of Spices' — floral, citrusy, and intensely aromatic", funFact: "It's the world's third most expensive spice after saffron and vanilla" },
      { name: 'Ghee', emoji: '🧈', description: 'Clarified butter that adds a rich, nutty depth to everything it touches', funFact: 'In Ayurveda, ghee is considered sacred and used in religious ceremonies' },
    ],
    etiquetteTips: [
      { icon: 'Utensils', title: 'Right Hand Only', tip: 'Eat with your right hand when eating with your fingers — the left hand is considered unclean.', doOrDont: 'do' },
      { icon: 'Heart', title: 'Clean Your Plate', tip: 'Finishing all the food on your plate is a sign of respect and appreciation for the cook.', doOrDont: 'do' },
      { icon: 'Users', title: 'Guest is God', tip: '"Atithi Devo Bhava" — guests are treated like gods. Expect to be overfed. Resistance is futile.', doOrDont: 'do' },
      { icon: 'Coffee', title: 'Chai Etiquette', tip: "Never refuse a cup of chai. It's not just tea — it's an invitation to connect.", doOrDont: 'dont' },
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
      { icon: 'Wheat', title: 'Bread Birthplace', fact: 'The Middle East is where bread was first baked — over 14,000 years ago. Thank you, ancient bakers!' },
      { icon: 'Coffee', title: 'Coffee Creators', fact: 'Coffee was first brewed in the Middle East. Every morning latte owes its existence to this region.' },
      { icon: 'Heart', title: 'Hummus Wars', fact: 'Multiple countries claim to have invented hummus. The delicious debate rages on!' },
      { icon: 'Sparkles', title: 'Saffron Gold', fact: 'Saffron costs more per gram than gold. Middle Eastern desserts are literally priceless.' },
      { icon: 'Users', title: 'Mezze Magic', fact: 'A traditional mezze spread can have 20+ dishes. Sharing is caring — and very filling.' },
    ],
    signatureDishes: [
      { name: 'Falafel', emoji: '🧆', description: 'Crispy chickpea fritters that are crunchy on the outside, fluffy on the inside. Perfection.' },
      { name: 'Shawarma', emoji: '🌯', description: 'Slow-roasted, spiced meat carved fresh and wrapped in warm pita. Street food royalty.' },
      { name: 'Baklava', emoji: '🍯', description: 'Layers of flaky phyllo, nuts, and honey syrup. Sweet, sticky, and absolutely divine.' },
      { name: 'Hummus', emoji: '🫘', description: 'Silky chickpea dip drizzled with olive oil. The dip that conquered the world.' },
    ],
    infographicStats: [
      { icon: 'Wheat', value: '14,000', label: 'Years of Bread' },
      { icon: 'Coffee', value: '#1', label: 'Coffee Birthplace' },
      { icon: 'Users', value: '20+', label: 'Mezze Dishes' },
      { icon: 'Sparkles', value: '$5,000', label: 'Saffron per lb' },
    ],
    timeline: [
      { year: '10000 BC', title: 'Agriculture Born', description: 'The Fertile Crescent invents farming. Humanity levels up forever.', icon: 'Wheat' },
      { year: '8000 BC', title: 'Bread is Baked', description: "The world's first bread emerges. Gluten-free was NOT a thing.", icon: 'ChefHat' },
      { year: '1200s', title: 'Hummus Appears', description: 'The earliest known hummus recipe is written in Cairo. Chickpeas rejoice.', icon: 'Heart' },
      { year: '1400s', title: 'Coffee Culture', description: 'Coffeehouses open across the Ottoman Empire. The first "coffee shops" are born.', icon: 'Coffee' },
      { year: '2000s', title: 'Global Mezze', description: 'Mediterranean and Middle Eastern food becomes a worldwide health trend. Falafel goes mainstream.', icon: 'Globe' },
    ],
    ingredients: [
      { name: 'Sumac', emoji: '🔴', description: 'A tangy, lemony spice that adds a gorgeous crimson color to everything', funFact: 'Ancient Romans used sumac as a souring agent before lemons arrived in Europe' },
      { name: 'Za\'atar', emoji: '🌿', description: 'An iconic herb-spice blend of thyme, sesame, and sumac — sprinkled on everything', funFact: 'There\'s a saying: "A woman who could not make za\'atar could not find a husband"' },
      { name: 'Tahini', emoji: '🥜', description: 'Ground sesame paste — creamy, nutty, and the secret weapon in hummus', funFact: 'Tahini has more protein per serving than most nuts. Gains and flavor!' },
      { name: 'Pomegranate Molasses', emoji: '🍷', description: 'Sweet, tart, syrupy magic that elevates salads and stews alike', funFact: 'Pomegranates symbolize prosperity and abundance in Middle Eastern culture' },
    ],
    etiquetteTips: [
      { icon: 'Coffee', title: 'Coffee Ritual', tip: 'Accept at least one cup of Arabic coffee — refusing it can be seen as rude.', doOrDont: 'do' },
      { icon: 'Utensils', title: 'Bread as Utensil', tip: 'Use flatbread to scoop food instead of utensils. It\'s not just encouraged — it\'s expected!', doOrDont: 'do' },
      { icon: 'Heart', title: 'Generous Host', tip: 'If your host offers more food, accept graciously. Saying "no" might take 3 attempts to stick.', doOrDont: 'do' },
      { icon: 'Users', title: 'Communal Dining', tip: 'Never reach across someone else to grab food from a shared plate. Ask for it to be passed.', doOrDont: 'dont' },
    ],
  },
];

export const getCuisineBySlug = (slug: string): CuisineDetail | undefined =>
  cuisineDetails.find((c) => c.slug === slug);
