import type React from "react"
import { GuidesSidebar } from "@/components/guides-sidebar"

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <GuidesSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
