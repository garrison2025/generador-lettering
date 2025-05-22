"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlignLeft, AlignCenter, AlignRight, RotateCcw, Loader2, Download } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { TouchSlider } from "@/components/ui/touch-slider";
import { TouchColorPicker } from "@/components/ui/touch-color-picker";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

// CONSTANTES (Asegúrate de que estas sean las que usas en tu proyecto)
const FONTS = [
  { id: "dancing-script", name: "Caligrafía Elegante", family: "'Dancing Script', cursive" },
  { id: "pacifico", name: "Script Moderno", family: "'Pacifico', cursive" },
  // ... (resto de tus fuentes)
  { id: "permanent-marker", name: "Marcador", family: "'Permanent Marker', cursive" },
];

const COLORS = [
  { name: "Negro", value: "#000000" },
  { name: "Blanco", value: "#FFFFFF" },
  // ... (resto de tus colores)
  { name: "Morado", value: "#8E24AA" },
];

const PLANTILLAS = [
    { id: "boda", categoria: "ocasiones", nombre: "Invitación de Boda", texto: "Juan & María\n12 de Junio 2023", estilo: "dancing-script", color: "#5B4FBE", fontSize: 70, letterSpacing: 1, lineHeight: 1.8, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.3)", shadowBlur: 4, shadowOffsetX: 2, shadowOffsetY: 2, outline: false, outlineColor: "#FFFFFF", outlineWidth: 1 },
    // ... (tu lista completa de PLANTILLAS aquí)
];


