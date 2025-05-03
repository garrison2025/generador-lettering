"use client"; // <-- 仍然需要，因为使用了 useInView 和其他客户端交互

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, CheckCircle, HelpCircle } from "lucide-react"; // 只保留此文件实际使用的图标
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

// --- 导入新创建的服务器组件 ---
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowToUse } from "@/components/home/HowToUse";
import { CtaSection } from "@/components/home/CtaSection";

// --- 数据定义 (保持不变，但建议未来移到单独文件) ---
// (注意: RAZONES 和 PASOS_USO 的图标定义现在在对应的服务器组件里了，
// 但数据结构本身还需要在这里定义，以便传递给子组件)

const FONTS = [ // FONTS 数据仍然需要，用于 TemplatesCarousel
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

const PLANTILLAS_DESTACADAS = [ // PLANTILLAS_DESTACADAS 数据仍然需要，用于 TemplatesCarousel
  { id: "boda", nombre: "Invitación de Boda", texto: "Juan & María", estilo: "dancing-script", color: "#5B4FBE", fontSize: 32, letterSpacing: 1, alignment: "center", shadow: true, shadowColor: "rgba(0,0,0,0.3)", shadowBlur: 4, shadowOffsetX: 2, shadowOffsetY: 2 },
  { id: "cumpleanos", nombre: "Feliz Cumpleaños", texto: "¡Feliz Cumpleaños!", estilo: "pacifico", color: "#FF6B6B", fontSize: 28, letterSpacing: 1, alignment: "center", shadow: true, shadowColor: "rgba(0,0,0,0.2)", shadowBlur: 5, shadowOffsetX: 1, shadowOffsetY: 1 },
  { id: "navidad", nombre: "Navidad", texto: "¡Feliz Navidad!", estilo: "lobster", color: "#43A047", fontSize: 30, letterSpacing: 1, alignment: "center", shadow: true, shadowColor: "#FF6B6B", shadowBlur: 4, shadowOffsetX: 2, shadowOffsetY: 2 },
  { id: "logo", nombre: "Logo Empresa", texto: "Mi Empresa", estilo: "caveat", color: "#5B4FBE", fontSize: 34, letterSpacing: 2, alignment: "center", outline: true, outlineColor: "#FFFFFF", outlineWidth: 1 },
  { id: "motivacion1", nombre: "Motivación Diaria", texto: "Nunca te rindas", estilo: "permanent-marker", color: "#E53935", fontSize: 36, letterSpacing: 1, alignment: "center", shadow: true, shadowColor: "rgba(0,0,0,0.4)", shadowBlur: 3, shadowOffsetX: 3, shadowOffsetY: 3 },
  { id: "amor", nombre: "Amor", texto: "Ama y sé feliz", estilo: "sacramento", color: "#FF6B6B", fontSize: 40, letterSpacing: 2, alignment: "center", shadow: true, shadowColor: "rgba(0,0,0,0.2)", shadowBlur: 4, shadowOffsetX: 1, shadowOffsetY: 1 },
];

// RAZONES 数据结构定义，用于传递 props (实际图标在 WhyChooseUs 组件内部)
const RAZONES = [
  { iconName: "Palette", titulo: "Diseño Intuitivo", descripcion: "Interfaz fácil de usar diseñada para todos los niveles de experiencia, desde principiantes hasta profesionales." },
  { iconName: "Type", titulo: "Múltiples Estilos de Tipografía", descripcion: "Más de 10 estilos caligráficos diferentes para personalizar tus textos según la ocasión." },
  { iconName: "Sliders", titulo: "Personalización Total", descripcion: "Ajusta tamaño, color, espaciado y añade efectos como sombras y contornos a tu gusto." },
  { iconName: "Download", titulo: "Exportación Sencilla", descripcion: "Descarga tus creaciones en formato PNG o JPG para usarlas donde quieras." },
  { iconName: "Save", titulo: "Totalmente Gratuito", descripcion: "Sin costos ocultos ni suscripciones. Crea todos los diseños que necesites sin límites." },
  { iconName: "CheckCircle", titulo: "Sin Registro", descripcion: "Comienza a crear inmediatamente sin necesidad de registrarte o proporcionar datos personales." },
];
// 注意：这里传递 iconName 字符串或保持原来的 ReactNode 都可以，取决于你在 WhyChooseUs 组件内部如何处理图标。
// 如果 WhyChooseUs 内部直接导入并根据名字渲染图标，传名字更好。如果 WhyChooseUs 期望收到 ReactNode，则保持原来的图标实例。
// 为了简单，我们假设 WhyChooseUs 期望收到 ReactNode，所以保持原来的定义，但确保 WhyChooseUs 也导入了这些图标。
// **更新：** 为了更清晰地分离关注点，修改 RAZONES 结构，只传递数据，让 WhyChooseUs 负责图标。
const RAZONES_DATA = RAZONES.map(({ icon, ...rest }) => rest); // 只传递 titulo 和 descripcion

const PASOS_USO = [ // PASOS_USO 数据仍然需要，用于 HowToUse
  { numero: 1, titulo: "Elige una plantilla o comienza desde cero", descripcion: "Selecciona una de nuestras plantillas prediseñadas o comienza con tu propio texto personalizado." },
  { numero: 2, titulo: "Personaliza tu texto", descripcion: "Modifica el estilo de letra, tamaño, color y alineación según tus preferencias." },
  { numero: 3, titulo: "Añade efectos especiales", descripcion: "Aplica sombras, contornos o rotación para dar un toque único a tu diseño." },
  { numero: 4, titulo: "Exporta tu creación", descripcion: "Descarga tu diseño en formato PNG o JPG para usarlo en tus proyectos." },
];

const PREGUNTAS_FRECUENTES = [ // PREGUNTAS_FRECUENTES 数据仍然需要，用于 FAQ Section
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
// --- END 数据定义 ---


export default function ClientHome() {
  // useInView Hooks 仍然需要，用于懒加载模板和FAQ
  const [templatesSectionRef, templatesSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [faqSectionRef, faqSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero Section (保持不变) */}
        <section className="py-20 bg-gradient-to-b from-white to-[#F4F4F8]">
          <div className="container mx-auto px-4 text-center">
            <AnimatedLogo size={120} className="mb-6" />
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
          </div>
        </section>

        {/* --- 使用新的服务器组件 --- */}
        <WhyChooseUs razones={RAZONES} /> {/* 传递原始 RAZONES 数据 */}

        {/* --- 使用新的服务器组件 --- */}
        <HowToUse pasos={PASOS_USO} />

        {/* Plantillas Section (保持不变，仍然需要客户端交互) */}
        <section className="py-20" ref={templatesSectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Plantillas de Lettering Prediseñadas</h2>
              <p className="text-lg text-[#9EA3B0] max-w-2xl mx-auto">
                Elige entre nuestra colección de plantillas de lettering para diferentes ocasiones y personalízalas a tu
                gusto.
              </p>
            </div>

            {/* 懒加载和 Suspense (保持不变) */}
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

        {/* FAQ Section (保持不变，仍然需要客户端交互) */}
        <section className="py-20" id="faq" ref={faqSectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes sobre Lettering</h2>
              <p className="text-lg text-[#9EA3B0] max-w-2xl mx-auto">
                Encuentra respuestas a las preguntas más comunes sobre nuestro generador de lettering y tipografía.
              </p>
            </div>

             {/* 懒加载 (保持不变) */}
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
             {/* Placeholder (保持不变) */}
             {!faqSectionInView && (
               <div className="min-h-[400px] flex items-center justify-center">
                 {/* Spinner Placeholder */}
               </div>
             )}
          </div>
        </section>

        {/* --- 使用新的服务器组件 --- */}
        <CtaSection />

      </main>

      <SiteFooter />
    </div>
  );
}
