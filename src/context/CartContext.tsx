"use client";

import {
  createContext,
  useContext,
  useEffect,
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
  isCartLoaded: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("nova-cart");

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          const validCart = parsedCart.filter(
            (item): item is CartItem =>
              item !== null &&
              typeof item === "object" &&
              item.product !== null &&
              typeof item.product === "object" &&
              typeof item.product.id === "string" &&
              typeof item.product.discountedPrice === "number" &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0,
          );

          setCart(validCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsCartLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isCartLoaded) return;

    try {
      localStorage.setItem("nova-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart, isCartLoaded]);

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product.id !== productId),
    );
  }

  function updateQuantity(productId: string, quantity: number) {
    if (!Number.isInteger(quantity)) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
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
