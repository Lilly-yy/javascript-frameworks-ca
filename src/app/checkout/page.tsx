"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart, isCartLoaded } = useCart();
  const router = useRouter();

  const total = cart.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0,
  );

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cart.length === 0) return;

    const formData = new FormData(event.currentTarget);

    const firstName = String(formData.get("firstName") ?? "").trim();

    if (!firstName) return;

    const order = {
      customerName: firstName,
      total,
      items: cart.map((item) => ({
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.discountedPrice,
      })),
    };

    try {
      sessionStorage.setItem("nova-last-order", JSON.stringify(order));
    } catch (error) {
      console.error("Failed to save order:", error);
      return;
    }

    clearCart();
    router.push("/checkout/success");
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 md:pl-16">
        <h1 className="mb-10 text-4xl font-semibold">Checkout</h1>

        {!isCartLoaded ? (
          <div className="py-16 text-center" role="status">
            <p className="text-lg text-foreground/70">Loading your cart...</p>
          </div>
        ) : cart.length === 0 ? (
          <div className="py-16 text-center">
            <p className="mb-6 text-lg text-foreground/70">
              Your cart is empty.
            </p>

            <Link
              href="/products"
              className="inline-block rounded-full bg-foreground px-8 py-4 font-medium text-background"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-8 lg:col-span-2">
              <h2 className="mb-6 text-2xl font-semibold">
                Customer information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium"
                  >
                    Street address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    required
                    className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="mb-2 block text-sm font-medium"
                    >
                      Postal code
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      title="Please enter a 4-digit postal code"
                      autoComplete="postal-code"
                      required
                      className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-medium"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      required
                      className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-foreground px-8 py-4 font-medium text-background transition-colors hover:bg-accent hover:text-white"
                >
                  Place order
                </button>
              </form>
            </div>

            <aside className="h-fit rounded-xl bg-white p-6">
              <h2 className="mb-6 text-xl font-semibold">Order summary</h2>

              <div className="mb-6 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span>
                      {item.product.title} × {item.quantity}
                    </span>

                    <span className="shrink-0">
                      {(item.product.discountedPrice * item.quantity).toFixed(
                        2,
                      )}{" "}
                      kr
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between border-t border-black/10 pt-4 font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)} kr</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
