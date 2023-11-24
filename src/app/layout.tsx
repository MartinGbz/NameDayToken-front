import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
// import { Providers } from "./providers/providers";
import { Footer } from "@/components/footer/footer";
import { WalletProvider } from "./providers/wallet-provider";
import { Providers } from "./providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NameDayToken",
  description: "Mint your NameDayToken",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Providers> */}
      <body className={inter.className}>
        {/* <WalletProvider> */}
        <Providers>
          <div className="h-screen w-screen flex flex-col justify-between text-black dark:text-white">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
        {/* </WalletProvider> */}
      </body>
      {/* </Providers> */}
    </html>
  );
}
