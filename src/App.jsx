import React from 'react';
import { TxPollContextProvider } from './contexts/TxPollContext';

import TxInfoModal from './modals/TxInfoModal';
import BaseRouter from './routers/baseRouter';

function App() {
  return (
    <TxPollContextProvider>
      <TxInfoModal />
      <BaseRouter />
    </TxPollContextProvider>
  );
}

export default App;
