import { TX_HASH } from '../graphQL/general';
import { getGraphEndpoint } from '../utils/chain';
import { graphQuery } from '../utils/apollo';
import { LOCAL_ABI } from '../utils/abi';
import { createContract } from '../utils/contract';

export const pollTXHash = async ({ chainID, txHash }) => {
  return graphQuery({
    endpoint: getGraphEndpoint(chainID, 'subgraph_url'),
    query: TX_HASH,
    variables: {
      id: txHash,
    },
  });
};

export const pollTokenAllowances = async ({
  chainID,
  daoID,
  tokenAddress,
  userAddress,
}) => {
  const tokenContract = createContract({
    address: tokenAddress,
    abi: LOCAL_ABI.ERC_20,
    chainID,
  });

  const amountApproved = await tokenContract.methods
    .allowance({
      accountAddr: userAddress,
      contractAddr: daoID,
    })
    .call();
  return amountApproved;
};
