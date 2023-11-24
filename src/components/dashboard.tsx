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
    const baseYear = new Date(Date.now()).getFullYear();
    const isBaseYearLeap = isLeap(baseYear);

    function isLeap(year: number) {
      if (year % 4 != 0) {
        return false;
      } else if (year % 100 != 0) {
        return true;
      } else if (year % 400 == 0) {
        return true;
      } else {
        return false;
      }
    }

    function addLeapDays(yearsToAdd: bigint, nextDayTimestamp: bigint) {
      let nextDayTimestampWithLeap = nextDayTimestamp;
      for (let i = baseYear; i < yearsToAdd; i++) {
        if (isLeap(i)) {
          nextDayTimestampWithLeap += DAY_IN_SECONDS;
        }
      }
      return nextDayTimestampWithLeap;
    }

    function getYearProgression(tokenTimestampData: bigint) {
      const tokenTimestamp: bigint = tokenTimestampData;
      const now = BigInt(Math.floor(Date.now() / 1000));
      let newTimestamp = tokenTimestamp;

      if (tokenTimestamp + DAY_IN_SECONDS < now) {
        // if we are in the future: we compute the correct timestamp of our current year (or "cycle")
        const yearsPassed = (now - tokenTimestamp) / YEAR_IN_SECONDS;
        // + 1 because we want the next year
        newTimestamp =
          tokenTimestamp + (yearsPassed + BigInt(1)) * YEAR_IN_SECONDS;
        newTimestamp = addLeapDays(yearsPassed + BigInt(1), newTimestamp);
      } else if (now < tokenTimestamp) {
        // if we are in the past: we compute the correct timestamp of our current year (or "cycle")
        const missingYears = (tokenTimestamp - now) / YEAR_IN_SECONDS;
        if (missingYears >= 1) {
          return;
        }
        newTimestamp = tokenTimestamp;
      } else if (
        now >= tokenTimestamp &&
        now < tokenTimestamp + DAY_IN_SECONDS
      ) {
        // if we are in the right day: we set directly a -1
        setPercentageCompleted(-1);
        return;
      } else {
        return;
      }

      const previousTimestamp = newTimestamp - YEAR_IN_SECONDS;
      const sliceYearCovered = now - previousTimestamp;
      // if the current year is a leap year, we add a day to the total number of days (otherwise we would have 365 days instead of 366)
      let newYearInSecond = yearInSecond;
      if (isBaseYearLeap) {
        newYearInSecond += dayInSecond;
      }
      const progress = Number(sliceYearCovered) / newYearInSecond;
      const percentage = progress * 100;
      setPercentageCompleted(percentage);

      const sliceYearMising = newTimestamp - now;
      const daysLeft = sliceYearMising / DAY_IN_SECONDS;
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
