import { Skeleton } from "@/components/ui/skeleton";

const UsersListSkeleton = () => {
  return Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="flex items-center gap-3 py-3 justify-center lg:justify-start">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-4 w-[180px] mb-2" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  ));
};

export default UsersListSkeleton;
