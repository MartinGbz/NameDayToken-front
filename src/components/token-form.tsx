"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";

const formSchema = z.object({
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
    .max(4, {
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
  mintPerUserPerYear: z.coerce.number().default(100).optional(),
  maxSupply: z.coerce.number().default(1000000).optional(),
});

export const TokenForm = () => {
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
            placeholder: "$ALICE",
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
        console.log("submitted");
        console.log(values);
      }}>
      <AutoFormSubmit>Deploy token</AutoFormSubmit>
    </AutoForm>
  );
};
