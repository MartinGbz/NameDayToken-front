"use client";

import { useCountdownAndPercentage } from "@/hooks/use-countdown-and-percentage";
import { Progress } from "@/components/ui/progress";

interface CountdownProps {
  tokenTimestamp: bigint;
  tokenBaseTimestamp: bigint;
}

export const Countdown = ({
  tokenTimestamp,
  tokenBaseTimestamp,
}: CountdownProps) => {
  const { percentage, cycleTime, dayTime, isDay } = useCountdownAndPercentage(
    tokenTimestamp * BigInt(1000),
    tokenBaseTimestamp * BigInt(1000)
  );

  return (
    <div>
      {!isDay && (
        <div className="font-medium md:text-lg space-y-2">
          <span>Next mint: </span>
          {cycleTime && (
            <span className={"text-red-500"}>
              {cycleTime.days}d : {cycleTime.hours}h : {cycleTime.minutes}m :{" "}
              {cycleTime.seconds}s
            </span>
          )}
          {percentage && <Progress value={percentage} />}
        </div>
      )}
      {isDay && (
        <div className="font-medium md:text-lg space-y-2">
          <span>End of mint: </span>
          {dayTime && (
            <span className="text-green-500">
              {dayTime.hours}h : {dayTime.minutes}m : {dayTime.seconds}s
            </span>
          )}
          {percentage && <Progress value={percentage} />}
        </div>
      )}
    </div>
  );
};
