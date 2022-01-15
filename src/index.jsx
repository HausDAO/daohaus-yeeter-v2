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
  4: {
    chainId: 4,
    name: 'Ethereum Rinkeby',
    symbol: 'ETH',
    explorer: 'https://rinkeby.etherscan.io/',
    rpc: `https://${process.env.REACT_APP_RPC_URI}.rinkeby.rpc.rivet.cloud`,
  },
  100: {
    name: 'Gnosis Chain',
    symbol: 'xDai',
    chainId: 100,
    rpc: 'https://dai.poa.network',
    explorer: 'https://blockscout.com/xdai/mainnet/',
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
          defaultNetwork={100}
          handleModalEvents={(eventName, error) => {
            if (error) {
              console.log(error.message);
            }

            console.log(eventName);
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
