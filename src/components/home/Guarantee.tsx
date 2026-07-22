export function Guarantee() {
  return (
    <section className="container-page py-16">
      <div className="card flex flex-col items-center gap-6 p-8 text-center md:flex-row md:p-10 md:text-left">
        <div className="grid h-20 w-20 flex-none place-items-center rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 text-4xl">
          🛡️
        </div>
        <div className="flex-1">
          <h3 className="font-display text-2xl font-extrabold">
            Garantía de 7 días sin riesgo
          </h3>
          <p className="mt-2 text-muted">
            Prueba la membresía completa durante 7 días. Si no sientes que te
            acerca a tu próximo cierre, te devolvemos el 100% de tu dinero. Sin
            preguntas incómodas.
          </p>
        </div>
      </div>
    </section>
  );
}
