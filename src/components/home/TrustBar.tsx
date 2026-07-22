const STATS = [
  { value: "+2.400", label: "Miembros activos" },
  { value: "+$1.2M", label: "En cierres reportados" },
  { value: "38%", label: "Tasa media de cierre" },
  { value: "4.9/5", label: "Valoración de la comunidad" },
];

export function TrustBar() {
  return (
    <section className="border-y border-ink-700 bg-ink-900/50">
      <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-extrabold gold-text">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
