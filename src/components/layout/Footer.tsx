import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-extrabold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-gradient text-ink-950">
                U
              </span>
              U del Closer
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted">
              La comunidad y el sistema para closers que quieren cerrar más,
              cobrar mejor y vivir de las ventas.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">
              Explorar
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/80 hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terminos" className="text-cream/80 hover:text-gold-400">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-cream/80 hover:text-gold-400">
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            Pago seguro con Shopify
          </p>
        </div>
      </div>
    </footer>
  );
}
