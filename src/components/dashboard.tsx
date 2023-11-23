"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Address,
  useAccount,
  useBalance,
  useContractRead,
  useNetwork,
  useToken,
} from "wagmi";
import { Progress } from "./ui/progress";
import { Contract } from "@/types";

interface DashboardProps {
  token: Contract;
  chainId: number;
}

const DAY_IN_SECONDS = 86400;

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

  // const [tokenTimestamp, setTokenTimestamp] = useState<number | undefined>();
  const [progressionDate, setProgressionDate] = useState<number | undefined>();

  const baseYear = 2023;

  // function _isRightDay() {
  //   const tokenTimestamp: bigint = BigInt(1700822098);
  //   const now = BigInt(Math.floor(Date.now() / 1000));
  //   const yearsPassed = (now - tokenTimestamp) / BigInt(365 * DAY_IN_SECONDS);
  //   // if not in date => nextDayTimestamp=_nameDayTimestamp
  //   // if in date => nextDayTimestamp=_nameDayTimestamp+yearsPassed*YEAR_IN_SECONDS
  //   let nextDayTimestamp =
  //     tokenTimestamp + yearsPassed * BigInt(365 * DAY_IN_SECONDS);

  //   const currentYear = BigInt(baseYear) + yearsPassed;

  //   // add leap days
  //   // doesn't take into account the current year because it's not finished yet
  //   for (let i = baseYear; i < currentYear; i++) {
  //     if (isLeap(i)) {
  //       nextDayTimestamp += BigInt(DAY_IN_SECONDS);
  //     }
  //   }

  //   let percentage;
  //   if (
  //     now >= nextDayTimestamp &&
  //     now < nextDayTimestamp + BigInt(DAY_IN_SECONDS)
  //   ) {
  //     percentage = 0;
  //   } else if(now  nextDayTimestamp) {
  //     percentage = 100;
  //   } else {
  //     percentage = 0;
  //   }

  //   // return (
  //   // now >= nextDayTimestamp &&
  //   // now < nextDayTimestamp + BigInt(DAY_IN_SECONDS)
  //   // );
  // }

  // function isLeap(year: number) {
  //   if (year % 4 != 0) {
  //     return false;
  //   } else if (year % 100 != 0) {
  //     return true;
  //   } else if (year % 400 == 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  useEffect(() => {
    console.log("useContractRead");
    // console.log(tokenTimestampData, tokenTimestampError, tokenTimestampLoading);
    if (tokenTimestampData) {
      const tokenTimestamp: bigint = tokenTimestampData as unknown as bigint;
      // const tokenTimestamp: bigint = BigInt(1762770898);
      // const tokenTimestamp: bigint = BigInt(1700476498);
      // const tokenTimestamp: bigint = BigInt(1700908498);
      // console.log(tokenTimestampData[0]);
      // setTokenTimestamp(tokenTimestampData);
      // const now = BigInt(Math.floor(Date.now() / 1000));
      const now = BigInt(1700735698);
      console.log(now);
      console.log(tokenTimestamp);
      console.log(tokenTimestamp - now);

      // const currentYear = now / BigInt(365 * DAY_IN_SECONDS);
      // const tokenStartYear = tokenTimestamp / BigInt(365 * DAY_IN_SECONDS);
      // console.log(currentYear);
      // console.log(tokenStartYear);

      // let newTimestamp = tokenTimestamp;
      // if (currentYear > tokenStartYear) {
      //   const diff = currentYear - tokenStartYear;
      //   newTimestamp = tokenTimestamp + diff * BigInt(DAY_IN_SECONDS);
      // }

      let newTimestamp = tokenTimestamp;
      let percentage: number | undefined;

      if (tokenTimestamp + BigInt(DAY_IN_SECONDS) < now) {
        // if we are in the future: we compute the correct timestamp of our current year (or "cycle")
        // const diff = now / tokenTimestamp;
        // console.log({ diff });
        // newTimestamp = tokenTimestamp + diff * BigInt(365 * DAY_IN_SECONDS);
        const yearsPassed =
          (now - tokenTimestamp) / BigInt(365 * DAY_IN_SECONDS);
        console.log({ yearsPassed });
        // + 1 because we want the next year
        newTimestamp =
          tokenTimestamp +
          (yearsPassed + BigInt(1)) * BigInt(365 * DAY_IN_SECONDS);
        console.log({ newTimestamp });
      } else if (now < tokenTimestamp) {
        // if we are in the past: we compute the correct timestamp of our current year (or "cycle")
        const missingYears =
          (tokenTimestamp - now) / BigInt(365 * DAY_IN_SECONDS);
        if (missingYears >= 1) {
          console.log({ missingYears });
          return;
        }
        newTimestamp = tokenTimestamp;
      } else if (
        now >= tokenTimestamp &&
        now < tokenTimestamp + BigInt(DAY_IN_SECONDS)
      ) {
        console.log("IN DATE");
        percentage = -1;
        setProgressionDate(percentage);
        return;
      } else {
        console.log("impossible");
        return;
      }

      console.log({ now });
      console.log({ newTimestamp });

      const previousTimestamp = newTimestamp - BigInt(365 * DAY_IN_SECONDS);

      const ab = now - previousTimestamp;

      const progress = Number(ab) / (365 * DAY_IN_SECONDS);

      percentage = progress * 100;

      console.log({ previousTimestamp });
      console.log({ ab });
      console.log({ progress });
      console.log({ percentage });

      setProgressionDate(percentage);

      // if (now < newTimestamp) {
      //   console.log("BEFORE DATE");
      //   // const diff = newTimestamp / now + BigInt(1); // without +1 the multiplication will be of 1 if there is 1 year of difference
      //   // console.log({ diff });
      //   // percentage = (newTimestamp - now) / BigInt(365 * DAY_IN_SECONDS);
      //   // const a = Number(newTimestamp) - Number(now);
      //   // const b = 365 * DAY_IN_SECONDS;
      //   // const c = a / b;
      //   // const d = c * 100;
      //   // console.log({ a });
      //   // console.log({ b });
      //   // console.log({ c });
      //   // console.log({ d });
      //   // const prevTimestamp = tokenTimestamp - diff * BigInt(365 * DAY_IN_SECONDS);
      //   const prevTimestamp = tokenTimestamp;
      //   const a =
      //     Number(now - prevTimestamp) / Number(newTimestamp - prevTimestamp);
      //   const b = a * 100;
      //   console.log({ a });
      //   console.log({ b });
      //   percentage = b;
      // } else if (
      //   newTimestamp - now < 0 &&
      //   newTimestamp - now > -BigInt(DAY_IN_SECONDS)
      // ) {
      //   console.log("IN DATE");
      //   percentage = 0;
      // } else {
      //   console.log("impossible");
      // }

      // console.log(newTimestamp);
      // console.log(percentage);
      setProgressionDate(percentage);
    }
    // console.log(Math.floor(Date.now() / 1000));
  }, [tokenTimestampData, tokenTimestampError, tokenTimestampLoading]);

  useEffect(() => {
    // console.log("useToken");
    // console.log(tokenData, isTokenError, isTokenLoading);
  }, [tokenData, isTokenError, isTokenLoading]);

  useEffect(() => {
    // console.log("useBalance");
    // console.log(tokenBalanceData);
    // console.log(isError);
    // console.log(isLoading);
  }, [tokenBalanceData, isError, isLoading]);

  useEffect(() => {
    // console.log("useAccount");
    // console.log(address, isConnected);
  }, [address, isConnected]);

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col space-y-4">
        <div className="font-medium md:text-xl">
          {" "}
          My Balance:{" "}
          <span className="font-semibold text-green-500">
            {tokenBalanceData?.formatted.substring(0, 6)}
          </span>
          <span className="font-semibold">
            {" $" + tokenBalanceData?.symbol}
          </span>
        </div>
        <div className="font-medium md:text-xl">
          {" "}
          Total supply:{" "}
          <span className="font-semibold">
            {tokenData?.totalSupply.formatted}
          </span>
        </div>
        {progressionDate && progressionDate > 0 && (
          <div className="font-medium md:text-xl space-y-2">
            {" "}
            Next day: <span className="text-red-500 font-semibold">{290}j</span>
            <Progress value={progressionDate} />
          </div>
        )}
        {progressionDate && progressionDate == -1 && (
          <div className="font-medium md:text-xl space-y-2">
            {" "}
            Next day:
            <span className="text-green-500 font-semibold"> In Day</span>
            <Progress value={100} />
          </div>
        )}
      </div>
      <div className="flex flex-col items-end">
        <div className="flex flex-col w-fit space-y-4 items-end">
          <Button> Mint </Button>
        </div>
      </div>
    </div>
  );
};
