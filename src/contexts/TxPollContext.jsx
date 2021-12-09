import React, { useContext, createContext, useEffect, useState } from 'react';

import { useInjectedProvider } from './InjectedProviderContext';
import { useOverlay } from './OverlayContext';
import { createPoll } from '../services/pollService';

export const TxPollContext = createContext();

export const TxPollContextProvider = ({ children }) => {
  const { address } = useInjectedProvider();
  const { successToast, errorToast } = useOverlay();

  const [outstandingTXs, setOutstandingTXs] = useState([]);

  const resolvePoll = txHash => {
    if (!address) {
      console.error("User address wasn't found. Cannot cache Poll.");
      return;
    }
    const oldCache = JSON.parse(localStorage.getItem('TXs')) || {};
    const userSpecificCache = oldCache[address] ? oldCache[address] : [];
    const newUserCache = userSpecificCache.map(tx =>
      tx.txHash === txHash ? { ...tx, status: 'resolved' } : tx,
    );
    const newCache = {
      ...oldCache,
      [address]: newUserCache,
    };
    localStorage.setItem('TXs', JSON.stringify(newCache));
    setOutstandingTXs(newUserCache);
  };

  useEffect(() => {
    if (!address) return;
    const cachedTXs = JSON.parse(localStorage.getItem('TXs')) || {};
    const userTXs = cachedTXs[address];
    if (userTXs?.length) {
      userTXs.forEach(tx => {
        if (tx.status === 'unresolved') {
          createPoll(tx.pollData)({
            ...tx.pollArgs,
            actions: {
              onSuccess: () => {
                resolvePoll(tx.txHash);
                successToast({ title: 'Success!', description: tx.successMsg });
              },
              onError: () => {
                resolvePoll(tx.txHash);
                errorToast({ title: 'Error!', description: tx.errorMsg });
              },
            },
          })(tx.txHash);
        }
      });
      setOutstandingTXs(userTXs);
    }
  }, [address]);

  const cachePoll = pollData => {
    if (!address) {
      console.error("User address wasn't found. Cannot cache Poll.");
      return;
    }
    const oldCache = JSON.parse(localStorage.getItem('TXs')) || {};
    const userSpecificCache = oldCache[address] ? oldCache[address] : [];
    const newUserCache = [pollData, ...userSpecificCache];
    const newCache = {
      ...oldCache,
      [address]: newUserCache,
    };
    localStorage.setItem('TXs', JSON.stringify(newCache));
    setOutstandingTXs(newUserCache);
  };

  return (
    <TxPollContext.Provider
      value={{
        cachePoll,
        resolvePoll,
        outstandingTXs,
      }}
    >
      {children}
    </TxPollContext.Provider>
  );
};
export const useTxPoll = () => {
  const { cachePoll, apiData, resolvePoll } = useContext(TxPollContext);
  return {
    apiData,
    cachePoll,
    resolvePoll,
  };
};
