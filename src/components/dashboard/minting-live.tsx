"use client";

import { Button } from "@/components/ui/button";
import { BiCoin } from "react-icons/bi";
import { useCountdownAndPercentage } from "@/hooks/use-countdown-and-percentage";

interface MintingLiveProps {
  tokenTimestampData: any;
  tokenBaseTimestampData: any;
}

export const MintingLive = ({
  tokenTimestampData,
  tokenBaseTimestampData,
}: MintingLiveProps) => {
  const { percentage, cycleTime, dayTime, isDay } = useCountdownAndPercentage(
    tokenTimestampData * BigInt(1000),
    tokenBaseTimestampData * BigInt(1000)
    // BigInt(1543492530 * 1000),
    // BigInt(1543411150 * 1000)
  );

  return (
    <div className="relative flex items-center justify-center flex-col">
      {isDay && (
        <div className="absolute top-0 flex items-center space-x-1 p-1 border-2 border-red-400 rounded">
          <div className="rounded-full w-3 h-3 bg-red-400 animate-pulse"></div>
          <span className="text-red-400 font-semibold">Minting live</span>
        </div>
      )}
      <Button disabled={!isDay} className="md:w-52 h-16 space-x-1">
        {" "}
        <BiCoin className="text-lg mr-1" />
        Mint{" "}
      </Button>
    </div>
  );
};
