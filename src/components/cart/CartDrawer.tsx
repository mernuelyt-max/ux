"use client";

import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/utils";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isPending } =
    useCart();

  const lines = cart?.lines ?? [];
  const isEmpty = lines.length === 0;

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Carrito"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col
          border-l border-ink-600 bg-ink-900 shadow-2xl transition-transform
          duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-ink-700 px-6 py-5">
          <h2 className="text-lg font-bold">Tu selección</h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-muted hover:bg-ink-700 hover:text-cream"
            aria-label="Cerrar carrito"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="text-5xl">🔒</div>
            <p className="text-muted">
              Aún no has elegido tu membresía.
            </p>
            <button onClick={closeCart} className="btn-primary">
              Ver membresías
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink-700 overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 py-5">
                  <div className="flex h-16 w-16 flex-none items-center justify-center rounded-lg border border-ink-600 bg-ink-800 text-2xl">
                    {line.merchandise.product.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.title}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      "👑"
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {line.merchandise.product.title}
                    </p>
                    <p className="text-sm text-muted">
                      {line.merchandise.title}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex items-center rounded-full border border-ink-600">
                        <button
                          onClick={() =>
                            updateItem(line.id, line.quantity - 1)
                          }
                          disabled={isPending}
                          className="px-3 py-1 text-muted hover:text-cream"
                          aria-label="Reducir cantidad"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateItem(line.id, line.quantity + 1)
                          }
                          disabled={isPending}
                          className="px-3 py-1 text-muted hover:text-cream"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={isPending}
                        className="text-xs text-muted underline hover:text-gold-400"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                  <div className="flex-none text-right font-semibold">
                    {formatMoney(line.cost.totalAmount)}
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-ink-700 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-lg font-bold">
                  {formatMoney(cart?.cost.subtotalAmount)}
                </span>
              </div>
              <a
                href={cart?.checkoutUrl || "#"}
                className="btn-primary w-full"
                aria-disabled={!cart?.checkoutUrl}
              >
                Finalizar compra segura
              </a>
              <p className="mt-3 text-center text-xs text-muted">
                Pago seguro procesado por Shopify · Cancela cuando quieras
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
