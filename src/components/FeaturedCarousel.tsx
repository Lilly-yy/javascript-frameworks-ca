"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

type FeaturedCarouselProps = {
  products: Product[];
};

export default function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const checkScroll = () => {
      setCanScroll(carousel.scrollWidth > carousel.clientWidth + 1);
    };

    checkScroll();

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(carousel);

    return () => resizeObserver.disconnect();
  }, [products]);

  const scrollToProduct = (index: number) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const nextIndex = Math.max(0, Math.min(index, products.length - 1));

    const card = carousel.children[nextIndex] as HTMLElement;

    if (!card) return;

    carousel.scrollTo({
      left: card.offsetLeft - carousel.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(nextIndex);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollToProduct(activeIndex - 1)}
        hidden={!canScroll}
        disabled={activeIndex === 0}
        aria-label="Previous product"
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 shadow-sm transition-colors hover:bg-accent hover:text-white disabled:opacity-30"
      >
        <ChevronLeft size={22} />
      </button>

      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-4.5rem)/4)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToProduct(activeIndex + 1)}
        hidden={!canScroll}
        disabled={activeIndex === products.length - 1}
        aria-label="Next product"
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 shadow-sm transition-colors hover:bg-accent hover:text-white disabled:opacity-30"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
