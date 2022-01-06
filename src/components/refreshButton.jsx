import React, { useState } from 'react';
import { IconButton } from '@chakra-ui/button';
import { RiRefreshLine } from 'react-icons/ri';
import { Spinner } from '@chakra-ui/spinner';
import { useDao } from '../contexts/DaoContext';

const RefreshButton = () => {
  const { refetch } = useDao();
  const [fetching, setFetching] = useState(false);

  const handleRefetch = () => {
    setFetching(true);
    setTimeout(() => {
      refetch();
      setFetching(false);
    }, 2000);
  };

  if (fetching) {
    return <Spinner color='secondary.500' />;
  }
  return (
    <IconButton
      icon={<RiRefreshLine size='1.5rem' />}
      p={0}
      size='sm'
      variant='outline'
      onClick={handleRefetch}
    />
  );
};

export default RefreshButton;
