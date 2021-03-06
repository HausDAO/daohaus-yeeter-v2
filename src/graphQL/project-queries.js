import { gql } from 'apollo-boost';

export const PROJECTS_DAOS_QUERY = gql`
  query moloches($skip: Int) {
    moloches(
      orderBy: summoningTime
      first: 1000
      skip: $skip
      where: { version: "2.2" }
    ) {
      id
      version
      totalShares
      summoningTime
      tokenBalances(where: { guildBank: true }) {
        id
        tokenBalance
        guildBank
        token {
          decimals
          symbol
          tokenAddress
        }
      }
      shamans {
        createdAt
        shamanAddress
        enabled
      }
    }
  }
`;

export const PROJECTS_SHAMANS_QUERY = gql`
  query shamans($skip: Int) {
    shamans(
      orderBy: createdAt
      orderDirection: asc
      first: 1000
      skip: $skip
      where: { shamanType: "yeeter" }
    ) {
      id
      createdAt
      shamanAddress
      molochAddress
      details
      shamanType
      enabled
      yeeterConfig {
        id
        maxTarget
        raiseEndTime
        raiseStartTime
        maxUnits
        pricePerUnit
        token {
          id
          name
          symbol
        }
        erc20Only
      }
    }
  }
`;

export const MEMBERSHIPS_QUERY = gql`
  query membersHub($memberAddress: String!) {
    membersHub: members(
      where: { memberAddress: $memberAddress, exists: true }
    ) {
      id
      memberAddress
      molochAddress
      loot
      shares
      moloch {
        version
      }
      tokenBalances {
        token {
          tokenAddress
        }
        tokenBalance
      }
    }
  }
`;

export const PROJECT_DETAILS_QUERY = gql`
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
      members(where: { shares_gt: "0" }) {
        id
        memberAddress
        shares
        loot
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
      shamans {
        createdAt
        shamanAddress
        enabled
      }
    }
  }
`;

export const PROJECTS_DETAIL_SHAMAN_QUERY = gql`
  query shamans($contractAddr: String!) {
    shamans(
      where: {
        shamanType: "yeeter"
        molochAddress: $contractAddr
        enabled: true
      }
      orderBy: createdAt
      orderDirection: asc
    ) {
      id
      createdAt
      shamanAddress
      molochAddress
      details
      shamanType
      enabled
      yeeterConfig {
        id
        maxTarget
        raiseEndTime
        raiseStartTime
        maxUnits
        pricePerUnit
        erc20Only
        token {
          id
          symbol
        }
      }
    }
  }
`;

export const PROJECTS_FUNDING_ASSETS_QUERY = gql`
  query tokens($skip: Int) {
    tokens(where: { symbol_not: "UNKNOWN" }, orderBy: symbol) {
      id
      name
      symbol
    }
  }
`;

export const PROJECTS_YEETS_QUERY = gql`
  query yeets($skip: Int) {
    yeets(orderBy: createdAt, first: 1000, skip: $skip) {
      createdAt
      contributorAddress
      amount
      shamanAddress
      molochAddress
      transactionHash
    }
  }
`;

export const PROJECT_DETAIL_YEETS_QUERY = gql`
  query yeets($contractAddr: String!, $skip: Int) {
    yeets(
      orderBy: createdAt
      first: 1000
      skip: $skip
      where: { molochAddress: $contractAddr }
    ) {
      createdAt
      contributorAddress
      amount
      shamanAddress
      molochAddress
      transactionHash
    }
  }
`;
