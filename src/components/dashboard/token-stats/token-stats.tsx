"use client";

import { FetchTokenResult, NameDayTokenData } from "@/types";
import { Countdown } from "./countdown";

interface TokenStatsProps {
  tokenData: FetchTokenResult;
  nameDayTokenData: NameDayTokenData;
}

const getShortnedDate = (timestampInSecond: bigint) => {
  const date = new Date(Number(timestampInSecond * BigInt(1000)));
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1;
  return day + "/" + month + "/" + date.getFullYear();
};

export const TokenStats = ({
  tokenData,
  nameDayTokenData,
}: TokenStatsProps) => {
  return (
    <div className="font-medium md:text-lg">
      <div>
        <span>Total supply: </span>
        <span>
          {tokenData.totalSupply.formatted} {" $" + tokenData.symbol}
        </span>
      </div>
      <div className="mb-2">
        <span>Creation date: </span>
        <span>{getShortnedDate(nameDayTokenData.tokenBaseTimestamp)}</span>
      </div>
      <div>
        <span>Name day: </span>
        <span>
          {getShortnedDate(nameDayTokenData.tokenTimestamp).slice(0, -5)}
        </span>
      </div>
      <Countdown
        tokenTimestamp={nameDayTokenData.tokenTimestamp}
        tokenBaseTimestamp={nameDayTokenData.tokenBaseTimestamp}
      />
    </div>
  );
};
