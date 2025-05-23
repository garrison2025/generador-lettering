import type React from "react";
import dynamic from 'next/dynamic';
import Script from 'next/script'; // 导入 Script 组件
import type { Metadata } from "next";

import "@/app/globals.css"; // 确保你的全局 CSS 路径正确
import { ThemeProvider } from "@/components/theme-provider"; // 确保路径正确
import { SchemaMarkup } from "@/components/seo/schema-markup"; // 确保路径正确

import {
  Inter,
  Roboto,
  // 注意：以下艺术字体已从此全局布局中移除
  // Dancing_Script, Pacifico, Satisfy, Sacramento, Great_Vibes,
  // Amatic_SC, Lobster, Caveat, Kaushan_Script, Permanent_Marker,
} from "next/font/google";

// 动态导入 Toaster 组件
const Toaster = dynamic(() => import('@/components/ui/toaster').then(mod => mod.Toaster), {
  ssr: false, // Toaster 通常是客户端组件，如果不需要SSR可以设置为false
});

// --- 关键字体定义 ---

// 基础字体 Inter (预加载以优化 LCP/FCP)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "arial", "sans-serif"],
  adjustFontFallback: true,
  preload: true, // 优化：设置为 true
});

// Roboto 字体 (H1 和 LCP <p> 元素使用的字体，预加载)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-roboto",
  fallback: ["helvetica", "arial", "sans-serif"],
  preload: true, // 保持 true
});

// --- 艺术字体说明 ---
// 重要的性能优化：
// 以下艺术字体已从全局 RootLayout 中移除。
// 请在你实际需要使用这些字体的特定组件或页面中单独导入和定义它们。
// 例如，在一个使用 Dancing_Script 的组件中：
// import { Dancing_Script } from "next/font/google";
// const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400'], display: 'swap', variable: '--font-dancing-script', preload: false });
// 然后在该组件的 JSX 中使用 dancingScript.variable 或 dancingScript.className。
//
// const dancingScript = Dancing_Script({ preload: false, ... });
// const pacifico = Pacifico({ preload: false, ... });
// const satisfy = Satisfy({ preload: false, ... });
// const sacramento = Sacramento({ preload: false, ... });
// const greatVibes = Great_Vibes({ preload: false, ... });
// const amaticSC = Amatic_SC({ preload: false, ... });
// const lobster = Lobster({ preload: false, ... });
// const caveat = Caveat({ preload: false, ... });
// const kaushanScript = Kaushan_Script({ preload: false, ... });
// const permanentMarker = Permanent_Marker({ preload: false, ... });


// --- Metadata (保持你原有的配置, 移除了重复的 google-site-verification) ---
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
  verification: { // 优化：仅保留此处的 Google 验证
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
  // 优化：移除了 other: { "google-site-verification": ... } 因为已在 verification 中
  generator: 'v0.dev'
};

// --- Viewport (保持你原有的配置) ---
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
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      // 优化：className 中只包含全局需要的字体变量
      className={`scroll-smooth ${inter.variable} ${roboto.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <SchemaMarkup />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster /> {/* Toaster 现在是动态导入的 */}
        </ThemeProvider>

        {/* Adsterra Social Bar Script */}
        <Script
          id="adsterra-socialbar"
          src="//pl26707745.profitableratecpm.com/aa/3e/7c/aa3e7c6a9214fa224ddd32eef045cb13.js"
          strategy="afterInteractive"
          type="text/javascript"
          async // 优化：添加 async 属性，如果脚本支持且不影响功能
        />
      </body>
    </html>
  );
}
