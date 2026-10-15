"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { cart, addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const quantityInCart =
    cart.find((item) => item.product.id === product.id)?.quantity ?? 0;

  function handleAddToCart() {
    addToCart(product);
    setShowToast(true);
  }

  useEffect(() => {
    if (!showToast) return;

    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showToast]);

  return (
    <>
      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full rounded-full bg-foreground px-8 py-4 font-medium text-background transition-colors hover:bg-accent hover:text-white md:w-fit"
      >
        {quantityInCart > 0
          ? `Add to cart (${quantityInCart} in cart)`
          : "Add to cart"}
      </button>

      {showToast && (
        <div
          role="status"
          className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-foreground px-6 py-4 text-sm font-medium text-background shadow-lg"
        >
          Product added to cart!
        </div>
      )}
    </>
  );
}
