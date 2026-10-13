import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

type ProductResponse = {
  data: Product;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const result: ProductResponse = await response.json();
  const product = result.data;


return (
  <section className="py-16">
    <div className="mx-auto max-w-7xl px-6 md:pl-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">

        {/* Product image */}
        <div className="aspect-square overflow-hidden rounded-xl bg-white">
          <img
            src={product.image.url}
            alt={product.image.alt || product.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product information */}
        <div className="flex flex-col justify-center">
          {product.discountedPrice < product.price && (
            <span className="mb-4 w-fit rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              On sale
            </span>
          )}

          <h1 className="mb-6 text-4xl font-semibold">
            {product.title}
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-foreground/70">
            {product.description}
          </p>

          <div className="mb-8 flex items-center gap-4">
            <span className="text-2xl font-semibold">
              {product.discountedPrice} kr
            </span>

            {product.discountedPrice < product.price && (
              <span className="text-lg text-gray-500 line-through">
                {product.price} kr
              </span>
            )}
          </div>

<AddToCartButton product={product} />

        </div>
      </div>
    </div>
  </section>
);

}
