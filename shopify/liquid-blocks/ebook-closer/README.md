# U DEL CLOSER — Bloques de Liquid personalizado (Ebook "Closer de Ventas")

Paquete de bloques listos para pegar en el **editor visual del tema**
(*Personalizar tema → Agregar bloque → Liquid personalizado*), pensados
para la **página de producto** del ebook. No tocan el tema base ni archivos
`.liquid` externos: cada bloque es autocontenido (HTML + CSS + JS).

## ⚠️ Antes que nada — seguridad

Se compartió un **Admin API token** (`shpat_...`) en texto plano durante
esta conversación. Un token Admin da acceso de lectura/escritura a toda la
tienda. **Rotalo ahora**: *Configuración → Apps y canales de venta →
Desarrollar apps → (tu app) → API credentials → Revoke / Regenerate.*

Estos bloques **no usan ningún token**: corren como Liquid nativo dentro de
Shopify y leen el objeto `product` directamente, sin llamar a ninguna API.

## Paso 0 — Crear el producto del ebook

Al revisar la tienda (`tinomossu.myshopify.com`) todavía no existe ningún
producto. Antes de pegar los bloques:

1. **Productos → Agregar producto.**
2. Título: p. ej. *"Ebook Digital: Closer de Ventas"*.
3. Precio: el que definas (los bloques leen `product.price` automáticamente,
   no hay que tocar el código si lo cambiás después).
4. Si es un producto digital, instalá una app de descargas digitales
   (Shopify tiene *Digital Downloads* gratis) y subí el PDF ahí — eso maneja
   la entrega del archivo, estos bloques solo manejan el diseño/CRO de la
   página.
5. Guardá y activá el producto.

## Paso 1 — Pegar los bloques en orden

En **Personalizar tema**, andá a la plantilla de **Producto** del ebook y
agregá, en este orden, un bloque **"Liquid personalizado"** por cada
archivo de esta carpeta:

| # | Archivo | Qué hace |
|---|---------|----------|
| 0 | `00-theme-tokens.liquid` | Define la paleta negro-rojo (variables CSS). **Va primero, siempre.** |
| 1 | `01-barra-urgencia.liquid` | Barra superior de oferta/urgencia. |
| 2 | `02-hero.liquid` | Título, precio, CTA principal y mockup del ebook. |
| 3 | `03-dolor.liquid` | Agitación: problemas que resuelve el ebook. |
| 4 | `04-que-incluye.liquid` | Los 5 módulos + bonus. |
| 5 | `05-transformacion.liquid` | Antes / después. |
| 6 | `06-testimonios.liquid` | Prueba social (carrusel scroll). |
| 7 | `07-autoridad.liquid` | Quién está detrás del método. |
| 8 | `08-stack-oferta.liquid` | Value stack + precio + CTA. |
| 9 | `09-garantia.liquid` | Garantía de 7 días. |
| 10 | `10-faq.liquid` | Objeciones (acordeón nativo, sin JS). |
| 11 | `11-cta-final.liquid` | Cuenta regresiva + cierre. |
| 12 | `12-barra-sticky-movil.liquid` | Barra fija de compra en mobile. **Va último.** |

Cada bloque tiene arriba un comentario `{% comment %}` que indica qué
textos son editables. Editá directamente el texto dentro de las etiquetas
HTML — no hace falta tocar el CSS ni el JS.

**Importante:** los bloques que usan `{{ product.price }}` y el formulario
de compra (`02`, `08`, `11`, `12`) necesitan estar en una plantilla donde
`product` exista — es decir, la plantilla de producto, no una página
genérica.

## Decisiones de diseño (por qué negro-rojo funciona acá)

- **Negro (`--udc-black`) como fondo dominante** → autoridad, exclusividad,
  foco. Elimina ruido visual y hace que el rojo sea lo único que compite
  por la atención: todo el lienzo empuja la mirada hacia precio y CTA.
- **Rojo (`--udc-red`) como único color de acento** → urgencia, acción,
  intensidad. Es el color con mayor tasa de respuesta fisiológica
  (aumenta ritmo cardíaco percibido), ideal para un nicho "closer" que se
  vende a sí mismo como agresivo y orientado a resultados. Se usa
  exclusivamente en: CTAs, precio, números de módulos, bordes de énfasis —
  nunca como color decorativo, para que mantenga su peso de "acción".
  Reservar el rojo así aumenta el contraste percibido de los botones sobre
  cualquier tono de negro (ratio > 4.5:1 en todos los bloques).
- **Sin verde, dorado ni otros acentos** — se respeta estrictamente la
  paleta pedida (negro-rojo) para que la marca sea reconocible en cada
  bloque y no compita con el rojo de los CTAs.
- **Jerarquía de conversión clásica de infoproducto**: urgencia → promesa
  (hero) → dolor → solución (contenido) → transformación → prueba social →
  autoridad → oferta con ancla de precio → reversión de riesgo → objeciones
  → urgencia final → CTA persistente en mobile. Cada bloque repite el CTA
  para no depender de que el visitante vuelva a subir.
- **Fuentes del sistema** (sin `@import` ni Google Fonts) → cero peticiones
  externas, cero layout shift, carga instantánea — consistente con el resto
  del proyecto.
- **JS mínimo y defensivo**: cada `fetch('/cart/add.js', ...)` tiene
  `.catch()` que hace *fallback* a un `submit()` normal del formulario si
  falla la petición (p. ej. bloqueador de scripts), así el botón de compra
  nunca deja de funcionar.

## Personalización rápida

- **Cambiar el color rojo**: editá `--udc-red` y `--udc-red-dark` en
  `00-theme-tokens.liquid`; se propaga a todos los bloques.
- **Cambiar textos**: cada bloque tiene el copy en español directo, listo
  para editar sin tocar CSS/JS.
- **Quitar un bloque**: simplemente borrá ese bloque desde el editor visual;
  ninguno depende de otro para funcionar (excepto los tokens del bloque `00`,
  que todos los demás bloques ya traen como *fallback* por si no está).

## Público objetivo asumido

Como el dato vino vacío en el brief, se asumió: **vendedores, freelancers,
coaches y emprendedores digitales** que quieren mejorar su tasa de cierre en
ventas de alto ticket (por llamada, WhatsApp o DM). Si el público real es
otro (ej. empresas B2B contratando formación para sus equipos), avisame y
ajusto el copy de los bloques `02`, `03`, `06` y `07`.
