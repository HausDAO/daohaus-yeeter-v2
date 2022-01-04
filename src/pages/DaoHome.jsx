import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';

import { Avatar } from '@chakra-ui/avatar';
import makeBlockie from 'ethereum-blockies-base64';
import { useParams } from 'react-router';
import { useDao } from '../contexts/DaoContext';
import { themeImagePath } from '../utils/metadata';
import DaohausLink from '../components/daohausLink';
import CoreTeamList from '../components/coreTeamList';

const DaoHome = () => {
  const { currentProject } = useDao();
  const { daoid } = useParams();

  console.log('currentProject', currentProject);

  return (
    <Box p={10}>
      {currentProject && (
        <>
          <Flex mb={5} align='center'>
            <Avatar
              src={
                currentProject.metadata?.avatarImg
                  ? themeImagePath(currentProject.metadata?.avatarImg)
                  : makeBlockie(daoid || '0x0')
              }
              mr={6}
            />
            <Text fontSize='xl'>{currentProject.metadata?.name}</Text>
          </Flex>
          <Text fontSize='sm'>{currentProject.id}</Text>
          <Text fontSize='sm'>{currentProject.metadata.description}</Text>
          <Text fontSize='sm'>Shares: {currentProject.totalShares}</Text>
          <Text fontSize='sm'>Loot: {currentProject.totalLoot}</Text>
          <Text fontSize='sm'>
            Guildbank Token Count: {currentProject.tokenBalances.length}
          </Text>
          <Text fontSize='sm'>
            Minion Count: {currentProject.minions.length}
          </Text>

          <DaohausLink linkText='View on Daohaus' />
          {currentProject?.members && (
            <CoreTeamList
              coreTeam={currentProject.members}
              totalShares={currentProject.totalShares}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default DaoHome;
