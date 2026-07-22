# U del Closer — Headless VIP Membership Storefront

Tienda headless de alta conversión para **U del Closer**, construida con
**Next.js 14 (App Router)** + **Shopify Storefront API**. Diseñada para vender
membresías VIP de formación/mentoría en ventas ("closers").

---

## ⚠️ Seguridad — léelo primero

Durante la creación del proyecto se compartió un **Admin API token**
(`shpat_...`) en texto plano. Un Admin token da acceso amplio de lectura y
**escritura** a toda tu tienda Shopify.

**Acciones recomendadas ahora mismo:**

1. **Rota / revoca ese Admin API token** en Shopify:
   _Ajustes → Apps y canales de venta → Desarrollar apps → (tu app) → API
   credentials → revoke / regenerate._ Un token que ha viajado por un chat
   debe considerarse comprometido.
2. Este storefront **no usa ni necesita** el Admin token. Solo usa el
   **Storefront API token** (de alcance público, pensado para el navegador).
3. El Admin token **no está guardado en este repositorio** ni en `.env.local`.
   Nunca lo pongas en un proyecto frontend ni lo subas a git.

El `.gitignore` bloquea `.env*.local`, así que tus tokens locales no se
suben. Para producción, configura las variables de entorno en tu hosting
(Vercel, etc.), no en el código.

---

## Stack

- **Next.js 14** (App Router, Server Components, Server Actions)
- **TypeScript** (strict)
- **Tailwind CSS** con design tokens propios (psicología del color)
- **Shopify Storefront API** (GraphQL) para catálogo y carrito
- Sin dependencias de UI externas — CSS y componentes propios
- Fuentes del sistema (cero fetch externo, cero layout shift)

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
#   Edita .env.local con tu dominio y Storefront token.

# 3. Desarrollo
npm run dev            # http://localhost:3000

# 4. Producción
npm run build && npm run start
```

### Variables de entorno

| Variable                    | Descripción                                             |
| --------------------------- | ------------------------------------------------------- |
| `SHOPIFY_STORE_DOMAIN`      | `tu-tienda.myshopify.com` (sin `https://`)              |
| `SHOPIFY_STOREFRONT_TOKEN`  | Storefront API access token (alcance público)           |
| `SHOPIFY_API_VERSION`       | Versión de la API (por defecto `2024-10`)               |
| `NEXT_PUBLIC_SITE_URL`      | URL pública del sitio (para metadata/canonical)         |

## Modo demo (fallback automático)

Si la Storefront API no está configurada o no responde, el sitio muestra
**tres membresías de demostración** (Starter / VIP / Elite) para que la página
siempre renderice. Ver `src/lib/shopify/demo-data.ts`.

En cuanto crees productos reales en Shopify, la tienda usa datos en vivo
automáticamente. Los botones de compra de los planes demo están desactivados
hasta que exista el producto real en Shopify.

### Cómo mapear tus membresías reales

Crea cada membresía como **producto** en Shopify. Para enriquecer las
tarjetas puedes usar estos campos:

- **Tags**: añade `destacado` (o `vip`) al plan que quieres resaltar como
  "Más popular".
- **Precio de comparación** (`compare-at price`): se muestra tachado como
  precio de lanzamiento.
- **Metafields** opcionales (namespace libre, mapea en `fragments.ts` si los
  añades a la query):
  - `badge` — etiqueta superior (ej. "Más popular", "Cupos limitados")
  - `cta` — texto del botón (ej. "Quiero ser VIP")
  - `features` — beneficios separados por `|`

> Para cobros recurrentes reales (suscripción mensual), usa una app de
> subscripciones de Shopify (Shopify Subscriptions, Recharge, etc.). El
> storefront ya lleva al checkout nativo de Shopify vía `checkoutUrl`.

## Arquitectura

```
src/
├── app/                      # App Router
│   ├── layout.tsx            # Layout raíz + carga inicial del carrito
│   ├── page.tsx              # Landing de conversión (home)
│   ├── membresias/           # Listado de planes
│   ├── producto/[handle]/    # Detalle de membresía (SSG + fallback)
│   ├── not-found.tsx
│   └── globals.css           # Design tokens + utilidades
├── components/
│   ├── layout/               # Header, Footer
│   ├── home/                 # Hero, TrustBar, Benefits, Testimonials, FAQ...
│   ├── product/              # MembershipCard, MembershipGrid
│   └── cart/                 # CartProvider, CartDrawer, AddToCartButton
└── lib/
    ├── shopify/              # Cliente Storefront API, queries, mutations, tipos
    ├── actions.ts            # Server Actions del carrito (cookie httpOnly)
    ├── constants.ts
    └── utils.ts              # formato de moneda, helpers
```

**Flujo del carrito:** Server Actions crean/actualizan un carrito Shopify y
guardan el `cartId` en una cookie `httpOnly`. El checkout redirige al
`checkoutUrl` nativo de Shopify (pago seguro, PCI a cargo de Shopify).

## Decisiones de diseño (CRO + psicología del color)

- **Fondo casi negro (`ink`)** → exclusividad, lujo, foco; el lienzo premium
  ideal para una marca de membresía VIP.
- **Oro/ámbar (`gold`)** → riqueza, logro, estatus. Es el color de conversión
  principal (CTAs) porque destaca con máximo contraste sobre el fondo oscuro.
- **Verde esmeralda** → "dinero que entra", confirmaciones y garantía.
- **Elementos de conversión:** barra de urgencia, prueba social (miembros,
  valoración, cierres), garantía sin riesgo, testimonios con resultados
  cuantificados, FAQ para resolver objeciones, CTAs repetidos y jerarquía de
  precios con plan destacado.

## Notas de seguridad de dependencias

Fijado a **Next.js 14.2.x** (última patch, `14.2.35`) por requisito del
proyecto. `npm audit` puede seguir marcando avisos de Next colapsando todo
en un rango cuyo "fix" apunta a la línea 15/16; los aplicables a la 14.x ya
están backporteados en `14.2.35`. Migrar a Next 16 (breaking) los cerraría
todos si en el futuro se desea actualizar de major.

## Deploy

Recomendado: **Vercel**. Importa el repo, define las variables de entorno del
cuadro de arriba y despliega. Recuerda: solo el **Storefront token** va en las
env vars del frontend.
```

npm run build
```
