"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
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
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
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

  const { theme } = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  console.log("feefveljvknm");

  return (
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="light"
    //   enableSystem
    //   disableTransitionOnChange>
    <WagmiConfig config={wagmiConfig}>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange> */}
      <RainbowKitProvider
        chains={chains}
        // theme={theme == "light" ? lightTheme() : darkTheme()}>
        // theme={lightTheme()}
      >
        {children}
      </RainbowKitProvider>
      {/* </ThemeProvider> */}
    </WagmiConfig>
    // </ThemeProvider>
  );
};
