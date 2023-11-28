import { Address } from "wagmi";

export type TokenOption = { value: Contract; label: string };

export type Contract = {
  address: Address;
  ABI: any;
};

export type TokenTimestamps = {
  previousNameDayTimestamp: bigint;
  nextNameDayTimestamp: bigint;
  isDay: boolean;
};
