"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { sepolia } from "wagmi/chains";
import { foundry } from "wagmi/chains";
import { sepolia } from "./chains/sepolia";
import { publicProvider } from "wagmi/providers/public";
import { useTheme } from "next-themes";

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  const { chains, publicClient } = configureChains(
    [sepolia, foundry],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "NameDayToken",
    projectId: "7f8f5cc2456dd80ebeb14803c09e327e",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={theme == "dark" ? darkTheme() : lightTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
