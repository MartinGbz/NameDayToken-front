"use client";

import { useCountdownAndPercentage } from "@/hooks/use-countdown-and-percentage";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";

interface TokenStatsProps {
  tokenTimestampData: any;
  tokenBaseTimestampData: any;
  nameDayTokenData: any;
  nameDayTokenBalanceData: any;
}

export const TokenStats = ({
  tokenTimestampData,
  tokenBaseTimestampData,
  nameDayTokenData,
  nameDayTokenBalanceData,
}: TokenStatsProps) => {
  const { percentage, cycleTime, dayTime, isDay } = useCountdownAndPercentage(
    // tokenTimestampData * BigInt(1000),
    // tokenBaseTimestampData * BigInt(1000)
    // BigInt(1543499230 * 1000),
    // BigInt(1543411150 * 1000)
    BigInt(1543492530 * 1000),
    BigInt(1543411150 * 1000)
  );

  // useEffect(() => {
  //   console.log("Component is mounted");
  //   // This function will be called when the component unmounts
  //   return () => {
  //     console.log("Component is unmounting...");
  //     // Perform cleanup operations here
  //   };
  // }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  // console.log("render tokenStats");

  return (
    <div>
      <div className="font-medium md:text-lg">
        <span>Total supply: </span>
        <span>
          {nameDayTokenData.totalSupply.formatted}{" "}
          {" $" + nameDayTokenBalanceData.symbol}
        </span>
      </div>
      {!isDay && (
        <div className="font-medium md:text-lg space-y-2">
          <span>Next mint: </span>
          {cycleTime && (
            <span className={"text-red-500"}>
              {cycleTime.days} : {cycleTime.hours} : {cycleTime.minutes} :{" "}
              {cycleTime.seconds}
            </span>
          )}
          {percentage && <Progress value={percentage} />}
        </div>
      )}
      {isDay && (
        <div className="font-medium md:text-lg space-y-2">
          <span>Next mint: </span>
          {dayTime && (
            <span className="text-green-500">
              {dayTime.hours} : {dayTime.minutes} : {dayTime.seconds}
            </span>
          )}
          {percentage && <Progress value={percentage} />}
        </div>
      )}
    </div>
  );
};
