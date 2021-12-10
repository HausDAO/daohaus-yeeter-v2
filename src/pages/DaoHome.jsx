import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';

import { Avatar } from '@chakra-ui/avatar';
import makeBlockie from 'ethereum-blockies-base64';
import { useParams } from 'react-router';
import { useDao } from '../contexts/DaoContext';
import { themeImagePath } from '../utils/metadata';
import DaohausLink from '../components/daohausLink';

const DaoHome = () => {
  const { daoOverview } = useDao();
  const { daoid } = useParams();

  return (
    <Box p={10}>
      {daoOverview && (
        <>
          <Flex mb={5} align='center'>
            <Avatar
              src={
                daoOverview.metadata?.avatarImg
                  ? themeImagePath(daoOverview.metadata?.avatarImg)
                  : makeBlockie(daoid || '0x0')
              }
              mr={6}
            />
            <Text fontSize='xl'>{daoOverview.metadata?.name}</Text>
          </Flex>
          <Text fontSize='sm'>{daoOverview.id}</Text>
          <Text fontSize='sm'>{daoOverview.metadata.description}</Text>
          <Text fontSize='sm'>Shares: {daoOverview.totalShares}</Text>
          <Text fontSize='sm'>Loot: {daoOverview.totalLoot}</Text>
          <Text fontSize='sm'>
            Guildbank Token Count: {daoOverview.tokenBalances.length}
          </Text>
          <Text fontSize='sm'>Minion Count: {daoOverview.minions.length}</Text>

          <DaohausLink linkText='View on Daohaus' />
        </>
      )}
    </Box>
  );
};

export default DaoHome;
