import type { Config } from "tailwindcss";
// 1. 导入 tailwindcss/defaultTheme 以便使用默认字体族
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: ["class"],
  content: [
    // 2. content 数组现在包含了所有可能的目录
    "./pages/**/*.{ts,tsx}",       // 如果您使用 pages 目录
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",         // 取消注释: 扫描 src 目录
    "./lib/**/*.{ts,tsx}",         // 取消注释: 扫描 lib 目录
    "./hooks/**/*.{ts,tsx}",       // 取消注释: 扫描 hooks 目录
    // 移除了 "./*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    // 3. 保留您现有的 container 配置
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // 4. 添加 fontFamily 配置
      fontFamily: {
        // 将 Inter (通过 CSS 变量 --font-inter) 设置为默认无衬线字体
        // 并保留 Tailwind 默认的其他后备字体
        sans: ['var(--font-inter)', ...fontFamily.sans],
        // 添加你的自定义 Lettering 字体
        // key (如 'dancing-script') 会变成 Tailwind 类名 (font-dancing-script)
        // value (如 ['var(--font-dancing-script)']) 指向 next/font 生成的 CSS 变量
        'dancing-script': ['var(--font-dancing-script)'],
        pacifico: ['var(--font-pacifico)'],
        satisfy: ['var(--font-satisfy)'],
        sacramento: ['var(--font-sacramento)'],
        'great-vibes': ['var(--font-great-vibes)'],
        'amatic-sc': ['var(--font-amatic-sc)'],
        lobster: ['var(--font-lobster)'],
        caveat: ['var(--font-caveat)'],
        'kaushan-script': ['var(--font-kaushan-script)'],
        'permanent-marker': ['var(--font-permanent-marker)'],
      },
      // 5. 保留您现有的其他 extend 配置
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
  // 6. 保留您现有的 plugins 配置
  plugins: [require("tailwindcss-animate")],
};

export default config;
