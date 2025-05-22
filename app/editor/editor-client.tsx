// app/editor/editor-client.tsx
"use client"
import React from 'react';
import { SiteHeader } from "@/components/site-header"; // 1. 导入 SiteHeader
import { SiteFooter } from "@/components/site-footer"; // 2. 导入 SiteFooter

export default function EditorClient() {
  console.log("EditorClient with Header/Footer rendering on mobile?");
  return (
    // 3. 使用原始的 flex 布局结构
    <div className="flex flex-col min-h-screen">
      <SiteHeader /> {/* 4. 添加 SiteHeader */}
      <main className="flex-1 container mx-auto px-4 py-8" style={{ border: '2px solid green', padding: '10px' }}>
        <p>EditorClient - With SiteHeader and SiteFooter</p>
        <p>Next, we will add Breadcrumbs and other static content.</p>
        {/* 暂时不添加 Breadcrumbs 和编辑器核心内容 */}
      </main>
      <SiteFooter /> {/* 5. 添加 SiteFooter */}
    </div>
  );
}
