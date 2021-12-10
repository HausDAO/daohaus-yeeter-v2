import React from 'react';
import { useParams } from 'react-router';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import makeBlockie from 'ethereum-blockies-base64';

import { useAppModal } from '../hooks/useModals';
import { useDao } from '../contexts/DaoContext';
import { themeImagePath } from '../utils/metadata';
import { FORM } from '../data/forms';

const DaoProposals = () => {
  const { daoOverview, daoProposals } = useDao();
  const { daoid } = useParams();
  const { formModal } = useAppModal();

  const handleProposalClick = () => formModal(FORM.FUNDING);

  return (
    <Box p={10}>
      {daoProposals && daoOverview && (
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
          <Text fontSize='sm'>
            Latest proposal count: {daoProposals.length}
          </Text>

          <Button onClick={handleProposalClick} mt={4}>
            Create Proposal
          </Button>
        </>
      )}
    </Box>
  );
};

export default DaoProposals;
