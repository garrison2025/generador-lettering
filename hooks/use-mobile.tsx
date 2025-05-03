"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // 避免服务器端渲染时的错误
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // 初始化匹配状态
      setMatches(media.matches)

      // 创建事件监听器
      const listener = () => setMatches(media.matches)

      // 添加事件监听
      if (media.addEventListener) {
        media.addEventListener("change", listener)
      } else {
        // 兼容旧版浏览器
        media.addListener(listener)
      }

      // 清理函数
      return () => {
        if (media.removeEventListener) {
          media.removeEventListener("change", listener)
        } else {
          // 兼容旧版浏览器
          media.removeListener(listener)
        }
      }
    }

    // 默认返回false，避免服务器端渲染不匹配
    return () => {}
  }, [query])

  return matches
}

// 常用设备类型检测
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)")
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)")
}

// 检测触摸设备
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const touchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0

    setIsTouch(touchDevice)
  }, [])

  return isTouch
}

// 检测设备方向
export function useOrientation(): "portrait" | "landscape" {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    typeof window !== "undefined" && window.innerHeight > window.innerWidth ? "portrait" : "landscape",
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight > window.innerWidth) {
        setOrientation("portrait")
      } else {
        setOrientation("landscape")
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return orientation
}
