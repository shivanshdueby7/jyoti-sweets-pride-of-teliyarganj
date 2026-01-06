
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  bestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum Category {
  All = "All Items",
  Breakfast = "Morning Breakfast",
  Bengali = "Bengali Sweets",
  Ghee = "Ghee Sweets",
  Namkeen = "Namkeen",
  Bakery = "Bakery & Cakes",
  FastFood = "Fast Food"
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  groundingLinks?: { title: string; uri: string }[];
}
