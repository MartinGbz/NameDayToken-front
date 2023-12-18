"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { TokensCombobox } from "./tokens-combobox";
import { Button } from "./ui/button";
import { Address } from "viem";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hooks/use-confetti";

const Header = () => {
  const router = useRouter();
  const { confetti } = useConfetti({
    emojis: ["🥳"],
  });
  return (
    <div className="w-screen flex flex-col p-4 space-y-4">
      <div className="w-full flex flex-row justify-between">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <span className="hidden md:inline font-bold text-4xl min-w-fit self-center mr-2">
            NameDayToken
          </span>
          <span
            className="font-bold text-4xl min-w-fit self-center"
            onClick={(e) => {
              e.stopPropagation();
              confetti();
            }}>
            🥳
          </span>
        </div>
        <div className="flex space-x-2 md:space-x-4">
          <ConnectButton
            label="Connect"
            chainStatus={{
              smallScreen: "icon",
              largeScreen: "name",
            }}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
          <ThemeModeToggle />
        </div>
      </div>
      <div className="w-full flex flex-row space-x-4">
        <TokensCombobox
          defaultPlaceholder="Search a token..."
          onChange={(v: Address | undefined) => {
            router.push("/token/" + v);
          }}
        />
        <Button>
          <Plus className="mr-1 h-5 w-5" />
          Create a token
        </Button>
      </div>
    </div>
  );
};

export default Header;
