import React, {
  useEffect,
  useContext,
  createContext,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { TXProvider } from './TXContext';
import { bigGraphQuery } from '../utils/theGraph';
import { supportedChains } from '../utils/chain';
import { putRefreshApiVault } from '../utils/metadata';

export const DaoContext = createContext();

export const DaoProvider = ({ children }) => {
  const { daoid, daochain } = useParams();

  const daoNetworkData = supportedChains[daochain];

  // Example dao queries - can query multiple entities and set to any context scope
  // const [daoOverview, setDaoOverview] = useState([]);
  const [daoOverview, setDaoOverview] = useState();

  const [daoProposals, setDaoProposals] = useState();
  // const [daoProposals, setDaoProposals] = useState([]);

  const hasPerformedBatchQuery = useRef(false);
  const currentDao = useRef(null);

  useEffect(() => {
    // This condition is brittle. If one request passes, but the rest fail
    // this stops the app from fetching. We'll need something better later on.
    if (daoOverview || daoProposals) {
      return;
    }
    if (
      !daoid ||
      !daochain ||
      !daoNetworkData ||
      hasPerformedBatchQuery.current
    ) {
      return;
    }

    const bigQueryOptions = {
      args: {
        daoID: daoid.toLowerCase(),
        chainID: daochain,
      },
      getSetters: [
        { getter: 'getOverview', setter: setDaoOverview },
        {
          getter: 'getProposals',
          setter: setDaoProposals,
        },
      ],
    };

    bigGraphQuery(bigQueryOptions);
    hasPerformedBatchQuery.current = true;
  }, [daoid, daochain, daoNetworkData, daoOverview, setDaoOverview]);

  const refetch = () => {
    const bigQueryOptions = {
      args: {
        daoID: daoid.toLowerCase(),
        chainID: daochain,
      },
      getSetters: [
        { getter: 'getOverview', setter: setDaoOverview },
        {
          getter: 'getProposals',
          setter: setDaoProposals,
        },
      ],
    };
    currentDao.current = null;
    bigGraphQuery(bigQueryOptions);
  };

  const refreshAllDaoVaults = async () => {
    const { network } = supportedChains[daochain];
    await putRefreshApiVault({ network, molochAddress: daoid });
  };

  return (
    <DaoContext.Provider
      value={{
        daoProposals,
        daoOverview,
        refetch,
        refreshAllDaoVaults,
        hasPerformedBatchQuery, // Ref, not state
      }}
    >
      <TXProvider>{children}</TXProvider>
    </DaoContext.Provider>
  );
};
export const useDao = () => {
  const {
    daoProposals,
    daoOverview,
    refetch,
    hasPerformedBatchQuery, // Ref, not state
  } = useContext(DaoContext);
  return {
    daoProposals,
    daoOverview,
    refetch,
    hasPerformedBatchQuery,
  };
};
