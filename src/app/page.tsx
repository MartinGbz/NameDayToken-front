"use client";

import { Dashboard } from "@/components/dashboard/dashboard";
import { useState } from "react";
import { useNetwork } from "wagmi";
import { TokensCombobox } from "@/components/tokens-combobox";
import { Address } from "viem";

export default function Home() {
  const [token, setToken] = useState<Address | undefined>();
  const { chain } = useNetwork();

  return (
    <main className="h-full w-full p-4 space-y-4">
      <TokensCombobox
        defaultPlaceholder="Search a token..."
        onChange={(v: Address | undefined) => {
          setToken(v);
        }}
      />
      {chain && token && <Dashboard tokenAddress={token} chainId={chain.id} />}
      {!chain && (
        <span className="absolute w-max top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2	">
          {" "}
          Connect your wallet to display the dashbord{" "}
        </span>
      )}
    </main>
  );
}
