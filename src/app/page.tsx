import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { getDefaultTokenAddress } from "@/lib/tokens";
import { redirect } from "next/navigation";

export default async function Home() {
  return <DashboardSkeleton />;
  // const tokenAddress = await getDefaultTokenAddress();
  // return redirect("/token/" + "0x254a0e01AF18D0eD29747e5C0D2F2c531c3c8a1D");
}
