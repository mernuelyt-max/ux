// Reusable GraphQL fragments.

/**
 * Metafield namespace + keys the storefront reads to enrich membership cards.
 * Create these on your products in Shopify (Settings → Custom data → Products)
 * and enable "Storefront API access" on each definition.
 *
 * Change SHOPIFY_METAFIELD_NS to match your own namespace if you use another.
 */
export const METAFIELD_NS =
  process.env.SHOPIFY_METAFIELD_NS || "custom";

export const METAFIELD_KEYS = ["badge", "cta", "features"] as const;

export const IMAGE_FRAGMENT = /* GraphQL */ `
  fragment ImageFields on Image {
    url
    altText
    width
    height
  }
`;

export const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    productType
    tags
    availableForSale
    featuredImage {
      ...ImageFields
    }
    images(first: 8) {
      edges {
        node {
          ...ImageFields
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    metafields(identifiers: [
      { namespace: "${METAFIELD_NS}", key: "badge" }
      { namespace: "${METAFIELD_NS}", key: "cta" }
      { namespace: "${METAFIELD_NS}", key: "features" }
    ]) {
      key
      value
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                handle
                title
                featuredImage {
                  ...ImageFields
                }
              }
            }
          }
        }
      }
    }
  }
  ${IMAGE_FRAGMENT}
`;
