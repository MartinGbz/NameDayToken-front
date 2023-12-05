"use client";

import { Button } from "@/components/ui/button";
import { BiCoin } from "react-icons/bi";
import { Contract, EnsName, EnsNamesData } from "@/types";
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
import { useIsDay } from "@/hooks/use-is-day";
import { useEns } from "@/hooks/use-ens";
import { EnsNamesCombobox } from "./ens-names-combobox";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

interface MintProps {
  address: Address;
  token: Contract;
  tokenData: any;
  tokenTimestamp: bigint;
  tokenBaseTimestamp: bigint;
}

export const Mint = ({
  address,
  token,
  tokenData,
  tokenTimestamp,
  tokenBaseTimestamp,
}: MintProps) => {
  const [ensName, setEnsName] = useState<EnsName | undefined>(undefined);
  const [ensNames, setEnsNames] = useState<EnsName[]>([]);

  const isDay = useIsDay(
    BigInt(1701727200) * BigInt(1000),
    tokenBaseTimestamp * BigInt(1000)
  );

  const {
    data: mintPerUserPerYear,
    isError: mintPerUserPerYearError,
    isLoading: mintPerUserPerYearLoading,
  } = useContractRead({
    address: token.address,
    abi: token.ABI,
    functionName: "mintPerUserPerYear",
  });

  const {
    data: hasMinted,
    isError: hasMintedError,
    isLoading: hasMintedLoading,
    refetch: hasMintedRefetch,
  } = useContractRead({
    address: token.address,
    abi: token.ABI,
    functionName: "hasMinted",
    args: [new Date().getFullYear(), ensName?.value],
    enabled: false,
  });

  const { data } = useEns(address);

  useEffect(() => {
    if (!data) return;
    console.log("data not null");
    setEnsNames(() => {
      const ensNamesData = data as EnsNamesData;
      const ensNames = ensNamesData.account.wrappedDomains.map(
        (wrappedDomain) => {
          return {
            label: wrappedDomain.domain.name,
            value: wrappedDomain.domain.labelName,
          };
        }
      );
      return ensNames;
    });
    hasMintedRefetch();
  }, [data, hasMintedRefetch]);

  useEffect(() => {
    setEnsName(ensNames[0]);
  }, [ensNames]);

  useEffect(() => {
    if (ensName) {
      hasMintedRefetch();
      console.log("refetch");
      console.log(new Date().getFullYear(), ensName?.value);
    }
  }, [ensName, hasMintedRefetch]);

  console.log(ensName?.value);
  console.log({ hasMinted });

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
              Choose an ENS and mint your yearly{" "}
              {Number(
                BigInt(mintPerUserPerYear as unknown as bigint) /
                  BigInt(10 ** 18)
              )}{" "}
              ${tokenData.symbol}
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="ensName">ENS name</Label>
          <EnsNamesCombobox
            ensNames={ensNames}
            onChange={(ensName) => setEnsName(ensName)}
          />
          <Button disabled={!isDay}>
            <BiCoin className="text-lg mr-1" />
            Mint
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
