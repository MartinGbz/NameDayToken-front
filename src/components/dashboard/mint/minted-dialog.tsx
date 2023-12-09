"use client";

import Image from "next/image";
import lensIconBlack from "@/medias/icons/lens-icon-T-Black.svg";
import lensIconWhite from "@/medias/icons/lens-icon-T-White.svg";
import farcasterIconWhite from "@/medias/icons/farcaster-icon-white.svg";
import farcasterIconBlack from "@/medias/icons/farcaster-icon-black.svg";
import { FaXTwitter } from "react-icons/fa6";
import { ExternalLink, Share2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FetchTokenResult } from "@/types";
import { useTheme } from "next-themes";

export const preWrittenPostXSlug = "http://twitter.com/intent/tweet?text=";
export const preWrittenPostLensSlug = "https://lenster.xyz/?text=";
export const preWrittenPostFarcasterSlug =
  "https://warpcast.com/~/compose?text=";

interface MintedDialogProps {
  open: boolean;
  mintPerUserPerYear: number;
  tokenData: FetchTokenResult;
  setDialogMintedOpen: (open: boolean) => void;
  txUrl?: string;
}

export function MintedDialog({
  open,
  mintPerUserPerYear,
  tokenData,
  setDialogMintedOpen,
  txUrl,
}: MintedDialogProps) {
  const { theme, systemTheme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={setDialogMintedOpen}>
      <DialogContent hasBackground={false}>
        <DialogHeader>
          <DialogTitle className="text-center mb-7">Congrats! 🎉</DialogTitle>
          <span className="text-center text-8xl">🥳</span>
        </DialogHeader>
        <div className="text-center">
          You successfully minted{" "}
          <span className="text-green-500">{mintPerUserPerYear}</span> $
          {tokenData.symbol}
          {txUrl && (
            <div className="flex justify-center">
              <a href={txUrl} target="_blank" className="w-fit h-fit">
                <ExternalLink className="inline h-[1.2rem] w-[1.2rem]" />
                tx
              </a>
            </div>
          )}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-fit justify-self-end">
              {" "}
              <Share2 className="h-[1.2rem] w-[1.2rem] mr-1" /> Share{" "}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div className="flex flex-row items-center gap-4">
              <a
                href={
                  preWrittenPostXSlug +
                  "I%27ve+just+minted+" +
                  mintPerUserPerYear +
                  "+%24" +
                  tokenData.symbol +
                  "+tokens+on+namedaytoken.vercel.app+%F0%9F%A5%B3"
                }
                target="_blank">
                <FaXTwitter className="text-black dark:text-white w-4 h-4 md:w-5 md:h-5 mr-1" />
              </a>
              <a
                href={
                  preWrittenPostLensSlug +
                  "I%27ve+just+minted+" +
                  mintPerUserPerYear +
                  "+%24" +
                  tokenData.symbol +
                  "+tokens+on+namedaytoken.vercel.app+%F0%9F%A5%B3"
                }
                target="_blank">
                {(theme == "dark" ||
                  (theme == "system" && systemTheme == "dark")) && (
                  <Image
                    src={lensIconWhite}
                    alt={"lens icon"}
                    className="w-7 h-7 md:w-9 md:h-9"
                  />
                )}
                {(theme == "light" ||
                  (theme == "system" && systemTheme == "light")) && (
                  <Image
                    src={lensIconBlack}
                    alt={"lens icon"}
                    className="w-7 h-7 md:w-9 md:h-9"
                  />
                )}
              </a>
              <a
                href={
                  preWrittenPostFarcasterSlug +
                  "I%27ve+just+minted+" +
                  mintPerUserPerYear +
                  "+%24" +
                  tokenData.symbol +
                  "+tokens+on+namedaytoken.vercel.app+%F0%9F%A5%B3"
                }
                target="_blank">
                {(theme == "dark" ||
                  (theme == "system" && systemTheme == "dark")) && (
                  <Image
                    src={farcasterIconWhite}
                    alt={"farcaster icon"}
                    className="w-5 h-5 md:w-6 md:h-6 mr-1"
                  />
                )}
                {(theme == "light" ||
                  (theme == "system" && systemTheme == "light")) && (
                  <Image
                    src={farcasterIconBlack}
                    alt={"farcaster icon"}
                    className="w-5 h-5 md:w-6 md:h-6 mr-1"
                  />
                )}
              </a>
            </div>
          </PopoverContent>
        </Popover>
      </DialogContent>
    </Dialog>
  );
}
