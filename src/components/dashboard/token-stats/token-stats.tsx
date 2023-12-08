"use client";

import {
  FetchBalanceResult,
  FetchTokenResult,
  NameDayTokenData,
} from "@/types";
import { Countdown } from "./countdown";
import { use, useEffect, useState } from "react";

interface TokenStatsProps {
  tokenData: FetchTokenResult;
  nameDayTokenBalanceData: FetchBalanceResult;
  nameDayTokenData: NameDayTokenData;
}

const getShortnedDate = (timestampInSecond: bigint) => {
  const date = new Date(Number(timestampInSecond * BigInt(1000)));
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
  return day + "/" + month + "/" + date.getFullYear();
};

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
