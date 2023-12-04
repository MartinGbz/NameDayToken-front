"use client";

import { Button } from "@/components/ui/button";
import { BiCoin } from "react-icons/bi";
import { Contract } from "@/types";
import { Address } from "viem";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIsDay } from "@/hooks/use-is-day";
import { useEns } from "@/hooks/use-ens";

interface MintProps {
  // isDay: boolean;
  address: Address;
  token: Contract;
  tokenData: any;
  tokenTimestamp: bigint;
  tokenBaseTimestamp: bigint;
}

export const Mint = ({
  // isDay,
  address,
  token,
  tokenData,
  tokenTimestamp,
  tokenBaseTimestamp,
}: MintProps) => {
  const isDay = useIsDay(
    tokenTimestamp * BigInt(1000),
    tokenBaseTimestamp * BigInt(1000)
  );

  const { data } = useEns(address);

  console.log("---data", data);

  // const {
  //   data: hasMinted,
  //   isError: tokenBaseTimestampError,
  //   isLoading: tokenBaseTimestampLoading,
  // } = useContractRead({
  //   address: token.address,
  //   abi: token.ABI,
  //   functionName: "hasMinted",
  //   args: [new Date().getFullYear(), ],
  // });

  return (
    <div className="relative flex items-center justify-center flex-col">
      {isDay && (
        <div className="absolute top-0 flex items-center space-x-1 p-1 border-2 border-red-400 rounded">
          <div className="rounded-full w-3 h-3 bg-red-400 animate-pulse"></div>
          <span className="text-red-400 font-semibold">Minting live</span>
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={!isDay} className="md:w-52 h-16 space-x-1">
            <BiCoin className="text-lg mr-1" />
            Mint
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mint {tokenData.name}</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="ensName">ENS name</Label>
          <Input id="ensName" />
          <Button disabled={!isDay}>
            <BiCoin className="text-lg mr-1" />
            Mint
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
