"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAccount, useBalance, useContractRead, useToken } from "wagmi";
import { Progress } from "./ui/progress";
import { Contract } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { BiCoin } from "react-icons/bi";

interface DashboardProps {
  token: Contract;
  chainId: number;
}

const dayInSecond = 86400;
const yearInSecond = 365 * dayInSecond;

const DAY_IN_SECONDS = BigInt(dayInSecond);
const YEAR_IN_SECONDS = BigInt(yearInSecond);

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

  const [percentageCompleted, setPercentageCompleted] = useState<number>();
  const [daysLeft, setDaysLeft] = useState<number | undefined>();

  useEffect(() => {
    function getDateFromOtherDate(date: Date, yearsToAdd: number) {
      return BigInt(
        new Date(
          new Date().getFullYear() + yearsToAdd,
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds()
        ).getTime()
      );
    }

    function getPreviousAndNextTimestamp(nameDayTimestamp: bigint) {
      const currentNameDayDate = new Date(Number(nameDayTimestamp) * 1000);
      const currentNameDayTimestamp = nameDayTimestamp * BigInt(1000);
      const currentTimestamp = BigInt(new Date().getTime());

      let nextNameDayTimestamp: bigint;
      let previousNameDayTimestamp: bigint;

      if (currentNameDayTimestamp + DAY_IN_SECONDS < currentTimestamp) {
        // if we are in the future: we compute the correct timestamp of our current "cycle"
        nextNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, 1);
        previousNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, 0);
      } else if (currentTimestamp < currentNameDayTimestamp) {
        // if we are in the past: we compute the correct timestamp of our current "cycle"
        nextNameDayTimestamp = currentNameDayTimestamp;
        // need to put the computation of new Date().getFullYear() minus baseTimeStamp.getFullYear() (from contract) instead of -1
        previousNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, -1);
      } else if (
        currentTimestamp >= currentNameDayTimestamp &&
        currentTimestamp < currentNameDayTimestamp + DAY_IN_SECONDS
      ) {
        // if we are in the right day: we set directly a -1
        setPercentageCompleted(-1);
        return null;
      } else {
        return null;
      }

      return [previousNameDayTimestamp, nextNameDayTimestamp];
    }

    function getYearProgression(nameDayTimestamp: bigint) {
      const currentTimestamp = BigInt(new Date().getTime());
      const timestamps = getPreviousAndNextTimestamp(nameDayTimestamp);

      if (timestamps == null) {
        return;
      }

      const [previousNameDayTimestamp, nextNameDayTimestamp] = timestamps;

      const sliceYearCovered = currentTimestamp - previousNameDayTimestamp;
      const totalDuration = nextNameDayTimestamp - previousNameDayTimestamp;
      const progress = Number(sliceYearCovered) / Number(totalDuration);
      const percentage = progress * 100;
      setPercentageCompleted(percentage);

      const sliceYearMising = nextNameDayTimestamp - currentTimestamp;
      const daysLeft = sliceYearMising / BigInt(1000) / DAY_IN_SECONDS;
      setDaysLeft(Number(daysLeft));
    }

    if (tokenTimestampData) {
      getYearProgression(tokenTimestampData as unknown as bigint);
    }
  }, [tokenTimestampData, tokenTimestampError, tokenTimestampLoading]);

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
      <div className="relative flex items-center justify-center flex-col">
        {percentageCompleted == -1 && (
          <div className="absolute top-0 flex items-center space-x-1 p-1 border-2 border-red-400 rounded">
            <div className="rounded-full w-3 h-3 bg-red-400 animate-pulse"></div>
            <span className="text-red-400 font-semibold">Minting live</span>
          </div>
        )}
        <Button
          disabled={percentageCompleted != -1}
          className="md:w-52 h-16 space-x-1">
          {" "}
          <BiCoin className="text-lg mr-1" />
          Mint{" "}
        </Button>
      </div>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Token infos</CardTitle>
          <CardDescription>Token stats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-medium md:text-lg">
            <span>Total supply: </span>
            <span>
              {tokenData?.totalSupply.formatted}{" "}
              {" $" + tokenBalanceData?.symbol}
            </span>
          </div>
          {percentageCompleted && daysLeft && percentageCompleted > 0 && (
            <div className="font-medium md:text-lg space-y-2">
              <span>Next mint: </span>
              <span className="text-red-500">{daysLeft} days</span>
              <Progress value={percentageCompleted} />
            </div>
          )}
          {percentageCompleted && percentageCompleted == -1 && (
            <div className="font-medium md:text-lg space-y-2">
              <span>Next mint: </span>
              <span className="text-green-500"> in-day</span>
              <Progress value={100} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
