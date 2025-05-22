"use client"

import { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlignLeft, AlignCenter, AlignRight, RotateCcw, Loader2, Download } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
// Popover, PopoverContent, PopoverTrigger 仍然导入，以防其他地方用到，但此处的特定实例会被移除
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" 
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import html2canvas from "html2canvas"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileEditorControls } from "@/components/mobile-editor-controls"
import { TouchColorPicker } from "@/components/ui/touch-color-picker"
import { TouchSlider } from "@/components/ui/touch-slider"
import { MobileLetteringPreview } from "@/components/mobile-lettering-preview"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

// Dynamically import heavy components
const TabsComponent = dynamic(() => import("../components/editor/tabs-component"), {
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  ssr: false,
})

// 定义字体和模板数据（来自你提供的版本）
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
const PLANTILLAS = [
  {
    id: "boda",
    categoria: "ocasiones",
    nombre: "Invitación de Boda",
    texto: "Juan & María\n12 de Junio 2023",
    estilo: "dancing-script",
    color: "#5B4FBE",
    fontSize: 70,
    letterSpacing: 1,
    lineHeight: 1.8,
    alignment: "center",
    rotation: 0,
    shadow: true,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    outline: false,
  },
  {
    id: "cumpleanos",
    categoria: "ocasiones",
    nombre: "Feliz Cumpleaños",
    texto: "¡Feliz Cumpleaños!",
    estilo: "pacifico",
    color: "#FF6B6B",
    fontSize: 80,
    letterSpacing: 2,
    lineHeight: 1.5,
    alignment: "center",
    rotation: 0,
    shadow: true,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowBlur: 5,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    outline: false,
  },
  {
    id: "graduacion",
    categoria: "ocasiones",
    nombre: "Graduación",
    texto: "¡Felicidades\nGraduado 2023!",
    estilo: "great-vibes",
    color: "#4A4A4A",
    fontSize: 65,
    letterSpacing: 1,
    lineHeight: 1.6,
    alignment: "center",
    rotation: 0,
    shadow: false,
    outline: true,
    outlineColor: "#FFD93D",
    outlineWidth: 1,
  },
  {
    id: "motivacion1",
    categoria: "frases",
    nombre: "Motivación Diaria",
    texto: "Nunca te rindas",
    estilo: "permanent-marker",
    color: "#E53935",
    fontSize: 75,
    letterSpacing: 1,
    lineHeight: 1.5,
    alignment: "center",
    rotation: 0,
    shadow: true,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowBlur: 3,
    shadowOffsetX: 3,
    shadowOffsetY: 3,
    outline: false,
  },
  {
    id: "motivacion2",
    categoria: "frases",
    nombre: "Éxito",
    texto: "El éxito es la suma de pequeños esfuerzos",
    estilo: "satisfy",
    color: "#1E88E5",
    fontSize: 60,
    letterSpacing: 0,
    lineHeight: 1.5,
    alignment: "center",
    rotation: 0,
    shadow: false,
    outline: false,
  },
  {
    id: "amor",
    categoria: "frases",
    nombre: "Amor",
    texto: "Ama y sé feliz",
    estilo: "sacramento",
    color: "#FF6B6B",
    fontSize: 85,
    letterSpacing: 2,
    lineHeight: 1.5,
    alignment: "center",
    rotation: 0,
    shadow: true,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowBlur: 4,
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    outline: false,
  },
  {
    id: "navidad",
    categoria: "festividades",
    nombre: "Navidad",
    texto: "¡Feliz Navidad\ny Próspero Año Nuevo!",
    estilo: "lobster",
    color: "#43A047",
    fontSize: 65,
    letterSpacing: 1,
    lineHeight: 1.6,
    alignment: "center",
    rotation: 0,
    shadow: true,
    shadowColor: "#FF6B6B",
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    outline: false,
  },
  {
    id: "annonuevo",
    categoria: "festividades",
    nombre: "Año Nuevo",
    texto: "¡Feliz 2023!",
    estilo: "kaushan-script",
    color: "#FFD93D",
    fontSize: 90,
    letterSpacing: 2,
    lineHeight: 1.5,
    alignment: "center",
    rotation: 0,
    shadow: true,
    shadowColor: "#4A4A4A",
    shadowBlur: 6,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    outline: false,
  },
  {
    id: "halloween",
    categoria: "festividades",
    nombre: "Halloween",
    texto: "Noche de Terror",
    estilo: "amatic-sc",
    color: "#8E24AA",
    fontSize: 85,
    letterSpacing: 3,
    lineHeight: 1.5,
    alignment: "center",
    rotation: 0,
    shadow: true,
    shadowColor: "#000000",
    shadowBlur: 8,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    outline: false,
  },
  {
    id: "logo",
    categoria: "negocios",
    nombre: "Logo Empresa",
    texto: "Mi Empresa",
    estilo: "caveat",
    color: "#5B4FBE",
    fontSize: 75,
    letterSpacing: 2,
    lineHeight: 1.5,
    alignment: "center",
    rotation: 0,
    shadow: false,
    outline: true,
    outlineColor: "#FFFFFF",
    outlineWidth: 2,
  },
  {
    id: "promocion",
    categoria: "negocios",
    nombre: "Promoción",
    texto: "¡OFERTA\nESPECIAL!",
    estilo: "permanent-marker",
    color: "#E53935",
    fontSize: 80,
    letterSpacing: 1,
    lineHeight: 1.4,
    alignment: "center",
    rotation: -5,
    shadow: true,
    shadowColor: "#000000",
    shadowBlur: 2,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    outline: true,
    outlineColor: "#FFD93D",
    outlineWidth: 3,
  },
  {
    id: "menu",
    categoria: "negocios",
    nombre: "Menú Restaurante",
    texto: "Nuestro Menú",
    estilo: "great-vibes",
    color: "#4A4A4A",
    fontSize: 70,
    letterSpacing: 1,
    lineHeight: 1.5,
    alignment: "center",
    rotation: 0,
    shadow: false,
    outline: false,
  },
];

