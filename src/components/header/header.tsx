import { MainHeader } from "./main-header";
import { Suspense } from "react";
import { HeaderSkeleton } from "./dashboard-header-skeleton";
import { DashboardHeader } from "./dashboard-header";

export const Header = async () => {
  return (
    <div className="w-screen flex flex-col p-4 space-y-4">
      <MainHeader />
      <Suspense fallback={<HeaderSkeleton />}>
        <DashboardHeader />
      </Suspense>
    </div>
  );
};
