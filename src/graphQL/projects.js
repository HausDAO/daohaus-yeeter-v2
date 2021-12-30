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
          tokenAddress
        }
      }
      shamans {
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
      yeeterConfig {
        id
        maxTarget
        raiseEndTime
        raiseStartTime
        maxUnits
        pricePerUnit
      }
      yeets {
        createdAt
        contributorAddress
        amount
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
