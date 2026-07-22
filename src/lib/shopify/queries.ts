import { PRODUCT_FRAGMENT } from "./fragments";

export const GET_SHOP_QUERY = /* GraphQL */ `
  query GetShop {
    shop {
      name
      description
      primaryDomain {
        url
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = /* GraphQL */ `
  query GetProducts($first: Int!, $sortKey: ProductSortKeys, $query: String) {
    products(first: $first, sortKey: $sortKey, query: $query) {
      edges {
        node {
          ...ProductFields
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
  ${PRODUCT_FRAGMENT}
`;
