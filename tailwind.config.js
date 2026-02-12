module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        champagne: "#E3C8AD",
        "champagne-dark": "#8a7356",
        ivory: "#F5F5F3",
        glass: "rgba(255, 255, 255, 0.02)",
        panel: "#080808",
      },
      fontFamily: {
        serif: ['"Cinzel"', "serif"],
        sans: ['"Manrope"', "sans-serif"],
      },
      letterSpacing: {
        fashion: "0.25em",
        wide: "0.15em",
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fadeIn 1.5s ease-out forwards",
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scan: "scanBody 5s linear infinite",
        shimmer: "shimmer 6s infinite linear",
        float: "float 10s ease-in-out infinite",
        breathe: "breathe 12s ease-in-out infinite",
        radar: "radar 3s infinite",
        heartbeat: "heartbeat 5s infinite",
        glare: "glare 6s infinite linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scanBody: {
          "0%": { top: "0%", opacity: "0" },
          "10%, 90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        radar: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        glare: {
          "0%": { transform: "translateX(-150%) skewX(-15deg)" },
          "100%": { transform: "translateX(150%) skewX(-15deg)" },
        },
      },
    },
  },
};
