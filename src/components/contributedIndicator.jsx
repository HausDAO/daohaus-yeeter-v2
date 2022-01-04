import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { BiCheckCircle } from 'react-icons/bi';
import { Icon } from '@chakra-ui/react';

import { useUser } from '../contexts/UserContext';

const ContributedIndicator = ({ project }) => {
  const { userContributions } = useUser();
  const [hasContributed, setHasContributed] = useState(false);

  useEffect(() => {
    if (project) {
      setHasContributed(userContributions(project).length);
    }
  }, [project]);

  if (!hasContributed) {
    return null;
  }

  return (
    <Flex>
      <Icon
        w={5}
        h={5}
        as={BiCheckCircle}
        name='contribution check'
        color='green.500'
      />
      <Box fontSize='sm' color='gray.500' ml={2}>
        You&apos;ve contributed to this project
      </Box>
    </Flex>
  );
};

export default ContributedIndicator;
