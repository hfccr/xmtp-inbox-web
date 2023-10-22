import { arrayify } from "@ethersproject/bytes";
import type {
  NotifiInputFieldsText,
  NotifiInputSeparators,
} from "@notifi-network/notifi-react-card";
import {
  NotifiContext,
  NotifiSubscriptionCard,
} from "@notifi-network/notifi-react-card";
import "@notifi-network/notifi-react-card/dist/index.css";
// import { useEthers } from "@usedapp/core";
// import { providers } from "ethers";
// import React, { useMemo } from "react";
import { useAccount, useWalletClient } from "wagmi";

export const Notifi: React.FC = () => {
  const { address: account } = useAccount();
  // const { account, library } = useEthers();
  const { data: signer } = useWalletClient();
  // const signer = useMemo(() => {
  //   if (library instanceof providers.JsonRpcProvider) {
  //     return library.getSigner();
  //   }
  //   return undefined;
  // }, [library]);

  if (account === undefined || signer === undefined) {
    // account is required
    return null;
  }

  const inputLabels: NotifiInputFieldsText = {
    label: {
      email: "Email",
      sms: "Text Message",
      telegram: "Telegram",
    },
    placeholderText: {
      email: "Email",
    },
  };

  const inputSeparators: NotifiInputSeparators = {
    smsSeparator: {
      content: "OR",
    },
    emailSeparator: {
      content: "OR",
    },
  };

  return (
    <NotifiContext
      dappAddress="xmtpx"
      // keep this "Production" unless you have a special Development environment set up by Notifi
      env="Production"
      signMessage={async (message: Uint8Array) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        let result = "0x";
        if (signer) {
          result = await signer?.signMessage({
            account,
            message: {
              raw: message,
            },
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return arrayify(result);
      }}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      walletPublicKey={account}
      walletBlockchain="ETHEREUM" // NOTE - Please update to the correct chain name.
      // If Polygon, use "POLYGON"
      // If Arbitrum, use "ARBITRUM"
      // If Binance, use "BINANCE"
      // If Optimism, use OPTIMISM
    >
      <NotifiSubscriptionCard
        cardId="fc541e2174e743c0adac7b49606ad3bc"
        inputLabels={inputLabels}
        inputSeparators={inputSeparators}
        darkMode // optional
      />
    </NotifiContext>
  );
};
