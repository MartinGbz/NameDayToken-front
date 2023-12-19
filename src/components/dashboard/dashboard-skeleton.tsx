import { Skeleton } from "../ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 grid-row-2 gap-2">
      <Skeleton className="h-[152px] w-[550px]" />
      <Skeleton className="h-[152px] w-[550px]" />
      <Skeleton className="h-[268px] w-[1109px]" />
    </div>
  );
};
