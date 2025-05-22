"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useIsMobile } from "@/hooks/use-mobile" // 保留导入，因为原始代码用了
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import React from 'react'; // 确保 React 被导入

export default function EditorClient() {
  const isMobile = useIsMobile() // 保留调用，因为原始代码用了
  console.log("Base working version, isMobile:", isMobile);

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Editor de Lettering Profesional</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Crea diseños tipográficos personalizados con nuestro editor de lettering online. Personaliza fuentes,
            colores, efectos y más para crear lettering único para cualquier ocasión.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div style={{border: '1px solid red', padding: '10px', minHeight: '50px', background: '#ffe0e0'}}>
            LEFT PANEL AREA - Value of isMobile: {isMobile === undefined ? 'undefined' : isMobile ? 'true' : 'false'}
          </div>
          <div style={{border: '1px solid blue', padding: '10px', minHeight: '50px', background: '#e0e0ff'}}>
            RIGHT PANEL AREA
          </div>

          {/* SEO 内容块，根据 isMobile 判断 */}
          {!isMobile && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Crea Lettering Personalizado</h2>
              <div className="prose max-w-none">
                <p>
                  Nuestro <strong>editor de lettering online</strong> te permite crear...
                </p>
                <h3 className="text-xl font-medium mt-4 mb-2">Características del Editor de Lettering</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>...</li>
                  <li>...</li>
                  <li>...</li>
                  <li>...</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <p style={{color: 'green', marginTop: '10px'}}>Base version is working. Starting to add real editor components.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
