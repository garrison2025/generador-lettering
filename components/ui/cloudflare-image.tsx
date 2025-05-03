"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CloudflareImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  loading?: "eager" | "lazy"
}

export function CloudflareImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  loading = "lazy",
}: CloudflareImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    // Verificar si la imagen existe
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImgSrc(src)
      setIsLoading(false)
    }
    img.onerror = () => {
      // Usar imagen de placeholder si hay error
      setImgSrc("/placeholder.svg")
      setIsLoading(false)
    }
  }, [src])

  return (
    <div className={cn("overflow-hidden relative", className)}>
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn("transition-all duration-300", isLoading ? "scale-105 blur-sm" : "scale-100 blur-0")}
        priority={priority}
        quality={quality}
        loading={loading}
        sizes={`(max-width: 640px) 100vw, (max-width: 768px) 50vw, ${width}px`}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <span className="sr-only">Cargando...</span>
        </div>
      )}
    </div>
  )
}
