"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Palette, Type } from "lucide-react"
import type { ReactNode } from "react"

interface TabsComponentProps {
  children: ReactNode
  defaultValue?: string
}

export default function TabsComponent({ children, defaultValue = "texto" }: TabsComponentProps) {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="texto" className="flex items-center gap-1">
          <Type className="h-4 w-4" />
          <span>Texto</span>
        </TabsTrigger>
        <TabsTrigger value="estilo" className="flex items-center gap-1">
          <Palette className="h-4 w-4" />
          <span>Estilo</span>
        </TabsTrigger>
        <TabsTrigger value="efectos" className="flex items-center gap-1">
          <Droplets className="h-4 w-4" />
          <span>Efectos</span>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}
