import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        veganLightGreen: "#a4cbb4",
        veganDarkGreen: "#50614A"
      },
      margin: {
        '80px': '80px',
        '40px': '40px',
        '5%': '5%'
      },
      width: {
        '90%': '90%'
      },
      maxWidth: {
        '1280px': '1280px',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography')
  ],
  daisyui: {
    themes: ["retro"],
  },
} satisfies Config;
