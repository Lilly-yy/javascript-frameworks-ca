"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import Link from "next/link";

type HomeSearchProps = {
  products: Product[];
};

export default function HomeSearch({ products }: HomeSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const searchResults = searchQuery.trim() ? filteredProducts.slice(0, 5) : [];

  return (
    <div className="w-full">
      <label
        htmlFor="homeSearch"
        className="mb-4 block text-center text-2xl font-semibold"
      >
        Search products
      </label>

      <input
        id="homeSearch"
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search for something new..."
        className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 focus:border-accent focus:outline-none"
      />
      {searchQuery.trim() && (
        <div className="mt-2 overflow-hidden rounded-lg border border-black/10 bg-white shadow-md">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block border-b border-black/10 px-4 py-3 text-sm transition-colors last:border-b-0 hover:bg-black/5 hover:text-accent"
              >
                {product.title}
              </Link>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-foreground/70">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
