"use client"

import { useEffect } from "react"

export function ForceDarkMode({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("dark")
    const observer = new MutationObserver(() => {
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark")
      }
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return <>{children}</>
}

