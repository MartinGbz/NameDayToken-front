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

import Confetti from "react-confetti";
import ReactCanvasConfetti from "react-canvas-confetti";

import { use, useEffect, useState } from "react";

interface DashboardProps {
  tokenAddress: Address;
  chainId: number;
}

export const Dashboard = ({ tokenAddress, chainId }: DashboardProps) => {
  const { address, isConnected } = useAccount();

  const [run, setRun] = useState<boolean>(false);

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
        functionName: "getBaseTimestamp",
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

  useEffect(() => {
    if (run) {
      setRun(false);
    }
  }, [run]);

  return (
    <div className="grid grid-cols-2 grid-row-2 gap-2">
      {/* <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={run ? 2000 : 0}
        // recycle={false}
      /> */}
      <ReactCanvasConfetti
        // set the styles as for a usual react component
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
        // set the class name as for a usual react component
        className={"yourClassName"}
        particleCount={125}
        // spread={270}
        spread={120}
        ticks={300}
        startVelocity={70}
        fire={run}
        origin={{ x: 0.5, y: 0.5 }}
        // drift={10}
        // set the callback for getting instance. The callback will be called after initialization ReactCanvasConfetti component
      />

      <button
        onClick={() => {
          // console.log("click");
          // console.log(run);
          // setRun(true);
          // setTimeout(() => {
          //   setRun(false);
          // }, 1500);

          setRun(true);
          console.log(run);
        }}>
        confetis
      </button>
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
          onMint={() => {
            refetchBalance();
            setRun(true);
            // setTimeout(() => {
            //   setRun(false);
            // }, 2000);
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
