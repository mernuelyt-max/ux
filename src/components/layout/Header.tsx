"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const { cart, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = cart?.totalQuantity ?? 0;

  return (
    <header
      id="header-group"
      className="sticky top-0 z-50 border-b border-paper-200 bg-paper-50/80 backdrop-blur-lg"
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-gradient text-ink-950">
            U
          </span>
          <span className="text-lg">
            {SITE.name.split(" ")[0]}{" "}
            <span className="text-muted font-semibold">del Closer</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative rounded-full border border-paper-300 bg-paper-0 p-2.5 hover:border-gold-500/60"
            aria-label="Abrir carrito"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H3m6 18a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-gold-500 text-[11px] font-bold text-ink-950">
                {count}
              </span>
            )}
          </button>

          <Link href="/membresias" className="btn-primary hidden sm:inline-flex">
            Unirme
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full border border-paper-300 bg-paper-0 p-2.5 md:hidden"
            aria-label="Abrir menú"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-paper-200 bg-paper-0 md:hidden">
          <div className="container-page flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium text-muted hover:text-ink-900"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/membresias"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-3"
            >
              Unirme ahora
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
