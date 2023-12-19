import { Skeleton } from "../ui/skeleton";

export const HeaderSkeleton = () => {
  return (
    <div className="w-full flex flex-row space-x-4">
      <Skeleton className="h-[40px] w-[200px]" />
      <Skeleton className="h-[40px] w-[153.95px]" />
    </div>
  );
};
