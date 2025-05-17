// app/layout.tsx
import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter, Roboto } from "next/font/google"; // 明确导入 Roboto 和 Inter
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { SchemaMarkup } from "@/components/seo/schema-markup";
// import { FontLoader } from "@/components/font-loader"; // 暂时注释掉，后续再处理非 LCP 字体

// 配置 Inter 字体 (基础字体)
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // 确保文本立即可见
  preload: true,   // 如果 Inter 仍然广泛用于首屏内容，则预加载
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
  variable: '--font-inter', // 创建 CSS 变量
});

// 配置 Roboto 字体 (用于 h1 等 LCP 元素)
const roboto = Roboto({
  weight: ['400', '700'], // 加载常规体 (400) 和粗体 (700)
  subsets: ['latin'],
  display: 'swap',    // 必须！确保文本立即可见
  preload: true,      // 必须！因为是 LCP 字体
  variable: '--font-roboto', // 创建 CSS 变量
});

// --- Metadata (保持不变，与您原来的一致) ---
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
        url: "https://generadordelettering.org/og-image.png",
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
    images: ["/og-image.png"],
    creator: "@generadorlettering",
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
    google: "5Fg8Nv7tz4ioNMiGxduGbA7Fby2Y5KHTirnZOfIPExM",
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
    "google-site-verification": "5Fg8Nv7tz4ioNMiGxduGbA7Fby2Y5KHTirnZOfIPExM",
  },
  generator: 'v0.dev'
};

// --- Viewport (保持不变) ---
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#5B4FBE",
};

// --- RootLayout 组件定义 ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // 将 Inter 和 Roboto 的 CSS 变量应用到 html 标签
    // inter.className 也可以直接用，如果不想在 Tailwind 中额外配置 Inter 的话
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${roboto.variable} scroll-smooth`}>
      <head>
        {/*
          移除了之前直接从 fonts.googleapis.com 加载大量字体的 <link> 标签
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?display=swap&family=Dancing+Script:wght@400..."
            rel="stylesheet"
          />
        */}

        {/* 你原有的其他 head 内容 */}
        <SchemaMarkup />
        {/* <FontLoader /> */} {/* 暂时注释掉 FontLoader */}

        {/* Preload logo images for faster rendering */}
        <link rel="preload" href="/logo-light.png" as="image" />
        <link rel="preload" href="/logo-dark.png" as="image" />

        {/* next/font 会处理大部分 preconnect，但保留一个通用的 fonts.gstatic.com 也无妨 */}
        {/* 如果 next/font 自动处理了 googleapis.com 的 preconnect，下面的也可以考虑移除 */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* <link rel="dns-prefetch" href="https://fonts.googleapis.com" /> */}
        {/* <link rel="dns-prefetch" href="https://fonts.gstatic.com" /> */}
      </head>
      {/*
        应用基础字体 Inter 到 body。
        如果你在 tailwind.config.ts 中将 'var(--font-roboto)' 设置为默认的 font-sans,
        那么 body 默认会使用 Roboto。如果想让 body 基础字体是 Inter,
        可以在 tailwind.config.ts 中将 'var(--font-inter)' 设置为 font-sans，
        或者在这里直接使用 inter.className。
        这里我们假设 tailwind.config.ts 中 font-sans 的首选是 var(--font-roboto)，
        但 body 的基础样式仍希望由 inter 控制，所以使用 inter.className。
        如果 roboto 是整个网站的默认字体，可以直接移除 body 的 className，
        它会从 html 继承 var(--font-roboto) 并通过 tailwind 应用。
        为简单起见，如果 Inter 是你的主要段落文本字体，而 Roboto 是标题字体，
        可以将 inter.className 应用到 body，然后在 Tailwind 中为标题指定 font-roboto。
      */}
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
