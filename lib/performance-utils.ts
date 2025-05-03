import dynamic from "next/dynamic"
import type { ComponentType } from "react"

// 用于懒加载组件的工具函数
export function lazyLoadComponent<T>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  options = { ssr: false, loading: null },
) {
  return dynamic(importFunc, {
    ssr: options.ssr,
    loading:
      options.loading ||
      (() => (
        <div className="min-h-[100px] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )),
  })
}

// 防抖函数 - 用于减少高频事件触发
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>): void => {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)
  }
}

// 节流函数 - 用于限制函数调用频率
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>): void => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// 资源预加载
export function preloadResources(resources: string[]) {
  if (typeof window === "undefined") return

  resources.forEach((resource) => {
    const link = document.createElement("link")
    link.rel = "preload"

    if (resource.endsWith(".js")) {
      link.as = "script"
    } else if (resource.match(/\.(png|jpg|jpeg|gif|webp)$/)) {
      link.as = "image"
    } else if (resource.match(/\.(woff|woff2|ttf|otf)$/)) {
      link.as = "font"
      link.crossOrigin = "anonymous"
    }

    link.href = resource
    document.head.appendChild(link)
  })
}
