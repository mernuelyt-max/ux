import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection() {
  return (
    <section className="container-page py-20">
      <Reveal className="relative overflow-hidden rounded-xl2 border border-gold-500/30 bg-paper-0 p-10 text-center md:p-16">
        <div className="pointer-events-none absolute inset-0 bg-paper-radial opacity-70" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Tu próximo cierre empieza{" "}
            <span className="gold-text">hoy</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Cada día que esperas es un cliente que cierra otro. Únete a U del
            Closer y convierte tus conversaciones en ventas.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/membresias" className="btn-primary text-base">
              Elegir mi membresía
            </Link>
            <Link href="/#faq" className="btn-ghost text-base">
              Tengo dudas
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted">
            Garantía de 7 días · Cancela cuando quieras · Acceso inmediato
          </p>
        </div>
      </Reveal>
    </section>
  );
}
