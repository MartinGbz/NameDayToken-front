"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TokenForm } from "@/components/token-form";
import { useAccount } from "wagmi";

export const CreateTokenButton = () => {
  const { isConnected } = useAccount();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    isConnected && (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1 h-5 w-5" />
            Create a token
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deploy token</DialogTitle>
            <DialogDescription>Deploy your own NameDayToken</DialogDescription>
          </DialogHeader>
          <TokenForm />
        </DialogContent>
      </Dialog>
    )
  );
};
