import React, {
  useEffect,
  useContext,
  createContext,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { TXProvider } from './TXContext';
// import { useSessionStorage } from '../hooks/useSessionStorage';
import { bigGraphQuery } from '../utils/theGraph';
import { supportedChains } from '../utils/chain';
import { addCurrentYeetBalance } from '../utils/projects';

// TODO: get rid of flash

export const DaoContext = createContext();

export const DaoProvider = ({ children }) => {
  const { daoid, daochain, yeeternumber } = useParams();

  const daoNetworkData = supportedChains[daochain];

  const [daoOverview, setDaoOverview] = useState();
  const [daoProposals, setDaoProposals] = useState();
  const [daoShaman, setDaoShaman] = useState();
  const [daoYeets, setDaoYeets] = useState();
  const [refetchComplete, setRefetchComplete] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const hasPerformedBatchQuery = useRef(false);
  const currentDao = useRef(null);
  const currentDaoYeeter = useRef(null);

  useEffect(() => {
    // This condition is brittle. If one request passes, but the rest fail
    // this stops the app from fetching. We'll need something better later on.

    if (daoOverview || daoProposals || daoShaman || daoYeets) {
      return;
    }
    if (
      !daoid ||
      !daochain ||
      !daoNetworkData ||
      !yeeternumber ||
      hasPerformedBatchQuery.current
    ) {
      return;
    }

    // DaoOverview data/query required for most of frombuilder to work
    // Example dao queries - can add other entities and set to any context scope - see dao proposals
    const bigQueryOptions = {
      args: {
        daoID: daoid.toLowerCase(),
        chainID: daochain,
        yeeterNumber: yeeternumber,
      },
      getSetters: [
        { getter: 'getOverview', setter: setDaoOverview },
        {
          getter: 'getProposals',
          setter: setDaoProposals,
        },
        {
          getter: 'getShamans',
          setter: setDaoShaman,
        },
        {
          getter: 'getYeets',
          setter: setDaoYeets,
        },
      ],
    };

    bigGraphQuery(bigQueryOptions);
    hasPerformedBatchQuery.current = true;
  }, [
    daoid,
    daochain,
    yeeternumber,
    daoNetworkData,
    daoOverview,
    daoShaman,
    daoProposals,
    daoYeets,
  ]);

  useEffect(() => {
    const hydrateProjectData = () => {
      const shamanYeets = daoYeets.filter(
        yeet => yeet.shamanAddress === daoShaman.shamanAddress,
      );

      // hot fix for a contract with some bad values in raidbrood
      // can remove after yeeter is closed
      if (
        daoShaman.shamanAddress === '0x85fa509aabcf300c52c81eece7d473faa67f9673'
      ) {
        daoShaman.yeeterConfig.maxUnits = 24;
      }

      setCurrentProject({
        dao: daoOverview,
        members: daoOverview.members.sort(
          (a, b) => Number(b.shares) - Number(a.shares),
        ),
        proposals: daoProposals.sort((a, b) => {
          return Number(a.proposalIndex) - Number(b.proposalIndex);
        }),
        ...daoShaman,
        networkID: daochain,
        yeets: shamanYeets,
        ...addCurrentYeetBalance(
          { ...daoShaman, yeets: shamanYeets },
          daoOverview,
          daochain,
        ),
      });

      setRefetchComplete(false);
      currentDaoYeeter.current = yeeternumber;
    };

    const noProjectOrRefresh = !currentProject || refetchComplete;

    if (
      hasPerformedBatchQuery.current &&
      daoOverview &&
      daoProposals &&
      daoShaman &&
      daoYeets &&
      noProjectOrRefresh
    ) {
      hydrateProjectData();
    }
  }, [
    daoOverview,
    daoProposals,
    daoShaman,
    daoYeets,
    currentProject,
    setCurrentProject,
    hasPerformedBatchQuery,
  ]);

  const refetch = () => {
    setDaoOverview(null);
    setDaoProposals(null);
    setDaoShaman(null);
    setDaoYeets(null);

    const bigQueryOptions = {
      args: {
        daoID: daoid.toLowerCase(),
        chainID: daochain,
        refetchSetter: setRefetchComplete,
        yeeterNumber: yeeternumber,
      },
      getSetters: [
        { getter: 'getOverview', setter: setDaoOverview },
        {
          getter: 'getProposals',
          setter: setDaoProposals,
        },
        {
          getter: 'getShamans',
          setter: setDaoShaman,
        },
        {
          getter: 'getYeets',
          setter: setDaoYeets,
        },
      ],
    };
    currentDao.current = null;

    bigGraphQuery(bigQueryOptions);
    hasPerformedBatchQuery.current = true;
  };

  useEffect(() => {
    if (currentDaoYeeter.current && currentDaoYeeter.current !== yeeternumber) {
      refetch();
    }
  }, [yeeternumber, currentDaoYeeter]);

  return (
    <DaoContext.Provider
      value={{
        currentProject,
        refetch,
        hasPerformedBatchQuery, // Ref, not state
      }}
    >
      <TXProvider>{children}</TXProvider>
    </DaoContext.Provider>
  );
};
export const useDao = () => {
  const {
    currentProject,
    refetch,
    hasPerformedBatchQuery, // Ref, not state
  } = useContext(DaoContext);
  return {
    currentProject,
    refetch,
    hasPerformedBatchQuery,
  };
};
