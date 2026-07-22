import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Únete a la membresía",
    body: "Elige tu plan y obtén acceso inmediato al campus, la comunidad y todo el material.",
  },
  {
    n: "02",
    title: "Aplica el sistema",
    body: "Sigue las rutas paso a paso, usa los scripts y practica en los lives semanales en vivo.",
  },
  {
    n: "03",
    title: "Cierra y escala",
    body: "Lleva tus llamadas a la comunidad, recibe feedback y sube de nivel a medida que facturas.",
  },
];

export function HowItWorks() {
  return (
    <section className="container-page py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Cómo funciona</span>
        <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
          De cero a closer en{" "}
          <span className="gold-text">3 pasos</span>
        </h2>
        <p className="mt-4 text-muted">
          Sin rodeos. Un camino claro desde que entras hasta que cierras tu
          próxima venta.
        </p>
      </Reveal>

      <div className="relative mt-16 grid gap-8 md:grid-cols-3">
        {/* Connecting line (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent md:block" />

        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 140} className="relative">
            <div className="card h-full p-8 text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold-500/40 bg-ink-900 font-display text-2xl font-extrabold gold-text">
                {step.n}
              </div>
              <h3 className="mt-6 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
