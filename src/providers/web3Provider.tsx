import React, { ReactNode } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiConfig,} from 'wagmi';
import { Chain, arbitrum, mainnet,bscTestnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Types
interface Web3ModalProviderProps {
  children: ReactNode;
}

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_APP_PROJECT_ID;

// 2. Configure metadata
const metadata = {
  name: import.meta.env.VITE_APP_PROJECT_NAME,
  description: import.meta.env.VITE_APP_PROJECT_DESCRIPTION,
  url: import.meta.env.VITE_APP_PROJECT_URL, // Must match your domain
  icons: [import.meta.env.VITE_APP_PROJECT_ICON],
};

// 3. Configure chains
const chains: readonly [Chain, ...Chain[]] = [mainnet, arbitrum,bscTestnet];

// 4. Create wagmiConfig using defaultWagmiConfig
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // Optional: Add custom Wagmi options if needed
});

// 5. Create Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional
  enableOnramp: true, // Optional
});

// Web3ModalProvider component
export const Web3ModalProvider: React.FC<Web3ModalProviderProps> = ({ children }) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  );
};
