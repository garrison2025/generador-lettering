"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlignLeft, AlignCenter, AlignRight, RotateCcw, Loader2, Download } from "lucide-react"; // Loader2 and Download might be used later for export
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"; // <<<<<< IMPORTANTE: Añadido Switch
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { TouchSlider } from "@/components/ui/touch-slider";
import { TouchColorPicker } from "@/components/ui/touch-color-picker";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

// Usaremos tus constantes originales para FONTS, COLORS, PLANTILLAS si son diferentes
// Asegúrate de que las constantes que estás usando en tu proyecto actual sean las que se definen aquí.
const FONTS = [ // Tomado de tu código original
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

const COLORS = [ // Tomado de tu código original
  { name: "Negro", value: "#000000" },
  { name: "Blanco", value: "#FFFFFF" },
  { name: "Primario", value: "#5B4FBE" },
  { name: "Secundario", value: "#FF6B6B" },
  { name: "Acento", value: "#FFD93D" },
  { name: "Gris Oscuro", value: "#4A4A4A" },
  { name: "Rojo", value: "#E53935" },
  { name: "Verde", value: "#43A047" },
  { name: "Azul", value: "#1E88E5" },
  { name: "Morado", value: "#8E24AA" },
];

const PLANTILLAS = [ // Tomado de tu código original (extracto, usa tu lista completa)
  { id: "boda", categoria: "ocasiones", nombre: "Invitación de Boda", texto: "Juan & María\n12 de Junio 2023", estilo: "dancing-script", color: "#5B4FBE", fontSize: 70, letterSpacing: 1, lineHeight: 1.8, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.3)", shadowBlur: 4, shadowOffsetX: 2, shadowOffsetY: 2, outline: false, outlineColor: "#FFFFFF", outlineWidth: 1 },
  { id: "cumpleanos", categoria: "ocasiones", nombre: "Feliz Cumpleaños", texto: "¡Feliz Cumpleaños!", estilo: "pacifico", color: "#FF6B6B", fontSize: 80, letterSpacing: 2, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.2)", shadowBlur: 5, shadowOffsetX: 1, shadowOffsetY: 1, outline: false, outlineColor: "#FFFFFF", outlineWidth: 1 },
  // ... (asegúrate de tener tu lista completa de PLANTILLAS aquí)
];


export default function EditorClient() {
  const searchParams = useSearchParams();
  const plantillaId = searchParams.get("plantilla");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [text, setText] = useState("Tu texto aquí");
  const [fontSize, setFontSize] = useState(60);
  const [color, setColor] = useState("#5B4FBE");
  // Hacemos explícito el tipo para alignment como en tu original, aunque antes funcionaba sin él
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [rotation, setRotation] = useState(0);
  const [font, setFont] = useState(FONTS[0].id);

  // Estados de Efectos (ya presentes y confirmados)
  const [shadow, setShadow] = useState(false);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowBlur, setShadowBlur] = useState(5);
  const [shadowOffsetX, setShadowOffsetX] = useState(2);
  const [shadowOffsetY, setShadowOffsetY] = useState(2);

  const [outline, setOutline] = useState(false); // Lo dejamos para el siguiente paso
  const [outlineColor, setOutlineColor] = useState("#FFFFFF");
  const [outlineWidth, setOutlineWidth] = useState(2);

  const [isExporting, setIsExporting] = useState(false); // Para futura función de exportar
  const previewRef = useRef<HTMLDivElement>(null); // Para futura función de exportar

  useEffect(() => {
    // Lógica de carga de fuentes (del código original, pero comentada de momento para simplificar)
    // console.log("Font loading useEffect - DOM manipulation still COMMENTED OUT.");
    /*
    const link = document.createElement("link")
    link.href =
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&family=Sacramento&family=Great+Vibes&family=Amatic+SC:wght@400;700&family=Lobster&family=Caveat:wght@400;700&family=Kaushan+Script&family=Permanent+Marker&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
    */
  }, []);

  useEffect(() => {
    if (plantillaId) {
      const plantilla = PLANTILLAS.find((p) => p.id === plantillaId);
      if (plantilla) {
        setText(plantilla.texto);
        setFont(plantilla.estilo);
        setFontSize(plantilla.fontSize);
        setColor(plantilla.color);
        setAlignment(plantilla.alignment as "left" | "center" | "right"); // Asegurar tipo
        setLetterSpacing(plantilla.letterSpacing);
        setLineHeight(plantilla.lineHeight);
        setRotation(plantilla.rotation);

        setShadow(plantilla.shadow);
        if (plantilla.shadow) {
          setShadowColor(plantilla.shadowColor || "#000000"); // fallback
          setShadowBlur(plantilla.shadowBlur || 0); // fallback
          setShadowOffsetX(plantilla.shadowOffsetX || 0); // fallback
          setShadowOffsetY(plantilla.shadowOffsetY || 0); // fallback
        }

        setOutline(plantilla.outline);
        if (plantilla.outline) {
          setOutlineColor(plantilla.outlineColor || "#FFFFFF"); // fallback
          setOutlineWidth(plantilla.outlineWidth || 0); // fallback
        }
      }
    }
  }, [plantillaId]);

  const currentFont = FONTS.find((f) => f.id === font) || FONTS[0];

  const textStyle: React.CSSProperties = {
    fontFamily: currentFont.family,
    fontSize: `${fontSize}px`,
    color: color,
    textAlign: alignment,
    letterSpacing: `${letterSpacing}px`,
    lineHeight: lineHeight,
    transform: `rotate(${rotation}deg)`,
    textShadow: shadow ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}` : "none",
    WebkitTextStroke: outline ? `${outlineWidth}px ${outlineColor}` : "none", // Lógica de contorno ya aquí
    padding: "20px",
    maxWidth: "100%",
    wordWrap: "break-word",
  };

  // console.log("Adding Shadow controls to Efectos Tab.");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Editor de Lettering", href: "/editor" },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Editor de Lettering Profesional</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Crea diseños de texto únicos y personalizados con nuestra herramienta intuitiva. Ajusta fuentes, colores, tamaños y efectos para lograr el lettering perfecto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div>
            <Tabs defaultValue="texto" className="w-full">
              <TabsList>
                <TabsTrigger value="texto">Texto</TabsTrigger>
                <TabsTrigger value="estilo">Estilo</TabsTrigger>
                <TabsTrigger value="efectos">Efectos</TabsTrigger>
              </TabsList>
              <TabsContent value="texto" className="space-y-4 mt-4">
                {/* Contenido de la pestaña Texto (sin cambios respecto a la versión estable) */}
                <div className="space-y-2">
                  <Label htmlFor="text-input">Texto para Lettering</Label>
                  <Textarea id="text-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe tu texto aquí..." rows={3}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-select">Estilo de Letra</Label>
                  <Select value={font} onValueChange={setFont}>
                    <SelectTrigger id="font-select"><SelectValue placeholder="Selecciona una fuente" /></SelectTrigger>
                    <SelectContent>{FONTS.map((f) => (<SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                <TouchSlider label="Tamaño" min={10} max={200} step={1} value={fontSize} onChange={setFontSize} unit="px"/>
                <div className="space-y-2">
                  <Label>Alineación</Label>
                  <div className="flex gap-2">
                    <Button variant={alignment === "left" ? "default" : "outline"} size="icon" onClick={() => setAlignment("left")}><AlignLeft className="h-4 w-4" /></Button>
                    <Button variant={alignment === "center" ? "default" : "outline"} size="icon" onClick={() => setAlignment("center")}><AlignCenter className="h-4 w-4" /></Button>
                    <Button variant={alignment === "right" ? "default" : "outline"} size="icon" onClick={() => setAlignment("right")}><AlignRight className="h-4 w-4" /></Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="estilo" className="space-y-4 mt-4">
                {/* Contenido de la pestaña Estilo (sin cambios respecto a la versión estable) */}
                <div className="space-y-2">
                  <Label htmlFor="color-select-estilo">Color del Texto</Label>
                  <TouchColorPicker value={color} onChange={setColor} presetColors={COLORS.map((c) => c.value)}/>
                </div>
                <TouchSlider label="Espaciado entre Letras" min={-5} max={20} step={0.5} value={letterSpacing} onChange={setLetterSpacing} unit="px"/>
                <TouchSlider label="Altura de Línea" min={0.8} max={3} step={0.1} value={lineHeight} onChange={setLineHeight}/>
                <TouchSlider label="Rotación" min={-180} max={180} step={1} value={rotation} onChange={setRotation} unit="°"/>
                <Button variant="outline" size="sm" onClick={() => setRotation(0)} className="w-full mt-1"><RotateCcw className="h-4 w-4 mr-2" />Restablecer Rotación</Button>
              </TabsContent>

              <TabsContent value="efectos" className="space-y-4 mt-4">
                {/* SECCIÓN DE SOMBRA (SHADOW) - Añadida aquí */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="shadow-switch">Sombra</Label>
                    <Switch id="shadow-switch" checked={shadow} onCheckedChange={setShadow} />
                  </div>

                  {shadow && (
                    <div className="space-y-3 mt-2 pl-4 border-l-2 border-muted">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="shadow-color">Color</Label>
                          <TouchColorPicker value={shadowColor} onChange={setShadowColor} presetColors={COLORS.map(c=>c.value)} className="mt-1" /> {/* Añadido presetColors */}
                        </div>
                        <div> {/* Movido Label aquí para consistencia */}
                          <Label htmlFor="shadow-blur">Desenfoque</Label>
                          <TouchSlider
                            id="shadow-blur" // Añadido id para el Label
                            label="" // Label ya está arriba
                            min={0}
                            max={20}
                            step={1}
                            value={shadowBlur}
                            onChange={setShadowBlur}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label htmlFor="shadow-offset-x">Desplazamiento X</Label>
                            <TouchSlider
                                id="shadow-offset-x" // Añadido id
                                label=""
                                min={-20}
                                max={20}
                                step={1}
                                value={shadowOffsetX}
                                onChange={setShadowOffsetX}
                            />
                        </div>
                        <div>
                            <Label htmlFor="shadow-offset-y">Desplazamiento Y</Label>
                            <TouchSlider
                                id="shadow-offset-y" // Añadido id
                                label=""
                                min={-20}
                                max={20}
                                step={1}
                                value={shadowOffsetY}
                                onChange={setShadowOffsetY}
                            />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Placeholder para Contorno (Outline) - se añadirá en el siguiente paso */}
                <p className="text-sm text-muted-foreground p-2 border rounded-md">Controles de Contorno (Outline) se añadirán aquí.</p>
              </TabsContent>
            </Tabs>
          </div>

          <div style={{border: '1px solid dodgerblue', padding: '10px', background: '#e6f7ff'}}>
            <h3 className="text-lg font-semibold mb-2">Vista Previa (Efectos: Sombra Añadida)</h3>
            <div style={textStyle}>
              {text || "Escribe algo..."}
            </div>
          </div>

          {!isMobile && (
            <div className="space-y-6 hidden lg:block">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Plantillas Populares</h3>
                  <ul className="space-y-2">
                    {PLANTILLAS.slice(0, 3).map(p => (
                      <li key={p.id}>
                        <Link href={`/editor?plantilla=${p.id}`} className="text-blue-600 hover:underline">
                          {p.nombre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Consejos Rápidos</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Usa fuentes legibles para mensajes importantes.</li>
                    <li>Contrasta bien el color del texto con el fondo.</li>
                    {/* ... otros consejos ... */}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {isMobile && <div className="h-16"></div>}
      </main>
      <SiteFooter />
    </div>
  )
}
