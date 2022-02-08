import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { BsCaretDownFill } from 'react-icons/bs';
import Web3 from 'web3';

import { timeToNow } from '../utils/general';
import EnsDisplay from './ensDisplay';

const YEET_VIEW_COUNT = 20;
const YEET_SORT_OPTIONS = {
  TIME: 'createdAt',
  CONTRIBUTOR: 'contributorAddress',
  AMOUNT: 'amount',
};

const LeaderBoardList = ({ yeets, project }) => {
  const [sortedYeets, setSortedYeets] = useState([]);
  const [visibleYeets, setVisibileYeets] = useState(YEET_VIEW_COUNT);
  const [sort, setSort] = useState(YEET_SORT_OPTIONS.TIME);

  useEffect(() => {
    if (yeets.length) {
      setSortedYeets(
        yeets
          .sort((x, y) => {
            if (sort === YEET_SORT_OPTIONS.CONTRIBUTOR) {
              return x[sort] > y[sort] ? 1 : -1;
            }
            return Number(y[sort]) - Number(x[sort]);
          })
          .slice(0, visibleYeets),
      );
    }
  }, [yeets, sort, visibleYeets]);

  const resetYeetList = () => {
    setVisibileYeets(YEET_VIEW_COUNT);
  };

  const showMoreYeets = () => {
    setVisibileYeets(yeets.length + 1);
  };
  const toggleSort = sortProperty => {
    if (sortProperty !== sort) {
      setSort(sortProperty);
    }
  };

  return (
    <Box backgroundColor='primary.500' p={{ base: 4, md: 10 }}>
      <Text fontSize='lg' textTransform='uppercase' mb={3}>
        Yeets
      </Text>
      <Flex flexDirection='column'>
        <Flex alignItems='center' justifyContent='flex-start'>
          <Text
            fontSize='xs'
            color='gray.500'
            width={{ base: '25%', lg: '35%' }}
            mr={{ base: '10%', lg: '0' }}
            mb={{ base: 1, lg: '19px' }}
            _hover={{ cursor: 'pointer' }}
            onClick={() => toggleSort(YEET_SORT_OPTIONS.CONTRIBUTOR)}
          >
            Contributor
            <Icon
              as={BsCaretDownFill}
              ml={1}
              color={
                sort === YEET_SORT_OPTIONS.CONTRIBUTOR ? 'white' : 'gray.700'
              }
            />
          </Text>
          <Text
            fontSize='xs'
            color='gray.500'
            width='25%'
            mb={{ base: 1, lg: '19px' }}
            _hover={{ cursor: 'pointer' }}
            onClick={() => toggleSort(YEET_SORT_OPTIONS.AMOUNT)}
          >
            Amount
            <Icon
              as={BsCaretDownFill}
              ml={1}
              color={sort === YEET_SORT_OPTIONS.AMOUNT ? 'white' : 'gray.700'}
            />
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
            _hover={{ cursor: 'pointer' }}
            onClick={() => toggleSort(YEET_SORT_OPTIONS.TIME)}
          >
            Time
            <Icon
              as={BsCaretDownFill}
              ml={1}
              color={sort === YEET_SORT_OPTIONS.TIME ? 'white' : 'gray.700'}
            />
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
      {sortedYeets.length < yeets.length && (
        <Button
          mt={2}
          paddingX={2}
          paddingY={1}
          width='94px'
          height='29px'
          borderRadius='lg'
          color='black'
          fontSize='11px'
          lineHeight='20px'
          fontWeight='400'
          align='center'
          transition='all 0.15s linear'
          _hover={{
            color: 'gray.900',
            backgroundColor: 'secondary.600',
          }}
          onClick={showMoreYeets}
        >
          Show More
        </Button>
      )}

      {sortedYeets.length > YEET_VIEW_COUNT &&
        sortedYeets.length === yeets.length && (
          <Button
            mt={2}
            paddingX={2}
            paddingY={1}
            width='94px'
            height='29px'
            borderRadius='lg'
            color='black'
            fontSize='11px'
            lineHeight='20px'
            fontWeight='400'
            align='center'
            transition='all 0.15s linear'
            _hover={{
              color: 'gray.900',
              backgroundColor: 'secondary.600',
            }}
            onClick={resetYeetList}
          >
            Show Less
          </Button>
        )}
    </Box>
  );
};

export default LeaderBoardList;
