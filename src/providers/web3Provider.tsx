import React from "react";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { bscTestnet, AppKitNetwork } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId =
  import.meta.env.VITE_APP_APPKIT_PROJECT_ID || "9f5afcba328b2c1a96014fbd8d71f6ec";

// 2. Create a metadata object - optional
const metadata = {
  name: import.meta.env.VITE_APP_TITLE || "AppKit",
  description: import.meta.env.VITE_TITLE || "AppKit Example",
  url: import.meta.env.VITE_DOMAIN || "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [bscTestnet];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  defaultNetwork: bscTestnet,
  themeMode: import.meta.env.VITE_APP_APPKIT_THEME || "light",
  features: {
    socials: [], //no social logins
    email: false, //no email login
    emailShowWallets: false, //no email wallet login
    analytics: true, // Optional - defaults to your Cloud configuration
    walletFeaturesOrder: [], // Optional - defaults to your Cloud configuration
  },
});

// Types
interface Web3ModalProviderProps {
  children: React.ReactNode;
}

export const Web3ModalProvider: React.FC<Web3ModalProviderProps> = ({
  children,
}) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
