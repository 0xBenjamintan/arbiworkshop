import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "";

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

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  enableOnramp: true,
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
