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
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { TouchSlider } from "@/components/ui/touch-slider";
import { TouchColorPicker } from "@/components/ui/touch-color-picker";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const FONTS = [
  { id: "arial", name: "Arial", family: "Arial, sans-serif" },
  { id: "verdana", name: "Verdana", family: "Verdana, sans-serif" },
  { id: "times", name: "Times New Roman", family: "'Times New Roman', Times, serif" },
  { id: "georgia", name: "Georgia", family: "Georgia, serif" },
  { id: "helvetica", name: "Helvetica", family: "Helvetica, sans-serif" },
  { id: "tahoma", name: "Tahoma", family: "Tahoma, sans-serif" },
  { id: "garamond", name: "Garamond", family: "Garamond, serif" },
  { id: "courier", name: "Courier New", family: "'Courier New', Courier, monospace" },
  { id: "brush_script", name: "Brush Script MT", family: "'Brush Script MT', cursive" },
  { id: "impact", name: "Impact", family: "Impact, fantasy" },
  { id: "lobster", name: "Lobster", family: "'Lobster', cursive", googleFont: true },
  { id: "montserrat", name: "Montserrat", family: "'Montserrat', sans-serif", googleFont: true },
  { id: "oswald", name: "Oswald", family: "'Oswald', sans-serif", googleFont: true },
  { id: "raleway", name: "Raleway", family: "'Raleway', sans-serif", googleFont: true },
  { id: "roboto", name: "Roboto", family: "'Roboto', sans-serif", googleFont: true },
  { id: "playfair_display", name: "Playfair Display", family: "'Playfair Display', serif", googleFont: true },
  { id: "pacifico", name: "Pacifico", family: "'Pacifico', cursive", googleFont: true },
  { id: "dancing_script", name: "Dancing Script", family: "'Dancing Script', cursive", googleFont: true },
  { id: "sacramento", name: "Sacramento", family: "'Sacramento', cursive", googleFont: true },
  { id: "great_vibes", name: "Great Vibes", family: "'Great Vibes', cursive", googleFont: true },
];

const COLORS = [
  { name: "Negro", value: "#000000" },
  { name: "Blanco", value: "#FFFFFF" },
  { name: "Rojo", value: "#FF0000" },
  { name: "Verde", value: "#00FF00" },
  { name: "Azul", value: "#0000FF" },
  { name: "Amarillo", value: "#FFFF00" },
  { name: "Magenta", value: "#FF00FF" },
  { name: "Cian", value: "#00FFFF" },
  { name: "Naranja", value: "#FFA500" },
  { name: "Púrpura", value: "#800080" },
  { name: "Rosa", value: "#FFC0CB" },
  { name: "Marrón", value: "#A52A2A" },
  { name: "Gris", value: "#808080" },
  { name: "Oro", value: "#FFD700" },
  { name: "Plata", value: "#C0C0C0" },
  { name: "Azul Marino", value: "#000080" },
  { name: "Verde Oliva", value: "#808000" },
  { name: "Turquesa", value: "#40E0D0" },
  { name: "Lavanda", value: "#E6E6FA" },
  { name: "Salmón", value: "#FA8072" },
];

