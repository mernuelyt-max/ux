import { Marquee } from "@/components/ui/Marquee";

const NICHES = [
  "Coaching",
  "Agencias de marketing",
  "Bienes raíces",
  "SaaS B2B",
  "Infoproductos",
  "Consultoría",
  "Fitness",
  "Finanzas",
  "E-commerce",
  "Seguros",
];

export function LogosMarquee() {
  return (
    <section className="border-b border-ink-700 bg-ink-950 py-10">
      <p className="container-page mb-6 text-center text-xs uppercase tracking-[0.2em] text-muted">
        Nuestros closers cierran en todo tipo de industrias
      </p>
      <Marquee>
        {NICHES.map((niche) => (
          <span
            key={niche}
            className="flex items-center gap-3 text-lg font-semibold text-cream/40"
          >
            <span className="text-gold-500">◆</span>
            {niche}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
