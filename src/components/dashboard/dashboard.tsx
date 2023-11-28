"use client";

import { useAccount, useBalance, useContractRead, useToken } from "wagmi";
import { Contract } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TokenStats } from "./token-stats";
import { MintingLive } from "./minting-live";
import { useMemo } from "react";
import { getPreviousAndNextTimestamp } from "@/utils/timestamps";

interface DashboardProps {
  token: Contract;
  chainId: number;
}

export const Dashboard = ({ token, chainId }: DashboardProps) => {
  const { address, isConnected } = useAccount();

  const {
    data: tokenBalanceData,
    isError,
    isLoading,
  } = useBalance({
    address: address,
    token: token.address,
    chainId: chainId,
  });

  const {
    data: tokenData,
    isError: isTokenError,
    isLoading: isTokenLoading,
  } = useToken({
    address: token.address,
  });

  const {
    data: tokenTimestampData,
    isError: tokenTimestampError,
    isLoading: tokenTimestampLoading,
  } = useContractRead({
    address: token.address,
    abi: token.ABI,
    functionName: "nameDayTimestamp",
  });

  const timestamps = useMemo(() => {
    if (tokenTimestampData) {
      return getPreviousAndNextTimestamp(BigInt(1701197940));
    }
  }, [tokenTimestampData]);

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
      {timestamps && <MintingLive timestamps={timestamps} />}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Token infos</CardTitle>
          <CardDescription>Token stats</CardDescription>
        </CardHeader>
        <CardContent>
          {tokenData && tokenBalanceData && timestamps && (
            <TokenStats
              timestamps={timestamps}
              nameDayTokenData={tokenData}
              nameDayTokenBalanceData={tokenBalanceData}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};