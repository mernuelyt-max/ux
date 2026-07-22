import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

const CREDS = [
  { value: 10, suffix: "+", label: "Años cerrando" },
  { value: 5000, prefix: "+", label: "Llamadas de venta" },
  { value: 300, prefix: "+", label: "Alumnos formados" },
];

export function Mentor() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal from="left">
          <div className="relative mx-auto max-w-sm">
            {/* Animated glow behind the avatar */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gold-gradient opacity-40 blur-3xl animate-glow-pulse" />
            <div className="card grid aspect-square place-items-center p-0">
              <div className="text-center">
                <div className="text-7xl animate-float">🎤</div>
                <p className="mt-4 font-display text-2xl font-extrabold gold-text">
                  Tu mentor
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal from="right" delay={120}>
          <span className="eyebrow">Conoce a tu mentor</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Aprende de quien lo{" "}
            <span className="gold-text">vive todos los días</span>
          </h2>
          <p className="mt-4 text-muted">
            No es teoría de manual. Detrás de U del Closer hay un equipo de
            closers en activo que sigue cerrando llamadas high ticket cada
            semana y te enseña exactamente lo que funciona hoy.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {CREDS.map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-ink-600 bg-ink-800/60 p-4 text-center"
              >
                <p className="font-display text-2xl font-extrabold gold-text">
                  <Counter value={c.value} prefix={c.prefix} suffix={c.suffix} />
                </p>
                <p className="mt-1 text-xs text-muted">{c.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
