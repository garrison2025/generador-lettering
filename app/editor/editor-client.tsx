"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlignLeft, AlignCenter, AlignRight, RotateCcw, Loader2, Download } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch" // 稍后
import { Textarea } from "@/components/ui/textarea"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" // 稍后
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
// import html2canvas from "html2canvas" // 稍后
// import { LoadingSpinner } from "@/components/ui/loading-spinner" // 稍后
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useIsMobile } from "@/hooks/use-mobile"
// import { MobileEditorControls } from "@/components/mobile-editor-controls" // 暂时不加
// import { TouchColorPicker } from "@/components/ui/touch-color-picker" // 稍后
import { TouchSlider } from "@/components/ui/touch-slider" // <--- 1. 恢复 TouchSlider 导入
// import { MobileLetteringPreview } from "@/components/mobile-lettering-preview" // 稍后
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

// FONTS, COLORS, PLANTILLAS 常量定义保持不变 (确保它们都在这里)
const FONTS = [ /* ...你的完整 FONTS 数组... */ ];
const COLORS = [ /* ...你的完整 COLORS 数组... */ ];
const PLANTILLAS = [ /* ...你的完整 PLANTILLAS 数组... */ ];


export default function EditorClient() {
  // 所有 useState, useRef, useEffects, isMobile, currentFont, textStyle 定义保持不变
  const searchParams = useSearchParams(); const plantillaId = searchParams.get("plantilla");
  const { toast } = useToast(); const isMobile = useIsMobile();
  const [text, setText] = useState("Tu texto aquí"); const [fontSize, setFontSize] = useState(60);
  const [color, setColor] = useState("#5B4FBE"); const [alignment, setAlignment] = useState("center"); // <--- alignment state
  const [letterSpacing, setLetterSpacing] = useState(0); const [lineHeight, setLineHeight] = useState(1.5);
  const [rotation, setRotation] = useState(0); const [font, setFont] = useState(FONTS[0].id);
  const [shadow, setShadow] = useState(false); const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowBlur, setShadowBlur] = useState(5); const [shadowOffsetX, setShadowOffsetX] = useState(2);
  const [shadowOffsetY, setShadowOffsetY] = useState(2); const [outline, setOutline] = useState(false);
  const [outlineColor, setOutlineColor] = useState("#FFFFFF"); const [outlineWidth, setOutlineWidth] = useState(2);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => { /* Font loading (DOM commented) */ }, []);
  useEffect(() => { /* Plantilla loading */ }, [plantillaId]);
  const currentFont = FONTS.find((f) => f.id === font) || FONTS[0];
  const textStyle: React.CSSProperties = {
    fontFamily: currentFont.family, fontSize: `${fontSize}px`, color: color,
    textAlign: alignment as "left" | "center" | "right", // <--- 使用 alignment state
    letterSpacing: `${letterSpacing}px`, lineHeight: lineHeight, transform: `rotate(${rotation}deg)`,
    textShadow: shadow ? `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}` : "none",
    WebkitTextStroke: outline ? `${outlineWidth}px ${outlineColor}` : "none",
    padding: "20px", maxWidth: "100%", wordWrap: "break-word",
  };


  console.log("STAGE 2b: Adding TouchSlider (FontSize) and Alignment Buttons.");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumbs, H1, P 保持不变 */}
        <Breadcrumbs items={[ { label: "Inicio", href: "/" }, { label: "Editor de Lettering", href: "/editor" }, ]} />
        <div className="mb-8"> <h1 className="text-4xl font-bold mb-3">Editor de Lettering Profesional</h1> <p className="text-lg text-muted-foreground max-w-3xl">...</p> </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* 控制面板 - Stage 2b */}
          <div>
            <Tabs defaultValue="texto" className="w-full">
              <TabsList>
                <TabsTrigger value="texto">Texto</TabsTrigger>
                <TabsTrigger value="estilo">Estilo</TabsTrigger>
                <TabsTrigger value="efectos">Efectos</TabsTrigger>
              </TabsList>

              <TabsContent value="texto" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Texto para Lettering</Label>
                  <Textarea id="text-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe tu texto aquí" className="resize-none" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-select">Estilo de Letra</Label>
                  <Select value={font} onValueChange={setFont}>
                    <SelectTrigger id="font-select"><SelectValue placeholder="Selecciona un estilo" /></SelectTrigger>
                    <SelectContent>{FONTS.map((fontItem) => (<SelectItem key={fontItem.id} value={fontItem.id}>{fontItem.name}</SelectItem>))}</SelectContent>
                  </Select>
                </div>

                {/* 2. 添加 TouchSlider 用于字体大小 */}
                <TouchSlider
                  label="Tamaño"
                  min={10}
                  max={200}
                  step={1}
                  value={fontSize}
                  onChange={setFontSize} // 直接传递 setFontSize
                  unit="px"
                />

                {/* 3. 添加对齐按钮 */}
                <div className="space-y-2">
                  <Label>Alineación</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={alignment === "left" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAlignment("left")}
                      className="flex-1"
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={alignment === "center" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAlignment("center")}
                      className="flex-1"
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={alignment === "right" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAlignment("right")}
                      className="flex-1"
                    >
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="estilo" className="space-y-4 mt-4">
                <p>Contenido de Estilo (aún no implementado en esta fase)</p>
              </TabsContent>
              <TabsContent value="efectos" className="space-y-4 mt-4">
                <p>Contenido de Efectos (aún no implementado en esta fase)</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* 预览区域 - 保持不变 */}
          <div style={{border: '1px solid lightskyblue', padding: '10px', background: '#f0f8ff'}}>
            <h3 className="text-lg font-semibold mb-2">Vista Previa (Stage 2b)</h3>
            <div style={textStyle}> {/* textStyle 现在会应用 alignment */}
              {text || "Escribe algo..."}
            </div>
          </div>

          {/* SEO 内容块 - 保持不变 */}
          {!isMobile && ( /* ...你的完整 SEO 内容块... */ )}
        </div>
        <p style={{color: 'purple', marginTop: '20px', textAlign: 'center', fontWeight: 'bold'}}>STAGE 2b TEST: Added TouchSlider (FontSize) and Alignment Buttons.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
