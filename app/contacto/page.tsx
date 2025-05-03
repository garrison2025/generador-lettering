import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteLogo } from "@/components/site-logo"
import Link from "next/link"
import { Home, Mail } from "lucide-react"

export const metadata = {
  title: "Contacta con nosotros | Generador de Lettering",
  description:
    "Ponte en contacto con el equipo de Generador de Lettering para consultas, sugerencias o soporte técnico.",
}

export default function ContactoPage() {
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contacta con nosotros</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes alguna pregunta, sugerencia o necesitas ayuda? Estamos aquí para asistirte.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Card className="border-none shadow-md max-w-md w-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-muted-foreground mb-2">Responderemos en 24-48 horas</p>
                <p className="font-medium">
                  <a href="mailto:info@generadordelettering.org" className="hover:text-primary">
                    info@generadordelettering.org
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
              <CardDescription>
                Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="text-sm font-medium">
                      Nombre
                    </label>
                    <Input id="nombre" placeholder="Tu nombre" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="tu@email.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="asunto" className="text-sm font-medium">
                    Asunto
                  </label>
                  <Input id="asunto" placeholder="Asunto de tu mensaje" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="mensaje" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." rows={5} required />
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes</h2>
            <p className="text-muted-foreground mb-6">
              Antes de contactarnos, quizás encuentres respuesta a tu pregunta en nuestra sección de FAQ.
            </p>
            <Button variant="outline" asChild>
              <Link href="/#faq">Ver preguntas frecuentes</Link>
            </Button>
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
