import { GET_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY } from "./queries";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  GET_CART_QUERY,
} from "./mutations";
import type { Cart, Connection, Product, ProductVariant } from "./types";
import { DEMO_PRODUCTS } from "./demo-data";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-10";

export const isShopifyConfigured = Boolean(DOMAIN && TOKEN);

const endpoint = DOMAIN
  ? `https://${DOMAIN}/api/${API_VERSION}/graphql.json`
  : "";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

/**
 * Low-level Storefront API fetch. Throws on network/GraphQL errors so callers
 * can decide whether to surface an error or fall back to demo content.
 */
export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  revalidate,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number;
}): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error("Shopify is not configured (missing domain or token).");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    cache: revalidate ? undefined : cache,
    ...(revalidate ? { next: { revalidate } } : {}),
  });

  if (!res.ok) {
    throw new Error(`Storefront API error: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Storefront API returned no data.");
  }
  return json.data;
}

// ── Normalizers ────────────────────────────────────────────────

type RawProduct = Omit<Product, "images" | "variants"> & {
  images: Connection<Product["images"][number]>;
  variants: Connection<ProductVariant>;
};

function normalizeProduct(node: RawProduct): Product {
  return {
    ...node,
    images: node.images?.edges.map((e) => e.node) ?? [],
    variants: node.variants?.edges.map((e) => e.node) ?? [],
  };
}

function normalizeCart(raw: any): Cart {
  return {
    ...raw,
    lines: raw.lines?.edges.map((e: any) => e.node) ?? [],
  };
}

// ── Public product API ─────────────────────────────────────────

/**
 * Fetch the membership catalog. Falls back to curated demo tiers when Shopify
 * is unreachable or unconfigured, so the storefront always renders.
 */
export async function getProducts(first = 12): Promise<Product[]> {
  if (!isShopifyConfigured) return DEMO_PRODUCTS;
  try {
    const data = await shopifyFetch<{ products: Connection<RawProduct> }>({
      query: GET_PRODUCTS_QUERY,
      variables: { first, sortKey: "BEST_SELLING" },
      revalidate: 60,
    });
    const products = data.products.edges.map((e) => normalizeProduct(e.node));
    return products.length ? products : DEMO_PRODUCTS;
  } catch {
    return DEMO_PRODUCTS;
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) {
    return DEMO_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }
  try {
    const data = await shopifyFetch<{ product: RawProduct | null }>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      revalidate: 60,
    });
    return data.product ? normalizeProduct(data.product) : null;
  } catch {
    return DEMO_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }
}

// ── Public cart API ────────────────────────────────────────────

export async function createCart(
  variantId: string,
  quantity = 1
): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: any } }>({
    query: CART_CREATE_MUTATION,
    variables: { lines: [{ merchandiseId: variantId, quantity }] },
    cache: "no-store",
  });
  return normalizeCart(data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: any } }>({
    query: CART_LINES_ADD_MUTATION,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
    cache: "no-store",
  });
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: any } }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines: [{ id: lineId, quantity }] },
    cache: "no-store",
  });
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(
  cartId: string,
  lineId: string
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: any } }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds: [lineId] },
    cache: "no-store",
  });
  return normalizeCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const data = await shopifyFetch<{ cart: any | null }>({
      query: GET_CART_QUERY,
      variables: { cartId },
      cache: "no-store",
    });
    return data.cart ? normalizeCart(data.cart) : null;
  } catch {
    return null;
  }
}
