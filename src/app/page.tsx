"use client";

import { Dashboard } from "@/components/dashboard/dashboard";
import { useState } from "react";
import { useNetwork } from "wagmi";
import { TokensCombobox } from "@/components/tokens-combobox";
import { TokenOption } from "@/types";
import tokensJSON from "@/tokens.json";
// import { tokens } from "@/tokens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Address, parseAbi } from "viem";

export default function Home() {
  const [token, setToken] = useState<Address | undefined>();
  const { chain } = useNetwork();

  // const tokens: TokenOption[] = tokensJSON as TokenOption[];
  // const tokens: TokenOption[] = tokensJSON.map((token) => ({
  //   label: token.label,
  //   value: {
  //     address: token.value.address,
  //     abi: token.value.abi,
  //   },
  // })) as TokenOption[];

  // const abi = parseAbi(tokens[0].value.abi);

  // console.log(tokens);

  // const defaultToken = tokens[0];

  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevTools initialIsOpen={false} /> */}
      <main className="h-full w-full p-4 space-y-4">
        <TokensCombobox
          // tokens={tokens}
          // defaultValue={defaultToken}
          defaultPlaceholder="Search a token..."
          onChange={(v: Address | undefined) => {
            setToken(v);
          }}
        />
        {chain && token && (
          <Dashboard tokenAddress={token} chainId={chain.id} />
        )}
        {!chain && (
          <span className="absolute w-max top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2	">
            {" "}
            Connect your wallet to display the dashbord{" "}
          </span>
        )}
      </main>
    </QueryClientProvider>
  );
}
