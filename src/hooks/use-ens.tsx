import { EnsNamesData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { Address, Chain } from "viem";
import { sepolia } from "wagmi";

export const useEns = (address: Address, network?: Chain) => {
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
        network?.id === sepolia.id
          ? "https://api.studio.thegraph.com/query/49574/enssepolia/version/latest"
          : "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
        getAllEnsNames,
        { id: address.toLowerCase() }
      ),
  });
};
