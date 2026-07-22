"use client";

import { useState, type FormEvent } from "react";

export function LeadCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Frontend-only demo. Conecta aquí tu ESP (Klaviyo, Mailchipm, etc.)
    // o una Server Action que cree un customer en Shopify.
    setStatus("ok");
    setEmail("");
  }

  return (
    <section className="container-page py-16">
      <div className="relative overflow-hidden rounded-xl2 border border-paper-300 bg-paper-0 p-8 md:p-12">
        <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="eyebrow">Guía gratis</span>
            <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
              Descarga: <span className="gold-text">10 frases que cierran</span>
            </h2>
            <p className="mt-3 text-muted">
              Déjanos tu correo y te enviamos gratis nuestra mini-guía con las
              frases exactas para manejar las 10 objeciones más comunes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {status === "ok" ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-center text-emerald-600">
                <p className="text-2xl">✅</p>
                <p className="mt-2 font-semibold">¡Listo! Revisa tu correo.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full rounded-full border border-paper-300 bg-paper-0 px-5 py-3 text-sm text-ink-900 placeholder:text-muted focus:border-gold-500/60 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Enviármela
                </button>
              </div>
            )}
            <p className="mt-3 text-center text-xs text-muted sm:text-left">
              Sin spam. Cancela tu suscripción cuando quieras.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
