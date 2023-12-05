import { Abi } from "viem";
import { Address } from "wagmi";

// import tokensJSON from "@/tokens.json";

export type TokenOption = { value: Address; label: string };

// export type TokenOption = { value: Contract; label: string };

// export type Contract = {
//   address: Address;
//   abi: Abi;
// };

// export type TokenOption<T extends Abi> = { value: Contract<T>; label: string };

// export type Contract2<T extends Abi> = {
//   address: Address;
//   abi: T;
// };

// const abi: Abi = [
//   {
//     inputs: [
//       { internalType: "string", name: "name_", type: "string" },
//       { internalType: "string", name: "symbol_", type: "string" },
//       { internalType: "string", name: "dayName_", type: "string" },
//       {
//         internalType: "uint256",
//         name: "nameDayTimestamp_",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "mintPerUserPerYear_",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "maxSupply_",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     inputs: [
//       { internalType: "address", name: "spender", type: "address" },
//       {
//         internalType: "uint256",
//         name: "allowance",
//         type: "uint256",
//       },
//       { internalType: "uint256", name: "needed", type: "uint256" },
//     ],
//     name: "ERC20InsufficientAllowance",
//     type: "error",
//   },
//   {
//     inputs: [
//       { internalType: "address", name: "sender", type: "address" },
//       { internalType: "uint256", name: "balance", type: "uint256" },
//       { internalType: "uint256", name: "needed", type: "uint256" },
//     ],
//     name: "ERC20InsufficientBalance",
//     type: "error",
//   },
//   {
//     inputs: [{ internalType: "address", name: "approver", type: "address" }],
//     name: "ERC20InvalidApprover",
//     type: "error",
//   },
//   {
//     inputs: [{ internalType: "address", name: "receiver", type: "address" }],
//     name: "ERC20InvalidReceiver",
//     type: "error",
//   },
//   {
//     inputs: [{ internalType: "address", name: "sender", type: "address" }],
//     name: "ERC20InvalidSender",
//     type: "error",
//   },
//   {
//     inputs: [{ internalType: "address", name: "spender", type: "address" }],
//     name: "ERC20InvalidSpender",
//     type: "error",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "owner",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "spender",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//     ],
//     name: "Approval",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "uint256",
//         name: "year",
//         type: "uint256",
//       },
//       {
//         indexed: true,
//         internalType: "string",
//         name: "ensName",
//         type: "string",
//       },
//     ],
//     name: "Mint",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "from",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "to",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//     ],
//     name: "Transfer",
//     type: "event",
//   },
//   {
//     inputs: [
//       { internalType: "address", name: "owner", type: "address" },
//       { internalType: "address", name: "spender", type: "address" },
//     ],
//     name: "allowance",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "address", name: "spender", type: "address" },
//       { internalType: "uint256", name: "value", type: "uint256" },
//     ],
//     name: "approve",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "account", type: "address" }],
//     name: "balanceOf",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "string", name: "name_", type: "string" }],
//     name: "computeNamehash",
//     outputs: [{ internalType: "bytes32", name: "namehash", type: "bytes32" }],
//     stateMutability: "pure",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "dayName",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "decimals",
//     outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getBaseTimestamp",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getCurrentYearNameDayTimestamp",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "string", name: "ensName", type: "string" }],
//     name: "getUserMints",
//     outputs: [{ internalType: "bool[]", name: "", type: "bool[]" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "uint256", name: "year", type: "uint256" },
//       { internalType: "string", name: "ensName", type: "string" },
//     ],
//     name: "hasMinted",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "maxSupply",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "string", name: "ensName", type: "string" }],
//     name: "mint",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "mintPerUserPerYear",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "name",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "nameDayTimestamp",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
//     name: "resolve",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "symbol",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "totalSupply",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "address", name: "to", type: "address" },
//       { internalType: "uint256", name: "value", type: "uint256" },
//     ],
//     name: "transfer",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "address", name: "from", type: "address" },
//       { internalType: "address", name: "to", type: "address" },
//       { internalType: "uint256", name: "value", type: "uint256" },
//     ],
//     name: "transferFrom",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

// const abi2: Abi = [
//   {
//     inputs: [
//       { internalType: "contract ENS", name: "ensAddr", type: "address" },
//     ],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "ens",
//     outputs: [{ internalType: "contract ENS", name: "", type: "address" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
//     name: "name",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [
//       { internalType: "bytes32", name: "node", type: "bytes32" },
//       { internalType: "string", name: "_name", type: "string" },
//     ],
//     name: "setName",
//     outputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

// const contrats: Contract2<any>[] = [];
// contrats.push({
//   address: "0x86187f52B9Fa0f3EcA8DdC2D34c59149d9888917" as Address,
//   abi: abi,
// } as Contract2<typeof abi>);
// contrats.push({
//   address: "0xA2C122BE93b0074270ebeE7f6b7292C7deB45047" as Address,
//   abi: abi2,
// } as Contract2<typeof abi2>);

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

// export type ContractReads<T> = {
//   result: T;
//   status: "idle" | "error" | "loading" | "success";
// };

// type NameDayTokenTupleType = [bigint, bigint, string];

// export type NameDayTokenData = ContractReads<NameDayTokenTupleType>;

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

// export type NameDayTokenData = {
//   tokenTimestamp: any[] | undefined;
//   tokenBaseTimestamp: any[] | undefined;
//   dayName: any[] | undefined;
// };

// export const contractABI = tokensJSON[0].value.abi;
