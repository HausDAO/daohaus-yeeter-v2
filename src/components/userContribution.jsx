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
      <Text
        textTransform='uppercase'
        mb={3}
        fontSize='xs'
        lineHeight='18px'
        letterSpacing='widest'
      >
        Your Contribution
      </Text>
      <Flex justify='space-between'>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box
            fontSize={{ base: 'md', lg: 'lg' }}
            lineHeight={{ base: '23.7px', lg: '26.66px' }}
            letterSpacing='3px'
          >
            {displayBalance(
              contributions.total,
              project.yeeterTokenDecimals,
              2,
            )}
          </Box>
          <Box
            fontSize='xs'
            color='gray.500'
            marginTop={{ base: '2', lg: '1' }}
          >
            Contributed
          </Box>
        </Flex>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box
            fontSize={{ base: 'md', lg: 'lg' }}
            lineHeight={{ base: '23.7px', lg: '26.66px' }}
            letterSpacing='3px'
          >
            {contributions.currentMembership.loot}
          </Box>

          <Box
            fontSize='xs'
            color='gray.500'
            marginTop={{ base: '2', lg: '1' }}
          >
            Loot
          </Box>
        </Flex>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box
            fontSize={{ base: 'md', lg: 'lg' }}
            lineHeight={{ base: '23.7px', lg: '26.66px' }}
            letterSpacing='3px'
          >
            {contributionSharePercentage(
              contributions.currentMembership.loot,
              project,
            )}
            %
          </Box>
          <Box
            fontSize='xs'
            color='gray.500'
            marginTop={{ base: '2', lg: '1' }}
          >
            Stake %
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserContribution;
