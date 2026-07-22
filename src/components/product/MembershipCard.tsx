import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { parseFeatures } from "@/lib/shopify/demo-data";
import { formatMoney } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export function MembershipCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  const variant = product.variants[0];
  const features = parseFeatures(product);
  const badge = product.metafields?.badge || (featured ? "Más popular" : "");
  const cta = product.metafields?.cta || "Unirme ahora";
  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = variant?.compareAtPrice;

  return (
    <div
      className={`relative flex flex-col rounded-xl2 border p-7 transition-transform duration-300 ${
        featured
          ? "border-gold-500/60 bg-ink-800 shadow-gold md:-translate-y-3 md:scale-[1.02]"
          : "border-ink-600 bg-ink-800/60 hover:-translate-y-1"
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-xs font-bold ${
            featured
              ? "bg-gold-gradient text-ink-950"
              : "border border-ink-600 bg-ink-900 text-gold-300"
          }`}
        >
          {badge}
        </span>
      )}

      <h3 className="font-display text-xl font-extrabold">{product.title}</h3>
      <p className="mt-2 min-h-[3rem] text-sm text-muted">
        {product.description}
      </p>

      <div className="mt-6 flex items-end gap-2">
        <span className="font-display text-4xl font-extrabold gold-text">
          {formatMoney(price)}
        </span>
        <span className="pb-1 text-sm text-muted">/mes</span>
      </div>
      {compareAt && (
        <p className="mt-1 text-sm text-muted">
          <span className="line-through">{formatMoney(compareAt)}</span>{" "}
          <span className="font-semibold text-emerald-400">
            precio de lanzamiento
          </span>
        </p>
      )}

      <ul className="my-7 space-y-3 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-4 w-4 flex-none text-gold-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-cream/90">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        {variant ? (
          <AddToCartButton
            variantId={variant.id}
            available={variant.availableForSale}
            label={cta}
            variant={featured ? "primary" : "ghost"}
          />
        ) : (
          <Link href={`/producto/${product.handle}`} className="btn-ghost w-full">
            Ver detalles
          </Link>
        )}
        <Link
          href={`/producto/${product.handle}`}
          className="mt-3 block text-center text-xs text-muted underline hover:text-gold-400"
        >
          Ver todo lo que incluye
        </Link>
      </div>
    </div>
  );
}
