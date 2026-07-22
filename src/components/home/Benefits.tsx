import { Reveal } from "@/components/ui/Reveal";

const BENEFITS = [
  {
    icon: "🎯",
    title: "Sistema de cierre probado",
    body: "Deja la intuición. Sigue un método paso a paso para llevar a cualquier prospecto del 'lo voy a pensar' al 'dónde pago'.",
  },
  {
    icon: "🎙️",
    title: "Mentoría en vivo cada semana",
    body: "Lives grupales donde revisamos casos reales, practicamos objeciones y afinamos tu discurso en tiempo real.",
  },
  {
    icon: "📚",
    title: "Biblioteca de scripts",
    body: "Plantillas de prospección, follow-up y manejo de objeciones listas para copiar, pegar y cerrar.",
  },
  {
    icon: "👥",
    title: "Comunidad de closers",
    body: "Rodéate de gente que también va en serio. Networking, accountability y oportunidades reales de trabajo.",
  },
  {
    icon: "📈",
    title: "Seguimiento de resultados",
    body: "Mide tus llamadas, tu tasa de cierre y tu progreso. Lo que se mide, se mejora.",
  },
  {
    icon: "⚡",
    title: "Acceso inmediato",
    body: "Entras y empiezas hoy. Sin esperas, sin listas. Tu primera lección te espera al confirmar.",
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="container-page py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Por qué U del Closer</span>
        <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
          Todo lo que necesitas para{" "}
          <span className="gold-text">cerrar más</span>, en un solo lugar
        </h2>
        <p className="mt-4 text-muted">
          No es otro curso que compras y olvidas. Es un sistema vivo con
          acompañamiento para que de verdad cambies tus números.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((benefit, i) => (
          <Reveal key={benefit.title} delay={(i % 3) * 100}>
            <div className="card group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink-700 text-2xl transition-transform duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted">{benefit.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
