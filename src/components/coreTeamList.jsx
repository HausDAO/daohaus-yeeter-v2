import React from 'react';
import { Box, Flex, Icon, Text, Tooltip } from '@chakra-ui/react';

import { AiOutlineQuestionCircle } from 'react-icons/ai';
import AddressAvatar from './addressAvatar';
import DaohausLink from './daohausLink';

const TEAM_DISPLAY_COUNT = 4;

const CoreTeamList = ({ coreTeam, totalShares, project }) => {
  const remainingCount = coreTeam.length - TEAM_DISPLAY_COUNT;

  return (
    <Box backgroundColor='primary.500'>
      <Flex fontSize='lg' textTransform='uppercase' mb={3} align='center'>
        Core Team
        <Tooltip
          hasArrow
          shouldWrapChildren
          padding={3}
          color='#ED963A'
          placement='bottom'
          label='The Core Team are full shareholders in the DAO and are responsible for the goals of the project. Full shareholder membership is proposed through the DAOhaus interface. '
        >
          <Flex alignItems='center' color='#ED963A'>
            <Icon ml={2} mt='2px' as={AiOutlineQuestionCircle} />
          </Flex>
        </Tooltip>
      </Flex>
      {coreTeam.slice(0, TEAM_DISPLAY_COUNT).map(member => (
        <Flex flexDirection='column' key={member.memberAddress} mb={5}>
          <AddressAvatar addr={member.memberAddress} hideCopy />
          <Flex alignItems='center' justifyContent='flex-start' ml={1}>
            <Flex flexDirection='column' width='33%'>
              <Text>{member.shares}</Text>
              <Text fontSize='xs' color='gray.500'>
                Shares
              </Text>
            </Flex>
            <Flex flexDirection='column' width='33%'>
              <Text>{((member.shares / totalShares) * 100).toFixed(2)}%</Text>
              <Text fontSize='xs' color='gray.500'>
                Voting Power
              </Text>
            </Flex>
            <Flex flexDirection='column' width='33%'>
              <Text>{member.loot}</Text>
              <Text fontSize='xs' color='gray.500'>
                Loot
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ))}

      {remainingCount > 0 && (
        <DaohausLink
          linkText={`View ${remainingCount} more on DAOHaus`}
          project={project}
          route='/members'
        />
      )}
    </Box>
  );
};

export default CoreTeamList;
