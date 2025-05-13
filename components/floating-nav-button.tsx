"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface FloatingNavButtonProps {
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function FloatingNavButton({ onOpenChange, open }: FloatingNavButtonProps) {
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide based on scroll direction
      if (currentScrollY > 100) {
        setVisible(currentScrollY < lastScrollY)
      } else {
        setVisible(true)
      }

      // Add shadow when scrolled
      setScrolled(currentScrollY > 20)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onOpenChange(!open)}
      className={cn(
        "md:hidden fixed z-50 bg-background/80 backdrop-blur-md rounded-full transition-all duration-300",
        scrolled ? "shadow-md" : "",
        open ? "top-4 left-4" : "top-4 left-4",
        visible ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0",
        `hover:bg-gradient-to-r ${getGradient()} hover:text-white`,
      )}
    >
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
    </Button>
  )
}
