import type React from "react";
import "@/app/globals.css"; // 全局 CSS
import { ThemeProvider } from "@/components/theme-provider"; // 主题切换
import { Toaster } from "@/components/ui/toaster"; // 提示框
import { SchemaMarkup } from "@/components/seo/schema-markup"; // SEO Schema

// --- START: 使用 next/font 导入所有字体 ---
import {
  Inter, // 基础字体
  Dancing_Script, // 注意字体名称的写法
  Pacifico,
  Satisfy,
  Sacramento,
  Great_Vibes,
  Amatic_SC,
  Lobster,
  Caveat,
  Kaushan_Script,
  Permanent_Marker
} from "next/font/google";

// 基础字体配置 (保持不变，应用 className)
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // 确保快速显示
  variable: '--font-inter', // 也给基础字体加个变量，方便覆盖
});

// Lettering 字体配置 (使用 CSS 变量)
// 变量名会自动生成，例如 --font-dancing-script, --font-pacifico 等
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ['400', '700'],
  display: "swap",
  variable: '--font-dancing-script', // 指定 CSS 变量名
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: '400',
  display: "swap",
  variable: '--font-pacifico',
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: '400',
  display: "swap",
  variable: '--font-satisfy',
});

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: '400',
  display: "swap",
  variable: '--font-sacramento',
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: '400',
  display: "swap",
  variable: '--font-great-vibes',
});

const amaticSC = Amatic_SC({
  subsets: ["latin"],
  weight: ['400', '700'],
  display: "swap",
  variable: '--font-amatic-sc',
});

const lobster = Lobster({
  subsets: ["latin"],
  weight: '400',
  display: "swap",
  variable: '--font-lobster',
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ['400', '700'],
  display: "swap",
  variable: '--font-caveat',
});

const kaushanScript = Kaushan_Script({
  subsets: ["latin"],
  weight: '400',
  display: "swap",
  variable: '--font-kaushan-script',
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: '400',
  display: "swap",
  variable: '--font-permanent-marker',
});
// --- END: 使用 next/font 导入所有字体 ---


// --- Metadata and Viewport (保持你的配置不变) ---
export const metadata: Metadata = { /* ... 你的 Metadata ... */ };
export const viewport = { /* ... 你的 Viewport ... */ };


// --- RootLayout 组件定义 ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // 将所有字体变量和基础字体 className 应用到 <html>
    // 注意：这里 className 会比较长，这是正常的
    <html
      lang="es"
      suppressHydrationWarning
      className={`
        scroll-smooth
        ${inter.variable} ${dancingScript.variable} ${pacifico.variable}
        ${satisfy.variable} ${sacramento.variable} ${greatVibes.variable}
        ${amaticSC.variable} ${lobster.variable} ${caveat.variable}
        ${kaushanScript.variable} ${permanentMarker.variable}
      `}
    >
      <head>
        {/*
          移除了以下内容：
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?display=swap&family=..." rel="stylesheet" />
          <FontLoader />  // <--- 移除了 FontLoader 组件，因为它现在可能多余
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" /> // <--- 也可以移除，因为字体自托管了
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />   // <--- 也可以移除
        */}

        {/* 保留你需要的其他 head 内容 */}
        <SchemaMarkup />
        <link rel="preload" href="/logo-light.png" as="image" />
        <link rel="preload" href="/logo-dark.png" as="image" />
      </head>
      {/* 应用基础字体 Inter 到 body (可选，因为 html 上已经有变量了) */}
      {/* 如果你主要用 Inter，保留这个 className 可以让默认字体就是 Inter */}
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
