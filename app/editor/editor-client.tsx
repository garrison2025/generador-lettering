"use client"
import React from 'react'; // 如果下面用了 useState, useEffect 等，确保导入
// import { useState } from 'react'; // 如果需要状态
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function EditorClient() {
  console.log("EditorClient adding a simple input to left panel");

  // 如果需要状态来控制输入框，可以在这里定义
  // const [text, setText] = useState("Hello");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* ... (Breadcrumbs, H1, P 代码保持不变) ... */}
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Editor de Lettering", href: "/editor" },
          ]}
        />

        <div className="mb-8 mt-4">
          <h1 className="text-4xl font-bold mb-3">Editor de Lettering Profesional</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Crea diseños tipográficos personalizados con nuestro editor de lettering online. Personaliza fuentes,
            colores, efectos y más para crear lettering único para cualquier ocasión.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* 左侧面板区域 */}
          <div style={{border: '1px solid lightgray', padding: '10px'}}>
            <h3 className="text-lg font-semibold mb-2">Controles</h3>
            <div>
              <label htmlFor="textInput" className="block text-sm font-medium text-gray-700">
                Texto:
              </label>
              <input
                type="text"
                id="textInput"
                // value={text} // 暂时不绑定 value
                // onChange={(e) => setText(e.target.value)} // 暂时不处理 onChange
                placeholder="Escribe algo..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                style={{color: 'black'}} // 确保输入文本颜色可见
              />
            </div>
            {/* 其他控制组件先不要加 */}
          </div>
          {/* 右侧预览区域 */}
          <div style={{border: '1px solid lightgray', padding: '10px', minHeight: '100px'}}>
            <h3 className="text-lg font-semibold mb-2">Vista Previa</h3>
            {/* <p style={{ fontSize: '24px' }}>{text}</p> */} {/* 暂时不显示预览 */}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
