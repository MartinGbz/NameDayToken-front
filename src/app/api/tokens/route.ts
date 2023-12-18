import { factoryABI } from "@/factory-abi";
import { nameDayTokenABI } from "@/namedaytoken-abi";
import { NextResponse } from "next/server";

import { Address, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const factoryAddress = "0x4fc76ac59824aCA8686Cfe70522cdcD7d790f2D1";

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const getTokens = async () => {
  const tokenCount = await client.readContract({
    address: factoryAddress,
    abi: factoryABI,
    functionName: "tokenCount",
  });

  console.log("tokenCount");
  console.log(tokenCount);

  const tokenAddresses = new Array<Address>();

  for (let i = 0; i < Number(tokenCount); i++) {
    const tokenAddress = await client.readContract({
      address: factoryAddress,
      abi: factoryABI,
      functionName: "tokens",
      args: [BigInt(i)],
    });
    tokenAddresses.push(tokenAddress);
  }

  const tokens = await Promise.all(
    tokenAddresses.map(async (tokenAddress) => {
      const tokenName = await client.readContract({
        address: tokenAddress,
        abi: nameDayTokenABI,
        functionName: "name",
      });
      return { name: tokenName, address: tokenAddress };
    })
  );

  return tokens;
};

export async function GET(): Promise<NextResponse> {
  const tokens = await getTokens();
  if (!tokens) {
    return NextResponse.json(
      { error: "error while fetching tokens" },
      { status: 500 }
    );
  }
  return NextResponse.json(tokens, { status: 200 });
}
