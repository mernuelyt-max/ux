"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CART_COOKIE } from "./constants";
import {
  addToCart,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
  isShopifyConfigured,
} from "./shopify";
import type { Cart } from "./shopify/types";

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 14, // 14 days
};

export async function getCartAction(): Promise<Cart | null> {
  const cartId = cookies().get(CART_COOKIE)?.value;
  if (!cartId) return null;
  return getCart(cartId);
}

/**
 * Add a variant to the cart, creating the cart on first add and persisting the
 * cart id in an httpOnly cookie. Returns the updated cart (or an error shape).
 */
export async function addItemAction(
  variantId: string,
  quantity = 1
): Promise<{ cart: Cart | null; error?: string }> {
  if (!isShopifyConfigured) {
    return {
      cart: null,
      error:
        "La tienda aún no está conectada a Shopify. Configura SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_TOKEN.",
    };
  }
  if (!variantId || variantId.startsWith("demo/")) {
    return {
      cart: null,
      error:
        "Este es un plan de demostración. Crea el producto en Shopify para habilitar la compra.",
    };
  }

  try {
    const existingId = cookies().get(CART_COOKIE)?.value;
    let cart: Cart;
    if (existingId) {
      cart = await addToCart(existingId, variantId, quantity);
    } else {
      cart = await createCart(variantId, quantity);
      cookies().set(CART_COOKIE, cart.id, COOKIE_OPTS);
    }
    revalidatePath("/");
    return { cart };
  } catch (e) {
    return { cart: null, error: (e as Error).message };
  }
}

export async function updateItemAction(
  lineId: string,
  quantity: number
): Promise<{ cart: Cart | null; error?: string }> {
  const cartId = cookies().get(CART_COOKIE)?.value;
  if (!cartId) return { cart: null, error: "No hay carrito activo." };
  try {
    const cart =
      quantity <= 0
        ? await removeCartLine(cartId, lineId)
        : await updateCartLine(cartId, lineId, quantity);
    revalidatePath("/");
    return { cart };
  } catch (e) {
    return { cart: null, error: (e as Error).message };
  }
}

export async function removeItemAction(
  lineId: string
): Promise<{ cart: Cart | null; error?: string }> {
  const cartId = cookies().get(CART_COOKIE)?.value;
  if (!cartId) return { cart: null, error: "No hay carrito activo." };
  try {
    const cart = await removeCartLine(cartId, lineId);
    revalidatePath("/");
    return { cart };
  } catch (e) {
    return { cart: null, error: (e as Error).message };
  }
}
