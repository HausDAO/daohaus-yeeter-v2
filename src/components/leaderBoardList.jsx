import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import { Flex, Icon, List, Text } from '@chakra-ui/react';
import { TiArrowUnsorted } from 'react-icons/ti';

import { timeToNow } from '../utils/general';
import EnsDisplay from './ensDisplay';

const LeaderBoardList = ({ yeets }) => {
  const [amountSort, setAmountSort] = useState(false);
  const [sortedYeets, setSortedYeets] = useState([]);

  useEffect(() => {
    const sorted = yeets.sort((x, y) => {
      return Web3.utils.fromWei(x.amount) - Web3.utils.fromWei(y.amount);
    });
    setSortedYeets(amountSort ? sorted : sorted.reverse());
  }, [yeets, amountSort]);

  const toggleSort = () => {
    setAmountSort(!amountSort);
  };

  return (
    <List backgroundColor='primary.500' m={6}>
      <Text fontSize='xl'>Leader Board</Text>
      <Flex flexDirection='column'>
        <Flex alignItems='center' justifyContent='space-between'>
          <Text>Address</Text>
          <Text>
            Amount <Icon onClick={toggleSort} as={TiArrowUnsorted} />
          </Text>
          <Text>Wen</Text>
        </Flex>
        {sortedYeets.map((yeet, idx) => (
          <Flex alignItems='center' justifyContent='space-between' key={idx}>
            <EnsDisplay address={yeet.contributorAddress} />
            <Text>{Web3.utils.fromWei(yeet.amount)}</Text>
            <Text>{timeToNow(yeet.createdAt)}</Text>
          </Flex>
        ))}
      </Flex>
    </List>
  );
};

export default LeaderBoardList;
