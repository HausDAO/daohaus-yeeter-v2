import React, {
  useContext,
  createContext,
  useEffect,
  useRef,
  // useState,
} from 'react';

import { useWallet } from '@raidguild/quiver';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { membershipsChainQuery } from '../utils/theGraph';
import { supportedChains } from '../utils/chain';

const numOfSupportedChains = Object.keys(supportedChains).length;

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { address } = useWallet();

  const [userMemberships, setMemberships] = useSessionStorage(
    'userMemberships',
    [],
  );

  const hasLoadedMemberships = userMemberships?.length === numOfSupportedChains;
  const prevAddress = useRef(null);

  useEffect(() => {
    const bigQuery = () => {
      membershipsChainQuery({
        supportedChains,
        reactSetter: setMemberships,
        variables: {
          memberAddress: address.toLowerCase(),
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

  const userContributions = project => {
    if (!address) {
      return [];
    }

    return project.yeets.filter(yeet => {
      return yeet.contributorAddress?.toLowerCase() === address?.toLowerCase();
    });
  };

  return (
    <UserContext.Provider
      value={{
        userMemberships,
        hasLoadedMemberships,
        refetchUserMemberships,
        userContributions,
        // currentMembership,
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
    userContributions,
    // currentMembership,
  } = useContext(UserContext);
  return {
    userMemberships,
    hasLoadedMemberships,
    refetchUserMemberships,
    userContributions,
    // currentMembership,
  };
};
