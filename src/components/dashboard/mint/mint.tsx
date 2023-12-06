"use client";

import { Button } from "@/components/ui/button";
import { BiCoin } from "react-icons/bi";
import { EnsName, FetchTokenResult, NameDayTokenData } from "@/types";
import { Address } from "viem";
import { ExternalLink } from "lucide-react";

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
import { use, useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
  useWatchPendingTransactions,
} from "wagmi";

import { nameDayTokenABI } from "@/namedaytoken-abi";

import { toast } from "sonner";

interface MintProps {
  address: Address;
  tokenAddress: Address;
  tokenData: FetchTokenResult;
  nameDayTokenData: NameDayTokenData;
  onMint: () => void;
}

export const Mint = ({
  address,
  tokenAddress,
  tokenData,
  nameDayTokenData,
  onMint,
}: MintProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [ensName, setEnsName] = useState<EnsName>();
  const [ensNames, setEnsNames] = useState<EnsName[]>([]);

  const { chain, chains } = useNetwork();

  console.log(chain);
  console.log(chains);

  const isDay = useIsDay(
    nameDayTokenData.tokenTimestamp * BigInt(1000),
    nameDayTokenData.tokenBaseTimestamp * BigInt(1000)
  );

  const {
    data: mintPerUserPerYear,
    isError: mintPerUserPerYearError,
    isLoading: mintPerUserPerYearLoading,
  } = useContractRead({
    address: tokenAddress,
    abi: nameDayTokenABI,
    functionName: "mintPerUserPerYear",
  });

  const {
    data: hasMinted,
    isError: hasMintedError,
    isLoading: hasMintedLoading,
    refetch: hasMintedRefetch,
  } = useContractRead({
    address: tokenAddress,
    abi: nameDayTokenABI,
    functionName: "hasMinted",
    args: [BigInt(new Date().getFullYear()), ensName?.value ?? ""],
    enabled: false,
  });

  const { data: EnsOwnedByAccount } = useEns(address);

  useEffect(() => {
    if (!EnsOwnedByAccount) return;
    const ensNames = EnsOwnedByAccount.account.wrappedDomains
      .map((wrappedDomain) => {
        return {
          label: wrappedDomain.domain.name,
          value: wrappedDomain.domain.labelName,
        } as EnsName;
      })
      .filter((ensName) => ensName.label.includes(nameDayTokenData.dayName));
    setEnsNames(ensNames);
    setEnsName(ensNames[0]);
  }, [EnsOwnedByAccount, nameDayTokenData.dayName]);

  useEffect(() => {
    if (ensName) {
      hasMintedRefetch();
    }
  }, [ensName, hasMintedRefetch]);

  const { data: txBroadcasted, write } = useContractWrite({
    address: tokenAddress,
    abi: nameDayTokenABI,
    functionName: "mint",
    // onSuccess: () => {
    //   console.log("success");
    //   console.log(isMinting);
    //   console.log(isMinted);
    //   console.log(txBroadcasted?.hash);
    //   toast.loading(
    //     <div className="flex flex-col space-y-1">
    //       <div>{"Minting..."}</div>
    //       <a
    //         href="youtube.com"
    //         target="_blank"
    //         className="flex flex-row items-center">
    //         <ExternalLink className="h-[1.2rem] w-[1.2rem]" />
    //         {txBroadcasted?.hash}
    //       </a>
    //     </div>,
    //     {
    //       style: {
    //         background: "hsl(var(--background))",
    //         borderColor: "gray",
    //         color: "hsl(var(--foreground))",
    //       },
    //     }
    //   );
    // },
  });

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: txBroadcasted?.hash,
    onSuccess(data) {
      if (data.status == "success") {
        toast.success("Minted!");
        onMint();
      }
    },
  });

  useEffect(() => {
    console.log(txBroadcasted?.hash);
    if (txBroadcasted?.hash) {
      setDialogOpen(false);
      toast.loading(
        <div className="flex flex-col space-y-1">
          <div>{"Minting..."}</div>
          {chain?.blockExplorers && (
            <a
              href={
                chain.blockExplorers.default.url + "/tx/" + txBroadcasted.hash
              }
              target="_blank"
              className="flex flex-row items-center">
              <ExternalLink className="h-[1.2rem] w-[1.2rem]" />
              {txBroadcasted?.hash}
            </a>
          )}
        </div>
      );
    }
  }, [chain?.blockExplorers, txBroadcasted?.hash]);

  return (
    <div className="relative flex items-center justify-center flex-col">
      {isDay && (
        <div className="absolute top-0 flex items-center space-x-1 p-1 border-2 border-red-400 rounded">
          <div className="rounded-full w-3 h-3 bg-red-400 animate-pulse"></div>
          <span className="text-red-400 font-semibold">Minting live</span>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button disabled={!isDay} className="md:w-52 space-x-1">
            <BiCoin className="text-lg mr-1" />
            Mint
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mint {tokenData.name}</DialogTitle>
            {mintPerUserPerYear !== undefined && (
              <DialogDescription>
                Choose an ENS and mint your yearly{" "}
                {Number(BigInt(mintPerUserPerYear) / BigInt(10 ** 18))} $
                {tokenData.symbol}
              </DialogDescription>
            )}
          </DialogHeader>
          <Label htmlFor="ensName">ENS name</Label>
          <EnsNamesCombobox
            ensNames={ensNames}
            onChange={(ensName) => setEnsName(ensName)}
          />
          <Button
            disabled={
              !isDay ||
              (hasMinted ? true : false) ||
              (ensName == undefined && !hasMinted)
            }
            onClick={
              () => {
                console.log(ensName?.value);
                write({
                  args: [ensName?.value ?? ""],
                });
              }
              // {
              //   setDialogOpen(false);
              //   toast.loading("Minting...\n\n tx: " + data?.hash);
              //   toast.loading(
              //     <div className="flex flex-col space-y-1">
              //       <div>{"Minting..."}</div>
              //       <a
              //         href="youtube.com"
              //         target="_blank"
              //         className="flex flex-row items-center">
              //         <ExternalLink className="h-[1.2rem] w-[1.2rem]" />
              //         {"0x123" + data?.hash}
              //       </a>
              //     </div>
              //   );
              //   // toast.loading(<div>A custom toast with default styling</div>);

              //   setTimeout(() => {
              //     // toast.success("Minted!");
              //   }, 2000);
              // }
            }>
            <BiCoin className="text-lg mr-1" />
            Mint
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
