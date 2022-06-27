import { graphQuery } from './apollo';

import { getGraphEndpoint } from './chain';
import { proposalResolver } from './resolvers';
import { EXAMPLE_DAO_PROPOSALS } from '../graphQL/example-queries';
import { fetchMetaData } from './metadata';
import {
  DAO_ACTIVITIES,
  SPAM_FILTER_ACTIVITIES,
  SPAM_FILTER_GK_WL,
  SPAM_FILTER_TRIBUTE,
} from '../graphQL/dao-queries';
import {
  MEMBERSHIPS_QUERY,
  PROJECTS_DAOS_QUERY,
  PROJECTS_DETAIL_SHAMAN_QUERY,
  PROJECT_DETAIL_YEETS_QUERY,
  PROJECTS_SHAMANS_QUERY,
  PROJECTS_YEETS_QUERY,
  PROJECT_DETAILS_QUERY,
  PROJECTS_FUNDING_ASSETS_QUERY,
} from '../graphQL/project-queries';
import {
  SNAPSHOT_SPACE_QUERY,
  SNAPSHOT_PROPOSALS_QUERY,
  SNAPSHOT_VOTES_QUERY,
} from '../graphQL/snapshot-queries';

const SNAPSHOT_ENDPOINT = 'https://hub.snapshot.org/graphql';

