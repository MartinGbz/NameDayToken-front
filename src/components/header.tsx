"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

const Header = () => {
  return (
    <div className="w-screen flex flex-row justify-between p-4">
      <h1 className="font-bold md:text-3xl min-w-fit self-center">
        {" "}
        Name Day Token 📅{" "}
      </h1>
      <div className="flex space-x-4">
        <ConnectButton
          label="Connect"
          chainStatus="none"
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
