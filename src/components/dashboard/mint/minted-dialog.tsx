"use client";

import Image from "next/image";
import lensIconBlack from "@/medias/icons/lens-icon-T-Black.svg";
import lensIconWhite from "@/medias/icons/lens-icon-T-White.svg";
import farcasterIconWhite from "@/medias/icons/farcaster-icon-white.svg";
import farcasterIconBlack from "@/medias/icons/farcaster-icon-black.svg";
import { IoLogoGithub } from "react-icons/io5";
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
import { use, useEffect, useState } from "react";

interface MintedDialogProps {
  open: boolean;
  mintPerUserPerYear: bigint;
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
  return (
    <Dialog open={open} onOpenChange={setDialogMintedOpen}>
      <DialogContent hasBackground={false}>
        <DialogHeader>
          <DialogTitle className="text-center mb-7">Congrats! 🎉</DialogTitle>
          <span className="text-center text-8xl">🥳</span>
        </DialogHeader>

        <div className="text-center">
          You successfully minted{" "}
          <span className="text-green-500">
            {Number(BigInt(mintPerUserPerYear) / BigInt(10 ** 18))}
          </span>{" "}
          ${tokenData.symbol}
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
              <FaXTwitter className="text-black dark:text-white w-4 h-4 md:w-5 md:h-5 mr-1" />
              <Image
                src={lensIconWhite}
                alt={"lens icon"}
                className="w-7 h-7 md:w-9 md:h-9"
              />
              <Image
                src={farcasterIconWhite}
                alt={"farcaster icon"}
                className="w-5 h-5 md:w-6 md:h-6 mr-1"
              />
            </div>
          </PopoverContent>
        </Popover>
      </DialogContent>
    </Dialog>
  );
}
