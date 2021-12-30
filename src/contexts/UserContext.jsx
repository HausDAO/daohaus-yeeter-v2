import React, { useContext, createContext, useEffect, useRef } from 'react';

import { useInjectedProvider } from './InjectedProviderContext';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { membershipsChainQuery } from '../utils/theGraph';
import { supportedChains } from '../utils/chain';

const numOfSupportedChains = Object.keys(supportedChains).length;

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { address } = useInjectedProvider();

  const [userMemberships, setMemberships] = useSessionStorage(
    'userMemberships',
    [],
  );

  const hasLoadedMemberships = userMemberships?.length === numOfSupportedChains;
  const prevAddress = useRef(null);

  // TODO: could add some helper hooks in here that take project data and give confirmation of contribution

  useEffect(() => {
    const bigQuery = () => {
      membershipsChainQuery({
        supportedChains,
        reactSetter: setMemberships,
        variables: {
          memberAddress: address,
        },
      });
    };
    if (!userMemberships.length && address && prevAddress.current === null) {
      bigQuery();
      prevAddress.current = address;
    } else if (prevAddress.current !== address && address) {
      setMemberships([]);
      prevAddress.current = null;
    }
  }, [address, userMemberships, setMemberships]);

  const refetchUserMemberships = () => {
    prevAddress.current = null;
    setMemberships([]);
  };

  return (
    <UserContext.Provider
      value={{
        userMemberships,
        hasLoadedMemberships,
        refetchUserMemberships,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const {
    userMemberships,
    hasLoadedMemberships,
    refetchUserMemberships,
  } = useContext(UserContext);
  return {
    userMemberships,
    hasLoadedMemberships,
    refetchUserMemberships,
  };
};
