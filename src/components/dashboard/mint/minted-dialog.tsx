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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FetchTokenResult } from "@/types";
import { use, useEffect, useState } from "react";

interface MintedDialogProps {
  open: boolean;
  mintPerUserPerYear: bigint;
  tokenData: FetchTokenResult;
  setDialogMintedOpen: (open: boolean) => void;
}

export function MintedDialog({
  open,
  mintPerUserPerYear,
  tokenData,
  setDialogMintedOpen,
}: MintedDialogProps) {
  // const [dialogMintedOpen, setDialogMintedOpen] = useState(true);

  // useEffect(() => {
  //   setDialogMintedOpen(open);
  // }, [open]);

  // useEffect(() => {
  //   open = dialogMintedOpen;
  // }, [dialogMintedOpen]);

  return (
    <Dialog open={open} onOpenChange={setDialogMintedOpen}>
      {/* <DialogOverlay className="fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" /> */}
      <DialogContent hasBackground={false}>
        <DialogHeader>
          <DialogTitle className="text-center mb-7">Congrats! 🎉</DialogTitle>
          <span className="text-center text-8xl">🥳</span>
          {/* {mintPerUserPerYear !== undefined && (
          <DialogDescription>
            You successfully minted{" "}
            {Number(BigInt(mintPerUserPerYear) / BigInt(10 ** 18))} $
            {tokenData.symbol}
          </DialogDescription>
        )} */}
        </DialogHeader>

        <div className="text-center">
          You successfully minted{" "}
          <span className="text-green-500">
            {Number(BigInt(mintPerUserPerYear) / BigInt(10 ** 18))}
          </span>{" "}
          ${tokenData.symbol}
          {/* {chain?.blockExplorers && txBroadcasted && (
        <a
          href={
            chain.blockExplorers.default.url + "/tx/" + txBroadcasted.hash
          }
          target="_blank"
          className="flex flex-row items-center">
          <ExternalLink className="h-[1.2rem] w-[1.2rem]" />
          tx
        </a>
      )} */}
          {/* <a
            href={
              "https://etherscan.io/" + "/tx/" + "0x12345678910111213141516"
            }
            target="_blank"
            className="	 w-fit h-fit">
            <ExternalLink className="inline h-[1.2rem] w-[1.2rem] mb-1 ml-4" />
            tx
          </a>
        </div> */}
          <div className="flex	justify-center">
            <a
              href={
                "https://etherscan.io/" + "/tx/" + "0x12345678910111213141516"
              }
              target="_blank"
              className="w-fit h-fit">
              <ExternalLink className="inline h-[1.2rem] w-[1.2rem]" />
              tx
            </a>
          </div>
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
