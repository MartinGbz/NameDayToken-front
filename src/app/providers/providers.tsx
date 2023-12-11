"use client";

import { ThemeProvider } from "./theme-provider";
import { WalletProvider } from "./wallet-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WalletProvider>
    </ThemeProvider>
  );
};
