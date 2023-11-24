"use client";

import { Dashboard } from "@/components/dashboard";
import { useState } from "react";
import { useNetwork } from "wagmi";
import { TokensCombobox } from "@/components/tokens-combobox";
import { Contract, TokenOption } from "@/types";
import tokensJSON from "@/tokens.json";

export default function Home() {
  const [token, setToken] = useState<Contract | undefined>();
  const { chain } = useNetwork();

  const tokens: TokenOption[] = tokensJSON as TokenOption[];
  const defaultToken = tokens[0];

  return (
    <main className="h-full w-full p-4 space-y-4">
      <TokensCombobox
        defaultValue={defaultToken}
        defaultPlaceholder="Search a token..."
        onChange={(v: Contract | undefined) => {
          setToken(v);
        }}
      />
      {chain && (
        <Dashboard token={token ?? defaultToken.value} chainId={chain.id} />
      )}
      {!chain && (
        <span className="absolute w-max top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2	">
          {" "}
          Connect your wallet to display the dashbord{" "}
        </span>
      )}
    </main>
  );
}
