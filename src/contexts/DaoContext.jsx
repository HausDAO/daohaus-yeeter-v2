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
import {
  bigGraphQuery,
  getSnaphotSpace,
  getSnapshotProposals,
} from '../utils/theGraph';
import { supportedChains } from '../utils/chain';
import { addCurrentYeetBalance } from '../utils/projects';
import { fetchMetaData } from '../utils/metadata';

// TODO: get rid of flash

export const DaoContext = createContext();

export const DaoProvider = ({ children }) => {
  const { daoid, daochain, yeeternumber } = useParams();
  // console.log('PARAMS', daoid, daochain, yeeternumber);

  const daoNetworkData = supportedChains[daochain];

  const [daoOverview, setDaoOverview] = useState();
  const [daoMetaData, setDaoMetaData] = useState();
  const [daoProposals, setDaoProposals] = useState();
  const [daoShaman, setDaoShaman] = useState();
  const [daoShamans, setDaoShamans] = useState([]);
  const [daoYeets, setDaoYeets] = useState();
  const [refetchComplete, setRefetchComplete] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentDao, setCurrentDao] = useState(null);
  const [snapshotData, setSnapshotData] = useState([]);

  const hasPerformedBatchQuery = useRef(false);
  // const currentDao = useRef(null);
  const currentDaoYeeter = useRef(null);

  useEffect(() => {
    // console.log('DAOContext...');
    // This condition is brittle. If one request passes, but the rest fail
    // this stops the app from fetching. We'll need something better later on.

    if (daoOverview || daoProposals || daoShaman || daoYeets) {
      return;
    }
    if (
      !daoid ||
      !daochain ||
      !daoNetworkData ||
      // !yeeternumber ||
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
          getter: 'getActivities',
          setter: {
            setDaoProposals,
          },
        },
        yeeternumber
          ? {
              getter: 'getShamans',
              setter: setDaoShaman,
            }
          : {
              getter: 'getAllShamans',
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
    yeeternumber,
    daoNetworkData,
    daoOverview,
    daoShaman,
    daoShamans,
    daoProposals,
    daoYeets,
  ]);

  useEffect(() => {
    const hydrateProjectData = () => {
      // console.log('hydrateProjectData...');
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

    const hydrateDaoData = () => {
      // console.log('hydrateDaoData...', daoShamans);
      setCurrentDao({
        dao: daoOverview,
        members: [
          ...daoOverview.members.sort(
            (a, b) => Number(b.shares) - Number(a.shares),
          ),
          ...daoOverview.lootOnlyMembers.sort(
            (a, b) => Number(b.loot) - Number(a.loot),
          ),
        ],
        proposals: daoProposals.sort((a, b) => {
          return Number(a.proposalIndex) - Number(b.proposalIndex);
        }),
        shamans: daoShamans
          .sort((a, b) =>
            a.yeeterConfig.raiseStartTime > b.yeeterConfig.raiseStartTime
              ? -1
              : 1,
          )
          .map((s, idx) => {
            const yeets = daoYeets.filter(
              y => y.shamanAddress === s.shamanAddress,
            );
            return {
              ...s,
              networkID: daochain,
              yeeterNumber: daoShamans.length - idx,
              yeets,
              ...addCurrentYeetBalance({ ...s, yeets }, daoOverview, daochain),
            };
          }),
        networkID: daochain,
        // yeets: daoYeets,
      });
    };

    const hydrateReady =
      hasPerformedBatchQuery.current && daoOverview && daoProposals && daoYeets;
    const noProjectOrRefresh = !currentProject || refetchComplete;

    if (hydrateReady && !yeeternumber) {
      hydrateDaoData();
    }
    if (hydrateReady && daoShaman && noProjectOrRefresh) {
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

  useEffect(() => {
    const getApiMetadata = async () => {
      try {
        const [data] = await fetchMetaData(daoid);
        // console.log('getApiMetadata', data);
        if (!daoMetaData) {
          setDaoMetaData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (daoid && !yeeternumber) {
      getApiMetadata();
    }
  }, [daoid]);

  useEffect(() => {
    const getSnaphot = async () => {
      const spaceId = daoMetaData.boosts.SNAPSHOT.metadata.space;
      const snapshotQuery = await getSnaphotSpace(spaceId);
      const localSnapshots = await getSnapshotProposals(spaceId, 5);
      setSnapshotData({
        ...snapshotQuery.space,
        proposals: localSnapshots.proposals,
      });
    };
    // console.log('Should fetch snapshots?', daoMetaData);
    if (
      daoMetaData &&
      'SNAPSHOT' in daoMetaData?.boosts &&
      daoMetaData?.boosts?.SNAPSHOT.active
    ) {
      getSnaphot();
    }
  }, [daoMetaData]);

  const refetch = () => {
    // console.log('Refetch');
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
    // currentDao.current = null;

    bigGraphQuery(bigQueryOptions);
    hasPerformedBatchQuery.current = true;
  };

  useEffect(() => {
    // console.log('useEffect...');
    if (currentDaoYeeter.current && currentDaoYeeter.current !== yeeternumber) {
      refetch();
    }
  }, [yeeternumber, currentDaoYeeter]);

  return (
    <DaoContext.Provider
      value={{
        currentDao,
        currentProject,
        snapshotData,
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
    currentDao,
    currentProject,
    snapshotData,
    refetch,
    hasPerformedBatchQuery, // Ref, not state
  } = useContext(DaoContext);
  return {
    currentDao,
    currentProject,
    snapshotData,
    refetch,
    hasPerformedBatchQuery,
  };
};
