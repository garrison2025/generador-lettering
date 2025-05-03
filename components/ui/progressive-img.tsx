"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProgressiveImgProps {
  placeholderSrc: string
  src: string
  alt: string
  width: number
  height: number
  className?: string
  imgClassName?: string
  priority?: boolean
}

export function ProgressiveImg({
  placeholderSrc,
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  priority = false,
}: ProgressiveImgProps) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Start loading the image right away
    const imageToLoad = new Image()
    imageToLoad.src = src
    imageToLoad.onload = () => {
      // When image is loaded, set the src and loading state
      setImgSrc(src)
      setLoading(false)
    }
  }, [src])

  return (
    <div className={cn("overflow-hidden relative", className)}>
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn("transition-all duration-500", loading ? "scale-105 blur-sm" : "scale-100 blur-0", imgClassName)}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
