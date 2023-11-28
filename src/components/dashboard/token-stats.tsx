"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { Countdown } from "./countdown";
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
  const { percentage, time } = useCountdown(timestamps, () => {
    console.log("FINISHED");
    setCountdownEnd(true);
  });

  console.log("percentage", percentage);
  console.log("time", time);
  console.log("################ countdownEnd", countdownEnd);

  return (
    <div>
      <div className="font-medium md:text-lg">
        <span>Total supply: </span>
        <span>
          {nameDayTokenData.totalSupply.formatted}{" "}
          {" $" + nameDayTokenBalanceData.symbol}
        </span>
      </div>
      {!countdownEnd && percentage > 0 && percentage !== 100 && (
        <div className="font-medium md:text-lg space-y-2">
          <span>Next mint: </span>
          {time && <Countdown currentTime={time} />}
          <Progress value={percentage} />
        </div>
      )}
      {countdownEnd && (
        <div className="font-medium md:text-lg space-y-2">
          <span>Next mint: </span>
          <span className="text-green-500"> in-day</span>
          <Progress value={percentage} />
        </div>
      )}
    </div>
  );
};
