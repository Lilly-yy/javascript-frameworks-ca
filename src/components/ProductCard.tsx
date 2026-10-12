import Link from "next/link";
import type { Product } from "@/types/product";


type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const hasDiscount =
    product.discountedPrice < product.price;

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm">
  <Link href={`/products/${product.id}`} className="block">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image.url}
          alt={product.image.alt || product.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <h2 className="mb-2 text-lg font-semibold">
          {product.title}
        </h2>

        <div className="flex items-center gap-3">
          <span className="font-semibold">
            {product.discountedPrice} kr
          </span>

          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {product.price} kr
            </span>
          )}
        </div>
      </div>
        </Link>
</article>

  );
}
