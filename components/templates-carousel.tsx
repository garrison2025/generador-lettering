"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TemplatesCarouselProps {
  children: React.ReactNode[]
  title?: string
  description?: string
  itemsPerView?: number
}

export function TemplatesCarousel({ children, title, description, itemsPerView = 4 }: TemplatesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(itemsPerView)
  const containerRef = useRef<HTMLDivElement>(null)

  // Ajustar número de elementos visibles según el ancho de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 768) {
        setVisibleItems(2)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3)
      } else {
        setVisibleItems(itemsPerView)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [itemsPerView])

  const totalItems = children.length
  const maxIndex = Math.max(0, totalItems - visibleItems)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  return (
    <div className="w-full">
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      <div className="relative">
        <div className="overflow-hidden" ref={containerRef}>
          <motion.div
            className="flex"
            animate={{ x: `calc(-${currentIndex * 100}% / ${visibleItems})` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {children.map((child, index) => (
              <div key={index} className="px-2" style={{ width: `${100 / visibleItems}%`, flexShrink: 0 }}>
                {child}
              </div>
            ))}
          </motion.div>
        </div>

        <AnimatePresence>
          {currentIndex > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
            >
              <Button variant="secondary" size="icon" className="rounded-full shadow-lg h-10 w-10" onClick={prevSlide}>
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Anterior</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {currentIndex < maxIndex && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10"
            >
              <Button variant="secondary" size="icon" className="rounded-full shadow-lg h-10 w-10" onClick={nextSlide}>
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Siguiente</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicadores de página */}
        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a página ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
