"use client"

import React, { useState, useRef, useEffect, useCallback, memo } from "react"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlignLeft, AlignCenter, AlignRight, RotateCcw, Loader2, Download } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { TouchSlider } from "@/components/ui/touch-slider";
import { TouchColorPicker } from "@/components/ui/touch-color-picker";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

// --- CONSTANTS ---
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
  { name: "Negro", value: "#000000" }, { name: "Blanco", value: "#FFFFFF" },
  { name: "Primario", value: "#5B4FBE" }, { name: "Secundario", value: "#FF6B6B" },
  { name: "Acento", value: "#FFD93D" }, { name: "Gris Oscuro", value: "#4A4A4A" },
  { name: "Rojo", value: "#E53935" }, { name: "Verde", value: "#43A047" },
  { name: "Azul", value: "#1E88E5" }, { name: "Morado", value: "#8E24AA" },
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

// --- SUB-COMPONENTS ---

const TextSettings = memo(({ text, onTextChange, font, onFontChange, fontSize, onFontSizeChange, alignment, onAlignmentChange }) => (
  <TabsContent value="texto" className="space-y-4 mt-4">
    <div className="space-y-2"> <Label htmlFor="text-input">Texto para Lettering</Label> <Textarea id="text-input" value={text} onChange={onTextChange} placeholder="Escribe tu texto aquí..." rows={3}/> </div>
    <div className="space-y-2"> <Label htmlFor="font-select">Estilo de Letra</Label> <Select value={font} onValueChange={onFontChange}> <SelectTrigger id="font-select"><SelectValue placeholder="Selecciona una fuente" /></SelectTrigger> <SelectContent>{FONTS.map((f) => (<SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>))}</SelectContent> </Select> </div>
    <TouchSlider label="Tamaño" min={10} max={200} step={1} value={fontSize} onChange={onFontSizeChange} unit="px"/>
    <div className="space-y-2"> <Label>Alineación</Label> <div className="flex gap-2"> <Button variant={alignment === "left" ? "default" : "outline"} size="icon" onClick={() => onAlignmentChange("left")}><AlignLeft className="h-4 w-4" /></Button> <Button variant={alignment === "center" ? "default" : "outline"} size="icon" onClick={() => onAlignmentChange("center")}><AlignCenter className="h-4 w-4" /></Button> <Button variant={alignment === "right" ? "default" : "outline"} size="icon" onClick={() => onAlignmentChange("right")}><AlignRight className="h-4 w-4" /></Button> </div> </div>
  </TabsContent>
));
TextSettings.displayName = 'TextSettings';


const StyleSettings = memo(({ color, onColorChange, letterSpacing, onLetterSpacingChange, lineHeight, onLineHeightChange, rotation, onRotationChange, onResetRotation }) => (
  <TabsContent value="estilo" className="space-y-4 mt-4">
    <div className="space-y-2"> <Label htmlFor="color-select-estilo">Color del Texto</Label> <TouchColorPicker value={color} onChange={onColorChange} presetColors={COLORS.map((c) => c.value)}/> </div>
    <TouchSlider label="Espaciado entre Letras" min={-5} max={20} step={0.5} value={letterSpacing} onChange={onLetterSpacingChange} unit="px"/>
    <TouchSlider label="Altura de Línea" min={0.8} max={3} step={0.1} value={lineHeight} onChange={onLineHeightChange}/>
    <TouchSlider label="Rotación" min={-180} max={180} step={1} value={rotation} onChange={onRotationChange} unit="°"/>
    <Button variant="outline" size="sm" onClick={onResetRotation} className="w-full mt-1"><RotateCcw className="h-4 w-4 mr-2" />Restablecer Rotación</Button>
  </TabsContent>
));
StyleSettings.displayName = 'StyleSettings';

