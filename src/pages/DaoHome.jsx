import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import { useDao } from '../contexts/DaoContext';
import CoreTeamList from '../components/coreTeamList';
import LeaderBoardList from '../components/leaderBoardList';
import ProjectOverview from '../components/projectOverview';
import ProjectFundingStatus from '../components/projectFundingStatus';
import UserContribution from '../components/userContribution';
import ProjectContributionActions from '../components/projectContributionActions';
import { useUser } from '../contexts/UserContext';
import { userContributionData } from '../utils/projects';
import useInterval from '../hooks/useInterval';

const DaoHome = () => {
  const { currentProject, refetch } = useDao();
  const { userContributions, userMemberships } = useUser();
  const [contributions, setContributions] = useState({
    total: 0,
    yeets: [],
    currentMembership: null,
  });

  useEffect(() => {
    if (currentProject && userMemberships.length) {
      const yeets = userContributions(currentProject);
      setContributions(
        userContributionData(currentProject, userMemberships, yeets),
      );
    }
  }, [currentProject, userMemberships]);

  useInterval(() => {
    refetch();
  }, 30000);

  return (
    <Box p={10}>
      {currentProject && (
        <>
          <Flex wrap='wrap' justify='space-between'>
            <Box
              w={['100%', null, null, '65%', '65%']}
              backgroundColor='primary.500'
              p={10}
            >
              <Box mb={10}>
                <ProjectOverview project={currentProject} />
              </Box>
              <Box>
                <UserContribution
                  project={currentProject}
                  contributions={contributions}
                />
              </Box>
            </Box>
            <Box
              w={['100%', null, null, '30%', '30%']}
              backgroundColor='primary.500'
              p={10}
            >
              <Box mb={5}>
                <ProjectFundingStatus project={currentProject} />
              </Box>
              <Box>
                <ProjectContributionActions
                  project={currentProject}
                  contributions={contributions}
                />
              </Box>
            </Box>
          </Flex>

          <Flex wrap='wrap' justify='space-between'>
            <Box w={['100%', null, null, '65%', '65%']}>
              {currentProject?.yeeter?.yeets.length > 0 && (
                <LeaderBoardList yeets={currentProject.yeeter?.yeets} />
              )}
              {currentProject?.yeeter?.yeets.length === 0 && (
                <Box>No Yeets Yet</Box>
              )}
            </Box>
            <Box w={['100%', null, null, '30%', '30%']}>
              {currentProject?.members.length > 0 && (
                <CoreTeamList
                  coreTeam={currentProject.members}
                  totalShares={currentProject.totalShares}
                />
              )}
              {currentProject?.proposals.length > 0 && (
                <CoreTeamList
                  coreTeam={currentProject.members}
                  totalShares={currentProject.totalShares}
                />
              )}
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default DaoHome;
