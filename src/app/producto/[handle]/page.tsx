import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getProducts } from "@/lib/shopify";
import { parseFeatures } from "@/lib/shopify/demo-data";
import { formatMoney } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Guarantee } from "@/components/home/Guarantee";

type Params = { params: { handle: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = await getProduct(params.handle);
  if (!product) return { title: "Membresía no encontrada" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Params) {
  const product = await getProduct(params.handle);
  if (!product) notFound();

  const variant = product.variants[0];
  const features = parseFeatures(product);
  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = variant?.compareAtPrice;
  const cta = product.metafields?.cta || "Unirme ahora";

  return (
    <>
      <section className="border-b border-paper-200 bg-paper-radial">
        <div className="container-page grid gap-12 py-14 md:grid-cols-2 md:py-20">
          {/* Media */}
          <div className="card grid aspect-square place-items-center overflow-hidden p-0">
            {product.featuredImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="text-7xl">👑</div>
                <p className="mt-4 font-display text-2xl font-extrabold gold-text">
                  {product.title}
                </p>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <Link
              href="/membresias"
              className="text-sm text-muted hover:text-gold-600"
            >
              ← Todas las membresías
            </Link>
            <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-4xl font-extrabold gold-text">
                {formatMoney(price)}
              </span>
              <span className="pb-1 text-muted">/mes</span>
              {compareAt && (
                <span className="pb-1 text-muted line-through">
                  {formatMoney(compareAt)}
                </span>
              )}
            </div>

            <p className="mt-6 text-muted">{product.description}</p>

            {features.length > 0 && (
              <ul className="mt-8 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-none text-gold-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 max-w-sm">
              {variant && (
                <AddToCartButton
                  variantId={variant.id}
                  available={variant.availableForSale}
                  label={cta}
                />
              )}
              <p className="mt-3 text-center text-xs text-muted">
                Pago seguro con Shopify · Garantía de 7 días · Cancela cuando
                quieras
              </p>
            </div>
          </div>
        </div>
      </section>

      {product.descriptionHtml && (
        <section className="container-page py-16">
          <div
            className="prose prose-invert mx-auto max-w-3xl text-ink-800"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </section>
      )}

      <Guarantee />
    </>
  );
}

export async function generateStaticParams() {
  const products = await getProducts(20);
  return products.map((p) => ({ handle: p.handle }));
}
