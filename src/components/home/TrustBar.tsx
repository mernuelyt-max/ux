import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { value: 2400, prefix: "+", suffix: "", label: "Miembros activos" },
  { value: 1.2, prefix: "+$", suffix: "M", decimals: 1, label: "En cierres reportados" },
  { value: 38, prefix: "", suffix: "%", label: "Tasa media de cierre" },
  { value: 4.9, prefix: "", suffix: "/5", decimals: 1, label: "Valoración de la comunidad" },
];

export function TrustBar() {
  return (
    <section className="border-y border-paper-200 bg-paper-100">
      <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} className="text-center">
            <p className="font-display text-3xl font-extrabold gold-text sm:text-4xl">
              <Counter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals ?? 0}
              />
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
