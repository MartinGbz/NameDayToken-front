"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { TokenForm, formSchema } from "@/components/token-form";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { factoryAddress } from "@/config";
import { factoryABI } from "@/factory-abi";
import { toast } from "sonner";

export const CreateTokenButton = () => {
  const router = useRouter();

  const { isConnected } = useAccount();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<z.infer<typeof formSchema>>>(
    {}
  );

  const { chain, chains } = useNetwork();

  const {
    data: txBroadcasted,
    write,
    error: writeError,
  } = useContractWrite({
    address: factoryAddress,
    abi: factoryABI,
    functionName: "deployToken",
    chainId: chains.find((c) => c.id === chain?.id)?.id ?? chains[0].id,
  });

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: txBroadcasted?.hash,
    onSuccess(data) {
      console.log(data);
      if (data.status == "success") {
        console.log("success");
        toast.success("Token deployed!");
        router.refresh();
        setFormData({});
      }
    },
  });

  useEffect(() => {
    if (txBroadcasted?.hash) {
      setDialogOpen(false);
      toast.loading(
        <div className="flex flex-col space-y-1">
          <div>{"Deploying..."}</div>
          {chain?.blockExplorers && (
            <a
              href={
                chain.blockExplorers.default.url + "/tx/" + txBroadcasted.hash
              }
              target="_blank"
              className="flex flex-row items-center">
              <ExternalLink className="h-[1.2rem] w-[1.2rem]" />
              {txBroadcasted.hash.slice(0, 30) + "..."}
            </a>
          )}
        </div>
      );
    }
  }, [chain?.blockExplorers, txBroadcasted?.hash]);

  return (
    isConnected && (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1 h-5 w-5" />
            Deploy token
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deploy token</DialogTitle>
            <DialogDescription>Deploy your own NameDayToken</DialogDescription>
          </DialogHeader>
          <TokenForm
            baseData={formData}
            // setDialogOpen={() => setDialogOpen(false)}
            formDataChanged={(data) => {
              setFormData(data);
            }}
            onSubmit={(values) => {
              write({
                args: [
                  values.name,
                  values.symbol,
                  values.dayName,
                  BigInt(values.nameDayTimestamp),
                  BigInt(values.mintPerUserPerYear) * BigInt(10 ** 18),
                  BigInt(values.maxSupply) * BigInt(10 ** 18),
                ],
              });
            }}
          />
        </DialogContent>
      </Dialog>
    )
  );
};
