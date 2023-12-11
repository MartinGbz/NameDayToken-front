"use client";

import { Dashboard } from "@/components/dashboard/dashboard";
import { useState } from "react";
import { TokensCombobox } from "@/components/tokens-combobox";
import { Address } from "viem";

export default function Home() {
  const [token, setToken] = useState<Address | undefined>();

  return (
    <main className="h-full w-full p-4 space-y-4">
      <TokensCombobox
        defaultPlaceholder="Search a token..."
        onChange={(v: Address | undefined) => {
          setToken(v);
        }}
      />
      {token && <Dashboard tokenAddress={token} />}
    </main>
  );
}
