import { Reveal } from "@/components/ui/Reveal";

const BONUSES = [
  {
    icon: "📞",
    title: "Simulador de llamadas",
    value: "$197",
    body: "Practica objeciones reales con la comunidad antes de tu próxima llamada.",
  },
  {
    icon: "📄",
    title: "Vault de scripts",
    value: "$147",
    body: "+50 plantillas de prospección, follow-up y cierre listas para usar.",
  },
  {
    icon: "🧠",
    title: "Masterclass de mentalidad",
    value: "$97",
    body: "Rompe el miedo al 'no' y véndete a ti mismo antes de vender nada.",
  },
  {
    icon: "🎟️",
    title: "Acceso a eventos en vivo",
    value: "$250",
    body: "Entradas a los encuentros mensuales de networking con top closers.",
  },
];

export function Bonuses() {
  return (
    <section className="bg-paper-100 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Bonos incluidos</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Además, te llevas{" "}
            <span className="gold-text">estos extras</span>
          </h2>
          <p className="mt-4 text-muted">
            Incluidos sin costo adicional en tu membresía. Valor combinado de más
            de <strong className="text-ink-900">$690</strong>.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BONUSES.map((bonus, i) => (
            <Reveal key={bonus.title} delay={i * 100}>
              <div className="card group relative h-full overflow-hidden p-7">
                <div className="absolute right-4 top-4 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-600">
                  {bonus.value}
                </div>
                <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
                  {bonus.icon}
                </div>
                <h3 className="mt-5 font-bold">{bonus.title}</h3>
                <p className="mt-2 text-sm text-muted">{bonus.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
