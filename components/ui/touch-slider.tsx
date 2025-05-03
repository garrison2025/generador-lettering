"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface TouchSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  unit?: string
  className?: string
}

export function TouchSlider({ label, value, onChange, min, max, step, unit = "", className }: TouchSliderProps) {
  const [localValue, setLocalValue] = useState(value)
  const isMobile = useIsMobile()

  // 同步外部值
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // 处理滑块变化
  const handleSliderChange = (newValue: number[]) => {
    setLocalValue(newValue[0])
    onChange(newValue[0])
  }

  // 处理输入框变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setLocalValue(newValue)
      onChange(newValue)
    }
  }

  // 格式化显示值
  const displayValue = Number.isInteger(localValue) ? localValue.toString() : localValue.toFixed(1)

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between">
        <Label htmlFor={`slider-${label}`}>{label}</Label>
        <span className="text-sm text-muted-foreground">
          {displayValue}
          {unit}
        </span>
      </div>

      <div className={cn("flex items-center gap-2", isMobile ? "flex-col" : "")}>
        <div className={cn("flex-1", isMobile ? "w-full" : "")}>
          <Slider
            id={`slider-${label}`}
            min={min}
            max={max}
            step={step}
            value={[localValue]}
            onValueChange={handleSliderChange}
            className={isMobile ? "h-8 py-4" : ""}
          />
        </div>

        {isMobile && (
          <div className="flex w-full justify-between mt-1">
            <span className="text-xs text-muted-foreground">
              {min}
              {unit}
            </span>
            <span className="text-xs text-muted-foreground">
              {max}
              {unit}
            </span>
          </div>
        )}

        <Input
          type="number"
          value={displayValue}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          className={cn("w-20", isMobile ? "mt-2 w-full" : "")}
        />
      </div>
    </div>
  )
}
