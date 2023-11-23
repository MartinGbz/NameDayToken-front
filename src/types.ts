import { Address } from "wagmi";

export type TokenOption = { value: Contract; label: string };

export type Contract = {
  address: Address;
  ABI: any;
};
