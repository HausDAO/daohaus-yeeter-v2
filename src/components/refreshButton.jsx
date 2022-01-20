import React, { useState } from 'react';
import { IconButton } from '@chakra-ui/button';
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
    <IconButton
      icon={<RiRefreshLine size='1.5rem' />}
      p={0}
      size='sm'
      variant='outline'
      onClick={handleRefetch}
      ml={3}
    />
  );
};

export default RefreshButton;
