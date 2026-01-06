
import { Category, Product } from './types';

export const PRODUCTS: Product[] = [
  // Breakfast
  {
    id: 'b1',
    name: 'Special Paneer Samosa',
    description: 'Crispy, hand-folded golden crust stuffed with a savory masala of spiced potatoes, green peas, and fresh malai paneer cubes.',
    price: 18,
    unit: 'pc',
    category: Category.Breakfast,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    bestSeller: true
  },
  {
    id: 'b2',
    name: 'Prayagraj Kachori Sabzi',
    description: 'Authentic Teliyarganj khasta kachoris served with our signature hing-infused aloo rassa and tangy carrot pickle.',
    price: 40,
    unit: 'plate',
    category: Category.Breakfast,
    image: 'https://images.unsplash.com/photo-1606491956391-70868b5d0f47?q=80&w=800&auto=format&fit=crop',
    bestSeller: true
  },
  {
    id: 'b3',
    name: 'Masala Chai',
    description: 'Aromatic strong tea brewed with fresh ginger, cardamom, and premium tea leaves. The perfect start to your morning.',
    price: 20,
    unit: 'cup',
    category: Category.Breakfast,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=800&auto=format&fit=crop',
    bestSeller: true
  },
  {
    id: 'b4',
    name: 'Bread Pakoda',
    description: 'Double-layered bread stuffed with spicy potato mash, coated in a seasoned gram flour batter, and fried to golden perfection.',
    price: 25,
    unit: 'pc',
    category: Category.Breakfast,
    image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Bread-Pakora-1-500x500.jpg'
  },

  // Bengali Sweets
  {
    id: 's1',
    name: 'Saffron Rasmalai',
    description: 'Delicate heart-shaped cottage cheese discs soaked in a thick, velvety reduced milk flavored with premium Kashmiri kesar.',
    price: 45,
    unit: 'pc',
    category: Category.Bengali,
    image: 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/a051055034094cbca09cdf2082d7a032.jpeg',
    bestSeller: true
  },
  {
    id: 's2',
    name: 'Masala Dosa',
    description: 'Crispy fermented crepe stuffed with spiced mashed potatoes, served with fresh coconut chutney and aromatic sambar.',
    price: 120,
    unit: 'plate',
    category: Category.FastFood,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYH7H-KRy-dnN9To-d5TJu7dKpY3f_nr0w3Q&s',
  },

  // Ghee Sweets
  {
    id: 'g1',
    name: 'Signature Motichoor Laddu',
    description: 'Finest pearls of gram flour fried in pure ghee, flavored with rose water and melon seeds. A Prayagraj celebration staple.',
    price: 600,
    unit: 'kg',
    category: Category.Ghee,
    image: 'https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2016/03/Motichoor-Ladoo-Recipe-5.jpg',
    bestSeller: true
  },
  {
    id: 'g2',
    name: 'Premium Kaju Katli',
    description: 'Smooth, melt-in-the-mouth diamond fudge crafted from the finest cashews and topped with pure edible silver leaf.',
    price: 980,
    unit: 'kg',
    category: Category.Ghee,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO2kvcEVAMllxDNjlkikGbG2Kb0QNnIVfYNg&s',
    bestSeller: true
  },
  {
    id: 'g3',
    name: 'Chola Samosa',
    description: 'Our signature crispy samosas crushed and topped with spicy chickpea curry, tangy chutneys, and fresh onions.',
    price: 50,
    unit: 'plate',
    category: Category.FastFood,
    image: 'https://i.ytimg.com/vi/b4UcQOt4Ioo/sddefault.jpg'
  },

  // Bakery
  {
    id: 'bk1',
    name: 'Eggless Black Forest Cake',
    description: 'Layers of moist chocolate sponge, fresh whipped cream, and tart cherries. Finished with chocolate shavings. 100% Veg.',
    price: 550,
    unit: 'lb',
    category: Category.Bakery,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bk2',
    name: 'Fresh Pineapple Pastry',
    description: 'Light vanilla sponge layered with fresh pineapple chunks and stabilized cream. A refreshing afternoon delight.',
    price: 50,
    unit: 'pc',
    category: Category.Bakery,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bk3',
    name: 'Red Velvet 3D Dream',
    description: 'Stunning crimson cake layers with a smooth cream cheese frosting. A masterpiece for any celebration.',
    price: 700,
    unit: 'lb',
    category: Category.Bakery,
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800&auto=format&fit=crop',
    bestSeller: true
  },

  // Fast Food
  {
    id: 'ff1',
    name: 'Paneer Hakka Noodles',
    description: 'Smoky, wok-tossed noodles with crunchy vegetables, fried paneer cubes, and authentic Indo-Chinese sauces.',
    price: 110,
    unit: 'plate',
    category: Category.FastFood,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'ff2',
    name: '3D Supreme Pizza',
    description: 'Fresh hand-tossed dough topped with premium cheese, exotic veggies, and our house-special tangy sauce.',
    price: 250,
    unit: 'pc',
    category: Category.FastFood,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
    bestSeller: true
  },
  {
    id: 'ff3',
    name: 'Crispy Veg Burger',
    description: 'A crunchy golden vegetable patty with fresh lettuce, garden tomatoes, and our secret creamy dressing.',
    price: 65,
    unit: 'pc',
    category: Category.FastFood,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop'
  }
];

export const COLORS = {
  primary: '#E65100',
  secondary: '#4A0404',
  background: '#FFF8E1',
  accent: '#2E7D32',
  text: '#3E2723',
  gold: '#FFD700',
};

export const CONTACT_INFO = {
  address: "40/22A, Teliyarganj, Prayagraj, Uttar Pradesh 211004",
  googleMapsUrl: "https://www.google.com/maps/place/New+Jyoti+Sweets/@25.4974641,81.8618869,17z/",
  phone: "+91 94506 00000",
  hours: "7:00 AM - 10:00 PM (Everyday)"
};
