import { Reveal } from "@/components/ui/Reveal";

const ROWS = [
  { before: "Improvisas cada llamada", after: "Sigues un guion probado" },
  { before: "Te tiemblan las manos al pedir el pago", after: "Cierras con seguridad" },
  { before: "'Déjame pensarlo' te mata las ventas", after: "Manejas cualquier objeción" },
  { before: "Ingresos impredecibles", after: "Números constantes y medibles" },
  { before: "Aprendes solo, a prueba y error", after: "Comunidad y mentoría cada semana" },
];

export function Comparison() {
  return (
    <section className="container-page py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">El antes y el después</span>
        <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
          Tu transformación como{" "}
          <span className="gold-text">closer</span>
        </h2>
      </Reveal>

      <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-xl2 border border-ink-600">
        <div className="grid grid-cols-2 text-sm font-bold uppercase tracking-wider">
          <div className="bg-ink-800 px-6 py-4 text-muted">Sin U del Closer</div>
          <div className="bg-gold-500/10 px-6 py-4 text-gold-300">
            Con U del Closer
          </div>
        </div>
        {ROWS.map((row, i) => (
          <Reveal
            key={row.after}
            delay={i * 80}
            from="none"
            className={`grid grid-cols-2 border-t border-ink-700 ${
              i % 2 ? "bg-ink-900/40" : ""
            }`}
          >
            <div className="flex items-center gap-3 px-6 py-4 text-muted">
              <span className="text-ink-600">✕</span>
              <span className="line-through decoration-ink-500">
                {row.before}
              </span>
            </div>
            <div className="flex items-center gap-3 bg-gold-500/[0.04] px-6 py-4">
              <span className="text-gold-400">✓</span>
              <span className="text-cream/90">{row.after}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
