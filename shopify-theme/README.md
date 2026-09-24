# Tema U del Closer — rescate parcial

Los archivos Liquid de la landing vivían **solo** dentro del tema sin publicar de
`tinomrkt.myshopify.com` (tema `130933227578`). Esa tienda quedó suspendida por
una factura impaga de una app, así que el acceso por API se cortó.

Lo que hay acá es lo que se pudo reconstruir **byte por byte** desde el contexto
de la sesión en la que se escribió. No es una exportación del tema: es la parte
que todavía estaba en memoria cuando se cortó el acceso.

## Recuperado y verificado (8 archivos)

Cada uno coincide exactamente, en bytes, con lo que estaba publicado en el tema:

| Archivo | Bytes |
|---|---|
| `templates/index.json` | 25.719 |
| `sections/udc-planes.liquid` | 16.075 |
| `sections/udc-19-cta-final.liquid` | 3.651 |
| `sections/udc-22-footer.liquid` | 2.071 |
| `snippets/udc-planes-css.liquid` | 7.294 |
| `snippets/udc-planes-js.liquid` | 1.953 |
| `snippets/udc-planes-temario-css.liquid` | 5.177 |
| `snippets/udc-temario-esencial.liquid` | 3.556 |

`templates/index.json` es el más valioso: tiene **todo el contenido de la home** —
los textos de las 23 secciones, las 6 reseñas reales de Trustpilot, los nombres y
montos de los 5 alumnos de facturación, los 4 bonus, las 5 preguntas de la FAQ y
la configuración completa de las 3 membresías.

## NO recuperado

Solo existía en la tienda suspendida. Esto hay que sacarlo de ahí o reescribirlo:

**Secciones** — `udc-01-temporizador`, `udc-02-nav`, `udc-03-hero`,
`udc-04-marquesina`, `udc-05-statement`, `udc-06-que-aprendes`,
`udc-07-contenido`, `udc-08-pilares`, `udc-11-prueba-social`,
`udc-12-casos-exito`, `udc-13-bonus`, `udc-14-packs`, `udc-15-mentoria`,
`udc-16-ventajas`, `udc-17-niveles`, `udc-18-pensada-para`, `udc-20-autor`,
`udc-21-faq`, `udc-facturacion`, `udc-cart`, `udc-cart-social`,
`udc-prod-testimonios`, `udc-prod-video`, `udc-prod-resenas`

**Snippets** — `udc-temario-premium`, `udc-temario-experto`, `udc-cart-css`,
`udc-cart-js`, `udc-testimonio-card`, `udc-video-card`, `udc-factu-card`,
`udc-hide-chrome`

**Plantillas** — `templates/product.json`, `templates/cart.json`

**La hoja de estilos base.** Es la dependencia más crítica y no está en ningún
archivo de acá. Define las variables `--udc-bg`, `--udc-bg2`, `--udc-text`,
`--udc-muted`, `--udc-dim`, `--udc-accent`, `--udc-border`, `--udc-line`,
`--udc-line2`, `--udc-anton`, más las clases `.udc-marquee`, `.udc-btn`,
`.udc-h2`, `.udc-eyebrow`, `.udc-serif`, `.udc-glow`, `.udc-tag`, `.udc-clip`,
`.udc-top`, el atributo `data-udc-reveal` y el `@keyframes udcMarquee`.
**Sin esto, todo lo recuperado se ve roto**: sin colores, sin tipografías y sin
ninguna animación.

## Imágenes

Ninguna está acá. Los templates las llaman por nombre desde los *Archivos* de la
tienda vieja (`shopify://shop_images/...`). Son ~25: las 5 fotos de facturación,
12 capturas de Instagram, el mockup dorado del hero y el logo de checkout.
Si la tienda vuelve, se migran con `fileCreate` pasando la URL del CDN viejo como
`originalSource` — Shopify las descarga del lado del servidor.

## Productos de la tienda nueva

Moneda ARS. Los tres: `ACTIVE`, publicados en el canal Tienda online,
`requiresShipping: false`, `tracked: false`, `inventoryPolicy: CONTINUE`.
Sin `compareAtPrice` (nunca se definió precio de lista).

| Handle | Título | ARS | USD (solo texto en la tarjeta) |
|---|---|---|---|
| `membresia-esencial` | Membresía Esencial | 97000 | 90 USD |
| `membresia-premium` | Membresía Premium | 397000 | 350 USD |
| `membresia-experto` | Membresía Experto | 797000 | 750 USD |

## Reglas del proyecto

- Escribir **solo** en temas sin publicar. Los temas live están bloqueados.
- **Leer, o verificar tamaño + `updatedAt`, antes de reescribir** un template
  JSON. Una vez se perdieron capturas cargadas a mano por reescribir de memoria.
