"use client"
import React from 'react';
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs"; // 1. 导入 Breadcrumbs

export default function EditorClient() {
  console.log("EditorClient with Breadcrumbs and static text rendering on mobile?");
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8"> {/* 移除了临时边框和内边距 */}
        {/* 2. 添加 Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Editor de Lettering", href: "/editor" },
          ]}
        />

        {/* 3. 添加静态的 H1 和 P 标签 */}
        <div className="mb-8 mt-4"> {/* 加一点 mt-4 给面包屑留空间 */}
          <h1 className="text-4xl font-bold mb-3">Editor de Lettering Profesional</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Crea diseños tipográficos personalizados con nuestro editor de lettering online. Personaliza fuentes,
            colores, efectos y más para crear lettering único para cualquier ocasión.
          </p>
        </div>

        <p style={{color: 'orange'}}>Breadcrumbs and static text added.</p>
        <p>Next, we will add the main editor grid layout and its actual content.</p>
        {/* 暂时不添加编辑器核心的 grid 布局和逻辑 */}
      </main>
      <SiteFooter />
    </div>
  );
}
