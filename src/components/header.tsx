"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { TokensCombobox } from "./tokens-combobox";
import { Button } from "./ui/button";
import { Address } from "viem";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hooks/use-confetti";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { TokenForm } from "./token-form";
import { useAccount } from "wagmi";
import { TokenOption } from "@/types";

interface HeaderProps {
  tokens: TokenOption[];
}

const Header = ({ tokens }: HeaderProps) => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { confetti } = useConfetti({
    emojis: ["🥳"],
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="w-screen flex flex-col p-4 space-y-4">
      <div className="w-full flex flex-row justify-between">
        <div
          className="cursor-pointer select-none"
          onClick={() => router.push("/")}>
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
        {tokens && tokens.length > 0 && (
          <TokensCombobox
            tokens={tokens}
            defaultPlaceholder="Search a token..."
            onChange={(v: Address | undefined) => {
              router.push("/token/" + v);
            }}
          />
        )}
        {isConnected && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1 h-5 w-5" />
                Create a token
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Deploy token</DialogTitle>
                <DialogDescription>
                  Deploy your own NameDayToken
                </DialogDescription>
              </DialogHeader>
              <TokenForm />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Header;
