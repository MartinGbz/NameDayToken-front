import { Address } from "wagmi";
import { z } from "zod";

// export type TokenOption = { name: string; address: Address };
// const AddressSchema = z.custom<Address>();

// export type AddressZod = z.infer<typeof AddressSchema>;

export const TokenOptionSchema = z.object({
  name: z.string(),
  address: z.custom<Address>(),
});

export type TokenOption = z.infer<typeof TokenOptionSchema>;

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
