"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { factoryAddress } from "@/config";
import { factoryABI } from "@/factory-abi";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useContractWrite, useNetwork, useWaitForTransaction } from "wagmi";
import * as z from "zod";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  name: z
    .string({
      required_error: "name is required.",
    })
    .min(1, {
      message: "Username must be at least 1 characters.",
    }),

  symbol: z
    .string({
      required_error: "Symbol is required.",
    })
    .min(3, {
      message: "Symbol must be at least 3 characters.",
    })
    .max(10, {
      message: "Symbol must be at most 4 characters.",
    }),

  dayName: z
    .string({
      required_error: "Day Name is required.",
    })
    .min(1, {
      message: "Username must be at least 1 characters.",
    }),

  nameDayTimestamp: z.coerce.number({
    required_error: "Name Day Timestamp is required.",
  }),
  mintPerUserPerYear: z.coerce.number().default(100),
  maxSupply: z.coerce.number().default(1000000),
});

interface TokenFormProps {
  baseData?: Partial<z.infer<typeof formSchema>>;
  formDataChanged?: (data: Partial<z.infer<typeof formSchema>>) => void;
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
}

export const TokenForm = ({
  formDataChanged,
  baseData,
  onSubmit,
}: TokenFormProps) => {
  return (
    <AutoForm
      formSchema={formSchema}
      fieldConfig={{
        name: {
          inputProps: {
            placeholder: "Alice Token",
          },
        },
        symbol: {
          inputProps: {
            placeholder: "ALICE",
          },
        },
        dayName: {
          inputProps: {
            placeholder: "alice",
          },
          description: "The name that users should have in their ENS.",
        },
        nameDayTimestamp: {
          inputProps: {
            placeholder: "1631026800",
          },
          description: "Timestamp of the name day.",
        },
        mintPerUserPerYear: {
          inputProps: {
            placeholder: "100",
          },
          description:
            "Number of token users can mint per year during the name day. (default: 100)",
        },
        maxSupply: {
          inputProps: {
            placeholder: "1000000",
          },
          description:
            "Number of token users can mint per year during the name day. (default: 1M)",
        },
      }}
      onSubmit={(values) => {
        onSubmit?.(values);
        // write({
        //   args: [
        //     values.name,
        //     values.symbol,
        //     values.dayName,
        //     BigInt(values.nameDayTimestamp),
        //     BigInt(values.mintPerUserPerYear) * BigInt(10 ** 18),
        //     BigInt(values.maxSupply) * BigInt(10 ** 18),
        //   ],
        // });
      }}
      onValuesChange={(values) => {
        formDataChanged?.(values);
      }}
      values={baseData}>
      <AutoFormSubmit>Deploy token</AutoFormSubmit>
    </AutoForm>
  );
};
