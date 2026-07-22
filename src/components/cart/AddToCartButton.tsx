"use client";

import { useState, useTransition } from "react";
import { useCart } from "./CartProvider";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  variantId,
  available,
  label = "Unirme ahora",
  variant = "primary",
  className,
}: {
  variantId: string;
  available: boolean;
  label?: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);
    startTransition(async () => {
      const err = await addItem(variantId);
      if (err) setError(err);
    });
  }

  return (
    <div className={className}>
      <button
        onClick={handleClick}
        disabled={!available || isPending}
        className={cn(
          "w-full",
          variant === "primary" ? "btn-primary" : "btn-ghost"
        )}
      >
        {isPending ? "Agregando…" : available ? label : "No disponible"}
      </button>
      {error && (
        <p className="mt-2 text-center text-xs text-gold-700">{error}</p>
      )}
    </div>
  );
}
