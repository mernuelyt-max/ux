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
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-slow": {
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 28s linear infinite",
        "marquee-slow": "marquee 45s linear infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 5s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
