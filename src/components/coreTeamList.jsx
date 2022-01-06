import React from 'react';
import { Flex, List, Text } from '@chakra-ui/react';

import StaticAvatar from './staticAvatar';

const CoreTeamList = ({ coreTeam, totalShares }) => {
  return (
    <List backgroundColor='primary.500' m={6}>
      <Text fontSize='xl'>Core Team</Text>
      {coreTeam.map(member => (
        <Flex flexDirection='column' key={member.memberAddress}>
          <Flex>
            <StaticAvatar address={member.memberAddress} />
          </Flex>
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex flexDirection='column'>
              <Text>Shares</Text>
              <Text>{member.shares}</Text>
            </Flex>
            <Flex flexDirection='column'>
              <Text>Power</Text>
              <Text>{((member.shares / totalShares) * 100).toFixed(4)}%</Text>
            </Flex>
            <Flex flexDirection='column'>
              <Text>Loot</Text>
              <Text>{member.loot}</Text>
            </Flex>
          </Flex>
        </Flex>
      ))}
      ;
    </List>
  );
};

export default CoreTeamList;
