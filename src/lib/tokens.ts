import { factoryABI } from "@/factory-abi";
import { nameDayTokenABI } from "@/namedaytoken-abi";
import { Address, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const factoryAddress = "0x4fc76ac59824aCA8686Cfe70522cdcD7d790f2D1";

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

const retry = async (
  fn: Function,
  retriesLeft: number,
  interval: number
): Promise<any> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retriesLeft) {
      console.log(`Retrying in ${interval}ms... Retyrs left: ${retriesLeft}`);
      await new Promise((resolve) => setTimeout(resolve, interval));
      return retry(fn, retriesLeft - 1, interval);
    } else {
      throw new Error(error);
    }
  }
};

const getTokenCount = async () => {
  const tokenCount = await client.readContract({
    address: factoryAddress,
    abi: factoryABI,
    functionName: "tokenCount",
  });
  if (!tokenCount) {
    throw new Error("error while fetching token count");
  }
  return tokenCount;
};

export const getTokens = async () => {
  // const tokenCount = await client.readContract({
  //   address: factoryAddress,
  //   abi: factoryABI,
  //   functionName: "tokenCount",
  // });
  const tokenCount = await retry(getTokenCount, 3, 50);

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
