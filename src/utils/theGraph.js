import { graphQuery } from './apollo';

import { getGraphEndpoint } from './chain';
import { proposalResolver } from './resolvers';
import { EXAMPLE_DAO_PROPOSALS } from '../graphQL/example-queries';
import { fetchMetaData } from './metadata';
import {
  MEMBERSHIPS_QUERY,
  PROJECTS_DAOS_QUERY,
  PROJECTS_DETAIL_SHAMAN_QUERY,
  PROJECTS_SHAMANS_QUERY,
  PROJECT_DETAILS_QUERY,
} from '../graphQL/projects';

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

      setter({ ...graphOverview.moloch, metadata: metadata[0] });
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

      setter(graphShamans.shamans);
    } catch (error) {
      console.error(error);
    }
  },
  async getProposals(args, setter) {
    try {
      // only fetching the newest proposals in this example
      // TODO: new query for latest ragequittable
      // might need to filter here
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
        // apiMatch: chain === '0x64' ? 'xdai' : supportedChains[chain].network,
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

      const withMetaData = daoData.map(dao => {
        return {
          ...dao,
          meta: daoMapLookup(dao?.id, chain.apiMatch),
        };
      });

      const yeeters = shamanData.filter(shaman => {
        return shaman.shamanType === 'yeeter';
      });

      // TODO: filter out daos with shaman not enabled

      reactSetter(prevState => [
        ...prevState,
        { ...chain, daos: withMetaData, yeeters },
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
