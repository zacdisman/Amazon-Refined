export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional: For showing the "strikethrough" list price
  rating: number;         // 1-5 stars
  reviews: number;        // Number of reviews (e.g., 3,420)
  image: string;
  category: string;
  isPrime: boolean;       // Critical for the Prime Badge logic
  inStock: boolean;
}

// A CartItem is just a Product plus a quantity
export interface CartItem extends Product {
  quantity: number;
}

// Simple User type for when we add Auth later
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}