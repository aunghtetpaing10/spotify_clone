import { Skeleton } from "../ui/skeleton"

const SectionGridSkeleton = () => {
  return (
    <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-zinc-800/40 p-4 rounded-md">
                    <Skeleton className="h-40 w-full mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}  
        </div>
    </div>
  )
}

export default SectionGridSkeleton