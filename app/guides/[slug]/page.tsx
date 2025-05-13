import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import GuideContent from "@/components/guide-content"
import GuideTableOfContents from "@/components/guide-table-of-contents"
import GuideNavigation from "@/components/guide-navigation"
import RelatedGuides from "@/components/related-guides"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"

interface GuidePageProps {
  params: {
    slug: string
  }
}

export default function GuidePage({ params }: GuidePageProps) {
  const { slug } = params

  // Get guide content
  let content: string
  try {
    const filePath = path.join(process.cwd(), `app/guides/${slug}/content.md`)
    content = fs.readFileSync(filePath, "utf8")
  } catch (error) {
    notFound()
  }

  // Extract title from content
  const titleMatch = content.match(/^# (.*)$/m)
  const title = titleMatch ? titleMatch[1] : "Guide"

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <div className="mb-8">
            <Link href="/guides">
              <Button variant="ghost" className="mb-4 -ml-2 text-foreground/70 hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Guides
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold heading-gradient">{title}</h1>
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mb-8" />
          </div>

          <GuideContent content={content} />

          <div className="mt-12 border-t border-primary/10 pt-8">
            <GuideNavigation currentSlug={slug} />
          </div>
        </div>

        <div className="md:w-1/4 space-y-8">
          <div className="sticky top-8">
            <div className="glass-card p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
              <GuideTableOfContents content={content} />
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">Related Guides</h3>
              <RelatedGuides currentSlug={slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
