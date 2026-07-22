import type { Product } from "@/lib/shopify/types";
import { MembershipCard } from "./MembershipCard";
import { Reveal } from "@/components/ui/Reveal";

/** Heuristic: the "featured" tier is the one tagged destacado/vip, else the middle one. */
function pickFeaturedIndex(products: Product[]): number {
  const tagged = products.findIndex((p) =>
    p.tags.some((t) => ["destacado", "vip", "featured", "popular"].includes(t.toLowerCase()))
  );
  if (tagged >= 0) return tagged;
  return products.length >= 3 ? 1 : 0;
}

export function MembershipGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <p className="text-center text-muted">
        Pronto publicaremos nuestras membresías. Vuelve en breve.
      </p>
    );
  }
  const featuredIndex = pickFeaturedIndex(products);
  return (
    <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <Reveal key={product.id} delay={i * 120} from="up" className="flex">
          <MembershipCard
            product={product}
            featured={i === featuredIndex}
          />
        </Reveal>
      ))}
    </div>
  );
}
