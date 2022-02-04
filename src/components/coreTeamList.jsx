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
      <Flex mb={5} align='center'>
        <Text
          fontSize='md'
          lineHeight='24px'
          letterSpacing='11%'
          textTransform='uppercase'
        >
          Core Team
        </Text>
        <Tooltip
          hasArrow
          shouldWrapChildren
          padding={3}
          color='#ED963A'
          bgColor='black'
          placement='bottom'
          label='The Core Team are full shareholders in the DAO and are responsible for the goals of the project. Full shareholder membership is proposed through the DAOhaus interface. '
        >
          <Flex alignItems='center' color='#ED963A'>
            <Icon ml={2} mt='2px' as={AiOutlineQuestionCircle} />
          </Flex>
        </Tooltip>
      </Flex>
      {coreTeam.slice(0, TEAM_DISPLAY_COUNT).map(member => (
        <Flex flexDirection='column' key={member.memberAddress}>
          <AddressAvatar addr={member.memberAddress} hideCopy fontSize='lg' />
          <Flex
            alignItems='center'
            justifyContent='flex-start'
            ml={1}
            mt='10px'
            mb={6}
          >
            <Flex flexDirection='column' width='33%'>
              <Text fontSize='lg'>{member.shares}</Text>
              <Text fontSize='xs' color='gray.500' mt={1}>
                Shares
              </Text>
            </Flex>
            <Flex flexDirection='column' width='33%'>
              <Text>{((member.shares / totalShares) * 100).toFixed(2)}%</Text>
              <Text fontSize='xs' color='gray.500' mt={1}>
                Voting Power
              </Text>
            </Flex>
            <Flex flexDirection='column' width='33%'>
              <Text>{member.loot}</Text>
              <Text fontSize='xs' color='gray.500' mt={1}>
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
