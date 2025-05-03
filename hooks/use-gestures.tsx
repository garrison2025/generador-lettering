"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"

interface GestureHandlers {
  onPinch?: (scale: number) => void
  onRotate?: (angle: number) => void
  onSwipe?: (direction: "left" | "right" | "up" | "down") => void
  onDoubleTap?: () => void
}

export function useGestures(elementRef: React.RefObject<HTMLElement>, handlers: GestureHandlers) {
  const [lastTapTime, setLastTapTime] = useState(0)
  const [initialTouchDistance, setInitialTouchDistance] = useState<number | null>(null)
  const [initialTouchAngle, setInitialTouchAngle] = useState<number | null>(null)
  const [touchStartPosition, setTouchStartPosition] = useState<{ x: number; y: number } | null>(null)

  // 计算两个触摸点之间的距离
  const getDistance = (touches: TouchList) => {
    if (touches.length < 2) return null

    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY

    return Math.sqrt(dx * dx + dy * dy)
  }

  // 计算两个触摸点形成的角度
  const getAngle = (touches: TouchList) => {
    if (touches.length < 2) return null

    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY

    return (Math.atan2(dy, dx) * 180) / Math.PI
  }

  // 处理触摸开始事件
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      // 检测双击
      const now = Date.now()
      if (now - lastTapTime < 300) {
        handlers.onDoubleTap?.()
      }
      setLastTapTime(now)

      // 记录初始触摸位置（用于滑动检测）
      if (e.touches.length === 1) {
        setTouchStartPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        })
      }

      // 记录初始缩放和旋转状态
      if (e.touches.length === 2) {
        setInitialTouchDistance(getDistance(e.touches))
        setInitialTouchAngle(getAngle(e.touches))
      }
    },
    [lastTapTime, handlers],
  )

  // 处理触摸移动事件
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      // 处理缩放
      if (e.touches.length === 2 && initialTouchDistance && handlers.onPinch) {
        const currentDistance = getDistance(e.touches)
        if (currentDistance) {
          const scale = currentDistance / initialTouchDistance
          handlers.onPinch(scale)
        }
      }

      // 处理旋转
      if (e.touches.length === 2 && initialTouchAngle !== null && handlers.onRotate) {
        const currentAngle = getAngle(e.touches)
        if (currentAngle !== null) {
          const rotation = currentAngle - initialTouchAngle
          handlers.onRotate(rotation)
        }
      }
    },
    [initialTouchDistance, initialTouchAngle, handlers],
  )

  // 处理触摸结束事件
  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      // 检测滑动方向
      if (touchStartPosition && handlers.onSwipe) {
        const touchEndX = e.changedTouches[0].clientX
        const touchEndY = e.changedTouches[0].clientY

        const dx = touchEndX - touchStartPosition.x
        const dy = touchEndY - touchStartPosition.y

        // 确定是水平还是垂直滑动
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
          handlers.onSwipe(dx > 0 ? "right" : "left")
        } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) {
          handlers.onSwipe(dy > 0 ? "down" : "up")
        }
      }

      // 重置状态
      setInitialTouchDistance(null)
      setInitialTouchAngle(null)
      setTouchStartPosition(null)
    },
    [touchStartPosition, handlers],
  )

  // 添加和移除事件监听器
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener("touchstart", handleTouchStart)
    element.addEventListener("touchmove", handleTouchMove)
    element.addEventListener("touchend", handleTouchEnd)

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchmove", handleTouchMove)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [elementRef, handleTouchStart, handleTouchMove, handleTouchEnd])
}
