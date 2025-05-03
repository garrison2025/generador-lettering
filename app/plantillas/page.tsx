import type { Metadata } from "next"
import PlantillasClientComponent from "./plantillas-client"

export const metadata: Metadata = {
  title: "Plantillas de Lettering - Diseños prediseñados para personalizar",
  description:
    "Explora nuestra colección de plantillas de lettering prediseñadas para diferentes ocasiones. Personaliza y adapta estos diseños a tus necesidades.",
  keywords:
    "plantillas de lettering, diseños de lettering, lettering para ocasiones especiales, plantillas tipográficas, lettering prediseñado",
  openGraph: {
    title: "Plantillas de Lettering - Diseños prediseñados para personalizar",
    description:
      "Explora nuestra colección de plantillas de lettering prediseñadas para diferentes ocasiones. Personaliza y adapta estos diseños a tus necesidades.",
    images: [{ url: "/og-images/plantillas-preview.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plantillas de Lettering - Diseños prediseñados para personalizar",
    description:
      "Explora nuestra colección de plantillas de lettering prediseñadas para diferentes ocasiones. Personaliza y adapta estos diseños a tus necesidades.",
    images: ["/og-images/plantillas-preview.png"],
  },
}

export default function PlantillasPage() {
  return <PlantillasClientComponent />
}
