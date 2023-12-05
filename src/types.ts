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
