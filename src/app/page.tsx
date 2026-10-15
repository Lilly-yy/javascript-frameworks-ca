import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import HomeSearch from "@/components/HomeSearch";

type ProductsResponse = {
  data: Product[];
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://v2.api.noroff.dev/online-shop");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result: ProductsResponse = await response.json();
  return result.data;
}

export default async function Home() {
  const products = await getProducts();
  const featuredProduct = products[0];
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-7xl px-6 md:pl-16">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
              Welcome to NOVA
            </p>

            <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Something new awaits.
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-foreground/70">
              Discover products worth exploring. From everyday essentials to
              unexpected finds, your next favorite thing might be just a click
              away.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-4 font-medium text-background transition-colors hover:bg-accent hover:text-white"
            >
              Explore products
            </Link>
          </div>

          {featuredProduct && (
            <Link
              href={`/products/${featuredProduct.id}`}
              className="group relative block aspect-square w-full max-w-100 justify-self-center overflow-hidden rounded-2xl bg-white"
            >
              <Image
                src={featuredProduct.image.url}
                alt={featuredProduct.image.alt || featuredProduct.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          )}
        </div>

        <div className="mt-20">
          <HomeSearch products={products} />
        </div>

        <div className="mt-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
                Discover NOVA
              </p>

              <h2 className="text-3xl font-semibold">Featured products</h2>
            </div>

            <Link
              href="/products"
              className="font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
            >
              View all products →
            </Link>
          </div>

          <FeaturedCarousel products={featuredProducts} />
        </div>
      </div>
    </section>
  );
}
