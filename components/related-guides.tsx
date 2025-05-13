import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface RelatedGuidesProps {
  currentSlug: string
  className?: string
}

const guides = [
  {
    title: "Startup Foundation",
    slug: "startup-foundation",
    category: "Fundamentals",
  },
  {
    title: "Generating Ideas",
    slug: "generating-ideas",
    category: "Ideation",
  },
  {
    title: "Validating Ideas",
    slug: "validating-ideas",
    category: "Validation",
  },
  {
    title: "Early Execution",
    slug: "early-execution",
    category: "Execution",
  },
  {
    title: "Funding Options",
    slug: "funding-options",
    category: "Funding",
  },
  {
    title: "Essential Operations",
    slug: "essential-operations",
    category: "Operations",
  },
  {
    title: "Startup Ecosystem",
    slug: "startup-ecosystem",
    category: "Ecosystem",
  },
  {
    title: "Friedman's Startup Ideas",
    slug: "friedman-startup-ideas",
    category: "Ideation",
  },
]

export default function RelatedGuides({ currentSlug, className }: RelatedGuidesProps) {
  // Get current guide category
  const currentGuide = guides.find((guide) => guide.slug === currentSlug)
  const currentCategory = currentGuide?.category

  // Get related guides (same category, excluding current)
  const relatedGuides = guides
    .filter((guide) => guide.category === currentCategory && guide.slug !== currentSlug)
    .slice(0, 3)

  // If not enough related guides in same category, add some from other categories
  if (relatedGuides.length < 3) {
    const additionalGuides = guides
      .filter((guide) => guide.category !== currentCategory && guide.slug !== currentSlug)
      .slice(0, 3 - relatedGuides.length)

    relatedGuides.push(...additionalGuides)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {relatedGuides.map((guide) => (
        <Link
          key={guide.slug}
          href={`/guides/${guide.slug}`}
          className="block p-3 rounded-lg hover:bg-primary/5 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-foreground">{guide.title}</h4>
              <p className="text-xs text-foreground/60 mt-1">{guide.category}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-primary mt-1" />
          </div>
        </Link>
      ))}
    </div>
  )
}
