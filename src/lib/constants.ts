export const SITE = {
  name: "U del Closer",
  tagline: "La membresía para closers que van en serio",
  description:
    "Membresías VIP de U del Closer: sistema, mentoría y comunidad para cerrar más ventas y escalar tus ingresos. Únete hoy.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export const NAV_LINKS = [
  { label: "Membresías", href: "/membresias" },
  { label: "Beneficios", href: "/#beneficios" },
  { label: "Resultados", href: "/#resultados" },
  { label: "Preguntas", href: "/#faq" },
] as const;

export const CART_COOKIE = "udc_cart_id";
