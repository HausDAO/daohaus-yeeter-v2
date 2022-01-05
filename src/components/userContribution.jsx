import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { useUser } from '../contexts/UserContext';

const UserContribution = ({ project }) => {
  const { userContributions } = useUser();
  const [contributions, setContributions] = useState({ total: 0, yeets: [] });

  useEffect(() => {
    if (project) {
      const yeets = userContributions(project);

      console.log('yeets', yeets);

      const total = yeets.reduce((sum, yeet) => {
        sum += yeet.amount;
        return sum;
      }, 0);

      setContributions({ total, yeets });
    }
  }, [project]);

  if (!contributions.yeets.length) {
    return null;
  }

  return (
    <Flex>
      <Text textTransform='uppercase'>Your Contribution</Text>
      <Box>{contributions.total}</Box>
    </Flex>
  );
};

export default UserContribution;
