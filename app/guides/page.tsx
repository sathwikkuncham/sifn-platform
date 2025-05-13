import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BookOpen, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const guides = [
  {
    title: "Startup Foundation",
    description: "Essential knowledge for building a strong startup foundation",
    slug: "startup-foundation",
    category: "Fundamentals",
  },
  {
    title: "Generating Ideas",
    description: "Frameworks and techniques for generating promising startup ideas",
    slug: "generating-ideas",
    category: "Ideation",
  },
  {
    title: "Validating Ideas",
    description: "Methods to validate your startup ideas with real users",
    slug: "validating-ideas",
    category: "Validation",
  },
  {
    title: "Early Execution",
    description: "Strategies for effective early-stage startup execution",
    slug: "early-execution",
    category: "Execution",
  },
  {
    title: "Funding Options",
    description: "Understanding different funding paths for your startup",
    slug: "funding-options",
    category: "Funding",
  },
  {
    title: "Essential Operations",
    description: "Key operational aspects of running a startup",
    slug: "essential-operations",
    category: "Operations",
  },
  {
    title: "Startup Ecosystem",
    description: "Navigating the broader startup ecosystem",
    slug: "startup-ecosystem",
    category: "Ecosystem",
  },
  {
    title: "Friedman's Startup Ideas",
    description: "Jared Friedman's approach to finding startup ideas",
    slug: "friedman-startup-ideas",
    category: "Ideation",
  },
]

const categories = Array.from(new Set(guides.map((guide) => guide.category)))

export default function GuidesPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 heading-gradient">Startup Guides</h1>
            <p className="text-foreground/70">
              Comprehensive guides based on Y Combinator and Paul Graham's startup wisdom
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
            <Input
              placeholder="Search guides..."
              className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant="outline" className="bg-background/50 border-primary/20">
            All Guides
          </Button>
          {categories.map((category) => (
            <Button key={category} variant="ghost" className="text-foreground/70">
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Card key={guide.slug} className="glass-card overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-indigo-500" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 text-white">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle>{guide.title}</CardTitle>
              </div>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {guide.category}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/guides/${guide.slug}`} className="w-full">
                <Button variant="outline" className="w-full group">
                  Read Guide
                  <ArrowRight className="ml-2 h-4 w-4 hover-translate" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
