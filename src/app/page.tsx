import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-7xl px-6 md:pl-16">
        <div className="max-w-2xl">
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
      </div>
    </section>
  );
}
