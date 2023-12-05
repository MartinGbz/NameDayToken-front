"use client";

import { Countdown } from "./countdown";

interface TokenStatsProps {
  tokenTimestamp: bigint;
  tokenBaseTimestamp: bigint;
  nameDayTokenData: any;
  nameDayTokenBalanceData: any;
}

export const TokenStats = ({
  tokenTimestamp,
  tokenBaseTimestamp,
  nameDayTokenData,
  nameDayTokenBalanceData,
}: TokenStatsProps) => {
  return (
    <div>
      <div className="font-medium md:text-lg">
        <span>Total supply: </span>
        <span>
          {nameDayTokenData.totalSupply.formatted}{" "}
          {" $" + nameDayTokenBalanceData.symbol}
        </span>
      </div>
      <Countdown
        tokenTimestamp={tokenTimestamp}
        tokenBaseTimestamp={tokenBaseTimestamp}
      />
    </div>
  );
};