export default function EditorClient() {
  const searchParams = useSearchParams();
  const plantillaId = searchParams.get("plantilla");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [text, setText] = useState("Tu texto aquí");
  const [fontSize, setFontSize] = useState(60);
  const [color, setColor] = useState("#5B4FBE");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [rotation, setRotation] = useState(0);
  const [font, setFont] = useState(FONTS[0].id);

  const [shadow, setShadow] = useState(false);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowBlur, setShadowBlur] = useState(5);
  const [shadowOffsetX, setShadowOffsetX] = useState(2);
  const [shadowOffsetY, setShadowOffsetY] = useState(2);

  const [outline, setOutline] = useState(false);
  const [outlineColor, setOutlineColor] = useState("#FFFFFF");
  const [outlineWidth, setOutlineWidth] = useState(2);

  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // CARGA DE FUENTES - useEffect AHORA ACTIVO
  useEffect(() => {
    console.log("Attempting to load Google Fonts via <link> tag.");
    const existingLink = document.querySelector('link[href*="fonts.googleapis.com/css2"]');
    let link: HTMLLinkElement;

    if (!existingLink) {
        link = document.createElement("link");
        link.href =
        "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&family=Sacramento&family=Great+Vibes&family=Amatic+SC:wght@400;700&family=Lobster&family=Caveat:wght@400;700&family=Kaushan+Script&family=Permanent+Marker&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        console.log("Google Fonts <link> tag added to document.head.");
    } else {
        console.log("Google Fonts <link> tag already exists.");
        link = existingLink as HTMLLinkElement; // Usar el existente para la limpieza si es necesario
    }
    
    // La limpieza solo debe ocurrir si este useEffect específico añadió el link.
    // Si el link ya existía, este componente no debería ser responsable de quitarlo.
    // Sin embargo, la lógica original lo quitaba siempre, la mantendremos por ahora para ser fieles,
    // pero es un punto a considerar para mejorar.
    return () => {
      // Solo intenta remover el link si este script lo añadió Y AÚN EXISTE
      // Para una lógica más robusta, se necesitaría un ID único en el link o una mejor gestión.
      // Por ahora, replicamos la lógica original de remover si existe al desmontar.
      const currentLink = document.querySelector('link[href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&family=Sacramento&family=Great+Vibes&family=Amatic+SC:wght@400;700&family=Lobster&family=Caveat:wght@400;700&family=Kaushan+Script&family=Permanent+Marker&display=swap"]');
      if (currentLink && document.head.contains(currentLink)) {
        // document.head.removeChild(currentLink); // COMENTADO TEMPORALMENTE para ver si afecta la re-aplicación de estilos
        // console.log("Google Fonts <link> tag removed from document.head.");
      }
    };
  }, []); // El array de dependencias vacío asegura que se ejecute solo una vez al montar/desmontar

  useEffect(() => {
    if (plantillaId) {
      const plantilla = PLANTILLAS.find((p) => p.id === plantillaId);
      if (plantilla) {
        setText(plantilla.texto); setFont(plantilla.estilo); setFontSize(plantilla.fontSize);
        setColor(plantilla.color); setAlignment(plantilla.alignment as "left" | "center" | "right");
        setLetterSpacing(plantilla.letterSpacing); setLineHeight(plantilla.lineHeight);
        setRotation(plantilla.rotation); setShadow(plantilla.shadow);
        if (plantilla.shadow) {
          setShadowColor(plantilla.shadowColor || "#000000"); setShadowBlur(plantilla.shadowBlur || 0);
          setShadowOffsetX(plantilla.shadowOffsetX || 0); setShadowOffsetY(plantilla.shadowOffsetY || 0);
        }
        setOutline(plantilla.outline);
        if (plantilla.outline) {
          setOutlineColor(plantilla.outlineColor || "#FFFFFF"); setOutlineWidth(plantilla.outlineWidth || 0);
        }
      }
    }
  }, [plantillaId]);

  const currentFont = FONTS.find((f) => f.id === font) || FONTS[0];

  const textStyle: React.CSSProperties = {
    fontFamily: currentFont.family, fontSize: `${fontSize}px`, color: color,
    textAlign: alignment, letterSpacing: `${letterSpacing}px`, lineHeight: lineHeight,
    transform: `rotate(${rotation}deg)`,
    textShadow: shadow ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}` : "none",
    WebkitTextStroke: outline ? `${outlineWidth}px ${outlineColor}` : "none",
    padding: "20px", maxWidth: "100%", wordWrap: "break-word",
  };

  // console.log("Font loading useEffect UNCOMMENTED.");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs items={[ { label: "Inicio", href: "/" }, { label: "Editor de Lettering", href: "/editor" }, ]}/>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Editor de Lettering Profesional</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Crea diseños de texto únicos y personalizados con nuestra herramienta intuitiva. Ajusta fuentes, colores, tamaños y efectos para lograr el lettering perfecto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div>
            <Tabs defaultValue="texto" className="w-full">
              <TabsList> <TabsTrigger value="texto">Texto</TabsTrigger> <TabsTrigger value="estilo">Estilo</TabsTrigger> <TabsTrigger value="efectos">Efectos</TabsTrigger> </TabsList>
              <TabsContent value="texto" className="space-y-4 mt-4">
                {/* ... (Contenido de Texto sin cambios) ... */}
                <div className="space-y-2"> <Label htmlFor="text-input">Texto para Lettering</Label> <Textarea id="text-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe tu texto aquí..." rows={3}/> </div>
                <div className="space-y-2"> <Label htmlFor="font-select">Estilo de Letra</Label> <Select value={font} onValueChange={setFont}> <SelectTrigger id="font-select"><SelectValue placeholder="Selecciona una fuente" /></SelectTrigger> <SelectContent>{FONTS.map((f) => (<SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>))}</SelectContent> </Select> </div>
                <TouchSlider label="Tamaño" min={10} max={200} step={1} value={fontSize} onChange={setFontSize} unit="px"/>
                <div className="space-y-2"> <Label>Alineación</Label> <div className="flex gap-2"> <Button variant={alignment === "left" ? "default" : "outline"} size="icon" onClick={() => setAlignment("left")}><AlignLeft className="h-4 w-4" /></Button> <Button variant={alignment === "center" ? "default" : "outline"} size="icon" onClick={() => setAlignment("center")}><AlignCenter className="h-4 w-4" /></Button> <Button variant={alignment === "right" ? "default" : "outline"} size="icon" onClick={() => setAlignment("right")}><AlignRight className="h-4 w-4" /></Button> </div> </div>
              </TabsContent>
              <TabsContent value="estilo" className="space-y-4 mt-4">
                {/* ... (Contenido de Estilo sin cambios) ... */}
                <div className="space-y-2"> <Label htmlFor="color-select-estilo">Color del Texto</Label> <TouchColorPicker value={color} onChange={setColor} presetColors={COLORS.map((c) => c.value)}/> </div>
                <TouchSlider label="Espaciado entre Letras" min={-5} max={20} step={0.5} value={letterSpacing} onChange={setLetterSpacing} unit="px"/>
                <TouchSlider label="Altura de Línea" min={0.8} max={3} step={0.1} value={lineHeight} onChange={setLineHeight}/>
                <TouchSlider label="Rotación" min={-180} max={180} step={1} value={rotation} onChange={setRotation} unit="°"/>
                <Button variant="outline" size="sm" onClick={() => setRotation(0)} className="w-full mt-1"><RotateCcw className="h-4 w-4 mr-2" />Restablecer Rotación</Button>
              </TabsContent>
              <TabsContent value="efectos" className="space-y-4 mt-4">
                {/* ... (Contenido de Efectos con Sombra y Contorno sin cambios) ... */}
                <div className="space-y-2"> <div className="flex items-center justify-between"> <Label htmlFor="shadow-switch">Sombra</Label> <Switch id="shadow-switch" checked={shadow} onCheckedChange={setShadow} /> </div> {shadow && ( <div className="space-y-3 mt-2 pl-4 border-l-2 border-muted"> <div className="grid grid-cols-2 gap-2"> <div> <Label htmlFor="shadow-color">Color</Label> <TouchColorPicker id="shadow-color" value={shadowColor} onChange={setShadowColor} presetColors={COLORS.map(c=>c.value)} className="mt-1" /> </div> <div> <Label htmlFor="shadow-blur">Desenfoque</Label> <TouchSlider id="shadow-blur" label="" min={0} max={20} step={1} value={shadowBlur} onChange={setShadowBlur} className="mt-1"/> </div> </div> <div className="grid grid-cols-2 gap-2"> <div> <Label htmlFor="shadow-offset-x">Desplazamiento X</Label> <TouchSlider id="shadow-offset-x" label="" min={-20} max={20} step={1} value={shadowOffsetX} onChange={setShadowOffsetX}/> </div> <div> <Label htmlFor="shadow-offset-y">Desplazamiento Y</Label> <TouchSlider id="shadow-offset-y" label="" min={-20} max={20} step={1} value={shadowOffsetY} onChange={setShadowOffsetY}/> </div> </div> </div> )} </div>
                <div className="space-y-2 pt-4 mt-4 border-t"> <div className="flex items-center justify-between"> <Label htmlFor="outline-switch">Contorno</Label> <Switch id="outline-switch" checked={outline} onCheckedChange={setOutline} /> </div> {outline && ( <div className="space-y-3 mt-2 pl-4 border-l-2 border-muted"> <div className="grid grid-cols-2 gap-2"> <div> <Label htmlFor="outline-color">Color</Label> <TouchColorPicker id="outline-color" value={outlineColor} onChange={setOutlineColor} presetColors={COLORS.map(c=>c.value)} className="mt-1" /> </div> <div> <Label htmlFor="outline-width">Grosor</Label> <TouchSlider id="outline-width" label="" min={0.5} max={10} step={0.5} value={outlineWidth} onChange={setOutlineWidth} unit="px" className="mt-1"/> </div> </div> </div> )} </div>
              </TabsContent>
            </Tabs>
          </div>

          <div style={{border: '1px solid teal', padding: '10px', background: '#e0f2f1'}}> {/* Color de borde cambiado */}
            <h3 className="text-lg font-semibold mb-2">Vista Previa (Fuente useEffect Activo)</h3>
            <div style={textStyle}>
              {text || "Escribe algo..."}
            </div>
          </div>

          {!isMobile && (
            <div className="space-y-6 hidden lg:block">
              {/* ... (Cards de Plantillas y Consejos sin cambios) ... */}
              <Card> <CardContent className="pt-6"> <h3 className="text-xl font-semibold mb-3">Plantillas Populares</h3> <ul className="space-y-2"> {PLANTILLAS.slice(0, 3).map(p => (<li key={p.id}><Link href={`/editor?plantilla=${p.id}`} className="text-blue-600 hover:underline">{p.nombre}</Link></li>))} </ul> </CardContent> </Card>
              <Card> <CardContent className="pt-6"> <h3 className="text-xl font-semibold mb-3">Consejos Rápidos</h3> <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground"> <li>Usa fuentes legibles para mensajes importantes.</li> <li>Contrasta bien el color del texto con el fondo.</li> </ul> </CardContent> </Card>
            </div>
          )}
        </div>
        {isMobile && <div className="h-16"></div>}
      </main>
      <SiteFooter />
    </div>
  )
}
