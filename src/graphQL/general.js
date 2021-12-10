import { gql } from 'apollo-boost';

export const TX_HASH = gql`
  query graphTX($id: String!) {
    molochTransaction(id: $id) {
      id
      createdAt
    }
  }
`;

export const DAO_OVERVIEW = gql`
  query moloch($contractAddr: String!) {
    moloch(id: $contractAddr) {
      id
      summoner
      summoningTime
      newContract
      totalShares
      dilutionBound
      totalLoot
      version
      periodDuration
      votingPeriodLength
      gracePeriodLength
      proposalDeposit
      processingReward
      guildBankAddress
      minions {
        createdAt
        minionAddress
        minionType
        details
        minQuorum
        safeAddress
        uberHausAddress
        uberHausDelegate
        uberHausDelegateRewardFactor
      }
      depositToken {
        tokenAddress
        symbol
        decimals
      }
      tokenBalances(where: { guildBank: true }, first: 500) {
        id
        token {
          tokenAddress
          symbol
          decimals
        }
        tokenBalance
        guildBank
      }
    }
  }
`;
