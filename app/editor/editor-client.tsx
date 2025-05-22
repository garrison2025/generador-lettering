"use client"
import React, { useState } from 'react'; // 1. 导入 useState
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function EditorClient() {
  console.log("EditorClient adding state and onChange to text input");

  // 2. 定义 text 状态和 setText 函数
  const [text, setText] = useState("Texto de prueba"); // 给一个初始值方便观察

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
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
                value={text} // 3. 绑定 value 到 text 状态
                onChange={(e) => setText(e.target.value)} // 4. 添加 onChange 事件处理
                placeholder="Escribe algo..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                style={{color: 'black'}}
              />
            </div>
            {/* 其他控制组件先不要加 */}
          </div>
          {/* 右侧预览区域 */}
          <div style={{border: '1px solid lightgray', padding: '10px', minHeight: '100px'}}>
            <h3 className="text-lg font-semibold mb-2">Vista Previa</h3>
            {/* 5. 在预览区显示 text 状态的值 */}
            <p style={{ fontSize: '24px', color: 'purple' }}>{text}</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
