import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from '@raidguild/quiver';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CustomThemeProvider } from './contexts/CustomThemeContext';
import { getProviderOptions } from './utils/web3Modal';

window.onunload = () => {
  sessionStorage.clear();
};

const SUPPORTED_NETWORKS = {
  '0x1': {
    chainId: '0x1',
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    explorer: 'https://etherscan.io/',
    rpc: `https://${process.env.REACT_APP_RPC_URI}.eth.rpc.rivet.cloud`,
  },
  '0x5': {
    chainId: '0x5',
    name: 'Göerli',
    symbol: 'ETH',
    explorer: 'https://goerli.etherscan.io/',
    rpc: `https://goerli.prylabs.net`,
  },
  '0x64': {
    name: 'Gnosis Chain',
    symbol: 'xDai',
    chainId: '0x64',
    rpc: ' https://rpc.gnosischain.com',
    explorer: 'https://blockscout.com/xdai/mainnet/',
  },
  '0xa': {
    name: 'Optimism',
    symbol: 'ETH',
    chainId: '0xa',
    rpc: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
  },
  '0xa4b1': {
    name: 'Arbitrum',
    symbol: 'AETH',
    chainId: '0xa4b1',
    rpc: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io/',
  },
};

const web3modalOptions = {
  cacheProvider: true,
  providerOptions: getProviderOptions(),
  theme: 'dark',
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <WalletProvider
          web3modalOptions={web3modalOptions}
          networks={SUPPORTED_NETWORKS}
          // defaultChainId='0x1'
          handleModalEvents={(eventName, error) => {
            if (error) {
              console.log(error.message);
            }
          }}
        >
          <App />
        </WalletProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
