"use client";

import { Dashboard } from "@/components/dashboard/dashboard";
import { useParams } from "next/navigation";
import { Address } from "viem";

export default function TokenPage() {
  const { id } = useParams<{ id: Address }>();

  return (
    <main className="h-full w-full pr-4 pl-4 p-b-4">
      <Dashboard tokenAddress={id} />
    </main>
  );
}
