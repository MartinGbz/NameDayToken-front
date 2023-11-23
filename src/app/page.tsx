"use client";

import { Dashboard } from "@/components/dashboard";
import { useState } from "react";
import { Address, useNetwork } from "wagmi";
import { Combobox } from "@/components/ui/combobox";
import { Contract } from "@/types";

export default function Home() {
  const [token, setToken] = useState<Contract | undefined>();
  const { chain, chains } = useNetwork();

  return (
    <main className="h-full w-full p-4 space-y-4">
      <Combobox
        defaultValue="Select a token"
        defaultPlaceholder="Search a token..."
        onChange={(v: Contract | undefined) => {
          setToken(v);
        }}
      />
      {token && <Dashboard token={token} chainId={chain?.id ?? 1} />}
      {!token && (
        <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2	">
          {" "}
          Select a token to display the dashbord{" "}
        </span>
      )}
    </main>
  );
}
