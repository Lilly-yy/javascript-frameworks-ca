
"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="w-full border-b border-black/10 bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" aria-label="NOVA homepage">
          <Image
            src="/nova-logo.svg"
            alt="NOVA"
            width={180}
            height={52}
            priority
          />
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-8 text-lg">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-accent">
                Shop
              </Link>
            </li>

            <li>
              <Link
                href="/cart"
                aria-label={`Shopping cart, ${cartCount} items`}
                className="relative flex items-center hover:text-accent"
              >
                <ShoppingBag size={24} strokeWidth={1.8} />

                {cartCount > 0 && (
                  <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
