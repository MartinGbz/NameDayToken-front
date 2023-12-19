import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "./providers/providers";
import { Toaster } from "sonner";
import { getTokens } from "@/lib/tokens";

const inter = Inter({ subsets: ["latin"] });

const WEBSITE_DOMAIN = "https://name-day-token.vercel.app";

export const metadata: Metadata = {
  title: "NameDayToken",
  description: "Mint your NameDayToken",
  openGraph: {
    title: "NameDayToken",
    description: "Mint your NameDayToken",
    type: "website",
    images: [
      {
        url: WEBSITE_DOMAIN + "/og",
      },
    ],
    url: WEBSITE_DOMAIN,
  },
  twitter: {
    title: "NameDayToken",
    description: "Mint your NameDayToken",
    creator: "@0xMartinGbz",
    images: [WEBSITE_DOMAIN + "/og"],
  },
  metadataBase: new URL(WEBSITE_DOMAIN ?? "http://localhost:3000"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens = await getTokens();
  console.log("=====> tokens");
  console.log(tokens);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="h-screen w-screen flex flex-col justify-between text-black dark:text-white">
            {tokens && <Header tokens={tokens} />}
            <main className="h-full w-full pr-4 pl-4 p-b-4">{children}</main>
            <Footer />
          </div>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
