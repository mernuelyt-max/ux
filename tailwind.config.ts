import type { Config } from "tailwindcss";

/**
 * Design tokens for U del Closer — "Claro y minimalista" (premium light).
 *
 * Generated with the UI/UX Pro Max skill pack (design-system recommendation):
 *  - Premium black + gold on a warm off-white canvas.
 *  - Neutral "stone" scale for surfaces/borders, gold kept as the brand accent.
 *  - Typography: Bodoni Moda (display) + Jost (body) — luxury minimalist.
 *
 * Color roles:
 *  - paper.*  → light surfaces (bg, cards, borders).
 *  - ink.*    → near-black neutrals for text and the solid primary.
 *  - muted    → secondary text.
 *  - gold.*   → brand accent (CTA highlights, eyebrows, featured tier).
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          0: "#FFFFFF",
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
        },
        ink: {
          950: "#0C0A09",
          900: "#1C1917",
          800: "#292524",
          700: "#44403C",
          600: "#57534E",
        },
        gold: {
          50: "#FEF9EC",
          100: "#FDF0CE",
          200: "#FADF9B",
          300: "#F6C85A",
          400: "#EBB03C",
          500: "#CA8A04",
          600: "#A16207",
          700: "#854D0E",
        },
        emerald: {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        cream: "#FAFAF9",
        muted: "#78716C",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(12, 10, 9, 0.04), 0 8px 24px -12px rgba(12, 10, 9, 0.12)",
        card: "0 1px 3px rgba(12, 10, 9, 0.06), 0 12px 32px -16px rgba(12, 10, 9, 0.14)",
        gold: "0 10px 30px -12px rgba(202, 138, 4, 0.35)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F6C85A 0%, #CA8A04 55%, #A16207 100%)",
        "paper-radial":
          "radial-gradient(1100px 520px at 50% -10%, rgba(202,138,4,0.10), transparent 62%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 30s linear infinite",
        "marquee-slow": "marquee 48s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
