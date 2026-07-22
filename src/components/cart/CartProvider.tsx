"use client";

import {
  createContext,
  useContext,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import type { Cart } from "@/lib/shopify/types";
import {
  addItemAction,
  removeItemAction,
  updateItemAction,
} from "@/lib/actions";
import { CartDrawer } from "./CartDrawer";

type CartContextValue = {
  cart: Cart | null;
  isPending: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string) => Promise<string | undefined>;
  updateItem: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null;
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  async function addItem(variantId: string): Promise<string | undefined> {
    const res = await addItemAction(variantId, 1);
    if (res.error) return res.error;
    if (res.cart) {
      setCart(res.cart);
      setIsOpen(true);
    }
    return undefined;
  }

  function updateItem(lineId: string, quantity: number) {
    startTransition(async () => {
      const res = await updateItemAction(lineId, quantity);
      if (res.cart) setCart(res.cart);
    });
  }

  function removeItem(lineId: string) {
    startTransition(async () => {
      const res = await removeItemAction(lineId);
      if (res.cart) setCart(res.cart);
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isPending,
        isOpen,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
