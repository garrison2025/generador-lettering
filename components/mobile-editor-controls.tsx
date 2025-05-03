"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sliders, Type, Palette, Droplets, ChevronUp } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface MobileEditorControlsProps {
  children: React.ReactNode
  onApplyChanges?: () => void
}

export function MobileEditorControls({ children, onApplyChanges }: MobileEditorControlsProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("texto")
  const isMobile = useIsMobile()

  // 如果不是移动设备，直接显示控件
  if (!isMobile) {
    return <>{children}</>
  }

  return (
    <>
      {/* 固定在底部的触发器 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t p-2 flex justify-center">
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Sliders className="h-4 w-4" />
            <span>Controles del Editor</span>
            <ChevronUp className="h-4 w-4" />
          </Button>
        </SheetTrigger>
      </div>

      {/* 底部弹出的控件面板 */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[80vh] p-0">
          <div className="p-4 border-b">
            <h3 className="font-bold text-lg">Editar Lettering</h3>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(80vh-120px)]">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
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

              <TabsContent value="texto">
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child) && child.props.value === "texto") {
                    return child
                  }
                  return null
                })}
              </TabsContent>

              <TabsContent value="estilo">
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child) && child.props.value === "estilo") {
                    return child
                  }
                  return null
                })}
              </TabsContent>

              <TabsContent value="efectos">
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child) && child.props.value === "efectos") {
                    return child
                  }
                  return null
                })}
              </TabsContent>
            </Tabs>
          </div>

          <div className="p-4 border-t">
            <Button
              className="w-full"
              onClick={() => {
                if (onApplyChanges) onApplyChanges()
                setOpen(false)
              }}
            >
              Aplicar Cambios
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
