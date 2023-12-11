"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

const Header = () => {
  return (
    <div className="w-screen flex flex-row justify-between p-4">
      <div>
        <span className="hidden md:inline font-bold text-4xl min-w-fit self-center mr-2">
          NameDayToken
        </span>
        <span className="font-bold text-4xl min-w-fit self-center">🥳</span>
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

export default Header;
