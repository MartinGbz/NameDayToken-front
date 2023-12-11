"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { useTheme } from "next-themes";

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  const { chains, publicClient } = configureChains(
    [sepolia],
    [
      jsonRpcProvider({
        rpc: (chain) => ({ http: "https://ethereum-sepolia.publicnode.com" }),
      }),
    ]
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
        initialChain={sepolia}
        theme={theme == "dark" ? darkTheme() : lightTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
