import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts(50);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE.url}/membresias`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE.url}/producto/${p.handle}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