export default function EditorClient() {
  const searchParams = useSearchParams();
  const plantillaId = searchParams.get("plantilla");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [text, setText] = useState("Tu texto aquí");
  const [fontSize, setFontSize] = useState(60);
  const [color, setColor] = useState("#5B4FBE");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center"); // Typed alignment
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [rotation, setRotation] = useState(0);
  const [font, setFont] = useState(FONTS[0].id);

  const [shadow, setShadow] = useState(false);
  const [shadowColor, setShadowColorState] = useState("#000000"); // Renamed to avoid conflict
  const [shadowBlur, setShadowBlurState] = useState(5);       // Renamed to avoid conflict
  const [shadowOffsetX, setShadowOffsetXState] = useState(2);   // Renamed to avoid conflict
  const [shadowOffsetY, setShadowOffsetYState] = useState(2);   // Renamed to avoid conflict

  const [outline, setOutline] = useState(false);
  const [outlineColor, setOutlineColorState] = useState("#FFFFFF"); // Renamed to avoid conflict
  const [outlineWidth, setOutlineWidthState] = useState(2);     // Renamed to avoid conflict

  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&family=Sacramento&family=Great+Vibes&family=Amatic+SC:wght@400;700&family=Lobster&family=Caveat:wght@400;700&family=Kaushan+Script&family=Permanent+Marker&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (plantillaId) {
      const plantilla = PLANTILLAS.find((p) => p.id === plantillaId);
      if (plantilla) {
        setText(plantilla.texto);
        setFont(plantilla.estilo);
        setFontSize(plantilla.fontSize);
        setColor(plantilla.color);
        setAlignment(plantilla.alignment as "left" | "center" | "right"); // Ensure type cast
        setLetterSpacing(plantilla.letterSpacing);
        setLineHeight(plantilla.lineHeight);
        setRotation(plantilla.rotation);
        setShadow(plantilla.shadow);
        if (plantilla.shadow) {
          setShadowColorState(plantilla.shadowColor || "#000000");
          setShadowBlurState(plantilla.shadowBlur || 0);
          setShadowOffsetXState(plantilla.shadowOffsetX || 0);
          setShadowOffsetYState(plantilla.shadowOffsetY || 0);
        }
        setOutline(plantilla.outline);
        if (plantilla.outline) {
          setOutlineColorState(plantilla.outlineColor || "#FFFFFF");
          setOutlineWidthState(plantilla.outlineWidth || 0);
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
    WebkitTextStroke: outline ? `${outlineWidth}px ${outlineColor}` : "none", // Use state variables for outline
    padding: "20px",
    maxWidth: "100%",
    wordWrap: "break-word",
  };

  const exportAsImage = async (type: "png" | "jpg") => {
    if (!previewRef.current) {
        toast({ title: "Error", description: "Preview element not found.", variant: "destructive" });
        return;
    }
    try {
      setIsExporting(true);
      const options = {
        backgroundColor: type === "jpg" ? "#FFFFFF" : null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      };
      const canvas = await html2canvas(previewRef.current, options);
      const dataUrl = canvas.toDataURL(type === "jpg" ? "image/jpeg" : "image/png", 1.0);
      const link = document.createElement("a");
      link.download = `lettering-${new Date().getTime()}.${type}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "¡Imagen exportada con éxito!",
        description: `Tu diseño de lettering ha sido guardado como ${type.toUpperCase()}.`,
      });
    } catch (error) {
      console.error("Error al exportar la imagen:", error);
      toast({
        title: "Error al exportar",
        description: "No se pudo generar la imagen. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const saveDesign = () => {
    toast({
      title: "Función no disponible",
      description: "Esta funcionalidad requiere un sistema de cuentas de usuario.",
      variant: "destructive",
    });
  };

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
            Crea diseños tipográficos personalizados con nuestro editor de lettering online. Personaliza fuentes,
            colores, efectos y más para crear lettering único para cualquier ocasión.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div>
            <MobileEditorControls>
              <Tabs defaultValue="texto" className="w-full">
                <TabsList>
                  <TabsTrigger value="texto">Texto</TabsTrigger>
                  <TabsTrigger value="estilo">Estilo</TabsTrigger>
                  <TabsTrigger value="efectos">Efectos</TabsTrigger>
                </TabsList>
                <TabsContent value="texto" className="space-y-4">
                  <div className="space-y-2"> <Label htmlFor="text-input">Texto para Lettering</Label> <Textarea id="text-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe tu texto aquí" className="resize-none" rows={3}/> </div>
                  <div className="space-y-2"> <Label htmlFor="font-select">Estilo de Letra</Label> <Select value={font} onValueChange={setFont}> <SelectTrigger id="font-select"><SelectValue placeholder="Selecciona un estilo" /></SelectTrigger> <SelectContent>{FONTS.map((f) => (<SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>))}</SelectContent> </Select> </div>
                  <TouchSlider label="Tamaño" min={10} max={200} step={1} value={fontSize} onChange={setFontSize} unit="px"/>
                  <div className="space-y-2"> <Label>Alineación</Label> <div className="flex gap-2"> <Button variant={alignment === "left" ? "default" : "outline"} size="sm" onClick={() => setAlignment("left")} className="flex-1"><AlignLeft className="h-4 w-4" /></Button> <Button variant={alignment === "center" ? "default" : "outline"} size="sm" onClick={() => setAlignment("center")} className="flex-1"><AlignCenter className="h-4 w-4" /></Button> <Button variant={alignment === "right" ? "default" : "outline"} size="sm" onClick={() => setAlignment("right")} className="flex-1"><AlignRight className="h-4 w-4" /></Button> </div> </div>
                </TabsContent>
                <TabsContent value="estilo" className="space-y-4">
                  <div className="space-y-2"> <Label htmlFor="color-select">Color del Texto</Label> <TouchColorPicker value={color} onChange={setColor} presetColors={COLORS.map((c) => c.value)} /> </div>
                  <TouchSlider label="Espaciado entre Letras" min={-5} max={20} step={0.5} value={letterSpacing} onChange={setLetterSpacing} unit="px"/>
                  <TouchSlider label="Altura de Línea" min={0.8} max={3} step={0.1} value={lineHeight} onChange={setLineHeight}/>
                  <TouchSlider label="Rotación" min={-180} max={180} step={1} value={rotation} onChange={setRotation} unit="°"/>
                  <Button variant="outline" size="sm" onClick={() => setRotation(0)} className="w-full mt-1"><RotateCcw className="h-4 w-4 mr-2" />Restablecer Rotación</Button>
                </TabsContent>
                <TabsContent value="efectos" className="space-y-4">
                  <div className="space-y-2"> <div className="flex items-center justify-between"> <Label htmlFor="shadow-switch">Sombra</Label> <Switch id="shadow-switch" checked={shadow} onCheckedChange={setShadow} /> </div> {shadow && ( <div className="space-y-3 mt-2 pl-4 border-l-2 border-muted"> <div className="grid grid-cols-2 gap-2"> <div> <Label htmlFor="shadow-color">Color</Label> <TouchColorPicker value={shadowColor} onChange={setShadowColorState} className="mt-1" /> </div> <div> <TouchSlider label="Desenfoque" min={0} max={20} step={1} value={shadowBlur} onChange={setShadowBlurState} className="mt-1"/> </div> </div> <div className="grid grid-cols-2 gap-2"> <TouchSlider label="Desplazamiento X" min={-20} max={20} step={1} value={shadowOffsetX} onChange={setShadowOffsetXState}/> <TouchSlider label="Desplazamiento Y" min={-20} max={20} step={1} value={shadowOffsetY} onChange={setShadowOffsetYState}/> </div> </div> )} </div>
                  <div className="space-y-2"> <div className="flex items-center justify-between"> <Label htmlFor="outline-switch">Contorno</Label> <Switch id="outline-switch" checked={outline} onCheckedChange={setOutline} /> </div> {outline && ( <div className="space-y-3 mt-2 pl-4 border-l-2 border-muted"> <div className="grid grid-cols-2 gap-2"> <div> <Label htmlFor="outline-color">Color</Label> <TouchColorPicker value={outlineColor} onChange={setOutlineColorState} className="mt-1" /> </div> <TouchSlider label="Grosor" min={0.5} max={10} step={0.5} value={outlineWidth} onChange={setOutlineWidthState} className="mt-1"/> </div> </div> )} </div>
                </TabsContent>
              </Tabs>
            </MobileEditorControls>
            {!isMobile && (
              <div className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">Plantillas de Lettering Populares</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {PLANTILLAS.slice(0, 4).map((plantilla) => (
                        <Button
                          key={plantilla.id}
                          variant="outline"
                          size="sm"
                          className="h-auto py-2 justify-start"
                          onClick={() => {
                            setText(plantilla.texto); setFont(plantilla.estilo); setFontSize(plantilla.fontSize);
                            setColor(plantilla.color); setAlignment(plantilla.alignment as "left" | "center" | "right");
                            setLetterSpacing(plantilla.letterSpacing); setLineHeight(plantilla.lineHeight);
                            setRotation(plantilla.rotation); setShadow(plantilla.shadow);
                            if (plantilla.shadow) { setShadowColorState(plantilla.shadowColor!); setShadowBlurState(plantilla.shadowBlur!); setShadowOffsetXState(plantilla.shadowOffsetX!); setShadowOffsetYState(plantilla.shadowOffsetY!); }
                            setOutline(plantilla.outline);
                            if (plantilla.outline) { setOutlineColorState(plantilla.outlineColor!); setOutlineWidthState(plantilla.outlineWidth!); }
                          }}
                        >
                          {plantilla.nombre}
                        </Button>
                      ))}
                    </div>
                    <Button variant="link" size="sm" className="mt-2 w-full" asChild>
                      <Link href="/plantillas">Ver todas las plantillas de lettering</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Vista Previa del Lettering</h2>
                  <div className="flex gap-2">
                    {/***********************************}
                    {/* ********   修改开始   **********/}
                    {/***********************************}
                    {/* 原来的 Popover 结构被临时替换为一个简单的按钮 */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => alert('Popover de exportación temporalmente deshabilitado para prueba.')}
                    >
                      Exportar (Prueba Deshabilitada)
                    </Button>
                    {/***********************************}
                    {/* ********   修改结束   **********/}
                    {/***********************************}
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-[#F4F4F8]">
                  {isMobile ? (
                    <MobileLetteringPreview
                      text={text || "Tu texto aquí"}
                      style={textStyle}
                      onExport={() => exportAsImage("png")}
                    />
                  ) : (
                    <div className="lettering-preview bg-white rounded-md overflow-hidden" ref={previewRef}>
                      <div style={textStyle}>{text || "Tu texto aquí"}</div>
                    </div>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setText(""); setFont(FONTS[0].id); setFontSize(60); setColor("#5B4FBE"); setAlignment("center"); setLetterSpacing(0); setLineHeight(1.5); setRotation(0); setShadow(false); setOutline(false); }}>Reiniciar</Button>
                  <Button variant="outline" size="sm" onClick={() => { const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)]; const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]; setFont(randomFont.id); setColor(randomColor.value); setFontSize(Math.floor(Math.random() * 50) + 40); setLetterSpacing(Math.floor(Math.random() * 5)); setRotation(Math.floor(Math.random() * 20) - 10); }}>Aleatorio</Button>
                  <Button variant="outline" size="sm" onClick={() => exportAsImage("png")} disabled={isExporting}>PNG</Button>
                  <Button variant="outline" size="sm" onClick={() => exportAsImage("jpg")} disabled={isExporting}>JPG</Button>
                </div>
              </CardContent>
            </Card>
            {!isMobile && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Consejos para un Lettering Perfecto</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Experimenta con diferentes combinaciones de fuentes y colores para encontrar tu estilo.</li>
                    <li>Usa sombras sutiles para dar profundidad a tu texto.</li>
                    <li>Ajusta el espaciado entre letras para mejorar la legibilidad.</li>
                    <li>Prueba a rotar ligeramente el texto para darle un toque dinámico.</li>
                    <li>Combina diferentes tamaños de texto para crear jerarquía visual.</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {isMobile && <div className="h-20" />}
      </main>
      <SiteFooter />
    </div>
  );
}
