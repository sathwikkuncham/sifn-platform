"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"

// This would typically come from a database or CMS
const guides = [
  {
    slug: "startup-foundation",
    title: "The Startup Foundation",
    description: "Mindset and principles needed for startup success",
  },
  {
    slug: "generating-ideas",
    title: "Generating Ideas",
    description: "Methods for generating and refining startup ideas",
  },
  {
    slug: "validating-ideas",
    title: "Validating Ideas",
    description: "How to validate your startup ideas to ensure market demand",
  },
  {
    slug: "early-execution",
    title: "Early Execution",
    description: "How to execute effectively in the early stages",
  },
  {
    slug: "funding-options",
    title: "Funding Options",
    description: "Different funding options for your startup journey",
  },
  {
    slug: "essential-operations",
    title: "Essential Operations",
    description: "Essential operational aspects of running a startup",
  },
  {
    slug: "startup-ecosystem",
    title: "Startup Ecosystem",
    description: "Resources and community available in the startup ecosystem",
  },
  {
    slug: "friedman-startup-ideas",
    title: "Friedman's Startup Ideas",
    description: "Jared Friedman's approach to startup ideas",
  },
]

export function GuideSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search guides..."
          className="pl-8 bg-background/50 border-primary/20 focus:border-primary/50 rounded-xl"
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search guides..." />
        <CommandList>
          <CommandEmpty>No guides found.</CommandEmpty>
          <CommandGroup heading="Guides">
            {guides.map((guide) => (
              <CommandItem
                key={guide.slug}
                onSelect={() => {
                  router.push(`/guides/${guide.slug}`)
                  setOpen(false)
                }}
              >
                <span>{guide.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
