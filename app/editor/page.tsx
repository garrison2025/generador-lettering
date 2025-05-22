import type { Metadata } from "next"
import EditorClient from "./editor-client"

export const metadata: Metadata = {
  title: "Editor de Lettering - Crea diseños tipográficos personalizados",
  description:
    "Utiliza nuestro editor de lettering para crear diseños tipográficos personalizados con múltiples estilos, colores y efectos para cualquier ocasión.",
  keywords:
    "editor de lettering, diseño de letras, tipografía personalizada, lettering online, crear lettering, herramienta de lettering",
  openGraph: {
    title: "Editor de Lettering - Crea diseños tipográficos personalizados",
    description:
      "Utiliza nuestro editor de lettering para crear diseños tipográficos personalizados con múltiples estilos, colores y efectos para cualquier ocasión.",
    images: [{ url: "/og-images/editor-preview.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editor de Lettering - Crea diseños tipográficos personalizados",
    description:
      "Utiliza nuestro editor de lettering para crear diseños tipográficos personalizados con múltiples estilos, colores y efectos para cualquier ocasión.",
    images: ["/og-images/editor-preview.png"],
  },
}

export default function EditorPage() {
  return <EditorClient />
}
