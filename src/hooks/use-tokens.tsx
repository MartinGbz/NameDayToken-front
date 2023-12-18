import { TokenOptionSchema } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const useTokens = () => {
  const getTokens = async () =>
    fetch("/api/tokens")
      .then((res) => res.json())
      .then((res) => {
        const tokens = z.array(TokenOptionSchema).parse(res);
        return tokens;
      });

  return useQuery({
    queryKey: ["tokens"],
    queryFn: getTokens,
  });
};
