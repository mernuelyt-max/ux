import type { Metadata } from "next";
import { getProducts } from "@/lib/shopify";
import { MembershipGrid } from "@/components/product/MembershipGrid";
import { Guarantee } from "@/components/home/Guarantee";
import { FAQ } from "@/components/home/FAQ";

export const metadata: Metadata = {
  title: "Membresías VIP",
  description:
    "Elige tu membresía en U del Closer: Starter, VIP o Elite. Sistema, mentoría y comunidad para cerrar más ventas.",
};

export default async function MembresiasPage() {
  const products = await getProducts(12);

  return (
    <>
      <section className="border-b border-ink-700 bg-ink-radial">
        <div className="container-page py-16 text-center md:py-20">
          <span className="eyebrow">Membresías</span>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold sm:text-5xl">
            Elige el plan que te lleva a tu{" "}
            <span className="gold-text">próximo nivel</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Todos los planes incluyen acceso inmediato, comunidad y la garantía
            de 7 días. Cancela cuando quieras.
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <MembershipGrid products={products} />
      </section>

      <Guarantee />
      <FAQ />
    </>
  );
}
