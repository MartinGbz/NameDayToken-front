"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  optimismGoerli,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora, sepolia],
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
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};
