"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function EditorClient() {
  const isMobile = useIsMobile() // <--- 1. 恢复将结果赋给 isMobile
  console.log("useIsMobile hook was called, isMobile:", isMobile); // 记录 isMobile 的值

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
          <div style={{border: '1px solid red', padding: '10px', minHeight: '50px'}}>
            Grid area is here. Testing using the 'isMobile' variable.
            <p>Value of isMobile: {isMobile === undefined ? 'undefined' : isMobile ? 'true' : 'false'}</p> {/* 2. 显示 isMobile 的值 */}
          </div>
          {/* SEO 块依然保持注释 */}
          {/*
          {!isMobile && (
            <div className="mt-8">
              ...
            </div>
          )}
          */}
        </div>
        <p style={{color: 'green', marginTop: '10px'}}>Test B: 'isMobile' variable is now used (displayed above). SEO block still commented.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
