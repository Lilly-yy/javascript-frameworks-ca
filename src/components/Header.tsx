"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="w-full border-b border-black/10 bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          aria-label="NOVA homepage"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/nova-logo.svg"
            alt="NOVA"
            width={180}
            height={52}
            priority
            className="w-36 sm:w-44"
          />
        </Link>
        <div className="flex items-center gap-6">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 md:flex"
          >
            <Link href="/" className="text-lg hover:text-accent">
              Home
            </Link>

            <Link href="/products" className="text-lg hover:text-accent">
              Shop
            </Link>

            <Link href="/contact" className="text-lg hover:text-accent">
              Contact
            </Link>
          </nav>

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

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center md:hidden"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`border-t border-black/10 px-6 py-4 md:hidden text-center ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-accent"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-accent"
            >
              Shop
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-accent"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
