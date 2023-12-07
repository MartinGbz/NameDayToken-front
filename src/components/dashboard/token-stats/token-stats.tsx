"use client";

import {
  FetchBalanceResult,
  FetchTokenResult,
  NameDayTokenData,
} from "@/types";
import { Countdown } from "./countdown";

interface TokenStatsProps {
  tokenData: FetchTokenResult;
  nameDayTokenBalanceData: FetchBalanceResult;
  nameDayTokenData: NameDayTokenData;
}

export const TokenStats = ({
  tokenData,
  nameDayTokenBalanceData,
  nameDayTokenData,
}: TokenStatsProps) => {
  return (
    <div className="font-medium md:text-lg">
      <div>
        <span>Total supply: </span>
        <span>
          {tokenData.totalSupply.formatted}{" "}
          {" $" + nameDayTokenBalanceData.symbol}
        </span>
      </div>
      <div>
        <span>Creation date: </span>
        <span>
          {new Date(
            Number(nameDayTokenData.tokenBaseTimestamp * BigInt(1000))
          ).toDateString()}
        </span>
      </div>
      <Countdown
        tokenTimestamp={nameDayTokenData.tokenTimestamp}
        tokenBaseTimestamp={nameDayTokenData.tokenBaseTimestamp}
      />
    </div>
  );
};
