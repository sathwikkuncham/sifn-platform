"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import GuideProgress from "./guide-progress"

interface GuideContentProps {
  content: string
  className?: string
}

export default function GuideContent({ content, className }: GuideContentProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const scrollPercentage = (scrollTop / documentHeight) * 100
      setProgress(scrollPercentage)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <GuideProgress progress={progress} />
      <div className="prose-custom">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 heading-gradient" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
            p: ({ node, ...props }) => <p className="my-4 text-foreground/80 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="my-4 list-disc pl-6 space-y-2" {...props} />,
            ol: ({ node, ...props }) => <ol className="my-4 list-decimal pl-6 space-y-2" {...props} />,
            li: ({ node, ...props }) => <li className="text-foreground/80" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-primary/50 pl-4 italic my-4 text-foreground/70" {...props} />
            ),
            a: ({ node, ...props }) => <a className="text-primary hover:underline transition-all" {...props} />,
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "")
              return !inline && match ? (
                <div className="my-4 rounded-lg overflow-hidden border border-primary/20">
                  <pre className="bg-secondary/10 dark:bg-secondary/30 p-4 overflow-x-auto rounded-lg">
                    <code className="text-sm font-mono text-foreground/90">{children}</code>
                  </pre>
                </div>
              ) : (
                <code
                  className="bg-primary/10 dark:bg-primary/20 border border-primary/20 px-1.5 py-0.5 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              )
            },
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full divide-y divide-border rounded-lg" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => <thead className="bg-secondary/10" {...props} />,
            th: ({ node, ...props }) => (
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/90 tracking-wider" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="px-4 py-3 text-sm text-foreground/80 border-t border-border" {...props} />
            ),
            img: ({ node, ...props }) => <img className="rounded-lg shadow-md my-6 max-w-full h-auto" {...props} />,
            hr: ({ node, ...props }) => <hr className="my-8 border-t border-border" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
