import { TokenService } from '../services/tokenService';
import { NFTService } from '../services/nftService';
import { TX_HASH } from '../graphQL/general';
import { getGraphEndpoint } from '../utils/chain';
import { graphQuery } from '../utils/apollo';

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
  const tokenContract = TokenService({
    chainID,
    tokenAddress,
  });

  const amountApproved = await tokenContract('allowance')({
    accountAddr: userAddress,
    contractAddr: daoID,
  });
  return amountApproved;
};

export const pollTokenApproval = async ({
  chainID,
  contractAddress,
  userAddress,
  controllerAddress,
}) => {
  const tokenContract = NFTService({
    chainID,
    tokenAddress: contractAddress,
  });

  const args = [userAddress, controllerAddress];
  const approved = await tokenContract('isApprovedForAll')({
    args,
    userAddress,
  });
  return approved;
};
