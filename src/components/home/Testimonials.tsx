import { Reveal } from "@/components/ui/Reveal";

const TESTIMONIALS = [
  {
    name: "Marcos R.",
    role: "Closer de high ticket",
    quote:
      "En 6 semanas pasé de cerrar 1 de cada 10 a 4 de cada 10. Los scripts de objeciones son oro puro.",
    result: "+$12.400 en un mes",
  },
  {
    name: "Valentina S.",
    role: "Setter → Closer",
    quote:
      "Entré sin experiencia. La mentoría en vivo me dio la confianza para pedir el pago sin titubear.",
    result: "Primer cierre en 2 semanas",
  },
  {
    name: "Diego M.",
    role: "Freelancer",
    quote:
      "La comunidad sola ya vale la membresía. Conseguí 2 clientes recurrentes por el networking interno.",
    result: "2 clientes nuevos",
  },
  {
    name: "Camila T.",
    role: "Vendedora B2B",
    quote:
      "Dejé de improvisar. Ahora tengo un proceso y mis números por fin son predecibles.",
    result: "Tasa de cierre 3x",
  },
];

export function Testimonials() {
  return (
    <section id="resultados" className="bg-ink-900/40 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Resultados reales</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Los números hablan.{" "}
            <span className="gold-text">Los cierres, más</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              as="figure"
              key={t.name}
              delay={(i % 2) * 120}
              from={i % 2 ? "right" : "left"}
              className="card flex flex-col p-7"
            >
              <div className="text-gold-400">★★★★★</div>
              <blockquote className="mt-4 flex-1 text-lg text-cream/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-ink-700 pt-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-gradient font-bold text-ink-950">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                  {t.result}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
