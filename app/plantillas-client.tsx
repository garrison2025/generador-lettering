"use client"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

// Resto del código de plantillas...

export default function PlantillasClient() {
  // Mantener el código existente...

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumbs para SEO */}
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Plantillas de Lettering", href: "/plantillas" },
          ]}
        />

        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">Plantillas de Lettering Profesionales</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explora nuestra colección de plantillas de lettering prediseñadas para diferentes ocasiones. Encuentra
              inspiración y personaliza estos diseños tipográficos para adaptarlos a tus necesidades.
            </p>
          </div>

          {/* Resto del código de plantillas... */}

          {/* Añadir contenido rico en palabras clave */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Plantillas de Lettering para Cada Ocasión</h2>
            <div className="prose max-w-none">
              <p>
                Nuestras <strong>plantillas de lettering</strong> están diseñadas por profesionales para ayudarte a
                crear
                <strong>diseños tipográficos impactantes</strong> sin esfuerzo. Cada plantilla puede personalizarse
                completamente para adaptarse a tus necesidades específicas.
              </p>

              <h3 className="text-xl font-medium mt-4 mb-2">Categorías de Plantillas</h3>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-lg font-medium mb-2">Ocasiones Especiales</h4>
                  <p>Plantillas diseñadas para bodas, cumpleaños, graduaciones y otros eventos importantes.</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      <Link href="/plantillas/categoria/ocasiones/boda" className="text-primary hover:underline">
                        Invitaciones de boda
                      </Link>
                    </li>
                    <li>
                      <Link href="/plantillas/categoria/ocasiones/cumpleanos" className="text-primary hover:underline">
                        Felicitaciones de cumpleaños
                      </Link>
                    </li>
                    <li>
                      <Link href="/plantillas/categoria/ocasiones/graduacion" className="text-primary hover:underline">
                        Anuncios de graduación
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">Frases Inspiradoras</h4>
                  <p>Diseños con mensajes motivacionales y frases inspiradoras para compartir.</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      <Link href="/plantillas/categoria/frases/motivacion" className="text-primary hover:underline">
                        Frases motivacionales
                      </Link>
                    </li>
                    <li>
                      <Link href="/plantillas/categoria/frases/amor" className="text-primary hover:underline">
                        Frases de amor
                      </Link>
                    </li>
                    <li>
                      <Link href="/plantillas/categoria/frases/exito" className="text-primary hover:underline">
                        Mensajes de éxito
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
