import React, { useEffect, useState } from 'react';
// import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { Box, Flex, Text } from '@chakra-ui/react';
// import { TiArrowUnsorted } from 'react-icons/ti';
import Web3 from 'web3';

import { timeToNow } from '../utils/general';
import EnsDisplay from './ensDisplay';

const LeaderBoardList = ({ yeets, project }) => {
  const [sortedYeets, setSortedYeets] = useState([]);

  useEffect(() => {
    if (yeets.length) {
      setSortedYeets(
        yeets.sort((x, y) => {
          return Number(y.createdAt) - Number(x.createdAt);
        }),
      );
    }
  }, [yeets]);

  // const toggleSort = () => {
  //   const sorted = yeets.sort((x, y) => {
  //     return Number(x.amount) - Number(y.amount);
  //   });
  //   console.log('setting by amount', sorted);

  //   setSortedYeets(sorted);
  // };

  // console.log('sortedYeets', sortedYeets);

  return (
    <Box backgroundColor='primary.500' p={{ base: 4, md: 10 }}>
      <Text fontSize='lg' textTransform='uppercase' mb={3}>
        Leaderboard
      </Text>
      <Flex flexDirection='column'>
        <Flex alignItems='center' justifyContent='flex-start'>
          <Text
            fontSize='xs'
            color='gray.500'
            width={{ base: '25%', lg: '35%' }}
            mr={{ base: '10%', lg: '0' }}
            mb={{ base: 1, lg: '19px' }}
          >
            Contributor
          </Text>
          <Text
            fontSize='xs'
            color='gray.500'
            width='25%'
            mb={{ base: 1, lg: '19px' }}
          >
            Amount
            {/* <Icon onClick={toggleSort} as={TiArrowUnsorted} /> */}
          </Text>
          <Text
            fontSize='xs'
            color='gray.500'
            width='25%'
            mb={{ base: 1, lg: '19px' }}
          >
            Loot
          </Text>
          <Text
            fontSize='xs'
            color='gray.500'
            width='25%'
            mb={{ base: 1, lg: '19px' }}
          >
            Time
            {/* <Icon onClick={toggleSort} as={TiArrowUnsorted} /> */}
          </Text>
        </Flex>
        {sortedYeets.map((yeet, idx) => (
          <Flex
            alignItems='flex-start'
            justifyContent='flex-end'
            key={idx}
            mb={3}
          >
            <Box
              width={{ base: '25%', lg: '35%' }}
              mr={{ base: '10%', lg: '0' }}
            >
              <EnsDisplay
                address={yeet.contributorAddress}
                ml='0px'
                fontSize={{ base: 'sm', lg: 'lg' }}
              />
            </Box>
            <Box width='25%' align='start'>
              <Text fontSize={{ base: 'sm', lg: 'lg' }}>
                {Web3.utils.fromWei(yeet.amount)}
              </Text>
            </Box>
            <Box width='25%'>
              <Text fontSize={{ base: 'sm', lg: 'lg' }}>
                {(Number(yeet.amount) /
                  Number(project.yeeter.yeeterConfig.pricePerUnit)) *
                  100}
              </Text>
            </Box>
            <Box width='25%'>
              <Text fontSize={{ base: 'sm', lg: 'lg' }}>
                {timeToNow(yeet.createdAt)}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default LeaderBoardList;
