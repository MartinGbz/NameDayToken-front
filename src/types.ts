import { Address } from "wagmi";

export type TokenOption = { value: Address; label: string };

export type TokenTimestamps = {
  previousNameDayTimestamp: bigint;
  nextNameDayTimestamp: bigint;
  isDay: boolean;
};

export type EnsName = {
  label: string;
  value: string;
};

export type EnsNamesData = {
  account: {
    wrappedDomains: {
      domain: {
        labelName: string;
        labelhash: string;
        name: string;
      };
    }[];
  };
};

export type NameDayTokenData = {
  tokenTimestamp: bigint;
  tokenBaseTimestamp: bigint;
  dayName: string;
};

export type FetchTokenResult = {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  totalSupply: {
    formatted: string;
    value: bigint;
  };
};

export type FetchBalanceResult = {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
};
