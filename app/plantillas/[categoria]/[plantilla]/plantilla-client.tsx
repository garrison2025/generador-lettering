"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { PencilLine, Share2, ArrowRight } from "lucide-react"

// Definir los tipos
interface Categoria {
  id: string
  nombre: string
}

interface Plantilla {
  id: string
  categoria: string
  nombre: string
  texto: string
  estilo: string
  color: string
  fontSize: number
  letterSpacing: number
  lineHeight: number
  alignment: string
  shadow?: boolean
  shadowColor?: string
  shadowBlur?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  outline?: boolean
  outlineColor?: string
  outlineWidth?: number
  rotation?: number
  descripcion?: string
}

interface PlantillaDetalleClientProps {
  categoria: Categoria
  plantilla: Plantilla
}

// Definición de fuentes para el lettering (mantener el código existente)
const FONTS = [
  { id: "dancing-script", name: "Caligrafía Elegante", family: "'Dancing Script', cursive" },
  { id: "pacifico", name: "Script Moderno", family: "'Pacifico', cursive" },
  { id: "satisfy", name: "Caligrafía Fluida", family: "'Satisfy', cursive" },
  { id: "sacramento", name: "Lettering Fino", family: "'Sacramento', cursive" },
  { id: "great-vibes", name: "Caligrafía Clásica", family: "'Great Vibes', cursive" },
  { id: "amatic-sc", name: "Letras Manuales", family: "'Amatic SC', cursive" },
  { id: "lobster", name: "Lettering Bold", family: "'Lobster', cursive" },
  { id: "caveat", name: "Escritura Natural", family: "'Caveat', cursive" },
  { id: "kaushan-script", name: "Script Dinámico", family: "'Kaushan Script', cursive" },
  { id: "permanent-marker", name: "Marcador", family: "'Permanent Marker', cursive" },
]

export default function PlantillaDetalleClient({ categoria, plantilla }: PlantillaDetalleClientProps) {
  // Obtener la fuente correspondiente
  const font = FONTS.find((f) => f.id === plantilla.estilo) || FONTS[0]

  // Generar estilos CSS para el texto
  const textStyle = {
    fontFamily: font.family,
    fontSize: `${plantilla.fontSize}px`,
    color: plantilla.color,
    textAlign: plantilla.alignment as "left" | "center" | "right",
    letterSpacing: `${plantilla.letterSpacing}px`,
    lineHeight: plantilla.lineHeight,
    transform: plantilla.rotation ? `rotate(${plantilla.rotation}deg)` : "none",
    textShadow: plantilla.shadow
      ? `${plantilla.shadowOffsetX || 2}px ${plantilla.shadowOffsetY || 2}px ${plantilla.shadowBlur || 4}px ${
          plantilla.shadowColor || "rgba(0,0,0,0.3)"
        }`
      : "none",
    WebkitTextStroke: plantilla.outline
      ? `${plantilla.outlineWidth || 1}px ${plantilla.outlineColor || "#FFFFFF"}`
      : "none",
  }

  // Cargar fuentes de Google
  useEffect(() => {
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&family=Sacramento&family=Great+Vibes&family=Amatic+SC:wght@400;700&family=Lobster&family=Caveat:wght@400;700&family=Kaushan+Script&family=Permanent+Marker&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumbs para SEO */}
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Plantillas de Lettering", href: "/plantillas" },
            { label: categoria.nombre, href: `/plantillas/${categoria.id}` },
            { label: plantilla.nombre, href: `/plantillas/${categoria.id}/${plantilla.id}` },
          ]}
        />

        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">Plantilla de Lettering: {plantilla.nombre}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {plantilla.descripcion ||
                `Una plantilla de lettering personalizable para ${categoria.nombre.toLowerCase()}.`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vista previa de la plantilla */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[3/2] flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                  <div style={textStyle}>{plantilla.texto}</div>
                </div>
              </CardContent>
            </Card>

            {/* Detalles y acciones */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Detalles de la Plantilla</h2>
                <ul className="space-y-2">
                  <li>
                    <strong>Categoría:</strong> {categoria.nombre}
                  </li>
                  <li>
                    <strong>Estilo de letra:</strong> {font.name}
                  </li>
                  <li>
                    <strong>Color principal:</strong>{" "}
                    <span
                      className="inline-block w-4 h-4 rounded-full"
                      style={{ backgroundColor: plantilla.color }}
                    ></span>{" "}
                    {plantilla.color}
                  </li>
                  <li>
                    <strong>Efectos:</strong> {plantilla.shadow ? "Sombra" : ""} {plantilla.outline ? "Contorno" : ""}{" "}
                    {!plantilla.shadow && !plantilla.outline ? "Ninguno" : ""}
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href={`/editor?plantilla=${plantilla.id}`} className="flex items-center justify-center gap-2">
                    <PencilLine className="h-4 w-4" />
                    <span>Personalizar esta plantilla</span>
                  </Link>
                </Button>

                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  <span>Compartir</span>
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">Plantillas similares</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Aquí se mostrarían plantillas similares */}
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/plantillas">Ver todas las plantillas</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Cómo Usar Esta Plantilla</h2>
            <div className="prose max-w-none">
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>Selecciona la plantilla</strong> - Haz clic en el botón "Personalizar esta plantilla" para
                  abrirla en el editor.
                </li>
                <li>
                  <strong>Personaliza el texto</strong> - Modifica el texto predeterminado con tu propio contenido.
                </li>
                <li>
                  <strong>Ajusta el diseño</strong> - Cambia colores, tamaños, espaciado y efectos según tus
                  preferencias.
                </li>
                <li>
                  <strong>Exporta tu creación</strong> - Descarga tu diseño personalizado en formato PNG o JPG.
                </li>
              </ol>

              <div className="mt-6">
                <h3 className="text-xl font-medium mb-2">Usos recomendados para esta plantilla</h3>
                <p>Esta plantilla de lettering para {plantilla.nombre.toLowerCase()} es ideal para:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Publicaciones en redes sociales</li>
                  <li>Tarjetas e invitaciones impresas</li>
                  <li>Diseños para camisetas y merchandising</li>
                  <li>Decoración y carteles</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button asChild>
              <Link href={`/editor?plantilla=${plantilla.id}`} className="gap-2">
                Comenzar a personalizar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
