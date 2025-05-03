import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import { FontLoader } from "@/components/font-loader"; // 你原有的 FontLoader 组件

// 优化字体加载，使用可变字体减少文件大小 (这是你的基础字体 Inter)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

// --- Metadata (保持不变) ---
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
    google: "5Fg8Nv7tz4ioNMiGxduGbA7Fby2Y5KHTirnZOfIPExM", // 请替换成你的 Google 验证码
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
    "google-site-verification": "5Fg8Nv7tz4ioNMiGxduGbA7Fby2Y5KHTirnZOfIPExM", // 请替换成你的 Google 验证码
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
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* --- START: 添加这些用于加载 Lettering 字体的 Link 标签 --- */}
        {/* 告诉浏览器尽快连接到 Google Fonts 服务器 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* 直接加载你需要的 Lettering 字体 CSS 文件 */}
        <link
          href="https://fonts.googleapis.com/css2?display=swap&family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&family=Sacramento&family=Great+Vibes&family=Amatic+SC:wght@400;700&family=Lobster&family=Caveat:wght@400;700&family=Kaushan+Script&family=Permanent+Marker"
          rel="stylesheet"
        />
        {/* --- END: 添加这些用于加载 Lettering 字体的 Link 标签 --- */}

        {/* --- 你原有的其他 head 内容 --- */}
        <SchemaMarkup />
        <FontLoader /> {/* 你的 FontLoader 组件 */}
        {/* Preload logo images for faster rendering */}
        <link rel="preload" href="/logo-light.png" as="image" />
        <link rel="preload" href="/logo-dark.png" as="image" />
        {/* 你原有的 dns-prefetch, 保留它们没问题 */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* --- END 你原有的其他 head 内容 --- */}
      </head>
      {/* 应用基础字体 Inter 到 body */}
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
