import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Flex, Icon, Link, List, Text } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';

import { supportedChains } from '../utils/chain';
import { truncateAddr } from '../utils/general';

const CoreTeamList = ({ coreTeam, totalShares }) => {
  const { daochain } = useParams();

  return (
    <List backgroundColor='primary.500' m={6}>
      <Text fontSize='xl'>Core Team</Text>
      {coreTeam.map(member => (
        <Flex flexDirection='column' key={member.memberAddress}>
          <Flex>
            <Avatar />
            <Text>
              {truncateAddr(member.memberAddress)}
              <Link
                href={`${supportedChains[daochain].block_explorer}/address/${member.memberAddress}`}
                isExternal
                ml={2}
              >
                <Icon as={RiExternalLinkLine} name='transaction link' />
              </Link>
            </Text>
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
