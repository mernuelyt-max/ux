"use client";

import { usePathname } from "next/navigation";

/**
 * Oculta el header y el footer del sitio en la landing ("/"), donde el
 * diseño va a pantalla completa sin navegación. En el resto de las páginas
 * (membresías, producto, etc.) el chrome se muestra normalmente.
 *
 * Para ocultarlos en más páginas, agrega sus rutas a HIDDEN_ROUTES.
 */
const HIDDEN_ROUTES = ["/"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (HIDDEN_ROUTES.includes(pathname)) return null;
  return <>{children}</>;
}
