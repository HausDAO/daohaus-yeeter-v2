import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';

import YeetCountdown from './yeetCountdown';
import { displayBalance } from '../utils/tokenValue';

const NextYeetOverview = ({ project }) => {
  return (
    <Box>
      <Text
        textTransform='uppercase'
        mb={3}
        fontSize='xs'
        lineHeight='18px'
        letterSpacing='widest'
      >
        Upcoming Yeeter
      </Text>
      <Flex justify='space-between'>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box
            fontSize={{ base: 'md', lg: 'lg' }}
            lineHeight={{ base: '23.7px', lg: '26.66px' }}
            letterSpacing='3px'
          >
            {displayBalance(
              project.yeeterConfig.maxTarget,
              project.yeeterTokenDecimals,
              2,
            )}
          </Box>
          <Box
            fontSize='xs'
            color='gray.500'
            marginTop={{ base: '2', lg: '1' }}
          >
            Max Target
          </Box>
        </Flex>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box
            fontSize={{ base: 'md', lg: 'lg' }}
            lineHeight={{ base: '23.7px', lg: '26.66px' }}
            letterSpacing='3px'
          >
            {project?.yeeterConfig?.token?.symbol || 'ETH'}
          </Box>

          <Box
            fontSize='xs'
            color='gray.500'
            marginTop={{ base: '2', lg: '1' }}
          >
            Token
          </Box>
        </Flex>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <YeetCountdown project={project} />
          {/* <Box
            fontSize='xs'
            color='gray.500'
            marginTop={{ base: '2', lg: '1' }}
          >
            Left to Start
          </Box> */}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NextYeetOverview;
