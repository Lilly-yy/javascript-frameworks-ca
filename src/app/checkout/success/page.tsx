
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type OrderConfirmation = {
  customerName: string;
  total: number;
  items: {
    title: string;
    quantity: number;
    price: number;
  }[];
};

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<OrderConfirmation | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedOrder = sessionStorage.getItem("nova-last-order");

      if (savedOrder) {
        setOrder(JSON.parse(savedOrder) as OrderConfirmation);
      }
    } catch (error) {
      console.error("Failed to load order:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <main className="py-20 text-center">
        <p>Loading order confirmation...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="mb-4 text-3xl font-semibold">
          No order found
        </h1>
        <p className="mb-8 text-foreground/70">
          We couldn't find an order confirmation.
        </p>
        <Link href="/products" className="underline">
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <div className="rounded-xl bg-white p-8 text-center sm:p-12">
        <CheckCircle2
          size={56}
          strokeWidth={1.5}
          className="mx-auto mb-6 text-accent"
        />

        <h1 className="mb-4 text-3xl font-semibold">
          Thank you for your order!
        </h1>

        <p className="mb-8 text-foreground/70">
          Thank you, {order.customerName}! Your order has
          been successfully placed.
        </p>

        <div className="mb-8 border-t border-b border-black/10 py-6 text-left">
          <h2 className="mb-4 text-xl font-semibold">
            Order summary
          </h2>

          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between gap-4 text-sm"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>
                  {(item.price * item.quantity).toFixed(2)} kr
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t border-black/10 pt-4 font-semibold">
            <span>Total</span>
            <span>{order.total.toFixed(2)} kr</span>
          </div>
        </div>

        <Link
          href="/products"
          className="inline-block rounded-full bg-foreground px-8 py-4 font-medium text-background transition-colors hover:bg-accent hover:text-white"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
