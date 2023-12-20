"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";

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
    .max(7, {
      message: "Symbol must be at most 7 characters.",
    }),

  dayName: z
    .string({
      required_error: "Day Name is required.",
    })
    .min(1, {
      message: "Username must be at least 1 characters.",
    }),
  nameDay: z.date({
    required_error: "Name Day is required.",
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
          description: "The name that users ENS names should contains.",
        },
        nameDay: {
          description: "The name day.",
        },
        mintPerUserPerYear: {
          inputProps: {
            placeholder: "100",
          },
          description:
            "Number of token users can mint per year during the name day.",
        },
      }}
      onSubmit={(values) => {
        onSubmit?.(values);
      }}
      onValuesChange={(values) => {
        formDataChanged?.(values);
      }}
      values={baseData}>
      <AutoFormSubmit>Deploy token</AutoFormSubmit>
    </AutoForm>
  );
};
