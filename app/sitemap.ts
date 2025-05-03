import type { MetadataRoute } from "next"

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
  },
  {
    id: "cumpleanos",
    categoria: "ocasiones",
    nombre: "Feliz Cumpleaños",
  },
  // Resto de plantillas...
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://generadordelettering.org"

  // Páginas principales
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/editor`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/plantillas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/acerca`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ]

  // Páginas de categorías
  const categoriaPages = CATEGORIAS.map((categoria) => ({
    url: `${baseUrl}/plantillas/${categoria.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  // Páginas de plantillas individuales
  const plantillaPages = PLANTILLAS.map((plantilla) => ({
    url: `${baseUrl}/plantillas/${plantilla.categoria}/${plantilla.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...mainPages, ...categoriaPages, ...plantillaPages]
}
