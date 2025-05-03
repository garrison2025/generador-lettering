"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"

interface MobileLetteringPreviewProps {
  text: string
  style: React.CSSProperties
  className?: string
  onExport?: () => void
}

export function MobileLetteringPreview({ text, style, className = "", onExport }: MobileLetteringPreviewProps) {
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // 如果不是移动设备，使用标准预览
  if (!isMobile) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-0">
          <div
            className="aspect-[3/2] flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100"
            ref={previewRef}
          >
            <div style={style}>{text}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // 移动设备优化的预览
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="relative">
          {/* 可缩放和拖动的预览区域 */}
          <motion.div
            className="aspect-[3/2] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
            ref={previewRef}
            drag={true}
            dragConstraints={previewRef}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              className="w-full h-full flex items-center justify-center p-4"
              style={{ scale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div style={style}>{text || "Tu texto aquí"}</div>
            </motion.div>
          </motion.div>

          {/* 控制按钮 */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full w-10 h-10 bg-white/80 backdrop-blur-sm"
              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
            >
              <ZoomOut className="h-5 w-5" />
              <span className="sr-only">Reducir</span>
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="rounded-full w-10 h-10 bg-white/80 backdrop-blur-sm"
              onClick={() => setScale(Math.min(2, scale + 0.1))}
            >
              <ZoomIn className="h-5 w-5" />
              <span className="sr-only">Ampliar</span>
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="rounded-full w-10 h-10 bg-white/80 backdrop-blur-sm"
              onClick={() => setScale(1)}
            >
              <RotateCcw className="h-5 w-5" />
              <span className="sr-only">Restablecer</span>
            </Button>

            {onExport && (
              <Button
                size="icon"
                variant="primary"
                className="rounded-full w-10 h-10 bg-primary/90 backdrop-blur-sm"
                onClick={onExport}
              >
                <Download className="h-5 w-5 text-white" />
                <span className="sr-only">Exportar</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
