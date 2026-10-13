
"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.product.discountedPrice * item.quantity,
    0
  );

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 md:pl-16">
        <h1 className="mb-10 text-4xl font-semibold">
          Your shopping cart
        </h1>

        {cart.length === 0 ? (
          <div className="py-16 text-center">
            <p className="mb-6 text-lg text-foreground/70">
              Your cart is empty.
            </p>

            <Link
              href="/products"
              className="inline-block rounded-full bg-foreground px-8 py-4 font-medium text-background hover:bg-accent"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Cart items */}
            <div className="space-y-6 lg:col-span-2">
              {cart.map((item) => (
                <article
                  key={item.product.id}
                  className="flex flex-col gap-5 rounded-xl bg-white p-5 sm:flex-row"
                >
                  <Link
                    href={`/products/${item.product.id}`}
                    className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-32"
                  >
                    <Image
                      src={item.product.image.url}
                      alt={item.product.image.alt || item.product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 128px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                    <div>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="font-semibold hover:text-accent"
                      >
                        {item.product.title}
                      </Link>

                      <p className="mt-2 text-foreground/70">
                        {item.product.discountedPrice.toFixed(2)} kr
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center rounded-full border border-black/10">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          aria-label={`Decrease quantity of ${item.product.title}`}
                          className="p-3 hover:text-accent"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="min-w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          aria-label={`Increase quantity of ${item.product.title}`}
                          className="p-3 hover:text-accent"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.product.id)
                        }
                        aria-label={`Remove ${item.product.title}`}
                        className="flex items-center gap-2 text-sm text-foreground/60 hover:text-accent"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Order summary */}
            <aside className="h-fit rounded-xl bg-white p-6">
              <h2 className="mb-6 text-xl font-semibold">
                Order summary
              </h2>

              <div className="mb-6 flex justify-between">
                <span>Subtotal</span>
                <span>{total.toFixed(2)} kr</span>
              </div>

              <div className="mb-6 border-t border-black/10 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} kr</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block rounded-full bg-foreground px-6 py-4 text-center font-medium text-background transition-colors hover:bg-accent hover:text-white"
              >
                Proceed to checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
