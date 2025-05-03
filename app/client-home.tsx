"use client";

// 注意：useState 和 useEffect 已经被移除
import { Suspense } from "react"; // useEffect, useState 已移除
import { Button } from "@/components/ui/button";
import { Sparkles, Download, Palette, Type, BookOpen, CheckCircle, HelpCircle, Sliders, Save } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InteractiveLetteringPreview } from "@/components/interactive-lettering-preview";
import { TemplatesCarousel } from "@/components/templates-carousel";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useInView } from "react-intersection-observer";
import { AnimatedLogo } from "@/components/animated-logo";

// 定义字体和模板数据 (保持不变)
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
];

// 定义模板数据（保持不变）
const PLANTILLAS_DESTACADAS = [
   {
    id: "boda",
    nombre: "Invitación de Boda",
    texto: "Juan & María",
    estilo: "dancing-script",
    color: "#5B4FBE",
    fontSize: 32,
    letterSpacing: 1,
    alignment: "center",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
  {
    id: "cumpleanos",
    nombre: "Feliz Cumpleaños",
    texto: "¡Feliz Cumpleaños!",
    estilo: "pacifico",
    color: "#FF6B6B",
    fontSize: 28,
    letterSpacing: 1,
    alignment: "center",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowBlur: 5,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
  },
  {
    id: "navidad",
    nombre: "Navidad",
    texto: "¡Feliz Navidad!",
    estilo: "lobster",
    color: "#43A047",
    fontSize: 30,
    letterSpacing: 1,
    alignment: "center",
    shadow: true,
    shadowColor: "#FF6B6B",
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
  {
    id: "logo",
    nombre: "Logo Empresa",
    texto: "Mi Empresa",
    estilo: "caveat",
    color: "#5B4FBE",
    fontSize: 34,
    letterSpacing: 2,
    alignment: "center",
    outline: true,
    outlineColor: "#FFFFFF",
    outlineWidth: 1,
  },
  {
    id: "motivacion1",
    nombre: "Motivación Diaria",
    texto: "Nunca te rindas",
    estilo: "permanent-marker",
    color: "#E53935",
    fontSize: 36,
    letterSpacing: 1,
    alignment: "center",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowBlur: 3,
    shadowOffsetX: 3,
    shadowOffsetY: 3,
  },
  {
    id: "amor",
    nombre: "Amor",
    texto: "Ama y sé feliz",
    estilo: "sacramento",
    color: "#FF6B6B",
    fontSize: 40,
    letterSpacing: 2,
    alignment: "center",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowBlur: 4,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
  },
];

// 定义 otros datos（保持不变）
const RAZONES = [
  {
    icon: <Palette className="h-8 w-8" />,
    titulo: "Diseño Intuitivo",
    descripcion:
      "Interfaz fácil de usar diseñada para todos los niveles de experiencia, desde principiantes hasta profesionales.",
  },
  {
    icon: <Type className="h-8 w-8" />,
    titulo: "Múltiples Estilos de Tipografía",
    descripcion: "Más de 10 estilos caligráficos diferentes para personalizar tus textos según la ocasión.",
  },
  {
    icon: <Sliders className="h-8 w-8" />,
    titulo: "Personalización Total",
    descripcion: "Ajusta tamaño, color, espaciado y añade efectos como sombras y contornos a tu gusto.",
  },
  {
    icon: <Download className="h-8 w-8" />,
    titulo: "Exportación Sencilla",
    descripcion: "Descarga tus creaciones en formato PNG o JPG para usarlas donde quieras.",
  },
  {
    icon: <Save className="h-8 w-8" />,
    titulo: "Totalmente Gratuito",
    descripcion: "Sin costos ocultos ni suscripciones. Crea todos los diseños que necesites sin límites.",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    titulo: "Sin Registro",
    descripcion: "Comienza a crear inmediatamente sin necesidad de registrarte o proporcionar datos personales.",
  },
];

const PASOS_USO = [
  {
    numero: 1,
    titulo: "Elige una plantilla o comienza desde cero",
    descripcion: "Selecciona una de nuestras plantillas prediseñadas o comienza con tu propio texto personalizado.",
  },
  {
    numero: 2,
    titulo: "Personaliza tu texto",
    descripcion: "Modifica el estilo de letra, tamaño, color y alineación según tus preferencias.",
  },
  {
    numero: 3,
    titulo: "Añade efectos especiales",
    descripcion: "Aplica sombras, contornos o rotación para dar un toque único a tu diseño.",
  },
  {
    numero: 4,
    titulo: "Exporta tu creación",
    descripcion: "Descarga tu diseño en formato PNG o JPG para usarlo en tus proyectos.",
  },
];

const PREGUNTAS_FRECUENTES = [
 {
    pregunta: "¿Qué es el lettering y en qué se diferencia de la caligrafía?",
    respuesta:
      "El lettering es el arte de dibujar letras, mientras que la caligrafía es el arte de escribirlas. Nuestro generador de lettering te permite crear diseños tipográficos únicos sin necesidad de habilidades avanzadas de dibujo o caligrafía.",
  },
  {
    pregunta: "¿Necesito crear una cuenta para usar el generador?",
    respuesta:
      "No, nuestro generador de lettering es de uso libre y no requiere registro. Puedes comenzar a crear diseños inmediatamente.",
  },
  {
    pregunta: "¿Puedo usar los diseños creados para fines comerciales?",
    respuesta:
      "Sí, todos los diseños que crees con nuestra herramienta son de tu propiedad y puedes utilizarlos tanto para proyectos personales como comerciales.",
  },
  {
    pregunta: "¿Cómo puedo guardar mis diseños para editarlos más tarde?",
    respuesta:
      "Actualmente, la función de guardar diseños está en desarrollo. Por ahora, te recomendamos exportar tus diseños y guardarlos localmente.",
  },
  {
    pregunta: "¿Qué navegadores son compatibles con el generador?",
    respuesta:
      "Nuestro generador funciona en todos los navegadores modernos como Chrome, Firefox, Safari y Edge. Recomendamos mantener tu navegador actualizado para una mejor experiencia.",
  },
  {
    pregunta: "¿Puedo usar el generador en dispositivos móviles?",
    respuesta:
      "Sí, nuestro generador está optimizado para funcionar en dispositivos móviles, aunque algunas funciones avanzadas pueden ser más cómodas de usar en una pantalla más grande.",
  },
  {
    pregunta: "¿Cómo puedo reportar un error o sugerir una nueva función?",
    respuesta:
      "Puedes contactarnos a través de la sección de contacto o enviarnos un correo electrónico. Valoramos tus comentarios y trabajamos constantemente para mejorar nuestra herramienta.",
  },
];

export default function ClientHome() {
  // const [fontsLoaded, setFontsLoaded] = useState(false) // <- REMOVED
  const [templatesSectionRef, templatesSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [faqSectionRef, faqSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // useEffect(() => { ... font loading logic ... }, []) // <- REMOVED

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero Section - Updated with AnimatedLogo */}
        <section className="py-20 bg-gradient-to-b from-white to-[#F4F4F8]">
          <div className="container mx-auto px-4 text-center">
          {/* <AnimatedLogo size={120} className="mb-6" /> */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#4A4A4A]">
              Generador de <span className="text-primary">Lettering</span> y{" "}
              <span className="text-secondary">Letras Personalizadas</span>
            </h1>
            <p className="text-lg md:text-xl text-[#9EA3B0] max-w-2xl mx-auto mb-10">
              Diseña textos artísticos, caligrafía digital y letras decoradas para tus proyectos con nuestro generador
              de lettering online. Fácil, rápido y totalmente gratuito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" asChild>
                <Link href="/editor" className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  Crear Lettering
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/plantillas" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  Ver Plantillas
                </Link>
              </Button>
            </div>
           {/* 整个示例容器已被删除 */}
          </div>
        </section>

        {/* Por qué elegirnos - NUEVA SECCIÓN */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">¿Por qué elegir nuestro Generador de Lettering?</h2>
              <p className="text-lg text-[#9EA3B0] max-w-2xl mx-auto">
                Nuestro generador de lettering ofrece una experiencia única con características diseñadas para hacer tu
                proceso creativo más fácil y divertido.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {RAZONES.map((razon, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {razon.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{razon.titulo}</h3>
                    <p className="text-[#9EA3B0]">{razon.descripcion}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo usar - NUEVA SECCIÓN */}
        <section className="py-20 bg-[#F4F4F8]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Cómo Usar Nuestro Generador de Lettering</h2>
              <p className="text-lg text-[#9EA3B0] max-w-2xl mx-auto">
                Sigue estos sencillos pasos para crear diseños de lettering impresionantes en minutos.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {PASOS_USO.map((paso, index) => (
                <div key={index} className="flex mb-12 last:mb-0">
                  <div className="mr-6">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                      {paso.numero}
                    </div>
                    <div
                      className={`h-full w-0.5 bg-primary/20 mx-auto ${
                        index === PASOS_USO.length - 1 ? "hidden" : "block"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold mb-2">{paso.titulo}</h3>
                    <p className="text-[#9EA3B0] mb-4">{paso.descripcion}</p>
                    {index === PASOS_USO.length - 1 ? (
                      <Button asChild>
                        <Link href="/editor" className="gap-2">
                          <Sparkles className="h-4 w-4" />
                          Comenzar ahora
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plantillas Section - 使用视图检测懒加载 */}
        <section className="py-20" ref={templatesSectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Plantillas de Lettering Prediseñadas</h2>
              <p className="text-lg text-[#9EA3B0] max-w-2xl mx-auto">
                Elige entre nuestra colección de plantillas de lettering para diferentes ocasiones y personalízalas a tu
                gusto.
              </p>
            </div>

            {templatesSectionInView ? (
              <Suspense
                fallback={
                  <div className="h-96 flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                  </div>
                }
              >
                <TemplatesCarousel itemsPerView={3}>
                  {PLANTILLAS_DESTACADAS.map((plantilla) => {
                    const font = FONTS.find((f) => f.id === plantilla.estilo) || FONTS[0];
                    return (
                      <InteractiveLetteringPreview key={plantilla.id} template={plantilla} fontFamily={font.family} />
                    );
                  })}
                </TemplatesCarousel>
              </Suspense>
            ) : (
              <div className="h-96 flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            )}

            <div className="text-center mt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Button variant="outline" size="lg" asChild>
                  <Link href="/plantillas" className="gap-2">
                    <BookOpen className="h-5 w-5" />
                    Ver Todas las Plantillas
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section - 使用视图检测懒加载 */}
        <section className="py-20" id="faq" ref={faqSectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes sobre Lettering</h2>
              <p className="text-lg text-[#9EA3B0] max-w-2xl mx-auto">
                Encuentra respuestas a las preguntas más comunes sobre nuestro generador de lettering y tipografía.
              </p>
            </div>

            {faqSectionInView && (
              <div className="max-w-3xl mx-auto">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {PREGUNTAS_FRECUENTES.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left font-medium">{item.pregunta}</AccordionTrigger>
                          <AccordionContent className="text-[#9EA3B0]">{item.respuesta}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                <div className="mt-8 text-center">
                  <p className="text-[#9EA3B0] mb-4">¿No encuentras respuesta a tu pregunta?</p>
                  <Button variant="outline" asChild>
                    <Link href="/contacto" className="gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Contacta con nosotros
                    </Link>
                  </Button>
                </div>
              </div>
            )}
             {/* Conditional rendering for placeholder/spinner if needed */}
             {!faqSectionInView && (
               <div className="min-h-[400px] flex items-center justify-center">
                 {/* Puedes poner un spinner o dejarlo vacío */}
               </div>
             )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para crear tu lettering personalizado?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-10 text-white/80">
              Comienza a diseñar textos únicos, letras decoradas y tipografías creativas para tus proyectos, redes
              sociales o cualquier ocasión especial.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/editor" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Ir al Editor de Lettering
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
