"use client";

import { FetchTokenResult, NameDayTokenData } from "@/types";
import { Countdown } from "./countdown";
import { Skeleton } from "@/components/ui/skeleton";

interface TokenStatsProps {
  tokenData: FetchTokenResult | undefined;
  nameDayTokenData: NameDayTokenData | null | undefined;
  isTokenDataLoading: boolean;
  isNameDayTokenDataLoading: boolean;
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
  isTokenDataLoading,
  isNameDayTokenDataLoading,
}: TokenStatsProps) => {
  return (
    <div className="font-medium md:text-lg">
      {!isNameDayTokenDataLoading &&
        !isTokenDataLoading &&
        nameDayTokenData &&
        tokenData && (
          <div>
            <div>
              <span>Total supply: </span>
              <span>
                {tokenData.totalSupply.formatted} {" $" + tokenData.symbol}
              </span>
            </div>
            <div className="mb-2">
              <span>Creation date: </span>
              <span>
                {getShortnedDate(nameDayTokenData.tokenBaseTimestamp)}
              </span>
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
        )}
      {isNameDayTokenDataLoading && isTokenDataLoading && (
        <div className="flex flex-col space-y-4">
          <div className="space-y-1">
            <Skeleton className="h-6 w-60" />
            <Skeleton className="h-6 w-60" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-6 w-60" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      )}
    </div>
  );
};
