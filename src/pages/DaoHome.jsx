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
import ProjectProposals from '../components/projectProposals';
import Loading from '../components/loading';

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

  if (currentProject?.dao?.meta?.hide) {
    return (
      <Box p={{ base: 6, md: 10 }}>
        <Box
          w={['100%', null, null, '65%', '65%']}
          backgroundColor='primary.500'
          paddingX={{ base: 5, lg: 7 }}
          paddingTop={{ base: '17px', lg: 6 }}
          paddingBottom={{ base: '17px', lg: 8 }}
          borderRadius='17px'
          mb={6}
          fontSize='2xl'
        >
          🚧 Yeeting Paused. Come back soon. 🚧
        </Box>
      </Box>
    );
  }

  return (
    <Box p={{ base: 6, md: 10 }}>
      {!currentProject && <Loading />}
      {currentProject && (
        <>
          <Flex wrap='wrap' justify='space-between'>
            <Box
              w={['100%', null, null, '65%', '65%']}
              backgroundColor='primary.500'
              paddingX={{ base: 5, lg: 7 }}
              paddingTop={{ base: '17px', lg: 6 }}
              paddingBottom={{ base: '17px', lg: 8 }}
              borderRadius='17px'
              mb={6}
            >
              <Box mb={10}>
                <ProjectOverview project={currentProject} longDescription />
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
              h='fit-content'
              backgroundColor='primary.500'
              paddingX={{ base: 5, lg: 7 }}
              paddingTop={{ base: '17px', lg: 6 }}
              paddingBottom={{ base: '17px', lg: 8 }}
              borderRadius='17px'
              mb={6}
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
            <Box
              w={['100%', null, null, '65%', '65%']}
              h='fit-content'
              backgroundColor='primary.500'
              paddingX={{ base: 5, lg: 7 }}
              paddingTop={{ base: '17px', lg: 6 }}
              paddingBottom={{ base: '17px', lg: 8 }}
              borderRadius='17px'
            >
              <Box borderRadius='17px'>
                {currentProject?.yeets.length > 0 && (
                  <LeaderBoardList
                    yeets={currentProject.yeets}
                    project={currentProject}
                  />
                )}
                {currentProject?.yeets.length === 0 && (
                  <Box>Awaiting Yeets</Box>
                )}
              </Box>
            </Box>
            <Box
              w={['100%', null, null, '30%', '30%']}
              h='fit-content'
              backgroundColor='primary.500'
              paddingX={{ base: 5, lg: 7 }}
              paddingTop={{ base: '17px', lg: 6 }}
              paddingBottom={{ base: '17px', lg: 8 }}
              borderRadius='17px'
            >
              {currentProject?.members.length > 0 && (
                <Box mb={5}>
                  <CoreTeamList
                    coreTeam={currentProject.members}
                    totalShares={currentProject.dao.totalShares}
                    project={currentProject}
                  />
                </Box>
              )}

              {currentProject?.proposals.length > 0 && (
                <ProjectProposals project={currentProject} />
              )}
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default DaoHome;
