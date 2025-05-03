"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { InteractiveLetteringPreview } from "@/components/interactive-lettering-preview"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

// Definir los tipos
interface Categoria {
  id: string
  nombre: string
}

interface PlantillasCategoriaClientProps {
  categoria: Categoria
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

// Definición de plantillas (mantener el código existente)
const PLANTILLAS = [
  {
    id: "boda",
    categoria: "ocasiones",
    nombre: "Invitación de Boda",
    texto: "Juan & María\n12 de Junio 2023",
    estilo: "dancing-script",
    color: "#5B4FBE",
    fontSize: 36,
    letterSpacing: 1,
    lineHeight: 1.8,
    alignment: "center",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
  // Resto de plantillas...
]

export default function PlantillasCategoriaClient({ categoria }: PlantillasCategoriaClientProps) {
  // Filtrar plantillas por categoría
  const plantillasCategoria = PLANTILLAS.filter((plantilla) => plantilla.categoria === categoria.id)

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
          ]}
        />

        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">Plantillas de Lettering para {categoria.nombre}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explora nuestra colección de plantillas de lettering diseñadas específicamente para{" "}
              {categoria.nombre.toLowerCase()}. Personaliza estos diseños para adaptarlos a tus necesidades.
            </p>
          </div>

          {plantillasCategoria.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {plantillasCategoria.map((plantilla) => {
                const font = FONTS.find((f) => f.id === plantilla.estilo) || FONTS[0]
                return (
                  <div key={plantilla.id}>
                    <InteractiveLetteringPreview template={plantilla} fontFamily={font.family} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No se encontraron plantillas en esta categoría.</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/plantillas">Ver todas las plantillas</Link>
              </Button>
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Sobre las Plantillas de {categoria.nombre}</h2>
            <div className="prose max-w-none">
              <p>
                Nuestras <strong>plantillas de lettering para {categoria.nombre.toLowerCase()}</strong> están diseñadas
                para ayudarte a crear <strong>diseños tipográficos profesionales</strong> de forma rápida y sencilla.
                Cada plantilla puede personalizarse completamente para adaptarse a tus necesidades específicas.
              </p>

              <p className="mt-4">
                Utiliza estas plantillas como punto de partida para tus proyectos de {categoria.nombre.toLowerCase()} y
                personalízalas con nuestro{" "}
                <Link href="/editor" className="text-primary hover:underline">
                  editor de lettering
                </Link>
                para crear diseños únicos que destaquen.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/editor" className="gap-2">
                Crear diseño personalizado
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
