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

---

# Rescate 3 — las 14 secciones ya están en Liquid

Las 14 secciones de `design-reference/landing-base.html` (ver el índice más
arriba) ya están reescritas como secciones Shopify, con `{% schema %}` y
usando el contenido real que ya estaba grabado en `templates/index.json`
(reseñas de Trustpilot, capítulos, pilares, bonus, ventajas, niveles, FAQ)
en vez del copy del ebook viejo del artifact.

## Lo nuevo

**`snippets/udc-base.liquid`** — la hoja de estilos base que el rescate 1
marcaba como la pieza más crítica que faltaba. Define las variables
`--udc-bg`, `--udc-bg2`, `--udc-text`, `--udc-muted`, `--udc-dim`,
`--udc-accent`, `--udc-border`, `--udc-line`, `--udc-line2`, `--udc-anton`,
las clases `.udc`, `.udc-top`, `.udc-clip`, `.udc-glow`, `.udc-h2`,
`.udc-eyebrow`, `.udc-serif`, `.udc-serif-glow`, `.udc-tag`, `.udc-btn`,
`.udc-marquee`, el atributo `data-udc-reveal` y `@keyframes udcMarquee`, más
los 3 `@font-face` (Anton, Instrument Serif, Space Grotesk) apuntando a los
10 `.woff2` ya copiados a `assets/`. También trae el JS de scroll-reveal,
contador animado (`data-udc-count`) y arranque de marquesinas. Se renderiza
con `{% render 'udc-base' %}` al principio de cada sección nueva — es
seguro que varias secciones lo hagan en la misma página, el `<script>` se
protege solo con `window.__udcBaseInit`.

**Las 14 secciones**, cada una con su propio `<style>` escopeado a
`#udc-xx-{{ section.id }}` (mismo patrón que `udc-planes.liquid`):

| Sección del diseño | Archivo | Contenido real usado |
|---|---|---|
| Hero | `sections/udc-03-hero.liquid` | `cover_image` que ya estaba en el template |
| Statement | `sections/udc-05-statement.liquid` | chips `udc_05` |
| Qué aprendés | `sections/udc-06-que-aprendes.liquid` | 12 chips `udc_06` (2 marquesinas) |
| Contenido | `sections/udc-07-contenido.liquid` | 8 capítulos `udc_07` |
| 3 pilares | `sections/udc-08-pilares.liquid` | 3 pilares `udc_08` |
| Prueba social | `sections/udc-11-prueba-social.liquid` | stats + 12 capturas `udc_11` |
| Resultados (Trustpilot) | `sections/udc-prod-resenas.liquid` | las 6 reseñas reales + score 4,8 |
| Bonus | `sections/udc-13-bonus.liquid` | 4 bonus `udc_13` |
| Bonus estrella (mentoría) | `sections/udc-15-mentoria.liquid` | schema nuevo (settings estaban vacíos) |
| Ventajas | `sections/udc-16-ventajas.liquid` | 4 ventajas `udc_16` |
| Niveles | `sections/udc-17-niveles.liquid` | 4 niveles `udc_17` |
| Pensada para | `sections/udc-18-pensada-para.liquid` | 5 puntos `udc_18` |
| Autor | `sections/udc-20-autor.liquid` | schema nuevo (settings estaban vacíos) |
| FAQ | `sections/udc-21-faq.liquid` | 5 preguntas `udc_21` |

Se verificó con un script que cada `settings`/`block.settings` que ya estaba
grabado en `templates/index.json` tiene su campo correspondiente en el
`{% schema %}` de la sección — nada de lo recuperado se pierde al cargar el
tema.

`sections/udc-prod-resenas.liquid` usa un snippet propio,
`snippets/udc-resena-card.liquid`, para no repetir el markup de cada tarjeta
de reseña (sus estilos viven en el `<style>` de la sección, escopeados, para
no duplicar CSS por cada una de las 6 reseñas).

## Decisiones que no estaban en el artifact

- **`udc-15-mentoria` y `udc-20-autor`** tenían `settings: {}` en el template
  (nunca se les había armado el schema). El copy por defecto es el texto
  real del artifact — no se inventó nada — pero **no se copió el precio
  "64.000 ARS"** del Pack VIP del ebook viejo: ese precio ya no existe, la
  mentoría ahora es un beneficio de la membresía Experto (con precio real en
  vivo, ver `udc-planes.liquid` bloque `p3`). El botón de `udc-15-mentoria`
  por defecto manda a WhatsApp, y tiene un campo de precio opcional (vacío)
  para quien quiera venderla suelta más adelante.
- Los botones de `udc-03-hero` van a WhatsApp por defecto (mismo patrón que
  `udc-19-cta-final` y `udc-22-footer`), no a "Descargar la guía": el
  producto ya no es un ebook de descarga inmediata.

---

# Rescate 4 — el resto de las secciones "NO recuperado" y los 8 snippets

Todo lo que el Rescate 1 había listado bajo "NO recuperado" y quedó afuera
del Rescate 3 ya está reconstruido: las 24 secciones y los 8 snippets de esa
lista existen ahora como archivos Liquid. Un script verificó, igual que en
el Rescate 3, que cada `settings`/`block.settings` ya grabado en
`templates/index.json` tiene su campo en el `{% schema %}` correspondiente —
nada se rompe al cargar el tema.

## Secciones nuevas de esta tanda

