"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface TouchColorPickerProps {
  value: string
  onChange: (color: string) => void
  presetColors?: string[]
  className?: string
}

export function TouchColorPicker({
  value,
  onChange,
  presetColors = [
    "#000000",
    "#FFFFFF",
    "#5B4FBE",
    "#FF6B6B",
    "#FFD93D",
    "#4A4A4A",
    "#E53935",
    "#43A047",
    "#1E88E5",
    "#8E24AA",
  ],
  className,
}: TouchColorPickerProps) {
  const [color, setColor] = useState(value)
  const [showCustom, setShowCustom] = useState(false)
  const isMobile = useIsMobile()

  // 同步外部值
  useEffect(() => {
    setColor(value)
  }, [value])

  // 处理颜色变化
  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    onChange(newColor)
  }

  // 移动端友好的颜色选择UI
  if (isMobile) {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="grid grid-cols-5 gap-2">
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              className={cn(
                "w-full aspect-square rounded-md border-2",
                color === presetColor ? "border-primary" : "border-transparent",
              )}
              style={{ backgroundColor: presetColor }}
              onClick={() => handleColorChange(presetColor)}
              aria-label={`Color ${presetColor}`}
            />
          ))}
        </div>

        <div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => setShowCustom(!showCustom)}>
            {showCustom ? "Ocultar color personalizado" : "Color personalizado"}
          </Button>

          {showCustom && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: color }} />
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full h-10"
                />
              </div>
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full p-2 border rounded-md"
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                placeholder="#RRGGBB"
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  // 桌面版UI
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full flex items-center justify-between", className)}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md border" style={{ backgroundColor: color }} />
            <span>{color}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-5 gap-2 mb-3">
          {presetColors.map((presetColor) => (
            <button
              key={presetColor}
              className={cn(
                "w-full aspect-square rounded-md border-2",
                color === presetColor ? "border-primary" : "border-transparent",
              )}
              style={{ backgroundColor: presetColor }}
              onClick={() => handleColorChange(presetColor)}
              aria-label={`Color ${presetColor}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-10 h-10 p-1"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
            placeholder="#RRGGBB"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
