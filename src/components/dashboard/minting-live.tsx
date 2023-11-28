"use client";

// import { useCycleProgression } from "@/hooks/use-cycle-progression";
import { Countdown } from "./countdown";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BiCoin } from "react-icons/bi";
import { useCountdown } from "@/hooks/use-countdown";
import { useState } from "react";
import { TokenTimestamps } from "@/types";

interface MintingLiveProps {
  timestamps: TokenTimestamps;
}

export const MintingLive = ({ timestamps }: MintingLiveProps) => {
  // const { percentage, daysLeft, sliceCycleMising } = useCycleProgression(
  //   nameDayTokenTimestamp
  // );
  const [countdownEnd, setCountdownEnd] = useState(false);

  const { percentage, time } = useCountdown(timestamps, () => {
    console.log("FINISHED");
    setCountdownEnd(true);
  });

  console.log("percentage", percentage);
  console.log("time", time);

  return (
    <div className="relative flex items-center justify-center flex-col">
      {countdownEnd && (
        <div className="absolute top-0 flex items-center space-x-1 p-1 border-2 border-red-400 rounded">
          <div className="rounded-full w-3 h-3 bg-red-400 animate-pulse"></div>
          <span className="text-red-400 font-semibold">Minting live</span>
        </div>
      )}
      <Button disabled={!countdownEnd} className="md:w-52 h-16 space-x-1">
        {" "}
        <BiCoin className="text-lg mr-1" />
        Mint{" "}
      </Button>
    </div>
  );
};
