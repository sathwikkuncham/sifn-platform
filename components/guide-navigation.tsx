import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GuideNavigationProps {
  currentSlug: string
  className?: string
}

const guides = [
  {
    title: "Startup Foundation",
    slug: "startup-foundation",
  },
  {
    title: "Generating Ideas",
    slug: "generating-ideas",
  },
  {
    title: "Validating Ideas",
    slug: "validating-ideas",
  },
  {
    title: "Early Execution",
    slug: "early-execution",
  },
  {
    title: "Funding Options",
    slug: "funding-options",
  },
  {
    title: "Essential Operations",
    slug: "essential-operations",
  },
  {
    title: "Startup Ecosystem",
    slug: "startup-ecosystem",
  },
  {
    title: "Friedman's Startup Ideas",
    slug: "friedman-startup-ideas",
  },
]

export default function GuideNavigation({ currentSlug, className }: GuideNavigationProps) {
  const currentIndex = guides.findIndex((guide) => guide.slug === currentSlug)
  const prevGuide = currentIndex > 0 ? guides[currentIndex - 1] : null
  const nextGuide = currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null

  return (
    <div className={cn("flex justify-between", className)}>
      {prevGuide ? (
        <Link href={`/guides/${prevGuide.slug}`}>
          <Button variant="outline" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {prevGuide.title}
          </Button>
        </Link>
      ) : (
        <div></div>
      )}

      {nextGuide ? (
        <Link href={`/guides/${nextGuide.slug}`}>
          <Button variant="outline" className="group">
            {nextGuide.title}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  )
}
