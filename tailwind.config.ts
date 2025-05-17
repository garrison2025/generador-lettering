import type { Config } from "tailwindcss"
import defaultTheme from 'tailwindcss/defaultTheme' // 导入默认主题以便引用

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}", // 注意：这个通配符 "*.{...}" 可能会匹配到项目根目录的文件，通常更精确的路径更好。
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
      // 重点：添加 fontFamily 配置
      fontFamily: {
        // 将 Roboto 和 Inter 设置为主要的 sans-serif 字体系列
        // 如果你的 H1 主要使用 Roboto，可以把它放在前面
        // defaultTheme.fontFamily.sans 包含了 Tailwind 默认的 sans-serif 备选字体
        sans: ['var(--font-roboto)', 'var(--font-inter)', ...defaultTheme.fontFamily.sans],
        // 你也可以单独定义它们，以便在需要时明确使用
        inter: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        roboto: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
        // 为你的艺术字体创建 Tailwind 工具类
        'dancing-script': ['var(--font-dancing-script)', ...defaultTheme.fontFamily.serif], // serif 作为艺术字体的备选
        'pacifico': ['var(--font-pacifico)', ...defaultTheme.fontFamily.serif],
        'satisfy': ['var(--font-satisfy)', ...defaultTheme.fontFamily.serif],
        'sacramento': ['var(--font-sacramento)', ...defaultTheme.fontFamily.serif],
        'great-vibes': ['var(--font-great-vibes)', ...defaultTheme.fontFamily.serif],
        'amatic-sc': ['var(--font-amatic-sc)', ...defaultTheme.fontFamily.sans], // Amatic SC 更像 sans-serif
        'lobster': ['var(--font-lobster)', ...defaultTheme.fontFamily.serif],
        'caveat': ['var(--font-caveat)', ...defaultTheme.fontFamily.serif], // Caveat 更像手写体，serif 或 sans 均可
        'kaushan-script': ['var(--font-kaushan-script)', ...defaultTheme.fontFamily.serif],
        'permanent-marker': ['var(--font-permanent-marker)', ...defaultTheme.fontFamily.sans], // Permanent Marker 更像 sans-serif
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
