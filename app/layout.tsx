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
// import { FontLoader } from "@/components/font-loader"; // 注释掉或移除，除非你确定它有其他非字体加载的关键作用

// 基础字体 Inter (通常用于网站主体文本)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // 定义 CSS 变量
  fallback: ["system-ui", "arial", "sans-serif"], // 更通用的备选字体
  adjustFontFallback: true,
  preload: true, // 明确预加载
});

// Roboto 字体 (你的 H1 和可能其他元素使用的字体)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"], // 加载你实际会用到的字重
  display: "swap",
  variable: "--font-roboto", // 定义 CSS 变量
  fallback: ["helvetica", "arial", "sans-serif"], // 更通用的备选字体
  preload: true, // 明确预加载
});

// Lettering 艺术字体
// (为每个字体只加载你实际使用的字重，以优化性能)
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"], // 示例：只加载常规和粗体
  display: "swap",
  variable: "--font-dancing-script",
  preload: false, // 这些艺术字体可能不是首屏立即需要的，可以不预加载
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
    images: ["/og-image.png"], // 确保路径正确，通常相对于 public 目录
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
  generator: 'v0.dev' // 如果是 v0.dev 生成的，保留即可
};

// --- Viewport (保持你原有的配置) ---
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // 如果你允许用户放大到5倍
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
      className={`scroll-smooth ${inter.variable} ${roboto.variable} ${dancingScript.variable} ${pacifico.variable} ${satisfy.variable} ${sacramento.variable} ${greatVibes.variable} ${amaticSC.variable} ${lobster.variable} ${caveat.variable} ${kaushanScript.variable} ${permanentMarker.variable}`}
    >
      <head>
        {/*
          移除了原有的 Google Fonts <link> 标签，因为 next/font 会处理字体加载。
          移除了原有的 FontLoader 组件，因为它可能与 next/font 冲突或多余。
        */}

        {/* 保留这些 preconnect，有助于浏览器更快地与字体服务器建立连接，next/font 可能也会利用它们 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* SchemaMarkup 组件，如果你有的话 */}
        <SchemaMarkup />

        {/* 预加载 Logo 图片，这是一个好习惯 */}
        <link rel="preload" href="/logo-light.png" as="image" />
        <link rel="preload" href="/logo-dark.png" as="image" />
      </head>
      {/*
        将 Inter 字体类名应用到 body 作为基础字体。
        如果你希望 Roboto 是主要字体，可以使用 roboto.className。
        或者，你可以在全局 CSS 中通过 CSS 变量来设置 body 的 font-family。
        例如： body { font-family: var(--font-roboto), var(--font-inter), sans-serif; }
      */}
      <body className={`${inter.className} antialiased`}> {/* antialiased 可选，用于平滑字体 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // 或 "system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
