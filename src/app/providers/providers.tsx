"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { WalletProvider } from "./wallet-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange>
      <WalletProvider>{children}</WalletProvider>
    </ThemeProvider>
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="light"
    //   enableSystem
    //   disableTransitionOnChange>
    //   {children}
    // </ThemeProvider>
  );
};