const EffectSettings = memo(({ shadow, onShadowChange, shadowColor, onShadowColorChange, shadowBlur, onShadowBlurChange, shadowOffsetX, onShadowOffsetXChange, shadowOffsetY, onShadowOffsetYChange, outline, onOutlineChange, outlineColor, onOutlineColorChange, outlineWidth, onOutlineWidthChange }) => (
  <TabsContent value="efectos" className="space-y-4 mt-4">
    <div className="space-y-2"> <div className="flex items-center justify-between"> <Label htmlFor="shadow-switch">Sombra</Label> <Switch id="shadow-switch" checked={shadow} onCheckedChange={onShadowChange} /> </div> {shadow && ( <div className="space-y-3 mt-2 pl-4 border-l-2 border-muted"> <div className="grid grid-cols-2 gap-2"> <div> <Label htmlFor="shadow-color">Color</Label> <TouchColorPicker id="shadow-color" value={shadowColor} onChange={onShadowColorChange} presetColors={COLORS.map(c=>c.value)} className="mt-1" /> </div> <div> <Label htmlFor="shadow-blur">Desenfoque</Label> <TouchSlider id="shadow-blur" label="" min={0} max={20} step={1} value={shadowBlur} onChange={onShadowBlurChange} className="mt-1"/> </div> </div> <div className="grid grid-cols-2 gap-2"> <div> <Label htmlFor="shadow-offset-x">Desplazamiento X</Label> <TouchSlider id="shadow-offset-x" label="" min={-20} max={20} step={1} value={shadowOffsetX} onChange={onShadowOffsetXChange}/> </div> <div> <Label htmlFor="shadow-offset-y">Desplazamiento Y</Label> <TouchSlider id="shadow-offset-y" label="" min={-20} max={20} step={1} value={shadowOffsetY} onChange={onShadowOffsetYChange}/> </div> </div> </div> )} </div>
    <div className="space-y-2 pt-4 mt-4 border-t"> <div className="flex items-center justify-between"> <Label htmlFor="outline-switch">Contorno</Label> <Switch id="outline-switch" checked={outline} onCheckedChange={onOutlineChange} /> </div> {outline && ( <div className="space-y-3 mt-2 pl-4 border-l-2 border-muted"> <div className="grid grid-cols-2 gap-2"> <div> <Label htmlFor="outline-color">Color</Label> <TouchColorPicker id="outline-color" value={outlineColor} onChange={onOutlineColorChange} presetColors={COLORS.map(c=>c.value)} className="mt-1" /> </div> <div> <Label htmlFor="outline-width">Grosor</Label> <TouchSlider id="outline-width" label="" min={0.5} max={10} step={0.5} value={outlineWidth} onChange={onOutlineWidthChange} unit="px" className="mt-1"/> </div> </div> </div> )} </div>
  </TabsContent>
));
EffectSettings.displayName = 'EffectSettings';

const ControlPanelTabs = memo((props) => (
  <Tabs defaultValue="texto" className="w-full">
    <TabsList> <TabsTrigger value="texto">Texto</TabsTrigger> <TabsTrigger value="estilo">Estilo</TabsTrigger> <TabsTrigger value="efectos">Efectos</TabsTrigger> </TabsList>
    <TextSettings {...props} />
    <StyleSettings {...props} />
    <EffectSettings {...props} />
  </Tabs>
));
ControlPanelTabs.displayName = 'ControlPanelTabs';

const PreviewPanel = memo(({ text, textStyle, previewRef, isExporting, onExport, onReset, onRandomize }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Vista Previa</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" disabled={isExporting}>
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
              Exportar
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="grid gap-2">
              <Button variant="ghost" size="sm" onClick={() => onExport("png")} className="justify-start" disabled={isExporting}>PNG (Transparente)</Button>
              <Button variant="ghost" size="sm" onClick={() => onExport("jpg")} className="justify-start" disabled={isExporting}>JPG (Fondo Blanco)</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div
        ref={previewRef}
        style={{ border: '1px solid #eee', padding: '10px', background: '#f9f9f9', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }} // Added overflow: hidden
        className="lettering-preview-capture-area bg-white rounded-md" // Ensure bg-white for JPG if needed
      >
        <div style={textStyle}>{text || "Escribe algo..."}</div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2">
        <Button variant="outline" size="sm" onClick={onReset}>Reiniciar</Button>
        <Button variant="outline" size="sm" onClick={onRandomize}>Aleatorio</Button>
      </div>
    </CardContent>
  </Card>
));
PreviewPanel.displayName = 'PreviewPanel';

