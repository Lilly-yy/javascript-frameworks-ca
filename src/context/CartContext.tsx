
"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "@/types/product";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { product, quantity: 1 }];
    });
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
