import { cn } from "@/lib/utils"

interface GuideProgressProps {
  progress: number
  className?: string
}

export default function GuideProgress({ progress, className }: GuideProgressProps) {
  return (
    <div className={cn("fixed top-0 left-0 right-0 h-1 z-50", className)}>
      <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500" style={{ width: `${progress}%` }} />
    </div>
  )
}
