import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import { useParams } from 'react-router-dom';
import { Flex, Icon, Link, List, Text } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { TiArrowUnsorted } from 'react-icons/ti';

import { supportedChains } from '../utils/chain';
import { timeToNow, truncateAddr } from '../utils/general';

const LeaderBoardList = ({ yeets }) => {
  const { daochain } = useParams();
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
            <Text>
              {truncateAddr(yeet.contributorAddress)}
              <Link
                href={`${supportedChains[daochain].block_explorer}/address/${yeet.contributorAddress}`}
                isExternal
                ml={2}
              >
                <Icon as={RiExternalLinkLine} name='transaction link' />
              </Link>
            </Text>
            <Text>{Web3.utils.fromWei(yeet.amount)}</Text>
            <Text>{timeToNow(yeet.createdAt)}</Text>
          </Flex>
        ))}
      </Flex>
    </List>
  );
};

export default LeaderBoardList;
