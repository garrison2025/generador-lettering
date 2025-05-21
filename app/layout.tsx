import type React from "react";
import "@/app/globals.css"; // 确保你的全局 CSS 路径正确
import { ThemeProvider } from "@/components/theme-provider"; // 确保路径正确
import {
  Inter,
  Roboto,
  Dancing_Script,
  Pacifico,
  Satisfy,
  Sacramento,
  Great_Vibes,
  Amatic_SC,
  Lobster,
  Caveat,
  Kaushan_Script,
  Permanent_Marker,
} from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"; // 确保路径正确
import { SchemaMarkup } from "@/components/seo/schema-markup"; // 确保路径正确

// 基础字体 Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "arial", "sans-serif"],
  adjustFontFallback: true,
  preload: false, // Inter 不是首屏最关键的 LCP 字体时，可以不预加载
});

// Roboto 字体 (你的 H1 和 LCP <p> 元素等可能使用的字体)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // 只加载实际用到的字重
  display: "swap",
  variable: "--font-roboto",
  fallback: ["helvetica", "arial", "sans-serif"],
  preload: true, // 保持预加载，如果它是 LCP 和主要标题的字体
});

// Lettering 艺术字体 (保持 preload: false, 进一步优化在组件层面进行)
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-dancing-script", preload: false });
const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-pacifico", preload: false });
const satisfy = Satisfy({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-satisfy", preload: false });
const sacramento = Sacramento({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-sacramento", preload: false });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-great-vibes", preload: false });
const amaticSC = Amatic_SC({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-amatic-sc", preload: false });
const lobster = Lobster({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-lobster", preload: false });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-caveat", preload: false });
const kaushanScript = Kaushan_Script({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-kaushan-script", preload: false });
const permanentMarker = Permanent_Marker({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-permanent-marker", preload: false });


// --- Metadata (保持你原有的配置) ---
export const metadata: Metadata = {
  metadataBase: new URL("https://generadordelettering.org"),
  title: "Generador de Lettering - Crea diseños tipográficos únicos y letras personalizadas",
  description:
    "Crea y personaliza textos con diversos estilos caligráficos y tipográficos. Diseña lettering artístico, letras personalizadas y textos bonitos para tus proyectos de forma fácil y gratuita.",
  keywords:
    "generador de lettering, letras personalizadas, lettering online, caligrafia online, diseño de letras, tipografia creativa, letras decoradas, plantillas de lettering, abecedario para imprimir, creador de lettering, lettering digital, lettering frases, textos bonitos, tipografia para carteles",
  authors: [{ name: "Generador de Lettering" }],
  creator: "Generador de Lettering",
  publisher: "Generador de Lettering",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "https://generadordelettering.org",
    },
  },
  openGraph: {
    title: "Generador de Lettering - Crea diseños tipográficos únicos y letras personalizadas",
    description:
      "Crea y personaliza textos con diversos estilos caligráficos y tipográficos. Diseña lettering artístico para tus proyectos de forma fácil y gratuita.",
    url: "https://generadordelettering.org",
    siteName: "Generador de Lettering",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://generadordelettering.org/og-image.png", // 确保这是你的 Open Graph 图片的绝对路径
        width: 1200,
        height: 630,
        alt: "Generador de Lettering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generador de Lettering - Crea diseños tipográficos únicos y letras personalizadas",
    description:
      "Crea y personaliza textos con diversos estilos caligráficos y tipográficos. Diseña lettering artístico para tus proyectos de forma fácil y gratuita.",
    images: ["/og-image.png"], // Next.js 会自动处理成绝对路径如果 metadataBase 设置正确
    creator: "@generadorlettering", // 替换成你的 Twitter 用户名
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "5Fg8Nv7tz4ioNMiGxduGbA7Fby2Y5KHTirnZOfIPExM", // 你的 Google Search Console 验证码
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification": "5Fg8Nv7tz4ioNMiGxduGbA7Fby2Y5KHTirnZOfIPExM", // 重复 Google 验证码通常无害，但一个就够了
  },
  generator: 'v0.dev' // 或你的应用/CMS 名称和版本
};

// --- Viewport (保持你原有的配置) ---
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // 允许用户缩放，对可访问性友好
  themeColor: "#5B4FBE", // 你的主题色
};

// --- RootLayout 组件定义 ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      // 将所有字体变量添加到html标签，以便全局可用
      className={`scroll-smooth ${inter.variable} ${roboto.variable} ${dancingScript.variable} ${pacifico.variable} ${satisfy.variable} ${sacramento.variable} ${greatVibes.variable} ${amaticSC.variable} ${lobster.variable} ${caveat.variable} ${kaushanScript.variable} ${permanentMarker.variable}`}
    >
      <head>
        {/* 优化点 1: 移除了多余的 preconnect 链接 */}
        {/* 由于 next/font/google 在构建时自托管字体，不再需要预连接到 Google Fonts 服务器 */}
        {/*
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        */}

        <SchemaMarkup />

        {/*
          优化点 4: 图片预加载说明
          对于关键的 LCP (Largest Contentful Paint) 图片，例如网站 Logo (如果它是 LCP 的一部分)：
          1. 强烈建议使用 Next.js 的 <Image> 组件。
          2. 为该 <Image> 组件设置 priority={true} 属性。
          Next.js 会自动为这些图片添加最佳的预加载指令。
          因此，通常不需要在这里手动添加 <link rel="preload">。

          如果你有非 <Image> 组件管理的 LCP 背景图片等，才需要考虑手动预加载，但优先使用 Next.js 的内置优化。
          示例：注释掉的 Logo 图片预加载链接 (如果使用 <Image priority /> 则不需要)
          {/* <link rel="preload" href="/logo-light.png" as="image" /> */}
          {/* <link rel="preload" href="/logo-dark.png" as="image" /> */}
        */}
      </head>
      <body className={`${inter.className} antialiased`}> {/* 使用 Inter 作为基础字体类名，antialiased 改善字体渲染 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // 或 "system" 或 "dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/*
            优化点 2: 艺术字体加载方式的说明 (实际优化需在组件层面实现)
            虽然此处的字体定义使用了 preload: false (这很好地避免了初始阻塞加载)，
            但对于大量的艺术字体，进一步的性能优化应在实际使用它们的组件中进行。例如：
            1. 字体选择器/预览组件可以按需加载 (例如，使用 Next.js 的 dynamic import)。
            2. 对于非常长的字体列表，考虑使用虚拟滚动技术 (如 react-window)，只渲染用户可见部分的字体预览。
            3. 确保只有当用户实际选择或组件需要显示某个艺术字体时，相关的 CSS 才被应用，从而触发字体文件加载。
            这些策略有助于减少初始 JavaScript 包大小、降低首屏渲染压力和改善运行时性能。
          */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
