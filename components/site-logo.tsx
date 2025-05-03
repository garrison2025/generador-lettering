"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface SiteLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function SiteLogo({ size = "md", showText = true, className = "" }: SiteLogoProps) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the logo based on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which logo to show based on theme
  const currentTheme = theme === "system" ? systemTheme : theme
  const logoSrc = mounted && currentTheme === "dark" ? "/logo-light.png" : "/logo-dark.png"

  // Size classes for the logo
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  }

  // Text size classes
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Show a placeholder while determining the theme */}
        {!mounted ? (
          <div className={`${sizeClasses[size]} bg-gray-200 rounded-md animate-pulse`}></div>
        ) : (
          <Image
            src={logoSrc || "/placeholder.svg"}
            alt="Generador de Lettering Logo"
            width={size === "lg" ? 56 : size === "md" ? 40 : 32}
            height={size === "lg" ? 56 : size === "md" ? 40 : 32}
            className={`${sizeClasses[size]} transition-all duration-300 rounded-md`}
            priority
          />
        )}
      </div>
      {showText && (
        <div>
          <h1 className={`font-bold text-primary ${textSizeClasses[size]}`}>Generador de Lettering</h1>
          <p className="text-xs text-muted-foreground">Arte tipográfico personalizado</p>
        </div>
      )}
    </Link>
  )
}
