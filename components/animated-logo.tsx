"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface AnimatedLogoProps {
  size?: number
  className?: string
}

export function AnimatedLogo({ size = 120, className = "" }: AnimatedLogoProps) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the logo based on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which logo to show based on theme
  const currentTheme = theme === "system" ? systemTheme : theme
  const logoSrc = mounted && currentTheme === "dark" ? "/logo-light.png" : "/logo-dark.png"

  return (
    <div className={`flex justify-center ${className}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.05, rotate: 5 }}
      >
        {!mounted ? (
          <div className={`h-${size} w-${size} bg-gray-200 rounded-md animate-pulse`}></div>
        ) : (
          <Image
            src={logoSrc || "/placeholder.svg"}
            alt="Generador de Lettering Logo"
            width={size}
            height={size}
            className="transition-all duration-300 rounded-md"
            priority
          />
        )}
      </motion.div>
    </div>
  )
}
