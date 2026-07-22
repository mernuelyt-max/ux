import { getProducts } from "@/lib/shopify";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Hero } from "@/components/home/Hero";
import { LogosMarquee } from "@/components/home/LogosMarquee";
import { TrustBar } from "@/components/home/TrustBar";
import { Benefits } from "@/components/home/Benefits";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Comparison } from "@/components/home/Comparison";
import { MembershipGrid } from "@/components/product/MembershipGrid";
import { Bonuses } from "@/components/home/Bonuses";
import { Mentor } from "@/components/home/Mentor";
import { ForWho } from "@/components/home/ForWho";
import { Testimonials } from "@/components/home/Testimonials";
import { Guarantee } from "@/components/home/Guarantee";
import { FAQ } from "@/components/home/FAQ";
import { LeadCapture } from "@/components/home/LeadCapture";
import { CTASection } from "@/components/home/CTASection";
import { Reveal } from "@/components/ui/Reveal";

export default async function HomePage() {
  const products = await getProducts(6);

  return (
    <>
      <AnnouncementBar />
      <Hero />
      <LogosMarquee />
      <TrustBar />
      <Benefits />
      <HowItWorks />
      <Comparison />

      <section id="membresias" className="container-page py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Elige tu nivel</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Membresías hechas para{" "}
            <span className="gold-text">cada etapa</span> de tu carrera
          </h2>
          <p className="mt-4 text-muted">
            Empieza donde estés hoy y sube de nivel cuando tus cierres lo pidan.
          </p>
        </Reveal>
        <div className="mt-16">
          <MembershipGrid products={products} />
        </div>
      </section>

      <Bonuses />
      <Mentor />
      <ForWho />
      <Testimonials />
      <Guarantee />
      <FAQ />
      <LeadCapture />
      <CTASection />
    </>
  );
}
