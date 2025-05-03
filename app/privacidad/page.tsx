import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteLogo } from "@/components/site-logo"
import Link from "next/link"
import { Home, Shield } from "lucide-react"

export const metadata = {
  title: "Política de Privacidad | Generador de Lettering",
  description: "Conoce cómo recopilamos, utilizamos y protegemos tu información personal en el Generador de Lettering.",
}

export default function PrivacidadPage() {
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
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-muted-foreground">
              Última actualización:{" "}
              {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <Card className="border-none shadow-md mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Introducción</h2>
              <p className="mb-4">
                En Generador de Lettering, accesible desde generador-lettering.org, una de nuestras principales
                prioridades es la privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene
                los tipos de información que se recopilan y registran por Generador de Lettering y cómo la utilizamos.
              </p>
              <p>
                Si tienes preguntas adicionales o requieres más información sobre nuestra Política de Privacidad, no
                dudes en contactarnos a través de nuestra página de contacto.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Información que recopilamos</h2>
              <div className="bg-[#F4F4F8] p-6 rounded-lg">
                <p className="mb-4">
                  Cuando utilizas nuestro generador de lettering, podemos recopilar los siguientes tipos de información:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Información básica de uso:</strong> Recopilamos datos anónimos sobre cómo interactúas con
                    nuestra herramienta, como las funciones que utilizas con más frecuencia y el tiempo que pasas en el
                    sitio.
                  </li>
                  <li>
                    <strong>Información técnica:</strong> Podemos recopilar información sobre tu dispositivo, navegador
                    y sistema operativo para optimizar tu experiencia.
                  </li>
                  <li>
                    <strong>Información de contacto:</strong> Si decides contactarnos a través de nuestro formulario,
                    recopilaremos tu nombre y dirección de correo electrónico para poder responderte.
                  </li>
                  <li>
                    <strong>Diseños creados:</strong> Los diseños que creas con nuestra herramienta se almacenan
                    temporalmente en tu navegador para que puedas trabajar en ellos. No tenemos acceso a estos diseños a
                    menos que decidas compartirlos explícitamente.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cómo utilizamos tu información</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4">Utilizamos la información que recopilamos para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proporcionar, mantener y mejorar nuestro generador de lettering.</li>
                  <li>Responder a tus consultas y solicitudes de soporte.</li>
                  <li>Analizar tendencias de uso para mejorar la funcionalidad y usabilidad del sitio.</li>
                  <li>Detectar, prevenir y abordar problemas técnicos.</li>
                  <li>Cumplir con obligaciones legales cuando sea necesario.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies y tecnologías de seguimiento</h2>
              <div className="bg-[#F4F4F8] p-6 rounded-lg">
                <p className="mb-4">
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio. Las cookies
                  son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web.
                </p>
                <p className="mb-4">Utilizamos los siguientes tipos de cookies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.
                  </li>
                  <li>
                    <strong>Cookies de preferencias:</strong> Permiten recordar información que cambia el comportamiento
                    o aspecto del sitio.
                  </li>
                  <li>
                    <strong>Cookies analíticas:</strong> Nos ayudan a entender cómo interactúas con el sitio.
                  </li>
                </ul>
                <p className="mt-4">
                  Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envía una
                  cookie. Sin embargo, si rechazas las cookies, es posible que algunas partes de nuestro sitio no
                  funcionen correctamente.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Compartir información</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4">
                  No vendemos, comercializamos ni transferimos a terceros tu información personal identificable. Esto no
                  incluye terceros de confianza que nos ayudan a operar nuestro sitio web, siempre y cuando esas partes
                  acuerden mantener esta información confidencial.
                </p>
                <p>
                  Podemos divulgar tu información cuando creemos que la divulgación es apropiada para cumplir con la
                  ley, hacer cumplir las políticas de nuestro sitio o proteger nuestros derechos o los de otros.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Seguridad de los datos</h2>
              <div className="bg-[#F4F4F8] p-6 rounded-lg">
                <p className="mb-4">
                  La seguridad de tus datos es importante para nosotros, pero recuerda que ningún método de transmisión
                  por Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por
                  utilizar medios comercialmente aceptables para proteger tu información personal, no podemos garantizar
                  su seguridad absoluta.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Tus derechos</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4">
                  Dependiendo de tu ubicación, puedes tener los siguientes derechos con respecto a tus datos personales:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>El derecho a solicitar acceso a tus datos personales.</li>
                  <li>El derecho a solicitar la rectificación o eliminación de tus datos personales.</li>
                  <li>El derecho a oponerte al procesamiento de tus datos personales.</li>
                  <li>El derecho a la portabilidad de datos.</li>
                  <li>El derecho a retirar el consentimiento.</li>
                </ul>
                <p className="mt-4">
                  Para ejercer cualquiera de estos derechos, por favor contáctanos a través de nuestra página de
                  contacto.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cambios a esta política</h2>
              <div className="bg-[#F4F4F8] p-6 rounded-lg">
                <p className="mb-4">
                  Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio
                  publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "última
                  actualización" en la parte superior.
                </p>
                <p>
                  Te recomendamos revisar esta Política de Privacidad periódicamente para estar informado sobre cómo
                  estamos protegiendo tu información.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contacto</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4">
                  Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Por correo electrónico:{" "}
                    <a href="mailto:info@generadordelettering.org" className="text-primary hover:underline">
                      info@generadordelettering.org
                    </a>
                  </li>
                  <li>A través de nuestro formulario de contacto en la página de contacto</li>
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href="/">Volver al inicio</Link>
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
