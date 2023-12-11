"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { useTheme } from "next-themes";

const chainsSupported = [sepolia];

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  const { chains, publicClient } = configureChains(chainsSupported, [
    publicProvider(),
  ]);

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
        initialChain={chainsSupported[0]}
        theme={theme == "dark" ? darkTheme() : lightTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
