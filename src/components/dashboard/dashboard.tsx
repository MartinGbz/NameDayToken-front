"use client";

import {
  Address,
  useAccount,
  useBalance,
  useContractRead,
  useContractReads,
  useToken,
} from "wagmi";
import { NameDayTokenData } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TokenStats } from "./token-stats/token-stats";
import { Mint } from "./mint/mint";
import { use, useEffect, useState } from "react";

import { nameDayTokenABI } from "@/tokens";

interface DashboardProps {
  tokenAddress: Address;
  chainId: number;
}

// const contract = {
//   address: "0x86187f52B9Fa0f3EcA8DdC2D34c59149d9888917" as `0x${string}`,
//   abi: [
//     {
//       inputs: [
//         { internalType: "string", name: "name_", type: "string" },
//         { internalType: "string", name: "symbol_", type: "string" },
//         { internalType: "string", name: "dayName_", type: "string" },
//         { internalType: "uint256", name: "nameDayTimestamp_", type: "uint256" },
//         {
//           internalType: "uint256",
//           name: "mintPerUserPerYear_",
//           type: "uint256",
//         },
//         { internalType: "uint256", name: "maxSupply_", type: "uint256" },
//       ],
//       stateMutability: "nonpayable",
//       type: "constructor",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "spender", type: "address" },
//         { internalType: "uint256", name: "allowance", type: "uint256" },
//         { internalType: "uint256", name: "needed", type: "uint256" },
//       ],
//       name: "ERC20InsufficientAllowance",
//       type: "error",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "sender", type: "address" },
//         { internalType: "uint256", name: "balance", type: "uint256" },
//         { internalType: "uint256", name: "needed", type: "uint256" },
//       ],
//       name: "ERC20InsufficientBalance",
//       type: "error",
//     },
//     {
//       inputs: [{ internalType: "address", name: "approver", type: "address" }],
//       name: "ERC20InvalidApprover",
//       type: "error",
//     },
//     {
//       inputs: [{ internalType: "address", name: "receiver", type: "address" }],
//       name: "ERC20InvalidReceiver",
//       type: "error",
//     },
//     {
//       inputs: [{ internalType: "address", name: "sender", type: "address" }],
//       name: "ERC20InvalidSender",
//       type: "error",
//     },
//     {
//       inputs: [{ internalType: "address", name: "spender", type: "address" }],
//       name: "ERC20InvalidSpender",
//       type: "error",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "owner",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "spender",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "Approval",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "uint256",
//           name: "year",
//           type: "uint256",
//         },
//         {
//           indexed: true,
//           internalType: "string",
//           name: "ensName",
//           type: "string",
//         },
//       ],
//       name: "Mint",
//       type: "event",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "from",
//           type: "address",
//         },
//         { indexed: true, internalType: "address", name: "to", type: "address" },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "value",
//           type: "uint256",
//         },
//       ],
//       name: "Transfer",
//       type: "event",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "owner", type: "address" },
//         { internalType: "address", name: "spender", type: "address" },
//       ],
//       name: "allowance",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "spender", type: "address" },
//         { internalType: "uint256", name: "value", type: "uint256" },
//       ],
//       name: "approve",
//       outputs: [{ internalType: "bool", name: "", type: "bool" }],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "address", name: "account", type: "address" }],
//       name: "balanceOf",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "string", name: "name_", type: "string" }],
//       name: "computeNamehash",
//       outputs: [{ internalType: "bytes32", name: "namehash", type: "bytes32" }],
//       stateMutability: "pure",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "dayName",
//       outputs: [{ internalType: "string", name: "", type: "string" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "decimals",
//       outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "getBaseTimestamp",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "getCurrentYearNameDayTimestamp",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "string", name: "ensName", type: "string" }],
//       name: "getUserMints",
//       outputs: [{ internalType: "bool[]", name: "", type: "bool[]" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "uint256", name: "year", type: "uint256" },
//         { internalType: "string", name: "ensName", type: "string" },
//       ],
//       name: "hasMinted",
//       outputs: [{ internalType: "bool", name: "", type: "bool" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "maxSupply",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "string", name: "ensName", type: "string" }],
//       name: "mint",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "mintPerUserPerYear",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "name",
//       outputs: [{ internalType: "string", name: "", type: "string" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "nameDayTimestamp",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [{ internalType: "bytes32", name: "node", type: "bytes32" }],
//       name: "resolve",
//       outputs: [{ internalType: "address", name: "", type: "address" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "symbol",
//       outputs: [{ internalType: "string", name: "", type: "string" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "totalSupply",
//       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "to", type: "address" },
//         { internalType: "uint256", name: "value", type: "uint256" },
//       ],
//       name: "transfer",
//       outputs: [{ internalType: "bool", name: "", type: "bool" }],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         { internalType: "address", name: "from", type: "address" },
//         { internalType: "address", name: "to", type: "address" },
//         { internalType: "uint256", name: "value", type: "uint256" },
//       ],
//       name: "transferFrom",
//       outputs: [{ internalType: "bool", name: "", type: "bool" }],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//   ] as const,
// };

export const Dashboard = ({ tokenAddress, chainId }: DashboardProps) => {
  const { address, isConnected } = useAccount();

  const {
    data: tokenBalanceData,
    isError,
    isLoading,
  } = useBalance({
    address: address,
    token: tokenAddress,
    chainId: chainId,
  });

  const {
    data: tokenData,
    isError: isTokenError,
    isLoading: isTokenLoading,
  } = useToken({
    address: tokenAddress,
  });

  const {
    data: nameDayTokenData,
    isError: nameDayTokenError,
    isLoading: nameDayTokenLoading,
  } = useContractReads({
    contracts: [
      {
        address: tokenAddress,
        abi: nameDayTokenABI,
        functionName: "nameDayTimestamp",
      } as const,
      {
        address: tokenAddress,
        abi: nameDayTokenABI,
        functionName: "getBaseTimestamp",
      } as const,
      {
        address: tokenAddress,
        abi: nameDayTokenABI,
        functionName: "dayName",
      } as const,
    ],
    select: (fetched) => {
      if (!fetched[0].result || !fetched[1].result || !fetched[2].result)
        return null;
      return {
        tokenTimestamp: fetched[0].result,
        tokenBaseTimestamp: fetched[1].result,
        dayName: fetched[2].result,
      };
    },
  });

  console.log({ tokenData });

  // if (nameDayTokenData) {
  //   console.log(nameDayTokenData);
  // }

  return (
    <div className="grid grid-cols-2 grid-row-2 gap-2">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Your profile infos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-medium md:text-lg">
            <span>My Balance: </span>
            <span className="text-green-500">
              {tokenBalanceData?.formatted.substring(0, 6)}
            </span>
            <span>{" $" + tokenBalanceData?.symbol}</span>
          </div>
        </CardContent>
      </Card>
      {address && nameDayTokenData && tokenData && (
        <Mint
          address={address}
          tokenAddress={tokenAddress}
          tokenData={tokenData}
          nameDayTokenData={nameDayTokenData}
        />
      )}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Token infos</CardTitle>
          <CardDescription>Token stats</CardDescription>
        </CardHeader>
        <CardContent>
          {tokenData && tokenBalanceData && nameDayTokenData && (
            <TokenStats
              tokenData={tokenData}
              nameDayTokenBalanceData={tokenBalanceData}
              nameDayTokenData={nameDayTokenData}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
