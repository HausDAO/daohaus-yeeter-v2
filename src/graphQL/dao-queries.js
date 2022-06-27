import { gql } from 'apollo-boost';

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
minionExecuteActionTx {
  id
}
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
  crossChainMinion
  foreignChainId
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

export const DAO_ACTIVITIES = gql`
query molochActivities($contractAddr: String!, $createdAt: String!) {
  proposals(
    where: { molochAddress: $contractAddr, createdAt_gt: $createdAt }
    orderBy: createdAt
    orderDirection: asc
    first: 1000
  ) {
    ${proposalFields}
  }
  rageQuits(where: {molochAddress: $contractAddr}) {
    id
    createdAt
    memberAddress
    shares
    loot
  }
}
`;

export const SPAM_FILTER_ACTIVITIES = gql`
  query molochActivities($contractAddr: String!, $createdAt: String!) {
    proposals(
      where: { molochAddress: $contractAddr, createdAt_gt: $createdAt, sponsored: true }
      orderBy: createdAt
      orderDirection: asc
      first: 1000
    ) {
      ${proposalFields}
    }
    rageQuits {
      id
      createdAt
      memberAddress
      shares
      loot
    }
  }
`;

export const SPAM_FILTER_GK_WL = gql`
  query molochActivities($contractAddr: String!, $createdAt: String!) {
    proposals(
      where: { 
        molochAddress: $contractAddr
        createdAt_gt: $createdAt
        sponsored: false
        guildkickOrWhitelistOrMinion: true
      }
      orderBy: createdAt
      orderDirection: asc
      first: 1000
    ) {
      ${proposalFields}
    }
    rageQuits {
      id
      createdAt
      memberAddress
      shares
      loot
    }
  }
`;

export const SPAM_FILTER_TRIBUTE = gql`
  query molochActivities($contractAddr: String!, $createdAt: String!, $requiredTributeMin: String!, $requiredTributeToken: String!) {
    proposals(
      where: { 
        molochAddress: $contractAddr
        createdAt_gt: $createdAt
        sponsored: false
        tributeOffered_gte: $requiredTributeMin
        tributeToken: $requiredTributeToken
      }
      orderBy: createdAt
      orderDirection: asc
      first: 1000
    ) {
      ${proposalFields}
    }
    rageQuits {
      id
      createdAt
      memberAddress
      shares
      loot
    }
  }
`;
