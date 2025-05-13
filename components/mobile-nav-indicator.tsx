"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function MobileNavIndicator() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        setIsVisible(currentScrollY < lastScrollY)
      } else {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Determine which module we're in to apply the correct gradient
  const getGradient = () => {
    if (pathname?.startsWith("/modules/onboarding")) return "from-blue-500 to-cyan-400"
    if (pathname?.startsWith("/modules/idea-genesis")) return "from-amber-500 to-yellow-400"
    if (pathname?.startsWith("/modules/idea-evaluation")) return "from-green-500 to-emerald-400"
    if (pathname?.startsWith("/modules/validation")) return "from-purple-500 to-violet-400"
    if (pathname?.startsWith("/modules/execution")) return "from-rose-500 to-pink-400"
    if (pathname?.startsWith("/modules/ai-augmentation")) return "from-primary to-indigo-400"
    if (pathname?.startsWith("/guides")) return "from-blue-600 to-indigo-500"
    return "from-primary to-purple-500"
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r z-50 transition-all duration-300 md:hidden",
        getGradient(),
        isVisible ? "opacity-100" : "opacity-0",
      )}
    />
  )
}
