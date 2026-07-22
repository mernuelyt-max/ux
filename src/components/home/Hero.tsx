import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper-radial">
      {/* Animated ambient glows */}
      <div className="container-page relative grid gap-12 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
        <div className="animate-fade-up">
          <span className="eyebrow">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
            Membresías VIP para closers
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Deja de perseguir clientes.
            <br />
            <span className="gold-text">Aprende a cerrarlos.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted">
            Únete a la comunidad de <strong className="text-ink-900">U del Closer</strong> y
            accede al sistema, la mentoría y los scripts que usan los closers que
            facturan de verdad. Sin humo. Puro cierre.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/membresias" className="btn-primary text-base">
              Ver membresías
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14m-6-6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/#resultados" className="btn-ghost text-base">
              Ver resultados reales
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["#FFC93C", "#10B981", "#F5B301", "#A66F00"].map((c) => (
                  <span
                    key={c}
                    className="h-7 w-7 rounded-full border-2 border-paper-0"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span>
                <strong className="text-ink-900">+2.400</strong> miembros activos
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gold-600">★★★★★</span>
              <span>
                <strong className="text-ink-900">4.9</strong> / 5 valoración
              </span>
            </div>
          </div>
        </div>

        {/* Visual card */}
        <div className="animate-fade-up [animation-delay:120ms]">
          <div className="card relative mx-auto max-w-sm p-6 md:animate-float">
            <div className="absolute -right-3 -top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-ink-950">
              EN VIVO
            </div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Cierre del día
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold gold-text">
              +$4.850 USD
            </p>
            <p className="mt-1 text-sm text-muted">
              Marcos cerró una llamada de high ticket usando el script de
              objeciones VIP.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { label: "Tasa de cierre", value: "38%", w: "38%" },
                { label: "Meta del mes", value: "82%", w: "82%" },
                { label: "Constancia", value: "95%", w: "95%" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-xs text-muted">
                    <span>{row.label}</span>
                    <span className="text-ink-900">{row.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-paper-100">
                    <div
                      className="h-2 rounded-full bg-gold-gradient"
                      style={{ width: row.w }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