export const graphFetchAll = async (args, items = [], skip = 0) => {
  try {
    const { endpoint, query, variables, subfield } = args;
    const result = await graphQuery({
      endpoint,
      query,
      variables: {
        ...variables,
        skip,
      },
    });

    const newItems = result[subfield];
    if (newItems.length === 1000) {
      return graphFetchAll(args, [...newItems, ...items], skip + 1000);
    }
    return [...items, ...newItems];
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllActivity = async (
  args,
  items = [],
  createdAt = '0',
  count = 1,
  query = DAO_ACTIVITIES,
  variables = {},
) => {
  try {
    const result = await graphQuery({
      endpoint: getGraphEndpoint(args.chainID, 'subgraph_url'),
      query,
      variables: {
        contractAddr: args.daoID,
        createdAt,
        ...variables,
      },
    });

    const { proposals } = result;
    count = proposals.length;
    if (count > 0) {
      const lastRecord = proposals[count - 1];
      createdAt = lastRecord && lastRecord.createdAt;

      return fetchAllActivity(
        args,
        [...items, ...proposals],
        createdAt,
        count,
        query,
        variables,
      );
    }
    return { ...result, proposals: [...items, ...proposals] };
  } catch (error) {
    throw new Error(error);
  }
};

const fetchSpamFilterActivity = async (
  args,
  items = [],
  createdAt = '0',
  count = 1,
) => {
  const sponsored = await fetchAllActivity(
    args,
    items,
    createdAt,
    count,
    SPAM_FILTER_ACTIVITIES,
  );
  const unsponsoredGuildkickWhitelist = await fetchAllActivity(
    args,
    items,
    createdAt,
    count,
    SPAM_FILTER_GK_WL,
  );
  const unsponsoredTribute = await fetchAllActivity(
    args,
    items,
    createdAt,
    count,
    SPAM_FILTER_TRIBUTE,
    {
      requiredTributeMin: args.requiredTributeMin,
      requiredTributeToken: args.requiredTributeToken,
    },
  );

  return {
    id: args.daoID,
    rageQuits: sponsored.rageQuits,
    proposals: [
      ...sponsored?.proposals,
      ...unsponsoredGuildkickWhitelist?.proposals,
      ...unsponsoredTribute?.proposals,
    ],
  };
};

const completeQueries = {
  async getOverview(args, setter) {
    try {
      const metadata = await fetchMetaData(args.daoID);

      const graphOverview = await graphQuery({
        endpoint: getGraphEndpoint(args.chainID, 'subgraph_url'),
        query: PROJECT_DETAILS_QUERY,
        variables: {
          contractAddr: args.daoID,
        },
      });

      setter({
        ...graphOverview.moloch,
        meta: metadata[0],
      });
    } catch (error) {
      console.error(error);
    }
  },
  async getActivities(args, setter) {
    try {
      const metadata = await fetchMetaData(args.daoID);

      const activity = metadata[0]?.boosts?.SPAM_FILTER?.active
        ? await fetchSpamFilterActivity({
            ...args,
            requiredTributeToken:
              metadata[0].boosts.SPAM_FILTER.metadata.paymentToken,
            requiredTributeMin:
              metadata[0].boosts.SPAM_FILTER.metadata.paymentRequested,
          })
        : await fetchAllActivity(args);

      const resolvedActivity = {
        id: args.daoID,
        rageQuits: activity.rageQuits,
        proposals: activity.proposals.map(proposal =>
          proposalResolver(proposal, {
            status: true,
            title: true,
            description: true,
            link: true,
            hash: true,
            proposalType: true,
          }),
        ),
      };

      if (setter.setDaoActivities) {
        setter.setDaoActivities(resolvedActivity);
      }
      if (setter.setDaoProposals) {
        setter.setDaoProposals(resolvedActivity.proposals);
      }
      if (setter.setUberProposals) {
        setter.setUberProposals(resolvedActivity.proposals);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async getShamans(args, setter) {
    try {
      const graphShamans = await graphQuery({
        endpoint: getGraphEndpoint(args.chainID, 'shaman_graph_url'),
        query: PROJECTS_DETAIL_SHAMAN_QUERY,
        variables: {
          contractAddr: args.daoID,
        },
      });

      setter({
        ...graphShamans.shamans[args.yeeterNumber - 1],
        yeeterNumber: Number(args.yeeterNumber),
      });
    } catch (error) {
      console.error(error);
    }
  },
  async getAllShamans(args, setter) {
    try {
      const graphShamans = await graphQuery({
        endpoint: getGraphEndpoint(args.chainID, 'shaman_graph_url'),
        query: PROJECTS_DETAIL_SHAMAN_QUERY,
        variables: {
          contractAddr: args.daoID,
        },
      });

      setter(graphShamans.shamans);
    } catch (error) {
      console.error(error);
    }
  },
  async getYeets(args, setter) {
    try {
      const graphYeets = await graphFetchAll({
        endpoint: getGraphEndpoint(args.chainID, 'shaman_graph_url'),
        query: PROJECT_DETAIL_YEETS_QUERY,
        subfield: 'yeets',
        variables: {
          contractAddr: args.daoID,
        },
      });

      setter(graphYeets);
    } catch (error) {
      console.error(error);
    }
  },
  async getProposals(args, setter) {
    try {
      const graphProposals = await graphQuery({
        endpoint: getGraphEndpoint(args.chainID, 'subgraph_url'),
        query: EXAMPLE_DAO_PROPOSALS,

        variables: {
          contractAddr: args.daoID,
        },
      });

      const resolvedActivity = {
        proposals: graphProposals.proposals.map(proposal =>
          proposalResolver(proposal, {
            status: true,
            title: true,
            description: true,
            link: true,
            hash: true,
            proposalType: true,
          }),
        ),
      };

      setter(resolvedActivity.proposals);
    } catch (error) {
      console.error(error);
    }
  },
};

export const bigGraphQuery = ({ args, getSetters }) => {
  for (const getSetter of getSetters) {
    const { getter, setter } = getSetter;
    completeQueries[getter](args, setter);
  }

  if (args.refetchSetter) {
    args.refetchSetter(true);
  }
};

const buildCrossChainQuery = (supportedChains, endpointType) => {
  let array = [];

  for (const chain in supportedChains) {
    array = [
      ...array,
      {
        name: supportedChains[chain].name,
        endpoint: supportedChains[chain][endpointType],
        networkID: chain,
        network_id: supportedChains[chain].network_id,
        hubSortOrder: supportedChains[chain].hub_sort_order,
        apiMatch: supportedChains[chain].network,
      },
    ];
  }
  return array;
};

export const projectsCrossChainQuery = async ({
  supportedChains,
  apiFetcher,
  reactSetter,
}) => {
  const metaDataMap = await apiFetcher();

  const daoMapLookup = (address, chainName) => {
    const daoMatch = metaDataMap[address] || [];

    return daoMatch.find(dao => dao.network === chainName) || null;
  };
  buildCrossChainQuery(supportedChains).forEach(async chain => {
    try {
      const daoData = await graphFetchAll({
        endpoint: supportedChains[chain.networkID].subgraph_url,
        query: PROJECTS_DAOS_QUERY,
        subfield: 'moloches',
      });

      const shamanData = await graphFetchAll({
        endpoint: supportedChains[chain.networkID].shaman_graph_url,
        query: PROJECTS_SHAMANS_QUERY,
        subfield: 'shamans',
      });

      const tokensData = await graphFetchAll({
        endpoint: supportedChains[chain.networkID].shaman_graph_url,
        query: PROJECTS_FUNDING_ASSETS_QUERY,
        subfield: 'tokens',
      });
      const yeetsData = await graphFetchAll({
        endpoint: supportedChains[chain.networkID].shaman_graph_url,
        query: PROJECTS_YEETS_QUERY,
        subfield: 'yeets',
      });

      const yeetsMap = yeetsData.reduce((coll, yeet) => {
        const yeetMolochId = `${yeet.shamanAddress}-${yeet.molochAddress}`;
        if (coll[yeetMolochId]) {
          coll[yeetMolochId].push(yeet);
        } else {
          coll[yeetMolochId] = [yeet];
        }
        return coll;
      }, {});

      const withMetaData = daoData.map(dao => {
        return {
          ...dao,
          meta: daoMapLookup(dao?.id, chain.apiMatch),
        };
      });

      const withMetaDataMap = daoData.reduce((coll, dao) => {
        coll[dao.id] = {
          ...dao,
          meta: daoMapLookup(dao?.id, chain.apiMatch),
        };
        return coll;
      }, {});

      const yeeters = shamanData.filter(shaman => {
        return shaman.shamanType === 'yeeter';
      });

      const yeetersWithYeetsAndDaos = yeeters.map(yeeter => {
        const yeetMolochId = `${yeeter.shamanAddress}-${yeeter.molochAddress}`;
        return {
          ...yeeter,
          yeets: yeetsMap[yeetMolochId] || [],
          dao: withMetaDataMap[yeeter.molochAddress],
        };
      });

      reactSetter(prevState => [
        ...prevState,
        {
          ...chain,
          daos: withMetaData,
          yeeters: yeetersWithYeetsAndDaos,
          tokens: tokensData,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  });
};

export const membershipsChainQuery = async ({
  supportedChains,
  reactSetter,
  variables,
}) => {
  buildCrossChainQuery(supportedChains).forEach(async chain => {
    try {
      const memberData = await graphFetchAll({
        endpoint: supportedChains[chain.networkID].subgraph_url,
        query: MEMBERSHIPS_QUERY,
        variables,
        subfield: 'membersHub',
      });

      const yeeterDaos = memberData.filter(dao => dao.moloch.version === '2.2');

      reactSetter(prevState => [...prevState, { ...chain, daos: yeeterDaos }]);
    } catch (error) {
      console.error(error);
    }
  });
};

export const getSnaphotSpace = async id => {
  try {
    return graphQuery({
      endpoint: SNAPSHOT_ENDPOINT,
      query: SNAPSHOT_SPACE_QUERY,
      variables: {
        id,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const getSnapshotProposals = async (id, first = 1000, skip = 0) => {
  try {
    return graphQuery({
      endpoint: SNAPSHOT_ENDPOINT,
      query: SNAPSHOT_PROPOSALS_QUERY,
      variables: {
        id,
        first,
        fromDate: Number((new Date().getTime() / 1000).toFixed(0)),
        skip,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const getSnapshotVotes = async id => {
  try {
    return graphQuery({
      endpoint: SNAPSHOT_ENDPOINT,
      query: SNAPSHOT_VOTES_QUERY,
      variables: {
        id,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};
