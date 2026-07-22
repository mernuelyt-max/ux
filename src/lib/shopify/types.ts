// Minimal, storefront-focused type surface for the Shopify Storefront API.

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: { name: string; value: string }[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  variants: ProductVariant[];
  // Optional Shopify metafields used to enrich membership tiers.
  metafields?: Record<string, string | null>;
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: {
    id: string;
    title: string;
    product: {
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
    };
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: CartLine[];
};

// Shape returned by the raw GraphQL edges/nodes before normalization.
export type Connection<T> = {
  edges: { node: T }[];
};
