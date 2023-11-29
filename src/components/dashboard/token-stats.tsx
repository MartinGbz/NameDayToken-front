"use client";

import { useCountdownAndPercentage } from "@/hooks/use-countdown-and-percentage";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { TokenTimestamps } from "@/types";

interface TokenStatsProps {
  timestamps: TokenTimestamps;
  nameDayTokenData: any;
  nameDayTokenBalanceData: any;
}

export const TokenStats = ({
  timestamps,
  nameDayTokenData,
  nameDayTokenBalanceData,
}: TokenStatsProps) => {
  const [countdownEnd, setCountdownEnd] = useState(false);
  const { percentage, time } = useCountdownAndPercentage(timestamps, () => {
    setCountdownEnd(true);
  });

  console.log(timestamps);

  return (
    <div>
      <div className="font-medium md:text-lg">
        <span>Total supply: </span>
        <span>
          {nameDayTokenData.totalSupply.formatted}{" "}
          {" $" + nameDayTokenBalanceData.symbol}
        </span>
      </div>
      {!countdownEnd && (
        <div className="font-medium md:text-lg space-y-2">
          <span>Next mint: </span>
          {time && (
            <span className={"text-red-500"}>
              {time.years} : {time.months} : {time.days} : {time.hours} :{" "}
              {time.minutes} : {time.seconds}
            </span>
          )}
          {percentage > 0 && percentage !== 100 && (
            <Progress value={percentage} />
          )}
        </div>
      )}
      {countdownEnd && (
        <div className="font-medium md:text-lg space-y-2">
          <span>Next mint: </span>
          <span className="text-green-500"> in-day</span>
          {percentage > 0 && <Progress value={percentage} />}
        </div>
      )}
    </div>
  );
};
