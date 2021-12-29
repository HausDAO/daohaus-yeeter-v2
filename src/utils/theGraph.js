import { graphQuery } from './apollo';

import { getGraphEndpoint } from './chain';
import { proposalResolver } from './resolvers';
import { EXAMPLE_DAO_PROPOSALS } from '../graphQL/example-queries';
import { fetchMetaData } from './metadata';
import { DAO_OVERVIEW } from '../graphQL/general';

export const graphFetchAll = async (args, items = [], skip = 0) => {
  console.log('args', args);
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
        query: DAO_OVERVIEW,
        variables: {
          contractAddr: args.daoID,
        },
      });

      setter({ ...graphOverview.moloch, metadata: metadata[0] });
    } catch (error) {
      console.error(error);
    }
  },
  async getProposals(args, setter) {
    try {
      // only fetching the newest proposals in this example
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
  query,
  supportedChains,
  endpointType,
  reactSetter,
  // apiFetcher,
  variables,
}) => {
  // const metaDataMap = await apiFetcher();

  // const daoMapLookup = (address, chainName) => {
  //   const daoMatch = metaDataMap[address] || [];

  //   return daoMatch.find(dao => dao.network === chainName) || null;
  // };
  buildCrossChainQuery(supportedChains, endpointType).forEach(async chain => {
    try {
      const daoData = await graphFetchAll({
        endpoint: chain.endpoint,
        query,
        variables,
        subfield: 'moloches',
      });

      console.log('daoData', daoData);

      // const shamanData = await graphQuery({
      //   endpoint: chain.endpoint,
      //   query,
      //   variables,
      // });

      // const withMetaData = daoData
      //   .map(dao => {
      //     return {
      //       ...dao,
      //       meta: daoMapLookup(dao?.id, chain.apiMatch),
      //     };
      //   })
      //   .filter(dao => {
      //     return dao.version === '2.2';
      //   });

      reactSetter(prevState => [
        ...prevState,
        // { ...chain, data: withMetaData },
        { ...chain, data: daoData },
      ]);
    } catch (error) {
      console.error(error);
    }
  });
};
