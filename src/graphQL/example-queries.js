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
