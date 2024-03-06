import logo from './logo.svg';
import './App.css';
import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import {
  createConfig,
  WagmiProvider,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet,polygonMumbai } from 'viem/chains';
import Test from './Test';

const config = createConfig({
  chains: [mainnet,polygonMumbai],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [polygonMumbai.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "1c52044f-69f1-437b-b8b3-05c42ab5307d",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <Test/>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

export default App;
