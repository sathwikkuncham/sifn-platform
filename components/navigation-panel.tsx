"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Lightbulb,
  CheckSquare,
  FlaskConical,
  Rocket,
  BarChart,
  Users,
  Settings,
  Brain,
  Zap,
  X,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { FloatingNavButton } from "@/components/floating-nav-button"

export default function NavigationPanel() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Founder Onboarding", href: "/modules/onboarding", icon: Users, gradient: "from-blue-500 to-cyan-400" },
    { name: "Idea Genesis", href: "/modules/idea-genesis", icon: Lightbulb, gradient: "from-amber-500 to-yellow-400" },
    {
      name: "Idea Evaluation",
      href: "/modules/idea-evaluation",
      icon: CheckSquare,
      gradient: "from-green-500 to-emerald-400",
    },
    { name: "Validation", href: "/modules/validation", icon: FlaskConical, gradient: "from-purple-500 to-violet-400" },
    { name: "Execution", href: "/modules/execution", icon: Rocket, gradient: "from-rose-500 to-pink-400" },
    { name: "AI Augmentation", href: "/modules/ai-augmentation", icon: Brain, gradient: "from-primary to-indigo-400" },
    { name: "Startup Guides", href: "/guides", icon: BookOpen, gradient: "from-blue-600 to-indigo-500" },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full glass">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg transition-all duration-500 hover:bg-primary/30 hover:rotate-3">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold heading-gradient">SIFN</h2>
            <p className="text-xs text-foreground/60">Startup Idea Framework Navigator</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start rounded-xl mb-1 transition-all duration-300",
                isActive
                  ? item.gradient
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-md shadow-primary/20`
                    : "bg-gradient-to-r from-primary/90 to-purple-500/90 text-white shadow-md shadow-primary/20"
                  : "hover:bg-primary/10 text-foreground/70 hover:translate-x-1",
              )}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={item.href} className="py-6 group">
                <item.icon className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                {item.name}
              </Link>
            </Button>
          )
        })}
      </div>

      <div className="p-4 m-4 glass-card">
        <div className="text-sm font-medium mb-2">Ready to collaborate?</div>
        <p className="text-xs text-foreground/70 mb-3">
          Invite your team members to work together on your startup ideas.
        </p>
        <Button className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
          <Users className="mr-2 h-4 w-4" />
          Invite Team
        </Button>
      </div>

      <div className="p-4 flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  )

  if (!isMounted) return null

  return (
    <>
      {/* Mobile navigation */}
      <Sheet open={open} onOpenChange={setOpen} className="transition-all duration-300">
        <SheetTrigger asChild>
          <FloatingNavButton open={open} onOpenChange={setOpen} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 border-r border-primary/20 w-[85vw] max-w-[350px] shadow-lg transition-transform duration-300"
        >
          <div className="absolute right-4 top-4 z-50">
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 transition-all duration-300"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop navigation */}
      <div className="hidden md:block md:w-80 border-r border-primary/20 glass">
        <SidebarContent />
      </div>
    </>
  )
}
