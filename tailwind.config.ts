import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave1: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        wave2: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        wave3: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      }
    }
  },
  plugins: [],
} satisfies Config