"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useIsMobile } from "@/hooks/use-mobile" // 尽管我们不用它的返回值了，但导入通常会保留
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

// Resto del código del editor...

export default function EditorClient() {
  // Mantener el código existente...
  // const isMobile = useIsMobile() // 原来的代码被注释掉了
  const isMobile = false;          // 强制 isMobile 为 false

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumbs para SEO */}
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
          {/* Resto del código del editor... */}

          {/* Añadir contenido rico en palabras clave */}
          {/* 因为 isMobile 现在总是 false, 所以这部分理论上总是会渲染 (如果在 lg 断点以上) */}
          {!isMobile && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Crea Lettering Personalizado</h2>
              <div className="prose max-w-none">
                <p>
                  Nuestro <strong>editor de lettering online</strong> te permite crear{" "}
                  <strong>diseños tipográficos únicos</strong>
                  para tus proyectos personales o profesionales. Ya sea que necesites <strong>letras decoradas</strong>{" "}
                  para una invitación, <strong>caligrafía digital</strong> para un logo, o{" "}
                  <strong>tipografía artística</strong> para redes sociales, nuestra herramienta te ofrece todas las
                  opciones que necesitas.
                </p>
                <h3 className="text-xl font-medium mt-4 mb-2">Características del Editor de Lettering</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Múltiples estilos de tipografía</strong> - Elige entre una amplia variedad de fuentes
                    caligráficas y decorativas
                  </li>
                  <li>
                    <strong>Personalización completa</strong> - Ajusta tamaño, color, espaciado y alineación
                  </li>
                  <li>
                    <strong>Efectos profesionales</strong> - Añade sombras, contornos y rotación a tus diseños
                  </li>
                  <li>
                    <strong>Exportación en alta calidad</strong> - Descarga tus creaciones en formato PNG o JPG
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
