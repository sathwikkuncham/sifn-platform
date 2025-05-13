"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface GuideTableOfContentsProps {
  content: string
  className?: string
}

interface TocItem {
  id: string
  text: string
  level: number
}

export default function GuideTableOfContents({ content, className }: GuideTableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const headings: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2]
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

      headings.push({ id, text, level })
    }

    setToc(headings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      toc.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [toc])

  if (toc.length === 0) {
    return null
  }

  return (
    <nav className={cn("text-sm", className)}>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            className={cn(
              "transition-all duration-200",
              item.level === 1 ? "ml-0" : item.level === 2 ? "ml-3" : "ml-6",
            )}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                "block py-1 hover:text-primary transition-colors",
                activeId === item.id ? "text-primary font-medium" : "text-foreground/70",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
