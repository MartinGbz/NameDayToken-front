import { factoryAddress } from "@/config";
import { factoryABI } from "@/factory-abi";
import { nameDayTokenABI } from "@/namedaytoken-abi";
import { Address, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const getTokens = async () => {
  const tokenCount = await client.readContract({
    address: factoryAddress,
    abi: factoryABI,
    functionName: "tokenCount",
    blockTag: "pending",
  });

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
