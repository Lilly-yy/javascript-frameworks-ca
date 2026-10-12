import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOVA | Something new awaits.",
  description:
    "Discover something new at NOVA. Explore our collection of products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
