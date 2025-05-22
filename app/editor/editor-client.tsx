"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlignLeft, AlignCenter, AlignRight, RotateCcw, Loader2, Download } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useIsMobile } from "@/hooks/use-mobile"
import { TouchSlider } from "@/components/ui/touch-slider"
import { TouchColorPicker } from "@/components/ui/touch-color-picker";
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

// FONTS, COLORS, PLANTILLAS 常量定义 (来自你提供的完整原始代码)
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
const COLORS = [
  { name: "Negro", value: "#000000" }, { name: "Blanco", value: "#FFFFFF" }, { name: "Primario", value: "#5B4FBE" },
  { name: "Secundario", value: "#FF6B6B" }, { name: "Acento", value: "#FFD93D" }, { name: "Gris Oscuro", value: "#4A4A4A" },
  { name: "Rojo", value: "#E53935" }, { name: "Verde", value: "#43A047" }, { name: "Azul", value: "#1E88E5" }, { name: "Morado", value: "#8E24AA" },
];
const PLANTILLAS = [
  { id: "boda", categoria: "ocasiones", nombre: "Invitación de Boda", texto: "Juan & María\n12 de Junio 2023", estilo: "dancing-script", color: "#5B4FBE", fontSize: 70, letterSpacing: 1, lineHeight: 1.8, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.3)", shadowBlur: 4, shadowOffsetX: 2, shadowOffsetY: 2, outline: false, },
  { id: "cumpleanos", categoria: "ocasiones", nombre: "Feliz Cumpleaños", texto: "¡Feliz Cumpleaños!", estilo: "pacifico", color: "#FF6B6B", fontSize: 80, letterSpacing: 2, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.2)", shadowBlur: 5, shadowOffsetX: 1, shadowOffsetY: 1, outline: false, },
  { id: "graduacion", categoria: "ocasiones", nombre: "Graduación", texto: "¡Felicidades\nGraduado 2023!", estilo: "great-vibes", color: "#4A4A4A", fontSize: 65, letterSpacing: 1, lineHeight: 1.6, alignment: "center", rotation: 0, shadow: false, outline: true, outlineColor: "#FFD93D", outlineWidth: 1, },
  { id: "motivacion1", categoria: "frases", nombre: "Motivación Diaria", texto: "Nunca te rindas", estilo: "permanent-marker", color: "#E53935", fontSize: 75, letterSpacing: 1, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.4)", shadowBlur: 3, shadowOffsetX: 3, shadowOffsetY: 3, outline: false, },
  { id: "motivacion2", categoria: "frases", nombre: "Éxito", texto: "El éxito es la suma de pequeños esfuerzos", estilo: "satisfy", color: "#1E88E5", fontSize: 60, letterSpacing: 0, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: false, outline: false, },
  { id: "amor", categoria: "frases", nombre: "Amor", texto: "Ama y sé feliz", estilo: "sacramento", color: "#FF6B6B", fontSize: 85, letterSpacing: 2, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.2)", shadowBlur: 4, shadowOffsetX: 1, shadowOffsetY: 1, outline: false, },
  { id: "navidad", categoria: "festividades", nombre: "Navidad", texto: "¡Feliz Navidad\ny Próspero Año Nuevo!", estilo: "lobster", color: "#43A047", fontSize: 65, letterSpacing: 1, lineHeight: 1.6, alignment: "center", rotation: 0, shadow: true, shadowColor: "#FF6B6B", shadowBlur: 4, shadowOffsetX: 2, shadowOffsetY: 2, outline: false, },
  { id: "annonuevo", categoria: "festividades", nombre: "Año Nuevo", texto: "¡Feliz 2023!", estilo: "kaushan-script", color: "#FFD93D", fontSize: 90, letterSpacing: 2, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "#4A4A4A", shadowBlur: 6, shadowOffsetX: 2, shadowOffsetY: 2, outline: false, },
  { id: "halloween", categoria: "festividades", nombre: "Halloween", texto: "Noche de Terror", estilo: "amatic-sc", color: "#8E24AA", fontSize: 85, letterSpacing: 3, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "#000000", shadowBlur: 8, shadowOffsetX: 4, shadowOffsetY: 4, outline: false, },
  { id: "logo", categoria: "negocios", nombre: "Logo Empresa", texto: "Mi Empresa", estilo: "caveat", color: "#5B4FBE", fontSize: 75, letterSpacing: 2, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: false, outline: true, outlineColor: "#FFFFFF", outlineWidth: 2, },
  { id: "promocion", categoria: "negocios", nombre: "Promoción", texto: "¡OFERTA\nESPECIAL!", estilo: "permanent-marker", color: "#E53935", fontSize: 80, letterSpacing: 1, lineHeight: 1.4, alignment: "center", rotation: -5, shadow: true, shadowColor: "#000000", shadowBlur: 2, shadowOffsetX: 2, shadowOffsetY: 2, outline: true, outlineColor: "#FFD93D", outlineWidth: 3, },
  { id: "menu", categoria: "negocios", nombre: "Menú Restaurante", texto: "Nuestro Menú", estilo: "great-vibes", color: "#4A4A4A", fontSize: 70, letterSpacing: 1, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: false, outline: false, },
];

