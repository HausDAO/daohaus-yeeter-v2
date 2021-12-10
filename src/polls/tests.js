import { BigNumber } from 'ethers';

export const testTXHash = (data, shouldEqual, pollId) => {
  if (data) {
    return data?.molochTransaction?.id === shouldEqual;
  }
  clearInterval(pollId);
  throw new Error(
    'Did not receive results from the graph based on the given transaction hash',
  );
};

export const tokenAllowanceTest = (data, shouldEqual) => {
  return BigNumber.from(data).gte(shouldEqual);
};
