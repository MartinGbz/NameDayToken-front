"use client";

import { useCountdownAndPercentage } from "@/hooks/use-countdown-and-percentage";
import { Progress } from "@/components/ui/progress";

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
  const { percentage, time, nameDayTime, isDay } = useCountdownAndPercentage(
    // tokenTimestampData,
    // tokenBaseTimestampData
    BigInt(1543499230),
    BigInt(1543411150)
  );

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
          {time && (
            <span className={"text-red-500"}>
              {time.years} : {time.months} : {time.days} : {time.hours} :{" "}
              {time.minutes} : {time.seconds}
            </span>
          )}
          {percentage && <Progress value={percentage} />}
        </div>
      )}
      {isDay && (
        <div className="font-medium md:text-lg space-y-2">
          <span>Next mint: </span>
          {nameDayTime && (
            <span className="text-green-500">
              {" "}
              {nameDayTime.years} : {nameDayTime.months} : {nameDayTime.days} :{" "}
              {nameDayTime.hours} : {nameDayTime.minutes} :{" "}
              {nameDayTime.seconds}
            </span>
          )}
          {percentage && <Progress value={percentage} />}
        </div>
      )}
    </div>
  );
};
