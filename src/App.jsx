import React from 'react';

import { TxPollContextProvider } from './contexts/TxPollContext';
import { UserContextProvider } from './contexts/UserContext';

import TxInfoModal from './modals/TxInfoModal';
import BaseRouter from './routers/baseRouter';

function App() {
  return (
    <TxPollContextProvider>
      <UserContextProvider>
        <TxInfoModal />
        <BaseRouter />
      </UserContextProvider>
    </TxPollContextProvider>
  );
}

export default App;
