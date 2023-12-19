"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hooks/use-confetti";

export const MainHeader = () => {
  const router = useRouter();
  const { confetti } = useConfetti({
    emojis: ["🥳"],
  });

  return (
    <div className="w-full flex flex-row justify-between">
      <div className="select-none">
        <span className="hidden md:inline font-bold text-4xl min-w-fit self-center mr-2">
          NameDayToken
        </span>
        <span
          className="cursor-pointer font-bold text-4xl min-w-fit self-center"
          onClick={(e) => {
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
  );
};
