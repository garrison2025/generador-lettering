"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Opcional: reportar el error a un servicio de análisis
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold text-destructive mb-4">¡Ups! Algo salió mal</h1>
          <p className="text-muted-foreground mb-8">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo o vuelve a la página de inicio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => reset()}>Intentar de nuevo</Button>
            <Button variant="outline" asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
