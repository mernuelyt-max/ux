import { Reveal } from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "¿Necesito experiencia previa en ventas?",
    a: "No. Tenemos rutas para quien empieza desde cero y para closers que ya facturan y quieren escalar. Empiezas justo en tu nivel.",
  },
  {
    q: "¿Cómo funciona el pago de la membresía?",
    a: "Es una suscripción mensual. Pagas de forma segura con tarjeta a través de Shopify y puedes cancelar cuando quieras desde tu cuenta.",
  },
  {
    q: "¿Cuánto tiempo necesito dedicarle por semana?",
    a: "Con 3-4 horas semanales aprovechas los lives y aplicas los scripts. Todo queda grabado, así que avanzas a tu ritmo.",
  },
  {
    q: "¿Puedo cambiar de plan más adelante?",
    a: "Sí. Puedes subir o bajar de plan cuando quieras. Muchos empiezan en Starter y saltan a VIP cuando ven resultados.",
  },
  {
    q: "¿Qué pasa si no me gusta?",
    a: "Tienes 7 días de garantía. Si no es para ti, escríbenos y te devolvemos el 100%. Cero riesgo.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="container-page py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Resolvemos tus <span className="gold-text">dudas</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, i) => (
            <Reveal
              as="details"
              key={faq.q}
              delay={i * 70}
              from="up"
              className="group card overflow-hidden p-0 [&_summary]:cursor-pointer"
            >
              <summary className="flex list-none items-center justify-between gap-4 p-6 font-semibold">
                {faq.q}
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-paper-300 text-gold-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-muted">{faq.a}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
