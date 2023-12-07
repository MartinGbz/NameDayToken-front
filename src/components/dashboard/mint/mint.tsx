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
import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";

import { nameDayTokenABI } from "@/namedaytoken-abi";

import { toast } from "sonner";

import ReactCanvasConfetti from "react-canvas-confetti";

interface MintProps {
  address: Address;
  tokenAddress: Address;
  tokenData: FetchTokenResult;
  nameDayTokenData: NameDayTokenData;
}

export const Mint = ({
  address,
  tokenAddress,
  tokenData,
  nameDayTokenData,
}: MintProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confettisRun, setConfettisRun] = useState<boolean>(false);

  const [ensName, setEnsName] = useState<EnsName>();
  const [ensNames, setEnsNames] = useState<EnsName[]>([]);

  const { chain, chains } = useNetwork();

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
  });

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: txBroadcasted?.hash,
    onSuccess(data) {
      if (data.status == "success") {
        toast.success("Minted!");
        setConfettisRun(true);
      }
    },
  });

  useEffect(() => {
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

  useEffect(() => {
    if (confettisRun) {
      setConfettisRun(false);
    }
  }, [confettisRun]);

  return (
    <div className="relative flex items-center justify-center flex-col">
      <ReactCanvasConfetti
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
        particleCount={150}
        spread={120}
        ticks={300}
        startVelocity={90}
        fire={confettisRun}
        origin={{ x: 0.5, y: 0.7 }}
      />
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
            onClick={() =>
              write({
                args: [ensName?.value ?? ""],
              })
            }>
            <BiCoin className="text-lg mr-1" />
            Mint
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
