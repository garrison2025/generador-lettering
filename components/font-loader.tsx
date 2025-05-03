"use client"

import { useEffect, useState } from "react"

// 定义字体组
const fontGroups = {
  essential: ["Dancing+Script:wght@400;700", "Pacifico", "Satisfy"],
  secondary: ["Sacramento", "Great+Vibes", "Amatic+SC:wght@400;700"],
  additional: ["Lobster", "Caveat:wght@400;700", "Kaushan+Script", "Permanent+Marker"],
}

export function FontLoader({ priority = "essential" }) {
  const [loadedGroups, setLoadedGroups] = useState<string[]>([])

  useEffect(() => {
    // 预连接到Google Fonts
    const preconnectGoogle = document.createElement("link")
    preconnectGoogle.rel = "preconnect"
    preconnectGoogle.href = "https://fonts.googleapis.com"

    const preconnectGstatic = document.createElement("link")
    preconnectGstatic.rel = "preconnect"
    preconnectGstatic.href = "https://fonts.gstatic.com"
    preconnectGstatic.crossOrigin = "anonymous"

    document.head.appendChild(preconnectGoogle)
    document.head.appendChild(preconnectGstatic)

    // 根据优先级加载字体
    const loadFontGroup = (group: string) => {
      if (loadedGroups.includes(group)) return

      const fonts = fontGroups[group as keyof typeof fontGroups].join("&family=")
      const link = document.createElement("link")
      link.href = `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`
      link.rel = "stylesheet"

      // 对非必要字体使用字体显示交换
      if (group !== "essential") {
        link.media = "print"
        link.onload = () => {
          link.media = "all"
          setLoadedGroups((prev) => [...prev, group])
        }
      } else {
        setLoadedGroups((prev) => [...prev, group])
      }

      document.head.appendChild(link)
    }

    // 加载必要字体
    loadFontGroup("essential")

    // 使用Intersection Observer延迟加载其他字体
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadFontGroup("secondary")

          // 页面滚动后再加载额外字体
          setTimeout(() => {
            loadFontGroup("additional")
          }, 2000)

          observer.disconnect()
        }
      })

      observer.observe(document.body)
    } else {
      // 回退方案
      setTimeout(() => loadFontGroup("secondary"), 1000)
      setTimeout(() => loadFontGroup("additional"), 3000)
    }

    return () => {
      document.head.contains(preconnectGoogle) && document.head.removeChild(preconnectGoogle)
      document.head.contains(preconnectGstatic) && document.head.removeChild(preconnectGstatic)
    }
  }, [loadedGroups])

  return null
}
