import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { useUser } from '../contexts/UserContext';
import { contributionSharePercentage } from '../utils/projects';
import { displayBalance } from '../utils/tokenValue';

const UserContribution = ({ project }) => {
  const { userContributions, userMemberships } = useUser();
  const [contributions, setContributions] = useState({
    total: 0,
    yeets: [],
    currentMembership: null,
  });

  useEffect(() => {
    if (project && userMemberships.length) {
      const yeets = userContributions(project);

      // TODO: move somewhere resuable
      const networkDaos = userMemberships.find(
        network => network.networkID === project.networkID,
      );
      const currentMembership = networkDaos?.daos.find(dao => {
        return dao.molochAddress === project.id;
      });

      const total = yeets.reduce((sum, yeet) => {
        sum += yeet.amount;
        return sum;
      }, 0);

      setContributions({ total, yeets, currentMembership });
    }
  }, [project, userMemberships]);

  if (!contributions.yeets.length || !contributions.currentMembership) {
    return null;
  }

  return (
    <Box>
      <Text textTransform='uppercase' mb={3}>
        Your Contribution
      </Text>
      <Flex justify='space-between'>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box fontSize='xl'>
            {displayBalance(contributions.total, project.yeeterTokenDecimals)}
          </Box>
          <Box fontSize='xs' color='gray.500'>
            Contributed
          </Box>
        </Flex>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box fontSize='xl'>{contributions.currentMembership.loot}</Box>
          <Box fontSize='xs' color='gray.500'>
            Loot
          </Box>
        </Flex>
        <Flex fontFamily='mono' direction='column' alignItems='flex-start'>
          <Box fontSize='xl'>
            {contributionSharePercentage(
              contributions.currentMembership.loot,
              project,
            )}
            %
          </Box>
          <Box fontSize='xs' color='gray.500'>
            Stake %
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserContribution;
