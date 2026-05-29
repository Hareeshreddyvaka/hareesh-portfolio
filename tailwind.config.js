/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Neural Interface Theme — direct utility access
        "neural-black": "#020308",
        "neural-dark": "#080B14",
        "neural-card": "#0D1220",
        "neural-border": "#1A2240",
        "cyan-glow": "#00F5FF",
        "cyan-soft": "#5EF3FF",
        "violet-glow": "#7C3AED",
        "violet-soft": "#A855F7",
        "mint-glow": "#06FFA5",
        // Nested versions for extended usage
        neural: {
          black: "#020308",
          dark: "#080B14",
          card: "#0D1220",
          border: "#1A2240",
        },
        cyan: {
          glow: "#00F5FF",
          soft: "#5EF3FF",
          dim: "#00A8B5",
        },
        violet: {
          glow: "#7C3AED",
          soft: "#A855F7",
          dim: "#4C1D95",
          300: "#5724ff",
        },
        mint: {
          glow: "#06FFA5",
        },
        // Template colors (keep for compatibility)
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        yellow: {
          100: "#8e983f",
          300: "#edff66",
        },
      },
      boxShadow: {
        "cyan-glow": "0 0 20px rgba(0, 245, 255, 0.3)",
        "violet-glow": "0 0 20px rgba(124, 58, 237, 0.3)",
        "mint-glow": "0 0 20px rgba(6, 255, 165, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
