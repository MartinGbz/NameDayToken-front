"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");

  const frameworks = [
    {
      value: "alice",
      label: "Alice Token",
    },
    {
      value: "martin",
      label: "Martin Token",
    },
  ];

  return (
    <main className="p-4 h-full grid grid-cols-2">
      <div className="flex flex-col space-y-4">
        <Combobox
          defaultValue="Select a token"
          defaultPlaceholder="Search a token..."
          frameworks={frameworks}
          onChange={(v: string) => {
            setValue(v);
            console.log(v);
          }}
        />
        <div className="font-medium md:text-xl">
          {" "}
          My Balance:{" "}
          <span className="font-semibold text-green-500">{100}</span>
        </div>
        <div className="font-medium md:text-xl">
          {" "}
          Total supply: <span className="font-semibold">{1000000}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex flex-col w-fit space-y-4 items-end">
          <div className="font-medium md:text-xl">
            {" "}
            Next day: <span className="text-red-500 font-semibold">{290}j</span>
          </div>
          <Button> Mint </Button>
        </div>
      </div>
    </main>
  );
}
