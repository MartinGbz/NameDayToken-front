import { TokensCombobox } from "@/components/tokens-combobox";
import { CreateTokenButton } from "./create-token-button";
import { getTokens } from "@/lib/tokens";

export const DashboardHeader = async () => {
  const tokens = await getTokens();

  return (
    <div className="w-full flex flex-row space-x-4">
      {tokens && tokens.length > 0 && (
        <TokensCombobox
          tokens={tokens}
          defaultPlaceholder="Search a token..."
        />
      )}
      <CreateTokenButton />
    </div>
  );
};
