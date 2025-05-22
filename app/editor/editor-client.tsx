"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
// import { useIsMobile } from "@/hooks/use-mobile" // <--- 注释掉导入
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function EditorClient() {
  // const isMobile = useIsMobile() // <--- 注释掉调用
  const isMobile = false; // <--- 固定为 false (或者 true，如果想测试移动端行为)

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
          {/* 假设这里是空的 */}
          <div style={{border: '1px solid red', padding: '10px', minHeight: '50px'}}>
            Grid area is here (supposedly empty in original, except for SEO block below)
          </div>

          {/* Añadir contenido rico en palabras clave */}
          {/*
          {!isMobile && ( // <--- 暂时完全注释掉这个 SEO 块
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Crea Lettering Personalizado</h2>
              <div className="prose max-w-none">
                <p>...</p>
                <h3>...</h3>
                <ul>...</ul>
              </div>
            </div>
          )}
          */}
        </div>
        <p style={{color: 'green', marginTop: '10px'}}>Test: isMobile logic and SEO block removed/fixed.</p>
      </main>

      <SiteFooter />
    </div>
  )
}