const PLANTILLAS = [
  { id: "negocio-moderno", nombre: "Negocio Moderno", texto: "Innovación y Futuro", estilo: "montserrat", fontSize: 70, color: "#2c3e50", alignment: "center", letterSpacing: 1, lineHeight: 1.3, rotation: 0, shadow: true, shadowColor: "#bdc3c7", shadowBlur: 5, shadowOffsetX: 2, shadowOffsetY: 2, outline: false },
  { id: "evento-elegante", nombre: "Evento Elegante", texto: "Gran Celebración", estilo: "playfair_display", fontSize: 80, color: "#7f8c8d", alignment: "center", letterSpacing: 0, lineHeight: 1.2, rotation: -5, shadow: false, outline: true, outlineColor: "#ecf0f1", outlineWidth: 2 },
  { id: "anuncio-llamativo", nombre: "Anuncio Llamativo", texto: "¡GRAN OFERTA!", estilo: "impact", fontSize: 90, color: "#e74c3c", alignment: "center", letterSpacing: -2, lineHeight: 1.1, rotation: 0, shadow: true, shadowColor: "#000000", shadowBlur: 3, shadowOffsetX: 3, shadowOffsetY: 3, outline: false },
  { id: "cita-inspiradora", nombre: "Cita Inspiradora", texto: "Sueña en Grande", estilo: "dancing_script", fontSize: 60, color: "#8e44ad", alignment: "left", letterSpacing: 0.5, lineHeight: 1.6, rotation: 0, shadow: false, outline: false },
  { id: "titulo-divertido", nombre: "Título Divertido", texto: "Fiesta Sorpresa", estilo: "pacifico", fontSize: 75, color: "#2980b9", alignment: "right", letterSpacing: 0, lineHeight: 1.4, rotation: 3, shadow: true, shadowColor: "rgba(0,0,0,0.2)", shadowBlur: 4, shadowOffsetX: 1, shadowOffsetY: 1, outline: false },
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

  useEffect(() => {
    // console.log("Font loading useEffect - DOM manipulation COMMENTED OUT.");
  }, []);

  useEffect(() => {
    if (plantillaId) {
      const plantilla = PLANTILLAS.find((p) => p.id === plantillaId);
      if (plantilla) {
        setText(plantilla.texto);
        setFont(plantilla.estilo);
        setFontSize(plantilla.fontSize);
        setColor(plantilla.color);
        setAlignment(plantilla.alignment as "left" | "center" | "right");
        setLetterSpacing(plantilla.letterSpacing);
        setLineHeight(plantilla.lineHeight);
        setRotation(plantilla.rotation);
        setShadow(plantilla.shadow);
        if (plantilla.shadow) {
          setShadowColor(plantilla.shadowColor || "#000000");
          setShadowBlur(plantilla.shadowBlur || 0);
          setShadowOffsetX(plantilla.shadowOffsetX || 0);
          setShadowOffsetY(plantilla.shadowOffsetY || 0);
        }
        setOutline(plantilla.outline);
        if (plantilla.outline) {
          setOutlineColor(plantilla.outlineColor || "#FFFFFF");
          setOutlineWidth(plantilla.outlineWidth || 0);
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
    WebkitTextStroke: outline ? `${outlineWidth}px ${outlineColor}` : "none",
    padding: "20px",
    maxWidth: "100%",
    wordWrap: "break-word",
  };

  // console.log("STAGE 2d - Step B: Both Rotation Slider and Reset Button UNCOMMENTED.");

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
                {/* Contenido de la pestaña Texto (sin cambios) */}
                <div className="space-y-2">
                  <Label htmlFor="text-input">Texto para Lettering</Label>
                  <Textarea
                    id="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Escribe tu texto aquí..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-select">Estilo de Letra</Label>
                  <Select value={font} onValueChange={setFont}>
                    <SelectTrigger id="font-select">
                      <SelectValue placeholder="Selecciona una fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      {FONTS.map((f) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <TouchSlider
                  label="Tamaño"
                  min={10}
                  max={200}
                  step={1}
                  value={fontSize}
                  onChange={setFontSize}
                  unit="px"
                />
                <div className="space-y-2">
                  <Label>Alineación</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={alignment === "left" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setAlignment("left")}
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={alignment === "center" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setAlignment("center")}
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={alignment === "right" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setAlignment("right")}
                    >
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="estilo" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="color-select-estilo">Color del Texto</Label>
                  <TouchColorPicker
                    value={color}
                    onChange={setColor}
                    presetColors={COLORS.map((c) => c.value)}
                  />
                </div>
                <TouchSlider
                  label="Espaciado entre Letras"
                  min={-5}
                  max={20}
                  step={0.5}
                  value={letterSpacing}
                  onChange={setLetterSpacing}
                  unit="px"
                />
                <TouchSlider
                  label="Altura de Línea"
                  min={0.8}
                  max={3}
                  step={0.1}
                  value={lineHeight}
                  onChange={setLineHeight}
                />

                {/* 1. “旋转”的 TouchSlider 已取消注释 */}
                <TouchSlider
                  label="Rotación"
                  min={-180}
                  max={180}
                  step={1}
                  value={rotation}
                  onChange={setRotation}
                  unit="°"
                />

                {/* 2. “重置旋转”按钮 已取消注释 */}
                <Button variant="outline" size="sm" onClick={() => setRotation(0)} className="w-full mt-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restablecer Rotación
                </Button>
              </TabsContent>

              <TabsContent value="efectos" className="space-y-4 mt-4">
                <p>Contenido de Efectos (aún no implementado)</p>
              </TabsContent>
            </Tabs>
          </div>

          <div style={{border: '1px solid mediumseagreen', padding: '10px', background: '#f0fff0'}}> {/* Cambiado el color para indicar Paso B */}
            <h3 className="text-lg font-semibold mb-2">Vista Previa (Paso B: TODO Rot. Activo)</h3>
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
                    <li>No abuses de los efectos, la simplicidad a veces es mejor.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {isMobile && <div className="h-16"></div>}
        {/* <p style={{color: 'green', marginTop: '20px', textAlign: 'center', fontWeight: 'bold'}}>TEST STEP B: Both Rotation Slider and Reset Button UNCOMMENTED.</p> */}
      </main>
      <SiteFooter />
    </div>
  )
}
