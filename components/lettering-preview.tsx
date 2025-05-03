"use client"
import { Card, CardContent } from "@/components/ui/card"

interface LetteringPreviewProps {
  text: string
  style: {
    fontFamily: string
    fontSize?: string
    color?: string
    textAlign?: "left" | "center" | "right"
    letterSpacing?: string
    lineHeight?: number
    transform?: string
    textShadow?: string
    WebkitTextStroke?: string
  }
  className?: string
  onClick?: () => void
}

export function LetteringPreview({ text, style, className, onClick }: LetteringPreviewProps) {
  return (
    <Card
      className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${className || ""}`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="aspect-[3/2] flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
          <div style={style}>{text}</div>
        </div>
      </CardContent>
    </Card>
  )
}
