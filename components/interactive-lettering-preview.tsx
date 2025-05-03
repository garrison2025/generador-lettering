"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Edit } from "lucide-react"
import Link from "next/link"

interface InteractiveLetteringPreviewProps {
  template: {
    id: string
    nombre: string
    texto: string
    estilo: string
    color: string
    fontSize?: number
    letterSpacing?: number
    lineHeight?: number
    alignment?: string
    rotation?: number
    shadow?: boolean
    shadowColor?: string
    shadowBlur?: number
    shadowOffsetX?: number
    shadowOffsetY?: number
    outline?: boolean
    outlineColor?: string
    outlineWidth?: number
  }
  fontFamily: string
  className?: string
}

export function InteractiveLetteringPreview({ template, fontFamily, className }: InteractiveLetteringPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [previewText, setPreviewText] = useState(template.texto)

  // Generar estilos CSS para el texto
  const textStyle = {
    fontFamily,
    fontSize: `${template.fontSize || 36}px`,
    color: template.color,
    textAlign: template.alignment as "left" | "center" | "right",
    letterSpacing: `${template.letterSpacing || 0}px`,
    lineHeight: template.lineHeight || 1.5,
    transform: template.rotation ? `rotate(${template.rotation}deg)` : "none",
    textShadow: template.shadow
      ? `${template.shadowOffsetX || 2}px ${template.shadowOffsetY || 2}px ${template.shadowBlur || 4}px ${
          template.shadowColor || "rgba(0,0,0,0.3)"
        }`
      : "none",
    WebkitTextStroke: template.outline
      ? `${template.outlineWidth || 1}px ${template.outlineColor || "#FFFFFF"}`
      : "none",
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewText(e.target.value)
  }

  const handleTextBlur = () => {
    if (previewText.trim() === "") {
      setPreviewText(template.texto)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (previewText.trim() === "") {
        setPreviewText(template.texto)
      }
      setIsEditing(false)
    }
  }

  return (
    <motion.div
      className={`${className || ""}`}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div
          className="aspect-[3/2] flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 relative"
          style={{
            background: `radial-gradient(circle, ${template.color}10, ${template.color}05)`,
          }}
        >
          {isEditing ? (
            <input
              type="text"
              value={previewText}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="bg-transparent border-b border-dashed border-gray-400 text-center w-full outline-none"
              style={textStyle}
            />
          ) : (
            <motion.div
              style={textStyle}
              initial={{ opacity: 1 }}
              animate={{
                opacity: isHovered ? 0.9 : 1,
                y: isHovered ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {previewText.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </motion.div>
          )}

          {isHovered && !isEditing && (
            <motion.div
              className="absolute bottom-2 right-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button size="sm" variant="secondary" className="rounded-full w-8 h-8 p-0" onClick={handleEditClick}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Editar texto</span>
              </Button>
            </motion.div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold mb-2">{template.nombre}</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">
            {template.outline ? "Con contorno" : ""}
            {template.outline && template.shadow ? " y " : ""}
            {template.shadow ? "Con sombra" : ""}
            {!template.outline && !template.shadow ? "Estilo simple" : ""}
          </p>
          <Button asChild className="w-full group">
            <Link href={`/editor?plantilla=${template.id}`} className="flex items-center justify-center">
              <span>Usar Plantilla</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
