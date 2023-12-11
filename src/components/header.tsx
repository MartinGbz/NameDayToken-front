"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { sepolia, useNetwork, useSwitchNetwork } from "wagmi";
import { Button } from "./ui/button";

const Header = () => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({ chainId: sepolia.id });

  return (
    <div className="w-screen flex flex-row justify-between p-4">
      <h1 className="font-bold md:text-3xl min-w-fit self-center">
        {" "}
        Name Day Token 📅{" "}
      </h1>
      <div className="flex space-x-4">
        {chain && chain.id !== sepolia.id && (
          <Button
            className="bg-red-400 hover:bg-red-500 block text-xs px-2 py-1 md:text-base md:px-4 md:py-2"
            onClick={() => switchNetwork?.()}>
            Unsupported network
          </Button>
        )}
        {chain && chain.id === sepolia.id && (
          <ConnectButton
            label="Connect"
            chainStatus="none"
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        )}
        <ThemeModeToggle />
      </div>
    </div>
  );
};

export default Header;
