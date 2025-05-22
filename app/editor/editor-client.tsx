"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useIsMobile } from "@/hooks/use-mobile" // <--- 1. 恢复导入
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function EditorClient() {
  const isMobileHookResult = useIsMobile() // <--- 2. 恢复调用，但赋值给一个新变量
  console.log("useIsMobile hook was called, result:", isMobileHookResult); // 加日志

  // const isMobile = false; // 暂时不用这个固定的值

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* ... (Breadcrumbs, H1, P 保持不变) ... */}
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
            Grid area is here. Testing if calling useIsMobile() causes issues.
          </div>
          {/* SEO 块依然保持注释 */}
        </div>
        <p style={{color: 'blue', marginTop: '10px'}}>Test A: useIsMobile() is called, but its result is not used yet.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
