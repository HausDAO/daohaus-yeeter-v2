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
import { putRefreshApiVault } from '../utils/metadata';
import { addCurrentYeetBalance } from '../utils/projects';

export const DaoContext = createContext();

export const DaoProvider = ({ children }) => {
  const { daoid, daochain } = useParams();

  const daoNetworkData = supportedChains[daochain];

  const [daoOverview, setDaoOverview] = useState();
  const [daoProposals, setDaoProposals] = useState();
  const [daoShamans, setDaoShamans] = useState();
  const [daoYeets, setDaoYeets] = useState();

  // const [currentProject, setCurrentProject] = useSessionStorage(
  //   'currentProject',
  //   null,
  // );

  const [currentProject, setCurrentProject] = useState(null);

  const hasPerformedBatchQuery = useRef(false);
  const currentDao = useRef(null);

  useEffect(() => {
    // This condition is brittle. If one request passes, but the rest fail
    // this stops the app from fetching. We'll need something better later on.

    if (daoOverview || daoProposals || daoShamans || daoYeets) {
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

    // DaoOverview data/query required for most of frombuilder to work
    // Example dao queries - can add other entities and set to any context scope - see dao proposals
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
        {
          getter: 'getShamans',
          setter: setDaoShamans,
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
    daoNetworkData,
    daoOverview,
    daoShamans,
    daoProposals,
    daoYeets,
  ]);

  useEffect(() => {
    const hydrateProjectData = () => {
      console.log('daoShamans', daoShamans);
      const project = {
        ...daoOverview,
        members: daoOverview.members.sort(
          (a, b) => Number(b.shares) - Number(a.shares),
        ),
        proposals: daoProposals.sort((a, b) => {
          return Number(a.proposalIndex) - Number(b.proposalIndex);
        }),
        yeeter: daoShamans,
        yeets: daoYeets,
        networkID: daochain,
        ...addCurrentYeetBalance(daoShamans, daoOverview, daochain),
      };

      setCurrentProject(project);
    };

    if (
      hasPerformedBatchQuery.current &&
      daoOverview &&
      daoProposals &&
      daoShamans &&
      daoYeets &&
      !currentProject
    ) {
      hydrateProjectData();
    }
  }, [
    daoOverview,
    daoProposals,
    daoShamans,
    daoYeets,
    currentProject,
    setCurrentProject,
    hasPerformedBatchQuery,
  ]);

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
        {
          getter: 'getShamans',
          setter: setDaoShamans,
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

  const refreshAllDaoVaults = async () => {
    const { network } = supportedChains[daochain];
    await putRefreshApiVault({ network, molochAddress: daoid });
  };

  return (
    <DaoContext.Provider
      value={{
        currentProject,
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
