import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PlantillaDetalleClient from "./plantilla-client"

// Definir las categorías disponibles
const CATEGORIAS = [
  { id: "ocasiones", nombre: "Ocasiones Especiales" },
  { id: "frases", nombre: "Frases Inspiradoras" },
  { id: "festividades", nombre: "Festividades" },
  { id: "negocios", nombre: "Negocios" },
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
    descripcion:
      "Plantilla elegante para invitaciones de boda con un estilo caligráfico clásico. Perfecta para anunciar tu día especial con un toque sofisticado y romántico.",
  },
  {
    id: "cumpleanos",
    categoria: "ocasiones",
    nombre: "Feliz Cumpleaños",
    texto: "¡Feliz Cumpleaños!",
    estilo: "pacifico",
    color: "#FF6B6B",
    fontSize: 38,
    letterSpacing: 2,
    lineHeight: 1.5,
    alignment: "center",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowBlur: 5,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    descripcion:
      "Plantilla festiva y colorida para felicitaciones de cumpleaños. Ideal para tarjetas, publicaciones en redes sociales o mensajes personalizados de felicitación.",
  },
  // Resto de plantillas...
]

// Generar metadatos dinámicos basados en la plantilla
export async function generateMetadata({
  params,
}: { params: { categoria: string; plantilla: string } }): Promise<Metadata> {
  const plantilla = PLANTILLAS.find((p) => p.id === params.plantilla && p.categoria === params.categoria)

  if (!plantilla) {
    return {
      title: "Plantilla no encontrada",
      description: "La plantilla de lettering que buscas no existe.",
    }
  }

  return {
    title: `${plantilla.nombre} - Plantilla de Lettering | Generador de Lettering`,
    description:
      plantilla.descripcion ||
      `Plantilla de lettering "${plantilla.nombre}" personalizable para tus proyectos de diseño tipográfico.`,
    keywords: `plantilla ${plantilla.nombre.toLowerCase()}, lettering ${plantilla.nombre.toLowerCase()}, diseño tipográfico ${plantilla.nombre.toLowerCase()}, letras decoradas`,
    openGraph: {
      title: `${plantilla.nombre} - Plantilla de Lettering`,
      description:
        plantilla.descripcion ||
        `Plantilla de lettering "${plantilla.nombre}" personalizable para tus proyectos de diseño tipográfico.`,
      images: [{ url: `/og-images/plantilla-${params.plantilla}.png`, width: 1200, height: 630 }],
    },
  }
}

// Generar rutas estáticas para todas las plantillas
export async function generateStaticParams() {
  return PLANTILLAS.map((plantilla) => ({
    categoria: plantilla.categoria,
    plantilla: plantilla.id,
  }))
}

export default function PlantillaDetallePage({ params }: { params: { categoria: string; plantilla: string } }) {
  const categoria = CATEGORIAS.find((cat) => cat.id === params.categoria)
  const plantilla = PLANTILLAS.find((p) => p.id === params.plantilla && p.categoria === params.categoria)

  if (!categoria || !plantilla) {
    notFound()
  }

  return <PlantillaDetalleClient categoria={categoria} plantilla={plantilla} />
}