- Borrar archivos **por ID, nunca por nombre**.
- No inventar números, testimonios, precios ni afirmaciones.
- El token Admin (`shpat_…`) nunca va al proyecto frontend ni se commitea.
- **`udc-planes` va partido en 4 archivos a propósito.** Con CSS, JS y schema
  juntos supera el límite de escritura de la API y la subida se trunca a mitad
  de camino. No los junten.

## Deudas conocidas

- La tienda no puede cobrar: no hay pasarela activa.
- Los botones de membresía están en modo "link de pago" con la URL **vacía**,
  así que caen al carrito de Shopify hasta que se peguen los links de Mercado Pago.
- `udc_11` y `udc_12` tienen estadísticas inventadas por el asistente, sin
  verificar (+120 copias, +8 países, +30 ventas, x2, 7 días, 100%).
- `udc_12` quedó pendiente de rehacerse como testimonios en imagen vertical con
  marquesina y glow.
- Faltan 2 reseñas de Trustpilot; TrustScore y cantidad real sin confirmar.
- 3 bloques de video con placeholder.
- Typos dentro del mockup dorado: "MERREESÍA ÉLITE" y "ACESO TOTAL".

---

# Rescate 2 — desde el artifact de Claude Design

Artifact **"Landing page membresías VIP afiliados"**
(`https://claude.ai/artifact/KnsTfWfM4oDBnxnLB9sxPz`). Era un bundle con los
assets embebidos en base64; se desempaquetó y quedó:

## `design-reference/landing-base.html`

114 KB de HTML estático con **14 secciones**. Es la landing **base**, anterior a
los cambios que hicimos por chat: no trae membresías, ni facturación de alumnos,
ni reseñas de Trustpilot.

Secciones, en orden:

1. Hero — "Cerrá ventas por llamada todos los días"
2. "Todos quieren vender / pocos saben cerrar"
3. "Adentro de la guía aprendés todo lo que hace un closer"
4. "Todo lo que vas a encontrar / capítulo por capítulo"
5. "La guía se apoya en 3 pilares"
6. "Ya la están aplicando desde cero"
7. "Resultados que hablan por sí solos..."
8. "No te llevás solo la guía / te llevás todo el arsenal"
9. "Por qué esta guía funciona"
10. "¿Esto es para vos?"
11. "Esta guía está pensada estratégicamente para..."
12. (CTA final, sin encabezado)
13. "Hola, soy Tino Mossu"
14. "Preguntas frecuentes"

**Vale sobre todo por el sistema visual**, que era la pieza que faltaba:
tipografías **Anton** (títulos) e **Instrument Serif itálica** (acentos) — las
mismas de `--udc-anton` y `.udc-serif` —, el acento `--accent: #C11414`, y el
layout y los espaciados de cada sección. Los `.woff2` de ambas familias están
en esta misma carpeta.

Ojo: el diseño casi no usa variables CSS (solo `--accent`); el resto de los
colores están escritos a mano. El set de tokens `--udc-*` había que armarlo.

## `assets-recuperados/`

Las imágenes que dábamos por perdidas con la tienda suspendida:

| Archivo | Medidas | Qué es |
|---|---|---|
| `udc-mockup-sistema.png` | 805×836 | El mockup dorado del hero |
| `udc-tira-social.png` | 794×168 | Avatares + 5 estrellas + "+100 marcas personales" |
| `udc-conferencia-logo.png` | 236×232 | Foto de conferencia con el logo U del Closer |
| `udc-shot-01..10.webp` | 214×380 | 10 capturas verticales de Instagram (prueba social) |

**Las capturas verticales sirven directo** para rehacer `udc_12` como
testimonios en imagen vertical con marquesina y glow.

**Limitación de resolución:** vienen del canvas de diseño, no son las originales.
214×380 se ve bien a tamaño chico, pero en pantallas retina va a pixelar. Si
aparecen los archivos originales, conviene reemplazarlas.

**Lo que sigue sin aparecer:** las 5 fotos de facturación de alumnos
(`udc-facturado-*.jpg`, con Jupiter Marchesani, Franco Potrino, Vanesa Bergamin,
Adrian Martinez y Fernando Carnero). Los nombres y montos están en `index.json`,
pero las fotos no estaban en el artifact.

## Cómo se combinan las dos mitades

- **Sistema visual y layout de 14 secciones** → `design-reference/landing-base.html`
- **Todo el contenido real** (reseñas de Trustpilot, datos de facturación, bonus,
  FAQ, config de las 3 membresías) → `templates/index.json`
- **La sección de membresías completa**, con la pestaña del temario → los 4
  archivos `udc-planes*` + `udc-temario-esencial`
- **Imágenes** → `assets-recuperados/`

Falta reescribir como Liquid las 14 secciones del diseño: agregarles
`{% schema %}` para que sean editables, los precios en vivo desde Shopify y el
carrito. El diseño es HTML estático y no trae nada de eso.
