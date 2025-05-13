"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Search, BookMarked, Bookmark, BookText } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// This would typically come from a database or CMS
const guides = [
  {
    slug: "startup-foundation",
    title: "The Startup Foundation",
    description: "Mindset and principles needed for startup success",
    icon: BookOpen,
  },
  {
    slug: "generating-ideas",
    title: "Generating Ideas",
    description: "Methods for generating and refining startup ideas",
    icon: Lightbulb,
  },
  {
    slug: "validating-ideas",
    title: "Validating Ideas",
    description: "How to validate your startup ideas to ensure market demand",
    icon: CheckSquare,
  },
  {
    slug: "early-execution",
    title: "Early Execution",
    description: "How to execute effectively in the early stages",
    icon: Rocket,
  },
  {
    slug: "funding-options",
    title: "Funding Options",
    description: "Different funding options for your startup journey",
    icon: DollarSign,
  },
  {
    slug: "essential-operations",
    title: "Essential Operations",
    description: "Essential operational aspects of running a startup",
    icon: Settings,
  },
  {
    slug: "startup-ecosystem",
    title: "Startup Ecosystem",
    description: "Resources and community available in the startup ecosystem",
    icon: Globe,
  },
  {
    slug: "friedman-startup-ideas",
    title: "Friedman's Startup Ideas",
    description: "Jared Friedman's approach to startup ideas",
    icon: BookMarked,
  },
]

import { Lightbulb, CheckSquare, Rocket, Settings, Globe, DollarSign } from "lucide-react"

export function GuidesSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  const filteredGuides = guides.filter((guide) => guide.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-background/50 backdrop-blur-md">
      <div className="p-4 border-b border-primary/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/20 p-2 rounded-lg">
            <BookText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Startup Guides
            </h2>
            <p className="text-xs text-foreground/60">Essential knowledge for founders</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search guides..."
            className="pl-8 bg-background/50 border-primary/20 focus:border-primary/50 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1 py-4">
        <div className="space-y-1 px-3">
          <Link href="/guides" className="block">
            <Button
              variant={pathname === "/guides" ? "default" : "ghost"}
              className={cn(
                "w-full justify-start rounded-xl mb-1 transition-all duration-300",
                pathname === "/guides"
                  ? "bg-gradient-to-r from-primary/90 to-purple-500/90 text-white shadow-md shadow-primary/20"
                  : "hover:bg-primary/10 text-foreground/70",
              )}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              All Guides
            </Button>
          </Link>

          {filteredGuides.map((guide) => {
            const isActive = pathname === `/guides/${guide.slug}`
            const Icon = guide.icon

            return (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start rounded-xl mb-1 transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-primary/90 to-purple-500/90 text-white shadow-md shadow-primary/20"
                      : "hover:bg-primary/10 text-foreground/70",
                  )}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  <span className="truncate">{guide.title}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-primary/10">
        <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10 rounded-xl">
          <Bookmark className="mr-2 h-4 w-4" />
          Bookmarked Guides
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 bg-background/50 backdrop-blur-md rounded-full"
          >
            <BookText className="h-6 w-6" />
            <span className="sr-only">Open guides menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 border-r border-primary/20 w-80">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:block w-72 border-r border-primary/20 bg-background/30 backdrop-blur-md overflow-y-auto">
        <SidebarContent />
      </div>
    </>
  )
}
