import type { Product } from "./types";

/**
 * Curated fallback membership tiers for "U del Closer".
 *
 * These render when the Storefront API is unreachable or before products are
 * mapped in Shopify. Handles/variant ids are placeholders — once real products
 * exist in Shopify, live data takes over automatically (see getProducts).
 *
 * To go fully live: create these as products in Shopify with matching handles,
 * or simply create your own — the storefront reads whatever exists.
 */
export const DEMO_PRODUCTS: Product[] = [
  {
    id: "demo/starter",
    handle: "membresia-starter",
    title: "Starter Closer",
    description:
      "El punto de entrada para dejar de improvisar. Fundamentos de cierre, scripts probados y la comunidad para no rendirte.",
    descriptionHtml:
      "<p>El punto de entrada para dejar de improvisar. Fundamentos de cierre, scripts probados y la comunidad para no rendirte.</p>",
    productType: "Membresía",
    tags: ["mensual", "starter"],
    availableForSale: true,
    featuredImage: null,
    images: [],
    priceRange: {
      minVariantPrice: { amount: "29.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "29.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "demo/starter/variant",
        title: "Mensual",
        availableForSale: true,
        price: { amount: "29.00", currencyCode: "USD" },
        compareAtPrice: { amount: "49.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Plan", value: "Mensual" }],
      },
    ],
    metafields: {
      badge: "",
      cta: "Empezar ahora",
      features:
        "Biblioteca de scripts de cierre|2 lives grupales al mes|Comunidad privada|Retos semanales",
    },
  },
  {
    id: "demo/vip",
    handle: "membresia-vip",
    title: "VIP Closer",
    description:
      "La membresía estrella. Mentoría directa, sistema completo de prospección y cierre, y acceso a todo el arsenal para escalar tus ventas.",
    descriptionHtml:
      "<p>La membresía estrella. Mentoría directa, sistema completo de prospección y cierre, y acceso a todo el arsenal para escalar tus ventas.</p>",
    productType: "Membresía",
    tags: ["mensual", "vip", "destacado"],
    availableForSale: true,
    featuredImage: null,
    images: [],
    priceRange: {
      minVariantPrice: { amount: "97.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "97.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "demo/vip/variant",
        title: "Mensual",
        availableForSale: true,
        price: { amount: "97.00", currencyCode: "USD" },
        compareAtPrice: { amount: "197.00", currencyCode: "USD" },
        selectedOptions: [{ name: "Plan", value: "Mensual" }],
      },
    ],
    metafields: {
      badge: "Más popular",
      cta: "Quiero ser VIP",
      features:
        "Todo lo de Starter|Mentoría grupal semanal en vivo|Sistema completo de prospección|Plantillas de objeciones y follow-up|Acceso al CRM de cierres|Soporte prioritario",
    },
  },
  {
    id: "demo/elite",
    handle: "membresia-elite",
    title: "Elite Inner Circle",
    description:
      "Para closers que van por las 6 y 7 cifras. Acompañamiento 1:1, revisión de tus llamadas reales y networking con top performers.",
    descriptionHtml:
      "<p>Para closers que van por las 6 y 7 cifras. Acompañamiento 1:1, revisión de tus llamadas reales y networking con top performers.</p>",
    productType: "Membresía",
    tags: ["mensual", "elite"],
    availableForSale: true,
    featuredImage: null,
    images: [],
    priceRange: {
      minVariantPrice: { amount: "297.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "297.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "demo/elite/variant",
        title: "Mensual",
        availableForSale: true,
        price: { amount: "297.00", currencyCode: "USD" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Plan", value: "Mensual" }],
      },
    ],
    metafields: {
      badge: "Cupos limitados",
      cta: "Aplicar al Inner Circle",
      features:
        "Todo lo de VIP|2 sesiones 1:1 al mes|Auditoría de tus llamadas de venta|Networking con closers de élite|Acceso anticipado a nuevas formaciones",
    },
  },
];

/** Parse the pipe-delimited features metafield into a clean list. */
export function parseFeatures(product: Product): string[] {
  const raw = product.metafields?.features ?? "";
  return raw
    .split("|")
    .map((f) => f.trim())
    .filter(Boolean);
}
