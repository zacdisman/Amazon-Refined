'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); 

  // 1. LOAD CART (Run once on mount)
  useEffect(() => {
    const savedCart = localStorage.getItem('amazon-cart');
    if (savedCart) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }
    }
    setIsInitialized(true); // <--- Mark as ready
  }, []);

  // 2. SAVE CART (Run only after initialization)
  useEffect(() => {
    if (!isInitialized) return; // <--- Stop if not ready
    localStorage.setItem('amazon-cart', JSON.stringify(cart));
  }, [cart, isInitialized]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Prevent hydration mismatch: Always return 0 on the server/first render
  const cartCount = isInitialized ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const cartTotal = isInitialized ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}