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
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

// 定义字体和模板数据 (从你提供的完整原始代码恢复)
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
    id: "boda", categoria: "ocasiones", nombre: "Invitación de Boda", texto: "Juan & María\n12 de Junio 2023", estilo: "dancing-script", color: "#5B4FBE", fontSize: 70, letterSpacing: 1, lineHeight: 1.8, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.3)", shadowBlur: 4, shadowOffsetX: 2, shadowOffsetY: 2, outline: false,
  },
  {
    id: "cumpleanos", categoria: "ocasiones", nombre: "Feliz Cumpleaños", texto: "¡Feliz Cumpleaños!", estilo: "pacifico", color: "#FF6B6B", fontSize: 80, letterSpacing: 2, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.2)", shadowBlur: 5, shadowOffsetX: 1, shadowOffsetY: 1, outline: false,
  },
  {
    id: "graduacion", categoria: "ocasiones", nombre: "Graduación", texto: "¡Felicidades\nGraduado 2023!", estilo: "great-vibes", color: "#4A4A4A", fontSize: 65, letterSpacing: 1, lineHeight: 1.6, alignment: "center", rotation: 0, shadow: false, outline: true, outlineColor: "#FFD93D", outlineWidth: 1,
  },
  {
    id: "motivacion1", categoria: "frases", nombre: "Motivación Diaria", texto: "Nunca te rindas", estilo: "permanent-marker", color: "#E53935", fontSize: 75, letterSpacing: 1, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.4)", shadowBlur: 3, shadowOffsetX: 3, shadowOffsetY: 3, outline: false,
  },
  {
    id: "motivacion2", categoria: "frases", nombre: "Éxito", texto: "El éxito es la suma de pequeños esfuerzos", estilo: "satisfy", color: "#1E88E5", fontSize: 60, letterSpacing: 0, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: false, outline: false,
  },
  {
    id: "amor", categoria: "frases", nombre: "Amor", texto: "Ama y sé feliz", estilo: "sacramento", color: "#FF6B6B", fontSize: 85, letterSpacing: 2, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "rgba(0,0,0,0.2)", shadowBlur: 4, shadowOffsetX: 1, shadowOffsetY: 1, outline: false,
  },
  {
    id: "navidad", categoria: "festividades", nombre: "Navidad", texto: "¡Feliz Navidad\ny Próspero Año Nuevo!", estilo: "lobster", color: "#43A047", fontSize: 65, letterSpacing: 1, lineHeight: 1.6, alignment: "center", rotation: 0, shadow: true, shadowColor: "#FF6B6B", shadowBlur: 4, shadowOffsetX: 2, shadowOffsetY: 2, outline: false,
  },
  {
    id: "annonuevo", categoria: "festividades", nombre: "Año Nuevo", texto: "¡Feliz 2023!", estilo: "kaushan-script", color: "#FFD93D", fontSize: 90, letterSpacing: 2, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "#4A4A4A", shadowBlur: 6, shadowOffsetX: 2, shadowOffsetY: 2, outline: false,
  },
  {
    id: "halloween", categoria: "festividades", nombre: "Halloween", texto: "Noche de Terror", estilo: "amatic-sc", color: "#8E24AA", fontSize: 85, letterSpacing: 3, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: true, shadowColor: "#000000", shadowBlur: 8, shadowOffsetX: 4, shadowOffsetY: 4, outline: false,
  },
  {
    id: "logo", categoria: "negocios", nombre: "Logo Empresa", texto: "Mi Empresa", estilo: "caveat", color: "#5B4FBE", fontSize: 75, letterSpacing: 2, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: false, outline: true, outlineColor: "#FFFFFF", outlineWidth: 2,
  },
  {
    id: "promocion", categoria: "negocios", nombre: "Promoción", texto: "¡OFERTA\nESPECIAL!", estilo: "permanent-marker", color: "#E53935", fontSize: 80, letterSpacing: 1, lineHeight: 1.4, alignment: "center", rotation: -5, shadow: true, shadowColor: "#000000", shadowBlur: 2, shadowOffsetX: 2, shadowOffsetY: 2, outline: true, outlineColor: "#FFD93D", outlineWidth: 3,
  },
  {
    id: "menu", categoria: "negocios", nombre: "Menú Restaurante", texto: "Nuestro Menú", estilo: "great-vibes", color: "#4A4A4A", fontSize: 70, letterSpacing: 1, lineHeight: 1.5, alignment: "center", rotation: 0, shadow: false, outline: false,
  },
];

