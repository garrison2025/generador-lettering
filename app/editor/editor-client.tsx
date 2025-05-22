"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export default function EditorClient() {
  const isMobile = useIsMobile()
  console.log("useIsMobile hook was called, isMobile:", isMobile);

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
            Grid area is here. Value of isMobile: {isMobile === undefined ? 'undefined' : isMobile ? 'true' : 'false'}
          </div>

          {/* 1. 取消 SEO 内容块的注释 */}
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
        <p style={{color: 'purple', marginTop: '10px'}}>Test C: SEO block is now UNCOMMENTED. Will it break?</p>
      </main>
      <SiteFooter />
    </div>
  )
}
