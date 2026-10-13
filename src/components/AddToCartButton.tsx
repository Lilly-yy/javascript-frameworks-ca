
"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
const { cart, addToCart } = useCart();

const quantityInCart =
  cart.find((item) => item.product.id === product.id)?.quantity ?? 0;

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="w-full rounded-full bg-foreground px-8 py-4 font-medium text-background transition-colors hover:bg-accent hover:text-white md:w-fit"
    >
      {quantityInCart > 0
  ? `Add to cart (${quantityInCart} in cart)`
  : "Add to cart"}
    </button>
  );
}
