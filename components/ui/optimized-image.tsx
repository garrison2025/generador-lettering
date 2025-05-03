"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  placeholder?: "blur" | "empty" | "data:image/..."
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 80,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  placeholder = "empty",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(!priority)
  const [imgSrc, setImgSrc] = useState(src)
  const [isClient, setIsClient] = useState(false)

  // 检测客户端渲染
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 检测WebP支持
  const supportsWebp =
    isClient && document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0

  // 如果支持WebP且图片不是SVG，尝试使用WebP
  useEffect(() => {
    if (supportsWebp && src && !src.endsWith(".svg") && !src.includes("data:image/svg")) {
      // 如果是外部URL且不是已经是WebP，尝试转换
      if (src.startsWith("http") && !src.endsWith(".webp")) {
        // 可以使用图片优化服务或CDN的WebP转换功能
        // 这里仅作示例，实际实现可能需要根据您的CDN或图片服务调整
        const webpSrc = src.includes("?") ? `${src}&format=webp` : `${src}?format=webp`
        setImgSrc(webpSrc)
      }
    }
  }, [src, supportsWebp, isClient])

  return (
    <div className={cn("overflow-hidden relative", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <span className="sr-only">加载中...</span>
        </div>
      )}

      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setImgSrc(src) // 如果WebP加载失败，回退到原始图片
        }}
        priority={priority}
        quality={quality}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  )
}
