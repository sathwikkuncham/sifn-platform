import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <div className="mb-8">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full max-w-md mb-4" />
            <div className="flex gap-2 items-center mt-4">
              <Skeleton className="h-2 w-full flex-grow" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>

          <div className="space-y-4 bg-background/30 backdrop-blur-md border border-primary/10 rounded-xl p-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        <div className="md:w-1/4 space-y-6">
          <div className="bg-background/30 backdrop-blur-md border border-primary/10 rounded-xl p-4">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          <div className="bg-background/30 backdrop-blur-md border border-primary/10 rounded-xl p-4">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <div className="space-y-3">
              <div className="p-3 border border-primary/10 rounded-lg">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <div className="p-3 border border-primary/10 rounded-lg">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          </div>

          <div className="bg-background/30 backdrop-blur-md border border-primary/10 rounded-xl p-4">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-9 w-full mb-2" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
