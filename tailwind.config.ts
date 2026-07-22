import type { Config } from "tailwindcss";

/**
 * Design tokens for U del Closer.
 *
 * Color psychology for a premium "sales closer / VIP membership" brand:
 *  - ink (near-black):   exclusivity, luxury, focus — the premium canvas.
 *  - gold (amber):       wealth, achievement, status — the VIP/"money" signal
 *                        and the primary conversion color on the dark canvas.
 *  - emerald (success):  "go", money-in, confirmations, guarantees.
 *  - off-white/zinc:     high legibility without the harshness of pure white.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08080A",
          900: "#0C0C0F",
          800: "#131318",
          700: "#1C1C22",
          600: "#26262E",
        },
        gold: {
          50: "#FFF9E6",
          100: "#FFEFB8",
          200: "#FFE08A",
          300: "#FFD25C",
          400: "#FFC93C",
          500: "#F5B301",
          600: "#D99700",
          700: "#A66F00",
        },
        emerald: {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
        cream: "#F5F5F4",
        muted: "#A1A1AA",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 10px 40px -10px rgba(245, 179, 1, 0.45)",
        card: "0 20px 60px -20px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFD25C 0%, #F5B301 50%, #D99700 100%)",
        "ink-radial":
          "radial-gradient(1200px 600px at 50% -10%, rgba(245,179,1,0.14), transparent 60%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
