import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { contributionSharePercentage } from '../utils/projects';
import { displayBalance } from '../utils/tokenValue';

const UserContribution = ({ project, contributions }) => {
  if (!contributions.yeets.length || !contributions.currentMembership) {
    return null;
  }

  return (
    <Box>
      <Text textTransform='uppercase' mb={3}>
        Your Contribution
      </Text>
      <Flex justify='space-between'>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box fontSize='xl'>
            {displayBalance(
              contributions.total,
              project.yeeterTokenDecimals,
              2,
            )}
          </Box>
          <Box fontSize='xs' color='gray.500'>
            Contributed
          </Box>
        </Flex>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box fontSize='xl'>{contributions.currentMembership.loot}</Box>
          <Box fontSize='xs' color='gray.500'>
            Loot
          </Box>
        </Flex>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box fontSize='xl'>
            {contributionSharePercentage(
              contributions.currentMembership.loot,
              project,
            )}
            %
          </Box>
          <Box fontSize='xs' color='gray.500'>
            Stake %
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserContribution;
