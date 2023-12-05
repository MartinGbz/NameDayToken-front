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
    <div>
      <div className="font-medium md:text-lg">
        <span>Total supply: </span>
        <span>
          {tokenData.totalSupply.formatted}{" "}
          {" $" + nameDayTokenBalanceData.symbol}
        </span>
      </div>
      <Countdown
        tokenTimestamp={nameDayTokenData.tokenTimestamp}
        tokenBaseTimestamp={nameDayTokenData.tokenBaseTimestamp}
      />
    </div>
  );
};