const DesktopOnlyCards = memo(() => (
  <div className="mt-6 space-y-6">
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-3">Plantillas Populares</h3>
        <ul className="space-y-2">
          {PLANTILLAS.slice(0, 4).map(p => (
            <li key={p.id}><Link href={`/editor?plantilla=${p.id}`} className="text-blue-600 hover:underline">{p.nombre}</Link></li>
          ))}
          {PLANTILLAS.length > 4 && (
            <li><Link href={`/plantillas`} className="text-blue-600 hover:underline font-semibold">Ver todas las plantillas...</Link></li>
          )}
        </ul>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-3">Consejos Rápidos</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Usa fuentes legibles para mensajes importantes.</li>
          <li>Contrasta bien el color del texto con el fondo.</li>
          <li>Experimenta con sombras y contornos para dar profundidad.</li>
        </ul>
      </CardContent>
    </Card>
  </div>
));
DesktopOnlyCards.displayName = 'DesktopOnlyCards';


// --- MAIN COMPONENT ---
export default function EditorClient() {
  const searchParams = useSearchParams();
  const plantillaId = searchParams.get("plantilla");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // States
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

  // useCallback for handlers to be passed to memoized components
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value), []);
  const handleFontChange = useCallback((newFont: string) => setFont(newFont), []);
  const handleFontSizeChange = useCallback((newSize: number) => setFontSize(newSize), []);
  const handleAlignmentChange = useCallback((newAlignment: "left" | "center" | "right") => setAlignment(newAlignment), []);
  const handleColorChange = useCallback((newColor: string) => setColor(newColor), []);
  const handleLetterSpacingChange = useCallback((newSpacing: number) => setLetterSpacing(newSpacing), []);
  const handleLineHeightChange = useCallback((newHeight: number) => setLineHeight(newHeight), []);
  const handleRotationChange = useCallback((newRotation: number) => setRotation(newRotation), []);
  const handleResetRotation = useCallback(() => setRotation(0), []);
  const handleShadowChange = useCallback((checked: boolean) => setShadow(checked), []);
  const handleShadowColorChange = useCallback((newColor: string) => setShadowColor(newColor), []);
  const handleShadowBlurChange = useCallback((newBlur: number) => setShadowBlur(newBlur), []);
  const handleShadowOffsetXChange = useCallback((newOffsetX: number) => setShadowOffsetX(newOffsetX), []);
  const handleShadowOffsetYChange = useCallback((newOffsetY: number) => setShadowOffsetY(newOffsetY), []);
  const handleOutlineChange = useCallback((checked: boolean) => setOutline(checked), []);
  const handleOutlineColorChange = useCallback((newColor: string) => setOutlineColor(newColor), []);
  const handleOutlineWidthChange = useCallback((newWidth: number) => setOutlineWidth(newWidth), []);

  // Font loading with cleanup
  useEffect(() => {
    let linkElement: HTMLLinkElement | null = null;
    const existingLink = document.querySelector('link[href*="fonts.googleapis.com/css2"]');
    if (!existingLink) {
        linkElement = document.createElement("link");
        linkElement.href = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&family=Sacramento&family=Great+Vibes&family=Amatic+SC:wght@400;700&family=Lobster&family=Caveat:wght@400;700&family=Kaushan+Script&family=Permanent+Marker&display=swap";
        linkElement.rel = "stylesheet";
        document.head.appendChild(linkElement);
    }
    return () => {
      if (linkElement && linkElement.parentNode) {
        linkElement.parentNode.removeChild(linkElement);
      }
    };
  }, []);

  // Load template from URL
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
  }, [plantillaId]); // Dependencies: setters are stable, so only plantillaId is needed.

  const currentFont = FONTS.find((f) => f.id === font) || FONTS[0];
  const textStyle: React.CSSProperties = {
    fontFamily: currentFont.family, fontSize: `${fontSize}px`, color: color,
    textAlign: alignment, letterSpacing: `${letterSpacing}px`, lineHeight: lineHeight,
    transform: `rotate(${rotation}deg)`,
    textShadow: shadow ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}` : "none",
    WebkitTextStroke: outline ? `${outlineWidth}px ${outlineColor}` : "none",
    padding: "20px", maxWidth: "100%", wordWrap: "break-word",
  };

  const exportAsImage = useCallback(async (type: "png" | "jpg") => {
    if (!previewRef.current) {
      toast({ title: "Error de Vista Previa", description: "No se encontró el elemento de vista previa.", variant: "destructive" });
      return;
    }
    try {
      setIsExporting(true);
      const options = { backgroundColor: type === "jpg" ? "#FFFFFF" : null, scale: 2, useCORS: true, allowTaint: true, logging: false };
      const canvas = await html2canvas(previewRef.current, options);
      const dataUrl = canvas.toDataURL(type === "jpg" ? "image/jpeg" : "image/png", 1.0);
      const link = document.createElement("a");
      link.download = `lettering-${new Date().getTime()}.${type}`;
      link.href = dataUrl;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      toast({ title: "¡Imagen exportada con éxito!", description: `Tu diseño de lettering ha sido guardado como ${type.toUpperCase()}.` });
    } catch (error) {
      console.error("Error al exportar la imagen:", error);
      toast({ title: "Error al exportar", description: "No se pudo generar la imagen. Por favor, inténtalo de nuevo.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  }, [toast]); // toast is likely stable, but good to include if it could change.

  const handleReset = useCallback(() => {
    setText(""); setFont(FONTS[0].id); setFontSize(60); setColor("#5B4FBE");
    setAlignment("center"); setLetterSpacing(0); setLineHeight(1.5); setRotation(0);
    setShadow(false); setOutline(false); setShadowColor("#000000"); setShadowBlur(5);
    setShadowOffsetX(2); setShadowOffsetY(2); setOutlineColor("#FFFFFF"); setOutlineWidth(2);
    toast({ title: "Reiniciado", description: "El diseño ha sido reiniciado." });
  }, [toast]);

  const handleRandomize = useCallback(() => {
    const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)];
    const randomColorVal = COLORS[Math.floor(Math.random() * COLORS.length)].value;
    setFont(randomFont.id); setColor(randomColorVal);
    setFontSize(Math.floor(Math.random() * (120 - 40 + 1)) + 40);
    setLetterSpacing(Math.floor(Math.random() * 11) - 5);
    setLineHeight(parseFloat((Math.random() * (2.5 - 0.8) + 0.8).toFixed(1)));
    setRotation(Math.floor(Math.random() * 41) - 20);
    setShadow(Math.random() > 0.5); setOutline(Math.random() > 0.5);
    toast({ title: "¡Aleatorio!", description: "Se ha generado un diseño aleatorio." });
  }, [toast]);

  // const saveDesign = useCallback(() => { // 如果未来启用，也用useCallback
  //   toast({ title: "Función no disponible", description: "Esta funcionalidad requiere un sistema de cuentas de usuario.", variant: "destructive" });
  // }, [toast]);

  const controlPanelProps = {
    text, onTextChange: handleTextChange, font, onFontChange: handleFontChange, fontSize, onFontSizeChange: handleFontSizeChange, alignment, onAlignmentChange: handleAlignmentChange,
    color, onColorChange: handleColorChange, letterSpacing, onLetterSpacingChange: handleLetterSpacingChange, lineHeight, onLineHeightChange: handleLineHeightChange, rotation, onRotationChange: handleRotationChange, onResetRotation: handleResetRotation,
    shadow, onShadowChange: handleShadowChange, shadowColor, onShadowColorChange: handleShadowColorChange, shadowBlur, onShadowBlurChange: handleShadowBlurChange, shadowOffsetX, onShadowOffsetXChange: handleShadowOffsetXChange, shadowOffsetY, onShadowOffsetYChange: handleShadowOffsetYChange,
    outline, onOutlineChange: handleOutlineChange, outlineColor, onOutlineColorChange: handleOutlineColorChange, outlineWidth, onOutlineWidthChange: handleOutlineWidthChange,
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_2fr] gap-8"> {/* Adjusted grid for better control panel sizing */}
          <div className="min-w-0"> {/* Ensure control panel can shrink */}
            <ControlPanelTabs {...controlPanelProps} />
          </div>
          <div className="space-y-4 min-w-0"> {/* Ensure preview panel can shrink */}
            <PreviewPanel
              text={text}
              textStyle={textStyle}
              previewRef={previewRef}
              isExporting={isExporting}
              onExport={exportAsImage}
              onReset={handleReset}
              onRandomize={handleRandomize}
            />
            {!isMobile && <DesktopOnlyCards />}
          </div>
        </div>
        {isMobile && <div className="h-20"></div>} {/* Increased mobile bottom spacing for better UX */}
      </main>
      <SiteFooter />
    </div>
  );
}
