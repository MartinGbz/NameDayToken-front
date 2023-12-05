import { EnsNamesData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { Address } from "viem";

export const useEns = (address: Address) => {
  const getAllEnsNames = gql`
    query getNames($id: ID!) {
      account(id: $id) {
        wrappedDomains(first: 1000) {
          domain {
            labelName
            labelhash
            name
          }
        }
      }
    }
  `;

  return useQuery<EnsNamesData>({
    queryKey: ["ensNames"],
    queryFn: async () =>
      request(
        "https://api.studio.thegraph.com/query/49574/enssepolia/version/latest",
        getAllEnsNames,
        { id: address.toLowerCase() }
      ),
  });
};
