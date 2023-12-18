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
import { Skeleton } from "../ui/skeleton";

interface DashboardProps {
  tokenAddress: Address;
}

export const Dashboard = ({ tokenAddress }: DashboardProps) => {
  const { address, isConnected } = useAccount();

  const {
    data: tokenBalanceData,
    isError,
    isLoading: isTokenBalanceDataLoading,
    refetch: refetchBalance,
  } = useBalance({
    address: address,
    token: tokenAddress,
  });

  const {
    data: tokenData,
    isError: isTokenDataError,
    isLoading: isTokenDataLoading,
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
      {((isTokenBalanceDataLoading && !tokenBalanceData) ||
        (!isTokenBalanceDataLoading && tokenBalanceData)) && (
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>Your profile infos</CardDescription>
          </CardHeader>
          <CardContent>
            {!isTokenBalanceDataLoading && tokenBalanceData && (
              <div className="font-medium md:text-lg flex flex-row items-center">
                <span className="mr-1">My Balance: </span>
                <div>
                  <span className="text-green-500">
                    {tokenBalanceData.formatted.substring(0, 6)}
                  </span>
                  <span>{" $" + tokenBalanceData.symbol}</span>
                </div>
              </div>
            )}
            {isTokenBalanceDataLoading && <Skeleton className="h-6 w-60" />}
          </CardContent>
        </Card>
      )}

      {address && nameDayTokenData && tokenData && (
        <Mint
          address={address}
          tokenAddress={tokenAddress}
          tokenData={tokenData}
          nameDayTokenData={nameDayTokenData}
          tokensMinted={() => {
            refetchBalance();
            refetchTokenData();
          }}
        />
      )}
      {!address && !tokenBalanceData && (
        <Card className="col-span-2 text-base md:text-xl py-6 pl-6">
          <span>Connect your wallet to mint tokens</span>
        </Card>
      )}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Token infos</CardTitle>
          <CardDescription>Token stats</CardDescription>
        </CardHeader>
        <CardContent>
          <TokenStats
            tokenData={tokenData}
            nameDayTokenData={nameDayTokenData}
            isNameDayTokenDataLoading={nameDayTokenLoading}
            isTokenDataLoading={isTokenDataLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};
