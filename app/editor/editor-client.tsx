"use client"

import React, { useState, useRef, useEffect } from "react"
// import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // <--- 1. 恢复 Tabs导入
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // <--- 2. 恢复 Select导入
import { AlignLeft, AlignCenter, AlignRight, RotateCcw, Loader2, Download } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch" // 稍后
import { Textarea } from "@/components/ui/textarea" // <--- 3. 恢复 Textarea导入
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" // 稍后
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
// import html2canvas from "html2canvas"
// import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useIsMobile } from "@/hooks/use-mobile"
// import { MobileEditorControls } from "@/components/mobile-editor-controls" // 暂时不加
// import { TouchColorPicker } from "@/components/ui/touch-color-picker" // 稍后
// import { TouchSlider } from "@/components/ui/touch-slider" // 稍后
// import { MobileLetteringPreview } from "@/components/mobile-lettering-preview" // 稍后
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

// FONTS, COLORS, PLANTILLAS 常量定义保持不变 (确保它们都在这里)
const FONTS = [ /* ... */ ];
const COLORS = [ /* ... */ ];
const PLANTILLAS = [ /* ... */ ]; // 确保这是完整的 PLANTILLAS 数组

export default function EditorClient() {
  // 所有 useState, useRef, useEffect, searchParams, toast, isMobile, currentFont, textStyle 保持不变

  const searchParams = useSearchParams(); /* ... */ const plantillaId = searchParams.get("plantilla");
  const { toast } = useToast(); const isMobile = useIsMobile();
  const [text, setText] = useState("Tu texto aquí"); const [fontSize, setFontSize] = useState(60);
  const [color, setColor] = useState("#5B4FBE"); const [alignment, setAlignment] = useState("center");
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
  const textStyle: React.CSSProperties = { /* ... */ };

  console.log("STAGE 2a: Adding Tabs, Textarea, Select for Font.");

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumbs, H1, P 保持不变 */}
        <Breadcrumbs items={[ { label: "Inicio", href: "/" }, { label: "Editor de Lettering", href: "/editor" }, ]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Editor de Lettering Profesional</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">...</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* 控制面板 - 开始添加真实 UI */}
          <div> {/* 这个 div 是原始代码中左侧面板的容器 */}
            {/* 暂时不使用 MobileEditorControls */}
            <Tabs defaultValue="texto" className="w-full"> {/* 4. 添加 Tabs 结构 */}
              <TabsList>
                <TabsTrigger value="texto">Texto</TabsTrigger>
                <TabsTrigger value="estilo">Estilo</TabsTrigger>
                <TabsTrigger value="efectos">Efectos</TabsTrigger>
              </TabsList>

              <TabsContent value="texto" className="space-y-4 mt-4"> {/* 确保有 mt-4 或类似间距 */}
                <div className="space-y-2">
                  <Label htmlFor="text-input-real">Texto para Lettering</Label>
                  <Textarea // 5. 使用真实的 Textarea 组件
                    id="text-input-real"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Escribe tu texto aquí"
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-select-real">Estilo de Letra</Label>
                  <Select value={font} onValueChange={setFont}> {/* 6. 使用真实的 Select 组件 */}
                    <SelectTrigger id="font-select-real">
                      <SelectValue placeholder="Selecciona un estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      {FONTS.map((fontItem) => ( // 改为 fontItem 避免与 state 变量 font 冲突
                        <SelectItem key={fontItem.id} value={fontItem.id}>
                          {fontItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* 其他控件如 TouchSlider, Alineación 按钮等暂时不加 */}
              </TabsContent>

              <TabsContent value="estilo" className="space-y-4 mt-4">
                <p>Contenido de Estilo (aún no implementado en esta fase)</p>
              </TabsContent>
              <TabsContent value="efectos" className="space-y-4 mt-4">
                <p>Contenido de Efectos (aún no implementado en esta fase)</p>
              </TabsContent>
            </Tabs>
            <p className="mt-2 text-xs">isMobile: {isMobile ? 'true' : 'false'}</p>
          </div>

          {/* 预览区域 - 保持不变 */}
          <div style={{border: '1px solid lightgray', padding: '10px', background: '#e9e9e9'}}>
            <h3 className="text-lg font-semibold mb-2">Vista Previa (Stage 2a)</h3>
            <div style={textStyle}>
              {text || "Escribe algo..."}
            </div>
          </div>

          {/* SEO 内容块 - 保持不变 */}
          {!isMobile && ( /* ... */ )}
        </div>
        <p style={{color: 'blue', marginTop: '20px', textAlign: 'center'}}>Stage 2a Test: Added Tabs, Textarea, and Font Select.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
