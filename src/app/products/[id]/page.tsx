import type { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";
import StarRating from "@/components/StarRating";

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
          <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
            <Image
              src={product.image.url}
              alt={product.image.alt || product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            {product.discountedPrice < product.price && (
              <span className="mb-4 w-fit rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                On sale
              </span>
            )}

            <h1 className="mb-4 text-4xl font-semibold">{product.title}</h1>

            <div className="mb-6">
              <StarRating
                rating={product.rating}
                reviewCount={product.reviews.length}
              />
            </div>

            <p className="mb-8 text-lg leading-relaxed text-foreground/70">
              {product.description}
            </p>

            {product.tags?.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-black/5 px-3 py-1 text-sm text-foreground/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

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

        <div
          id="reviews"
          className="mt-20 scroll-mt-24 border-t border-black/10 pt-12"
        >
          <h2 className="mb-8 text-2xl font-semibold">Customer reviews</h2>

          {product.reviews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl border border-black/10 bg-white p-6"
                >
                  <h3 className="mb-3 font-semibold">{review.username}</h3>

                  <StarRating rating={review.rating} />

                  <p className="text-foreground/70">{review.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-foreground/70">No reviews yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
