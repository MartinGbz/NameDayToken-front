"use client";

import {
  Address,
  useAccount,
  useBalance,
  useContractReads,
  useToken,
} from "wagmi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TokenStats } from "./token-stats/token-stats";
import { Mint } from "./mint/mint";

import { nameDayTokenABI } from "@/namedaytoken-abi";
import { useState } from "react";

interface DashboardProps {
  tokenAddress: Address;
  chainId: number;
}

export const Dashboard = ({ tokenAddress, chainId }: DashboardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { address, isConnected } = useAccount();

  const {
    data: tokenBalanceData,
    isError,
    isLoading,
    refetch: refetchBalance,
  } = useBalance({
    address: address,
    token: tokenAddress,
    chainId: chainId,
  });

  const {
    data: tokenData,
    isError: isTokenError,
    isLoading: isTokenLoading,
    refetch: refetchTokenData,
  } = useToken({
    address: tokenAddress,
  });

  const {
    data: nameDayTokenData,
    isError: nameDayTokenError,
    isLoading: nameDayTokenLoading,
  } = useContractReads({
    contracts: [
      {
        address: tokenAddress,
        abi: nameDayTokenABI,
        functionName: "nameDayTimestamp",
      } as const,
      {
        address: tokenAddress,
        abi: nameDayTokenABI,
        functionName: "baseTimestamp",
      } as const,
      {
        address: tokenAddress,
        abi: nameDayTokenABI,
        functionName: "dayName",
      } as const,
    ],
    select: (fetched) => {
      if (!fetched[0].result || !fetched[1].result || !fetched[2].result)
        return null;
      return {
        tokenTimestamp: fetched[0].result,
        tokenBaseTimestamp: fetched[1].result,
        dayName: fetched[2].result,
      };
    },
  });

  return (
    <div className="grid grid-cols-2 grid-row-2 gap-2">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Your profile infos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-medium md:text-lg">
            <span>My Balance: </span>
            <span className="text-green-500">
              {tokenBalanceData?.formatted.substring(0, 6)}
            </span>
            <span>{" $" + tokenBalanceData?.symbol}</span>
          </div>
        </CardContent>
      </Card>
      {address && nameDayTokenData && tokenData && (
        <Mint
          address={address}
          tokenAddress={tokenAddress}
          tokenData={tokenData}
          nameDayTokenData={nameDayTokenData}
          tokensMinted={() => {
            refetchBalance();
            refetchTokenData();
            setDialogOpen(true);
          }}
        />
      )}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Token infos</CardTitle>
          <CardDescription>Token stats</CardDescription>
        </CardHeader>
        <CardContent>
          {tokenData && tokenBalanceData && nameDayTokenData && (
            <TokenStats
              tokenData={tokenData}
              nameDayTokenBalanceData={tokenBalanceData}
              nameDayTokenData={nameDayTokenData}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
