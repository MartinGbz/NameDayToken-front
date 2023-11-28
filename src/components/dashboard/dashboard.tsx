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
import { useEffect, useMemo } from "react";
import { cycleProgression } from "./cycle-progression";
// import { useCycleProgression } from "@/hooks/use-cycle-progression";

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
      return cycleProgression(BigInt(1701188400));
      // return cycleProgression(tokenTimestampData as unknown as bigint);
    }
    // else {
    //   return {
    //     // percentage: -1,
    //     // sliceCycleMising: 0,
    //     previousNameDayTimestamp: BigInt(0),
    //     nextNameDayTimestamp: BigInt(0),
    //   };
    // }
  }, [tokenTimestampData]);

  // console.log("percentage", percentage);
  // console.log("sliceCycleMising", sliceCycleMising);
  // console.log("****timestamps", timestamps);

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
              // percentage={percentage}
              // sliceCycleMising={sliceCycleMising}
              timestamps={timestamps}
              nameDayTokenData={tokenData}
              nameDayTokenBalanceData={tokenBalanceData}
              // nameDayTokenTimestamp={BigInt(1701182400) as unknown as bigint}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
