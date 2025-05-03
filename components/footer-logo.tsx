"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export function FooterLogo() {
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the logo
  useEffect(() => {
    setMounted(true)
  }, [])

  // Always use light logo in footer (since footer has dark background)
  const logoSrc = "/logo-light.png"

  return (
    <div className="flex items-center">
      {!mounted ? (
        <div className="h-10 w-10 bg-gray-700 rounded-md animate-pulse"></div>
      ) : (
        <Image
          src={logoSrc || "/placeholder.svg"}
          alt="Generador de Lettering Logo"
          width={40}
          height={40}
          className="h-10 w-10 rounded-md"
        />
      )}
      <div className="ml-2">
        <h2 className="text-white font-bold text-lg">Generador de Lettering</h2>
        <p className="text-xs text-white/70">Arte tipográfico personalizado</p>
      </div>
    </div>
  )
}
