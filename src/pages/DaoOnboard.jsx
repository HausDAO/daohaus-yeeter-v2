import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import CoreTeamList from '../components/coreTeamList';
import { useDao } from '../contexts/DaoContext';
import NextYeetOverview from '../components/nextYeetOverview';
import ProjectOverview from '../components/projectOverview';
import ProjectFundingStatus from '../components/projectFundingStatus';
import SnapshotProposals from '../components/snapshotProposals';
import UserContribution from '../components/userContribution';
import ProjectContributionActions from '../components/projectContributionActions';
import { useUser } from '../contexts/UserContext';
import { userContributionData } from '../utils/projects';
import useInterval from '../hooks/useInterval';
import Loading from '../components/loading';
import ProposalsList from '../components/proposalList';
import { Heading, ParaMd } from '../components/typography';

const DaoOnboard = () => {
  const { currentDao, snapshotData } = useDao();
  const { userContributions, userMemberships } = useUser();
  const [currentProject, setCurrentProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [contributions, setContributions] = useState({
    total: 0,
    yeets: [],
    currentMembership: null,
  });

  useEffect(() => {
    if (currentDao?.shamans?.length > 0) {
      const currTime = new Date().getTime();
      // const currTime = 1650421221000;
      const yeeter = currentDao.shamans.find(
        s => Number(s.yeeterConfig.raiseStartTime) * 1000 < currTime,
      );
      if (!yeeter || yeeter.yeeterNumber < currentDao.shamans.length) {
        setNextProject(
          currentDao.shamans[
            currentDao.shamans.length - (Number(yeeter?.yeeterNumber || 0) + 1)
          ],
        );
      }
      setCurrentProject({
        ...yeeter,
        dao: currentDao.dao,
      });
    }
  }, [currentDao]);

  useEffect(() => {
    if (currentProject && userMemberships.length) {
      const yeets = userContributions(currentProject);
      setContributions(
        userContributionData(currentProject, userMemberships, yeets),
      );
    }
  }, [currentProject, userMemberships]);

  useInterval(() => {
    // refetch();
  }, 30000);

  console.log(
    'CurrentDAO',
    currentDao,
    // nextProject,
    // contributions,
    snapshotData,
  );

  return (
    <Box p={{ base: 6, md: 10 }}>
      {!currentDao && !currentProject && <Loading />}
      {currentDao && (
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
                {currentProject && (
                  <ProjectOverview
                    project={currentProject}
                    hideYeetBadge
                    longDescription
                  />
                )}
              </Box>
              <Box>
                <UserContribution
                  project={currentProject}
                  contributions={contributions}
                />
              </Box>
            </Box>
            {currentProject?.yeeterNumber && (
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
            )}
          </Flex>

          {nextProject && (
            <Flex wrap='wrap' justify='space-between'>
              <Box
                w={['100%', null, null, '65%', '65%']}
                h='fit-content'
                backgroundColor='primary.500'
                paddingX={{ base: 5, lg: 7 }}
                paddingTop={{ base: '17px', lg: 6 }}
                paddingBottom={{ base: '17px', lg: 8 }}
                borderRadius='17px'
                mb={6}
              >
                <NextYeetOverview project={nextProject} />
              </Box>
            </Flex>
          )}

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
              <Box>
                {snapshotData?.proposals && (
                  <Box borderRadius='17px'>
                    <Heading>Proposals</Heading>
                    <ParaMd mb={6}>Space: {snapshotData.id}</ParaMd>
                    <SnapshotProposals snapshots={snapshotData.proposals} />
                    {/* <Box mt={6} ml={4}>
                      {snapshotProposals.length > 0 ? (
                        <Text>Space: {snapshotProposals[0].space.id}</Text>
                      ) : (
                        <Text fontStyle='italic'>No Active Proposals</Text>
                      )}
                    </Box> */}
                    {/* {currentProject?.yeets.length > 0 && (
                      <LeaderBoardList
                        yeets={currentProject.yeets}
                        project={currentProject}
                      />
                    )}
                    {currentProject?.yeets.length === 0 && (
                      <Box>Awaiting Yeets</Box>
                    )} */}
                  </Box>
                )}
              </Box>
              <Box paddingTop={{ base: '17px', lg: 6 }}>
                <Heading>Ratification</Heading>
                <ProposalsList proposals={currentDao.proposals} />
              </Box>
            </Box>
            {currentDao?.members.length > 0 && (
              <Box
                w={['100%', null, null, '30%', '30%']}
                h='fit-content'
                backgroundColor='primary.500'
                paddingX={{ base: 5, lg: 7 }}
                paddingTop={{ base: '17px', lg: 6 }}
                paddingBottom={{ base: '17px', lg: 8 }}
                borderRadius='17px'
              >
                DAO Memebers
                <Box mb={5}>
                  <CoreTeamList
                    allMembers={currentDao.members}
                    totalShares={currentDao.dao.totalShares}
                    project={currentProject}
                  />
                </Box>
              </Box>
            )}
          </Flex>
          {/* <Flex wrap='wrap' justify='space-between'>
            <Box
              w={['100%', null, null, '65%', '65%']}
              h='fit-content'
              backgroundColor='primary.500'
              paddingX={{ base: 5, lg: 7 }}
              paddingTop={{ base: '17px', lg: 6 }}
              paddingBottom={{ base: '17px', lg: 8 }}
              borderRadius='17px'
            >
              <Heading>Ratification</Heading>
              <ProposalsList proposals={currentDao.proposals} />
            </Box>
          </Flex> */}
        </>
      )}
    </Box>
  );
};

export default DaoOnboard;
