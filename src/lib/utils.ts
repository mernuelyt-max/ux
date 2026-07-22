import type { Money } from "./shopify/types";

export function formatMoney(money: Money | undefined | null): string {
  if (!money) return "";
  const amount = Number(money.amount);
  try {
    return new Intl.NumberFormat("es", {
      style: "currency",
      currency: money.currencyCode || "USD",
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return `${money.currencyCode} ${amount.toFixed(2)}`;
  }
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
