import Link from "next/link";
import type { Product } from "@/types/product";
import Image from "next/image";
import StarRating from "@/components/StarRating";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountedPrice < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100,
      )
    : 0;

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover"
          />
          {hasDiscount && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-white">
              -{discountPercentage}%
            </span>
          )}
        </div>

        <div className="p-5">
          <h2 className="mb-2 text-lg font-semibold">{product.title}</h2>

          <div className="flex items-center gap-3">
            <span className="font-semibold">{product.discountedPrice} kr</span>

            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {product.price} kr
              </span>
            )}
          </div>
          <div className="mt-3">
            <StarRating rating={product.rating} />
          </div>
        </div>
      </Link>
    </article>
  );
}