| Archivo | De dónde sale |
|---|---|
| `sections/udc-01-temporizador.liquid` | Barra "TEMPORIZADOR" del artifact; cuenta regresiva real con `localStorage` (reimplementa el componente DCLogic original en JS plano) |
| `sections/udc-02-nav.liquid` | `<header>` del artifact |
| `sections/udc-04-marquesina.liquid` | Sección "MARQUEE 1" del artifact; 5 items reales `udc_04` |
| `sections/udc-12-casos-exito.liquid` | Sin diseño de referencia — contenido real `udc_12` (4 casos), título nuevo |
| `sections/udc-14-packs.liquid` | "Tres formas de arrancar hoy" del artifact; 3 packs reales, ya `disabled` (legacy, lo reemplazó `udc-planes`) |
| `sections/udc-facturacion.liquid` | Sin diseño de referencia — contenido real (5 alumnos), dos layouts (`carousel`/`wall`) igual que preveían los settings ya grabados |
| `sections/udc-cart.liquid` | Carrito con el mismo lenguaje que `udc-producto` (logo arriba, sin header/footer, tarjetas con glow, resumen con ahorro real y botón con brillo); funciona sin JS y se mejora con Ajax |
| `sections/udc-cart-social.liquid` | Sin referencia — tira de confianza para la página de carrito |
| `sections/udc-prod-testimonios.liquid` | Sin contenido recuperado — bloques vacíos, se completan a mano |
| `sections/udc-prod-video.liquid` | Sin contenido recuperado — usa el setting nativo `video_url` de Shopify (YouTube/Vimeo), reemplaza el `embedUrl()` a mano que tenía el artifact |

## Snippets nuevos de esta tanda

| Archivo | Para qué |
|---|---|
| `snippets/udc-factu-card.liquid` | Tarjeta de un alumno, la usa `udc-facturacion` |
| `snippets/udc-testimonio-card.liquid` | Tarjeta de un testimonio, la usa `udc-prod-testimonios` |
| `snippets/udc-video-card.liquid` | Tarjeta de un video adicional, la usa `udc-prod-video` |
| `snippets/udc-cart-css.liquid` / `udc-cart-js.liquid` | Estilos y comportamiento (Ajax) del carrito, separados del markup como ya hacía `udc-planes-css`/`js` |
| `snippets/udc-hide-chrome.liquid` | Oculta la announcement bar de ejemplo; con `full: true` también header y footer (producto y carrito) |
| `snippets/udc-brand-bar.liquid` | Barra mínima con el logo para las páginas sin header (producto y carrito) |
| `snippets/udc-temario-premium.liquid`, `udc-temario-experto.liquid` | Ver más abajo — **contenido parcial a propósito** |

## Lo que NO se inventó (importante)

- **El temario detallado de Premium y Experto.** `udc-temario-esencial.liquid`
  (uno de los 8 archivos recuperados byte a byte) tiene el desglose completo
  módulo por módulo, con viñetas reales. Ese mismo nivel de detalle para
  Premium y Experto **no existe en ningún lado recuperable**: ni en el
  artifact ni en `templates/index.json`, donde solo hay un resumen de 3-4
  líneas por membresía (el campo `features` de los bloques `p2`/`p3` en
  `udc-planes`). `udc-temario-premium.liquid` y `udc-temario-experto.liquid`
  usan exactamente ese resumen real, como títulos de área sin viñetas
  inventadas, y encadenan con `render` al temario del nivel anterior (Premium
  incluye Esencial, Experto incluye Premium — eso sí es un hecho real,
  documentado en el campo `gift` de cada plan). Si en algún momento aparece
  el temario real completo, reemplazar el `<li>` de cada área por un
  `<ol class="udc-pl__temlist">` igual que en `udc-temario-esencial.liquid`
  (los dos archivos nuevos tienen el comentario con las instrucciones).
- **`udc-prod-testimonios` y `udc-prod-video`** no tienen ningún testimonio,
  cita, nombre ni video puesto por defecto — los bloques quedan vacíos hasta
  que se carguen desde el editor del tema con contenido real.
- **`udc-cart-social`** tampoco trae medios de pago puestos por defecto
  más allá del ejemplo del campo del schema ("Mercado Pago"): son bloques
  para completar con los medios de pago reales que termine teniendo la
  tienda.

## Decisiones de diseño sin referencia recuperada

- `udc-cart.liquid` funciona sin JavaScript (`<form action="/cart">`,
  `updates[]`, botones `name="update"` / `name="checkout"`) y
  `udc-cart-js.liquid` lo mejora con la Cart AJAX API (`/cart/change.js`,
  pidiendo la sección re-renderizada con el parámetro `sections`) para que
  +/− y quitar actualicen totales y ahorro sin recargar. Si el fetch falla,
  cae al `submit()` normal del formulario.
- `udc-facturacion.liquid` implementa los dos layouts que sus settings ya
  preveían (`layout: "carousel"` con `interval`, o `"wall"` con
  `wall_speed`) aunque el artifact nunca mostró ninguno de los dos.
- `udc-hide-chrome.liquid` apunta a los selectores estándar de Shopify
  (`#shopify-section-header`, etc.) porque todavía no existe
  `layout/theme.liquid` en este rescate — conviene revisarlo contra el
  layout real cuando exista.

## Lo que todavía falta

- Las imágenes que faltan (ver "Imágenes" y "Lo que sigue sin aparecer"
  más arriba) siguen sin aparecer: los `image_picker` quedan vacíos hasta
  que se puedan subir a *Archivos* de la tienda.
- Falta `layout/theme.liquid` y `config/settings_schema.json` (de ahí sale
  `settings.udc_whatsapp`, el fallback global de WhatsApp que ya usan varias
  secciones).
- `templates/cart.json` usa `udc-cart` + `udc-relacionados`;
  `udc-cart-social` no se usa (su WhatsApp de ejemplo no es un número real).
- El temario real de Premium y Experto (ver arriba).
- Contenido real para `udc-prod-testimonios`, `udc-prod-video` y los medios
  de pago de `udc-cart-social`.
