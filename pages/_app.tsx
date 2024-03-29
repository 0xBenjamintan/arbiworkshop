import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "fc8acddf0c859465327faa85a2a3edac";

const chains = [arbitrumSepolia] as const;

const config = defaultWagmiConfig({
  chains,
  projectId,
  ssr: false,
  metadata: {
    name: "arbiworkshop",
    description: "APUBCC Bootcamp",
    url: "",
    icons: [],
  },
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
