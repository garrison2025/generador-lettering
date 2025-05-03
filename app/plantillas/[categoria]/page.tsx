import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PlantillasCategoriaClient from "./categoria-client"

// Definir las categorías disponibles
const CATEGORIAS = [
  { id: "ocasiones", nombre: "Ocasiones Especiales" },
  { id: "frases", nombre: "Frases Inspiradoras" },
  { id: "festividades", nombre: "Festividades" },
  { id: "negocios", nombre: "Negocios" },
]

// Generar metadatos dinámicos basados en la categoría
export async function generateMetadata({ params }: { params: { categoria: string } }): Promise<Metadata> {
  const categoria = CATEGORIAS.find((cat) => cat.id === params.categoria)

  if (!categoria) {
    return {
      title: "Categoría no encontrada",
      description: "La categoría de plantillas que buscas no existe.",
    }
  }

  return {
    title: `Plantillas de Lettering para ${categoria.nombre} | Generador de Lettering`,
    description: `Explora nuestra colección de plantillas de lettering para ${categoria.nombre.toLowerCase()}. Diseños personalizables para tus proyectos.`,
    keywords: `plantillas de lettering ${categoria.nombre.toLowerCase()}, lettering para ${categoria.nombre.toLowerCase()}, diseños tipográficos ${categoria.nombre.toLowerCase()}`,
    openGraph: {
      title: `Plantillas de Lettering para ${categoria.nombre}`,
      description: `Explora nuestra colección de plantillas de lettering para ${categoria.nombre.toLowerCase()}. Diseños personalizables para tus proyectos.`,
      images: [{ url: `/og-images/categoria-${params.categoria}.png`, width: 1200, height: 630 }],
    },
  }
}

// Generar rutas estáticas para todas las categorías
export async function generateStaticParams() {
  return CATEGORIAS.map((categoria) => ({
    categoria: categoria.id,
  }))
}

export default function PlantillasCategoriaPage({ params }: { params: { categoria: string } }) {
  const categoria = CATEGORIAS.find((cat) => cat.id === params.categoria)

  if (!categoria) {
    notFound()
  }

  return <PlantillasCategoriaClient categoria={categoria} />
}
