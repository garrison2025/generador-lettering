import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteLogo } from "@/components/site-logo"
import Link from "next/link"
import { Home, Brush, Heart, Sparkles, Users } from "lucide-react"

export const metadata = {
  title: "Acerca de nosotros | Generador de Lettering",
  description:
    "Conoce más sobre el equipo detrás del Generador de Lettering y nuestra misión de hacer el arte tipográfico accesible para todos.",
}

export default function AcercaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <SiteLogo size="sm" />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Acerca de nosotros</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce la historia detrás del Generador de Lettering y nuestra misión de hacer el arte tipográfico
              accesible para todos.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
              <div className="bg-[#F4F4F8] p-6 rounded-lg">
                <p className="mb-4">
                  El Generador de Lettering nació en 2022 de la pasión por la tipografía y el diseño. Como diseñadores y
                  desarrolladores, nos dimos cuenta de que muchas personas querían crear hermosos diseños tipográficos
                  para sus proyectos pero carecían de las herramientas o habilidades técnicas para hacerlo.
                </p>
                <p>
                  Decidimos crear una herramienta que permitiera a cualquier persona, independientemente de su
                  experiencia en diseño, crear lettering artístico de forma sencilla e intuitiva. Después de meses de
                  desarrollo y pruebas, lanzamos la primera versión de nuestro generador, que ha ido evolucionando
                  gracias a los comentarios y sugerencias de nuestra comunidad.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <p className="text-center">
                    Democratizar el arte del lettering, haciendo que herramientas profesionales de diseño tipográfico
                    sean accesibles para todos, sin barreras técnicas ni económicas.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nuestros Valores</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Pasión</h3>
                  <p className="text-muted-foreground">
                    Amamos el diseño y la tipografía, y esa pasión impulsa cada aspecto de nuestro trabajo.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-bold mb-2">Comunidad</h3>
                  <p className="text-muted-foreground">
                    Valoramos a nuestra comunidad y sus aportaciones para mejorar constantemente nuestra herramienta.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brush className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold mb-2">Creatividad</h3>
                  <p className="text-muted-foreground">
                    Fomentamos la expresión creativa y proporcionamos las herramientas para hacerla realidad.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Nuestro Equipo</h2>
              <p className="text-muted-foreground mb-6">
                Somos un equipo diverso de diseñadores, desarrolladores y entusiastas de la tipografía unidos por la
                pasión de crear herramientas que inspiren creatividad.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="w-16 h-16 bg-primary rounded-full mr-4 flex items-center justify-center text-white text-xl font-bold">
                    AL
                  </div>
                  <div>
                    <h3 className="font-bold">Ana López</h3>
                    <p className="text-muted-foreground">Fundadora y Diseñadora Principal</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="w-16 h-16 bg-secondary rounded-full mr-4 flex items-center justify-center text-white text-xl font-bold">
                    MR
                  </div>
                  <div>
                    <h3 className="font-bold">Miguel Rodríguez</h3>
                    <p className="text-muted-foreground">Desarrollador Jefe</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="w-16 h-16 bg-accent rounded-full mr-4 flex items-center justify-center text-white text-xl font-bold">
                    LG
                  </div>
                  <div>
                    <h3 className="font-bold">Laura García</h3>
                    <p className="text-muted-foreground">Especialista en UX/UI</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="w-16 h-16 bg-[#4A4A4A] rounded-full mr-4 flex items-center justify-center text-white text-xl font-bold">
                    CS
                  </div>
                  <div>
                    <h3 className="font-bold">Carlos Sánchez</h3>
                    <p className="text-muted-foreground">Experto en Tipografía</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Tecnología</h2>
              <div className="bg-[#F4F4F8] p-6 rounded-lg">
                <p className="mb-4">
                  Nuestro generador de lettering está construido con tecnologías web modernas para garantizar una
                  experiencia fluida y accesible desde cualquier dispositivo.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">React</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">Next.js</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">TypeScript</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">HTML Canvas</span>
                </div>
              </div>
            </section>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">¿Quieres formar parte de nuestra historia?</h2>
              <p className="text-muted-foreground mb-6">
                Estamos constantemente buscando mejorar y expandir nuestras herramientas. Si tienes sugerencias o
                quieres colaborar con nosotros, ¡nos encantaría saber de ti!
              </p>
              <p className="mb-6">
                <a href="mailto:info@generadordelettering.org" className="text-primary hover:underline">
                  info@generadordelettering.org
                </a>
              </p>
              <Button asChild>
                <Link href="/contacto">Contacta con nosotros</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#4A4A4A] text-white py-6">
        <div className="container mx-auto px-4 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Generador de Lettering. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
