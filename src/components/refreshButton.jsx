import React, { useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { RiRefreshLine } from 'react-icons/ri';
import { Spinner } from '@chakra-ui/spinner';

import { useDao } from '../contexts/DaoContext';
import { useUser } from '../contexts/UserContext';

const RefreshButton = () => {
  const { refetch } = useDao();
  const { refetchUserMemberships } = useUser();
  const [fetching, setFetching] = useState(false);

  const handleRefetch = () => {
    setFetching(true);
    setTimeout(() => {
      refetch();
      refetchUserMemberships();
      setFetching(false);
    }, 3000);
  };

  if (fetching) {
    return <Spinner ml={3} color='secondary.500' />;
  }
  return (
    <Box
      paddingLeft='6px'
      paddingY='6px'
      onClick={handleRefetch}
      _hover={{ cursor: 'pointer' }}
    >
      <IconButton
        icon={<RiRefreshLine size='1rem' />}
        size='xs'
        variant='outline'
      />
    </Box>
  );
};

export default RefreshButton;
