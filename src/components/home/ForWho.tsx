import { Reveal } from "@/components/ui/Reveal";

const FOR = [
  "Quieres vivir de las ventas y dejar de depender de un sueldo fijo",
  "Ya vendes pero tus resultados son inconsistentes",
  "Empiezas de cero y buscas una ruta clara, sin humo",
  "Tienes producto/servicio y no sabes cómo cerrar high ticket",
  "Estás dispuesto a practicar y aplicar, no solo a consumir",
];

const NOT_FOR = [
  "Buscas dinero fácil sin esfuerzo ni práctica",
  "No estás dispuesto a hacer llamadas ni a incomodarte",
  "Solo coleccionas cursos y nunca los aplicas",
  "Crees que un video mágico te hará closer de la noche a la mañana",
];

export function ForWho() {
  return (
    <section className="bg-paper-100 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">¿Es para ti?</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Seamos <span className="gold-text">honestos</span>
          </h2>
          <p className="mt-4 text-muted">
            U del Closer no es para todos. Así sabes si encajas antes de entrar.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal from="left">
            <div className="h-full rounded-xl2 border border-emerald-500/30 bg-emerald-500/[0.06] p-8">
              <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-600">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/15">
                  ✓
                </span>
                Es para ti si…
              </h3>
              <ul className="mt-6 space-y-4">
                {FOR.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-800">
                    <span className="mt-1 text-emerald-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal from="right" delay={120}>
            <div className="h-full rounded-xl2 border border-paper-300 bg-paper-0 p-8">
              <h3 className="flex items-center gap-2 text-lg font-bold text-muted">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-paper-100">
                  ✕
                </span>
                No es para ti si…
              </h3>
              <ul className="mt-6 space-y-4">
                {NOT_FOR.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <span className="mt-1">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
