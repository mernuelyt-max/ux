#!/usr/bin/env node
/**
 * Verifica la conexión con la Storefront API de Shopify.
 *
 *   npm run shopify:check
 *
 * Lee las variables de .env.local (o del entorno) y consulta la tienda:
 * imprime el nombre de la tienda, los productos y qué metafields encuentra,
 * para que sepas si el diseño ya está consumiendo tus datos reales.
 *
 * No requiere dependencias externas (usa fetch nativo de Node 18+).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// ── Cargar .env.local / .env sin dependencias ──────────────────
function loadEnvFile(name) {
  try {
    const text = readFileSync(join(root, name), "utf8");
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const key = t.slice(0, eq).trim();
      let val = t.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    /* archivo ausente: seguimos con process.env */
  }
}
loadEnvFile(".env.local");
loadEnvFile(".env");

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-10";
const NS = process.env.SHOPIFY_METAFIELD_NS || "custom";

const c = {
  g: (s) => `\x1b[32m${s}\x1b[0m`,
  r: (s) => `\x1b[31m${s}\x1b[0m`,
  y: (s) => `\x1b[33m${s}\x1b[0m`,
  b: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

function fail(msg) {
  console.error(`\n${c.r("✗")} ${msg}\n`);
  process.exit(1);
}

if (!DOMAIN || !TOKEN) {
  fail(
    "Faltan variables. Define SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_TOKEN en .env.local\n" +
      "  (copia .env.example a .env.local y complétalas)."
  );
}

const endpoint = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

const QUERY = `
  query Check($ns: String!) {
    shop { name primaryDomain { url } }
    products(first: 20, sortKey: BEST_SELLING) {
      edges {
        node {
          handle
          title
          availableForSale
          totalInventory
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 10) { edges { node { id availableForSale } } }
          badge: metafield(namespace: $ns, key: "badge") { value }
          cta: metafield(namespace: $ns, key: "cta") { value }
          features: metafield(namespace: $ns, key: "features") { value }
        }
      }
    }
  }
`;

console.log(`\n${c.b("U del Closer · Verificación de Shopify")}`);
console.log(c.dim(`  Tienda:  ${DOMAIN}`));
console.log(c.dim(`  API:     ${API_VERSION}`));
console.log(c.dim(`  Metafields namespace: "${NS}"`));
console.log(c.dim(`  Endpoint: ${endpoint}\n`));

try {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query: QUERY, variables: { ns: NS } }),
  });

  if (res.status === 401 || res.status === 403) {
    fail(
      `La API respondió ${res.status}. El Storefront token es inválido o no tiene permisos.\n` +
        "  Revisa el token en Shopify → Headless/Custom app → Storefront API access token."
    );
  }
  if (!res.ok) {
    fail(`La API respondió ${res.status} ${res.statusText}.`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    fail("Errores GraphQL:\n  " + json.errors.map((e) => e.message).join("\n  "));
  }

  const shop = json.data.shop;
  const products = json.data.products.edges.map((e) => e.node);

  console.log(`${c.g("✓")} Conexión correcta.`);
  console.log(`  Tienda: ${c.b(shop.name)}  ${c.dim(shop.primaryDomain?.url || "")}`);
  console.log(`  Productos encontrados: ${c.b(products.length)}\n`);

  if (products.length === 0) {
    console.log(
      c.y(
        "  ⚠ No hay productos publicados en el canal de la Storefront API.\n" +
          "    El sitio mostrará las 3 membresías demo hasta que crees productos\n" +
          "    y los publiques en tu app headless / canal de venta.\n"
      )
    );
    process.exit(0);
  }

  let withFeatures = 0;
  for (const p of products) {
    const price = p.priceRange.minVariantPrice;
    const mf = [
      p.badge?.value ? "badge" : null,
      p.cta?.value ? "cta" : null,
      p.features?.value ? "features" : null,
    ].filter(Boolean);
    if (p.features?.value) withFeatures++;
    const stock = p.availableForSale ? c.g("disponible") : c.r("agotado");
    console.log(
      `  • ${c.b(p.title)} ${c.dim(`(${p.handle})`)}\n` +
        `      ${price.amount} ${price.currencyCode} · ${p.variants.edges.length} variante(s) · ${stock}\n` +
        `      metafields: ${mf.length ? c.g(mf.join(", ")) : c.y("ninguno")}`
    );
  }

  console.log("");
  if (withFeatures === 0) {
    console.log(
      c.y(
        `  ⚠ Ningún producto expone el metafield "features" (namespace "${NS}").\n` +
          "    Las tarjetas usarán solo título/precio hasta que definas los metafields\n" +
          "    y actives su acceso a la Storefront API. Ver README → \"Mapear membresías\".\n"
      )
    );
  } else {
    console.log(
      c.g(`  ✓ ${withFeatures}/${products.length} producto(s) con "features" — el diseño ya integra tus datos.\n`)
    );
  }
} catch (err) {
  fail(
    `No se pudo conectar: ${err.message}\n` +
      "  Verifica el dominio, tu conexión, y que el token sea de la Storefront API (no Admin)."
  );
}
