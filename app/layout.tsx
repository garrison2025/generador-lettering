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
import Script from 'next/script'; // 导入 Script 组件

// 基础字体 Inter (通常用于网站主体文本)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "arial", "sans-serif"],
  adjustFontFallback: true,
  preload: false,
});

// Roboto 字体 (你的 H1 和 LCP <p> 元素使用的字体)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-roboto",
  fallback: ["helvetica", "arial", "sans-serif"],
  preload: true,
});

// Lettering 艺术字体 (保持 preload: false)
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-dancing-script",
  preload: false,
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-pacifico",
  preload: false,
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-satisfy",
  preload: false,
});

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-sacramento",
  preload: false,
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-great-vibes",
  preload: false,
});

const amaticSC = Amatic_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-amatic-sc",
  preload: false,
});

const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-lobster",
  preload: false,
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-caveat",
  preload: false,
});

const kaushanScript = Kaushan_Script({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-kaushan-script",
  preload: false,
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-permanent-marker",
  preload: false,
});


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
      className={`scroll-smooth ${inter.variable} ${roboto.variable} ${dancingScript.variable} ${pacifico.variable} ${satisfy.variable} ${sacramento.variable} ${greatVibes.variable} ${amaticSC.variable} ${lobster.variable} ${caveat.variable} ${kaushanScript.variable} ${permanentMarker.variable}`}
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
          <Toaster />
        </ThemeProvider>

        {/* Adsterra Social Bar Script */}
        <Script
          id="adsterra-socialbar"
          src="//pl26707745.profitableratecpm.com/aa/3e/7c/aa3e7c6a9214fa224ddd32eef045cb13.js"
          strategy="afterInteractive"
          type="text/javascript"
          // async // 可选：如果 Adsterra 脚本支持异步加载，可以取消注释此行以提高性能。
                  // 如果不确定，可以先不加，或者查阅 Adsterra 文档。
        />
      </body>
    </html>
  );
}
