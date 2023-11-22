"use client";

import { Dashboard } from "@/components/dashboard";
import { useState } from "react";
import { Address } from "wagmi";
import { Combobox } from "@/components/ui/combobox";

export default function Home() {
  const [token, setToken] = useState<Address | undefined>();

  return (
    <main className="h-full w-full p-4 space-y-4">
      <Combobox
        defaultValue="Select a token"
        defaultPlaceholder="Search a token..."
        onChange={(v: Address | undefined) => {
          setToken(v);
        }}
      />
      {token && <Dashboard token={token} />}
    </main>
  );
}
