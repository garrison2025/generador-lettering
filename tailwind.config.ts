// tailwind.config.ts
import type { Config } from "tailwindcss";
const { fontFamily } = require('tailwindcss/defaultTheme'); // 导入 Tailwind 的默认字体族

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}", // 您原有的配置
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // 将通过 next/font 加载的 Roboto (CSS 变量 --font-roboto)
        // 设置为默认无衬线字体 (sans) 的首选字体。
        // 这意味着任何使用 font-sans 或未明确指定字体的元素，
        // 都会优先尝试使用 var(--font-roboto)。
        sans: ['var(--font-roboto)', ...fontFamily.sans],

        // (可选) 如果您也为 Inter 创建了 CSS 变量 (例如 --font-inter)
        // 并且希望在某些地方明确使用 Inter，可以这样定义：
        // inter: ['var(--font-inter)', ...fontFamily.sans],
        // 然后可以在 HTML 中使用例如: className="font-inter"
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#5B4FBE", // Azul violáceo
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#FF6B6B", // Rosa coral
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#FFD93D", // Amarillo dorado
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