export default function EditorClient() {
  const searchParams = useSearchParams(); const plantillaId = searchParams.get("plantilla");
  const { toast } = useToast(); const isMobile = useIsMobile();
  const [text, setText] = useState("Tu texto aquí"); const [fontSize, setFontSize] = useState(60);
  const [color, setColor] = useState("#5B4FBE");
  const [alignment, setAlignment] = useState("center");
  const [letterSpacing, setLetterSpacing] = useState(0); // state for letter spacing
  const [lineHeight, setLineHeight] = useState(1.5);
  const [rotation, setRotation] = useState(0); const [font, setFont] = useState(FONTS[0].id);
  const [shadow, setShadow] = useState(false); const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowBlur, setShadowBlur] = useState(5); const [shadowOffsetX, setShadowOffsetX] = useState(2);
  const [shadowOffsetY, setShadowOffsetY] = useState(2); const [outline, setOutline] = useState(false);
  const [outlineColor, setOutlineColor] = useState("#FFFFFF"); const [outlineWidth, setOutlineWidth] = useState(2);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => { console.log("STAGE 2d (Letter Spacing Slider): Font loading useEffect - DOM manipulation COMMENTED OUT."); }, []);
  useEffect(() => { if (plantillaId) { const plantilla = PLANTILLAS.find((p) => p.id === plantillaId); if (plantilla) { setText(plantilla.texto); setFont(plantilla.estilo); setFontSize(plantilla.fontSize); setColor(plantilla.color); setAlignment(plantilla.alignment); setLetterSpacing(plantilla.letterSpacing); setLineHeight(plantilla.lineHeight); setRotation(plantilla.rotation); setShadow(plantilla.shadow); if (plantilla.shadow) { setShadowColor(plantilla.shadowColor || "#000000"); setShadowBlur(plantilla.shadowBlur || 0); setShadowOffsetX(plantilla.shadowOffsetX || 0); setShadowOffsetY(plantilla.shadowOffsetY || 0); } setOutline(plantilla.outline); if (plantilla.outline) { setOutlineColor(plantilla.outlineColor || "#FFFFFF"); setOutlineWidth(plantilla.outlineWidth || 0); } } } }, [plantillaId]);

  const currentFont = FONTS.find((f) => f.id === font) || FONTS[0];
  const textStyle: React.CSSProperties = {
    fontFamily: currentFont.family, fontSize: `${fontSize}px`, color: color,
    textAlign: alignment as "left" | "center" | "right",
    letterSpacing: `${letterSpacing}px`, // Uses letterSpacing state
    lineHeight: lineHeight, transform: `rotate(${rotation}deg)`,
    textShadow: shadow ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}` : "none",
    WebkitTextStroke: outline ? `${outlineWidth}px ${outlineColor}` : "none",
    padding: "20px", maxWidth: "100%", wordWrap: "break-word",
  };

  console.log("STAGE 2d (Letter Spacing Slider): Testing TouchSlider for Letter Spacing.");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs items={[ { label: "Inicio", href: "/" }, { label: "Editor de Lettering", href: "/editor" }, ]} />
        <div className="mb-8"> <h1 className="text-4xl font-bold mb-3">Editor de Lettering Profesional</h1> <p className="text-lg text-muted-foreground max-w-3xl">Crea diseños tipográficos personalizados con nuestro editor de lettering online. Personaliza fuentes, colores, efectos y más para crear lettering único para cualquier ocasión.</p> </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div>
            <Tabs defaultValue="texto" className="w-full">
              <TabsList> <TabsTrigger value="texto">Texto</TabsTrigger> <TabsTrigger value="estilo">Estilo</TabsTrigger> <TabsTrigger value="efectos">Efectos</TabsTrigger> </TabsList>
              <TabsContent value="texto" className="space-y-4 mt-4">
                <div className="space-y-2"> <Label htmlFor="text-input">Texto para Lettering</Label> <Textarea id="text-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe tu texto aquí" className="resize-none" rows={3} /> </div>
                <div className="space-y-2"> <Label htmlFor="font-select">Estilo de Letra</Label> <Select value={font} onValueChange={setFont}> <SelectTrigger id="font-select"><SelectValue placeholder="Selecciona un estilo" /></SelectTrigger> <SelectContent>{FONTS.map((fontItem) => (<SelectItem key={fontItem.id} value={fontItem.id}>{fontItem.name}</SelectItem>))}</SelectContent> </Select> </div>
                <TouchSlider label="Tamaño" min={10} max={200} step={1} value={fontSize} onChange={setFontSize} unit="px" />
                <div className="space-y-2"> <Label>Alineación</Label> <div className="flex gap-2"> <Button variant={alignment === "left" ? "default" : "outline"} size="sm" onClick={() => setAlignment("left")} className="flex-1"> <AlignLeft className="h-4 w-4" /> </Button> <Button variant={alignment === "center" ? "default" : "outline"} size="sm" onClick={() => setAlignment("center")} className="flex-1"> <AlignCenter className="h-4 w-4" /> </Button> <Button variant={alignment === "right" ? "default" : "outline"} size="sm" onClick={() => setAlignment("right")} className="flex-1"> <AlignRight className="h-4 w-4" /> </Button> </div> </div>
              </TabsContent>

              <TabsContent value="estilo" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="color-select-estilo">Color del Texto</Label>
                  <TouchColorPicker value={color} onChange={setColor} presetColors={COLORS.map((c) => c.value)} />
                </div>

                {/* 1. 添加用于“字间距”的 TouchSlider */}
                <TouchSlider
                  label="Espaciado entre Letras"
                  min={-5}
                  max={20}
                  step={0.5}
                  value={letterSpacing}
                  onChange={setLetterSpacing}
                  unit="px"
                />
                {/* 其他 "Estilo" 选项卡的 LineHeight Slider, Rotation Slider 和 Button 暂时不加 */}
                <p style={{color:"darkorange", fontWeight:"bold"}}>Letter Spacing Slider added. Others in Estilo Tab still pending.</p>
              </TabsContent>

              <TabsContent value="efectos" className="space-y-4 mt-4"> <p>Contenido de Efectos (aún no implementado)</p> </TabsContent>
            </Tabs>
          </div>

          <div style={{border: '1px solid lightskyblue', padding: '10px', background: '#f0f8ff'}}>
            <h3 className="text-lg font-semibold mb-2">Vista Previa (Stage 2d - Letter Spacing)</h3>
            <div style={textStyle}> {text || "Escribe algo..."} </div>
          </div>
          {!isMobile && ( /* 完整的 SEO 内容块 */
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Crea Lettering Personalizado</h2>
              <div className="prose max-w-none">
                <p>Nuestro <strong>editor de lettering online</strong> te permite crear <strong>diseños tipográficos únicos</strong> para tus proyectos personales o profesionales. Ya sea que necesites <strong>letras decoradas</strong> para una invitación, <strong>caligrafía digital</strong> para un logo, o <strong>tipografía artística</strong> para redes sociales, nuestra herramienta te ofrece todas las opciones que necesitas.</p>
                <h3 className="text-xl font-medium mt-4 mb-2">Características del Editor de Lettering</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Múltiples estilos de tipografía</strong> - Elige entre una amplia variedad de fuentes caligráficas y decorativas</li>
                  <li><strong>Personalización completa</strong> - Ajusta tamaño, color, espaciado y alineación</li>
                  <li><strong>Efectos profesionales</strong> - Añade sombras, contornos y rotación a tus diseños</li>
                  <li><strong>Exportación en alta calidad</strong> - Descarga tus creaciones en formato PNG o JPG</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <p style={{color: 'darkgoldenrod', marginTop: '20px', textAlign: 'center', fontWeight: 'bold'}}>STAGE 2d TEST (Adding Letter Spacing Slider): Checking for build/runtime errors.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
