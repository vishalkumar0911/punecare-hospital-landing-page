/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          DEFAULT: "#2563EB",
        },
        teal: {
          50:  "#F0FDFA",
          100: "#CCFBF1",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          DEFAULT: "#14B8A6",
        },
        accent: {
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          DEFAULT: "#0EA5E9",
        },
        surface:  "#F8FAFC",
        muted:    "#64748B",
        danger:   "#EF4444",
        success:  "#22C55E",
        warning:  "#F59E0B",
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },
      boxShadow: {
        "card":       "0 4px 24px 0 rgba(37,99,235,0.08)",
        "card-hover": "0 12px 40px 0 rgba(37,99,235,0.18)",
        "glass":      "0 8px 32px 0 rgba(31,38,135,0.10)",
        "glow":       "0 0 24px rgba(37,99,235,0.25)",
        "glow-teal":  "0 0 24px rgba(20,184,166,0.25)",
      },
      backgroundImage: {
        "hero-gradient":    "linear-gradient(135deg,#EFF6FF 0%,#F0FDFA 60%,#F8FAFC 100%)",
        "card-gradient":    "linear-gradient(135deg,#2563EB,#0EA5E9)",
        "teal-gradient":    "linear-gradient(135deg,#14B8A6,#0EA5E9)",
        "danger-gradient":  "linear-gradient(135deg,#EF4444,#F97316)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":      "float 6s ease-in-out infinite",
        "fade-up":    "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};