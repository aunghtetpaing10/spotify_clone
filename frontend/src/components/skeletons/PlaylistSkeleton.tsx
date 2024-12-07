import { Skeleton } from "@/components/ui/skeleton";

const PlaylistSkeleton = () => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="space-y-2 flex-1 min-w-0 hidden md:block">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
};

export default PlaylistSkeleton;
