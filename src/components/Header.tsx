import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-black/10 bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" aria-label="NOVA homepage">
          <Image
            src="/nova-logo.svg"
            alt="NOVA"
            width={180}
            height={52}
            priority
          />
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-accent">
                Shop
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
