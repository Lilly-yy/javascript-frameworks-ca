import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, it, expect } from "vitest";
import { CartProvider, useCart } from "./CartContext";
import type { Product } from "@/types/product";

const testProduct: Product = {
  id: "test-1",
  title: "Test Jacket",
  description: "A jacket for testing",
  price: 499,
  discountedPrice: 399,
  image: {
    url: "https://example.com/jacket.jpg",
    alt: "Test jacket",
  },
  rating: 4.5,
  tags: ["clothing"],
  reviews: [],
};

function TestCart() {
  const { cart, addToCart, removeFromCart, isCartLoaded } = useCart();

  return (
    <div>
      <p>Items in cart: {cart.length}</p>
      <p>Quantity: {cart[0]?.quantity ?? 0}</p>
      <button onClick={() => addToCart(testProduct)} disabled={!isCartLoaded}>
        Add to cart
      </button>
      <button onClick={() => removeFromCart(testProduct.id)} disabled={!isCartLoaded}>
        Remove from cart
      </button>
    </div>
  );
}

beforeEach(() => {
  localStorage.clear();
});

it("adds a product to the cart", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <TestCart />
    </CartProvider>,
  );

  const addButton = await screen.findByRole("button", {
    name: "Add to cart",
  });

  await user.click(addButton);

  expect(screen.getByText("Items in cart: 1")).toBeInTheDocument();
});

it("increases quantity when adding the same product twice", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <TestCart />
    </CartProvider>,
  );

  const addButton = await screen.findByRole("button", {
    name: "Add to cart",
  });

  await user.click(addButton);
  await user.click(addButton);

  expect(screen.getByText("Items in cart: 1")).toBeInTheDocument();
  expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
});

it("removes a product from the cart", async () => {
  const user = userEvent.setup();

  render(
    <CartProvider>
      <TestCart />
    </CartProvider>,
  );

  const addButton = await screen.findByRole("button", {
    name: "Add to cart",
  });
  const removeButton = await screen.findByRole("button", {
    name: "Remove from cart",
  });

  await user.click(addButton);
  await user.click(removeButton);

  expect(screen.getByText("Items in cart: 0")).toBeInTheDocument();
});