export default function EditorClient() {
  // --- 暂时注释掉所有复杂逻辑 ---
  // const searchParams = useSearchParams()
  // const plantillaId = searchParams.get("plantilla")
  // const { toast } = useToast()
  const isMobile = useIsMobile() // 只保留这个，因为 JSX 中用到了

  // const [text, setText] = useState("Tu texto aquí")
  // const [fontSize, setFontSize] = useState(60)
  // // ... (所有其他 useState 都注释掉) ...
  // const [font, setFont] = useState(FONTS[0].id); // 如果 FONTS 注释了，这里会报错，所以也注释

  // const previewRef = useRef<HTMLDivElement>(null)

  // useEffect(() => { /* Font loading */ }, [])
  // useEffect(() => { /* Plantilla loading */ }, [plantillaId])

  // const currentFont = FONTS.find((f) => f.id === font) || FONTS[0]; // 注释
  // const textStyle: React.CSSProperties = { fontFamily: 'Arial', fontSize: '20px' }; // 使用一个最简单的固定样式

  console.log("RECOVERY STEP 1: Constant arrays FONTS, COLORS, PLANTILLAS are restored. Other JS logic still commented.");

  return ( // 错误指向的是下一行 (在之前的错误中)
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumbs items={[ { label: "Inicio", href: "/" }, { label: "Editor de Lettering", href: "/editor" }, ]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Editor de Lettering Profesional</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Crea diseños tipográficos personalizados con nuestro editor de lettering online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div>
            <p>Left Panel Placeholder (Recovery Step 1)</p>
            <p>FONTS array length: {FONTS.length}</p> {/* 测试 FONTS 是否被正确定义 */}
          </div>

          <div style={{border: '1px solid lightskyblue', padding: '10px', background: '#f0f8ff'}}>
            <h3 className="text-lg font-semibold mb-2">Vista Previa (Recovery Step 1)</h3>
            <div style={{ fontFamily: 'Arial', fontSize: '20px' }}>
              Placeholder Text
            </div>
          </div>

          {!isMobile && (
             <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Crea Lettering Personalizado</h2>
              <div className="prose max-w-none">
                <p>
                  Nuestro <strong>editor de lettering online</strong> te permite crear{" "}
                  <strong>diseños tipográficos únicos</strong>
                  para tus proyectos personales o profesionales. Ya sea que necesites <strong>letras decoradas</strong>{" "}
                  para una invitación, <strong>caligrafía digital</strong> para un logo, o{" "}
                  <strong>tipografía artística</strong> para redes sociales, nuestra herramienta te ofrece todas las
                  opciones que necesitas.
                </p>
                <h3 className="text-xl font-medium mt-4 mb-2">Características del Editor de Lettering</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Múltiples estilos de tipografía</strong> - Elige entre una amplia variedad de fuentes
                    caligráficas y decorativas
                  </li>
                  <li>
                    <strong>Personalización completa</strong> - Ajusta tamaño, color, espaciado y alineación
                  </li>
                  <li>
                    <strong>Efectos profesionales</strong> - Añade sombras, contornos y rotación a tus diseños
                  </li>
                  <li>
                    <strong>Exportación en alta calidad</strong> - Descarga tus creaciones en formato PNG o JPG
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <p style={{color: 'darkorange', marginTop: '20px', textAlign: 'center', fontWeight: 'bold'}}>RECOVERY STEP 1: Constant arrays restored. Checking for build error.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
