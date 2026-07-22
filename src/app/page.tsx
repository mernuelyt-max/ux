import { getProducts } from "@/lib/shopify";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Benefits } from "@/components/home/Benefits";
import { MembershipGrid } from "@/components/product/MembershipGrid";
import { Testimonials } from "@/components/home/Testimonials";
import { Guarantee } from "@/components/home/Guarantee";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";

export default async function HomePage() {
  const products = await getProducts(6);

  return (
    <>
      <AnnouncementBar />
      <Hero />
      <TrustBar />
      <Benefits />

      <section id="membresias" className="container-page py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Elige tu nivel</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Membresías hechas para{" "}
            <span className="gold-text">cada etapa</span> de tu carrera
          </h2>
          <p className="mt-4 text-muted">
            Empieza donde estés hoy y sube de nivel cuando tus cierres lo pidan.
          </p>
        </div>
        <div className="mt-16">
          <MembershipGrid products={products} />
        </div>
      </section>

      <Testimonials />
      <Guarantee />
      <FAQ />
      <CTASection />
    </>
  );
}
