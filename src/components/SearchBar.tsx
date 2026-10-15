"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

type SearchBarProps = {
  products: Product[];
};

export default function SearchBar({ products }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const [sortOption, setSortOption] = useState("default");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const sortedProducts = [...filteredProducts];

  switch (sortOption) {
    case "price-low":
      sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
      break;

    case "price-high":
      sortedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
      break;

    case "name-az":
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "name-za":
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  return (
    <div>
      <div className="mb-10">
        <label
          htmlFor="productSearch"
          className="mb-2 block text-sm font-medium"
        >
          Search products
        </label>

        <input
          id="productSearch"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search for something new..."
          className="w-full max-w-md rounded-lg border border-black/15 bg-white px-4 py-3 focus:border-accent focus:outline-none"
        />
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-foreground/70">
          Showing {sortedProducts.length} products
        </p>

        <div className="flex items-center gap-3">
          <label htmlFor="sortProducts" className="text-sm font-medium">
            Sort by
          </label>

          <select
            id="sortProducts"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="rounded-lg border border-black/15 bg-white px-4 py-3 focus:border-accent focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
            <option value="name-az">Name: A–Z</option>
            <option value="name-za">Name: Z–A</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-foreground/70">
          No products found. Try another search.
        </p>
      )}
    </div>
  );
}
