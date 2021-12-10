import { gql } from 'apollo-boost';

export const EXAMPLE_MEMBERSHIPS = gql`
  query membersHub($memberAddress: String!) {
    membersHub: members(
      where: { memberAddress: $memberAddress, exists: true }
    ) {
      id
      memberAddress
      molochAddress
      shares
      loot
      moloch {
        id
        version
        summoner
      }
    }
  }
`;

export const EXAMPLE_HOME_DAO = gql`
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

const proposalFields = `
id
aborted
applicant
cancelled
cancelledAt
createdAt
createdBy
details
didPass
executed
gracePeriodEnds
guildkick
isMinion
lootRequested
memberAddress
newMember
noShares
noVotes
paymentRequested
paymentTokenDecimals
paymentTokenSymbol
processed
processor
processedAt
proposer
proposalId
proposalIndex
sharesRequested
sponsored
sponsor
sponsoredAt
startingPeriod
trade
tributeOffered
tributeTokenDecimals
tributeTokenSymbol
tributeToken
votingPeriodStarts
votingPeriodEnds
whitelist
yesShares
yesVotes
molochAddress
molochVersion
minionAddress
uberHausMinionExecuted
minion {
  minionType
  minQuorum
}
actions {
  target
  data
  memberOnly
}
moloch {
  gracePeriodLength
  periodDuration
  version
  votingPeriodLength
}
votes {
  id
  memberAddress
  memberPower
  uintVote
  createdAt
  molochAddress
}
escrow {
  tokenAddresses
  tokenTypes
  tokenIds
  amounts
}
`;

export const EXAMPLE_DAO_PROPOSALS = gql`
  query molochActivities($contractAddr: String!) {
    proposals(
      where: { molochAddress: $contractAddr }
      orderBy: createdAt
      orderDirection: desc
      first: 100
    ) {
      ${proposalFields}
    }
  }
`;
