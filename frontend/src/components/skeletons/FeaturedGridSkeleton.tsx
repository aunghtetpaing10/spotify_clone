import { Skeleton } from "../ui/skeleton";

const FeaturedGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-md" />
          <div className="space-y-2 flex-1 min-w-0">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
      ;
    </div>
  );
};

export default FeaturedGridSkeleton;
