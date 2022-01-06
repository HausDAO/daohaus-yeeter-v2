import React from 'react';
import { Avatar, Flex, List, Text } from '@chakra-ui/react';

import EnsDisplay from './ensDisplay';

const CoreTeamList = ({ coreTeam, totalShares }) => {
  return (
    <List backgroundColor='primary.500' m={6}>
      <Text fontSize='xl'>Core Team</Text>
      {coreTeam.map(member => (
        <Flex flexDirection='column' key={member.memberAddress}>
          <Flex>
            <Avatar />
            <EnsDisplay address={member.memberAddress} />
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
