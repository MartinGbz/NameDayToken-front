"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Address, useAccount, useBalance } from "wagmi";

interface DashboardProps {
  token: Address;
}

export const Dashboard = ({ token }: DashboardProps) => {
  const { address, isConnected } = useAccount();

  const {
    data: erc20Data,
    isError,
    isLoading,
  } = useBalance({
    address: address,
    token: token,
    chainId: 1,
  });

  useEffect(() => {
    console.log(erc20Data);
    console.log(isError);
    console.log(isLoading);
  }, [erc20Data, isError, isLoading]);

  useEffect(() => {
    console.log(address, isConnected);
  }, [address, isConnected]);

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col space-y-4">
        <div className="font-medium md:text-xl">
          {" "}
          My Balance:{" "}
          <span className="font-semibold text-green-500">
            {erc20Data?.formatted}
          </span>
        </div>
        <div className="font-medium md:text-xl">
          {" "}
          Total supply: <span className="font-semibold">{1000000}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex flex-col w-fit space-y-4 items-end">
          <div className="font-medium md:text-xl">
            {" "}
            Next day: <span className="text-red-500 font-semibold">{290}j</span>
          </div>
          <Button> Mint </Button>
        </div>
      </div>
    </div>
  );
};
