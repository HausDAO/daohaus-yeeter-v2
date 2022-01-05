import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import { useDao } from '../contexts/DaoContext';
import CoreTeamList from '../components/coreTeamList';
import LeaderBoardList from '../components/leaderBoardList';
import ProjectOverview from '../components/projectOverview';
import ProjectFundingStatus from '../components/projectFundingStatus';
import UserContribution from '../components/userContribution';
import ProjectContributionActions from '../components/projectContributionActions';

const DaoHome = () => {
  const { currentProject } = useDao();

  return (
    <Box p={10}>
      {currentProject && (
        <>
          <Flex wrap='wrap' justify='space-between'>
            <Flex
              direction='column'
              w={['100%', null, null, '65%', '65%']}
              backgroundColor='primary.500'
              p={10}
            >
              <Box mb={10}>
                <ProjectOverview project={currentProject} />
              </Box>
              <Box>
                <UserContribution project={currentProject} />
              </Box>
            </Flex>
            <Flex
              direction='column'
              w={['100%', null, null, '30%', '30%']}
              backgroundColor='primary.500'
              p={10}
            >
              <ProjectFundingStatus project={currentProject} />
              <ProjectContributionActions project={currentProject} />
            </Flex>
          </Flex>

          <Flex>
            {currentProject?.yeeter?.yeets && (
              <Box flexGrow='1'>
                <LeaderBoardList yeets={currentProject.yeeter?.yeets} />
              </Box>
            )}
            {currentProject?.members && (
              <Box flexGrow='1'>
                <CoreTeamList
                  coreTeam={currentProject.members}
                  totalShares={currentProject.totalShares}
                />
              </Box>
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default DaoHome;
