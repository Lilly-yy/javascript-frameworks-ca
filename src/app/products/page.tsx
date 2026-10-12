import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";


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

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-7xl px-6 md:pl-16">
        <h1 className="mb-4 text-4xl font-semibold">Explore our products</h1>

        <p className="mb-10 text-lg text-foreground/70">
          Discover something new from our collection.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
