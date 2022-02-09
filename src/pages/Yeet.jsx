import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/layout';

import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDao } from '../contexts/DaoContext';
import CopyButton from '../components/copyButton';
import { supportedChains } from '../utils/chain';
import { yeetingTime, yeetStatus } from '../utils/projects';
import ContributionExample from '../components/contributionExample';
import Loading from '../components/loading';

const UpcomingBlock = ({ project }) => {
  const { yeeternumber } = useParams();

  const timeContent = yeetingTime(project);
  return (
    <Flex wrap='wrap' justify='center' align='center' mt={10}>
      <Box
        fontSize='6xl'
        lineHeight='1'
        inlineSize='100%'
        overflowWrap='break-word'
        textAlign='center'
        mb={5}
      >
        Yeeting will begin {timeContent.time}
      </Box>
      <Text textAlign='center' fontSize='lg'>
        <RouterLink
          to={`/dao/${project?.networkID}/${project?.dao?.id}/${yeeternumber ||
            '1'}`}
        >
          See More Project Details
        </RouterLink>
      </Text>
    </Flex>
  );
};

const ExpiredBlock = ({ project }) => {
  const { yeeternumber } = useParams();

  return (
    <Flex wrap='wrap' justify='center' align='center' mt={10}>
      <Box
        fontSize='6xl'
        lineHeight='1'
        inlineSize='100%'
        overflowWrap='break-word'
        textAlign='center'
        mb={5}
      >
        Yeeting has ended
      </Box>
      <Text textAlign='center' fontSize='lg'>
        <RouterLink
          to={`/dao/${project?.networkID}/${project?.dao?.id}/${yeeternumber ||
            '1'}`}
        >
          See More Project Details
        </RouterLink>
      </Text>
    </Flex>
  );
};

const Yeet = () => {
  const { currentProject } = useDao();
  const { yeeternumber } = useParams();

  const status = useMemo(() => {
    if (currentProject) {
      return yeetStatus(currentProject);
    }
    return null;
  }, [currentProject]);

  return (
    <Box p={10}>
      {!currentProject && <Loading />}
      {currentProject && status === 'upcoming' && (
        <UpcomingBlock project={currentProject} />
      )}
      {currentProject &&
        (status === 'funded' ||
          status === 'failed' ||
          status === 'expired') && <ExpiredBlock project={currentProject} />}

      {currentProject && status === 'active' && (
        <>
          <Flex wrap='wrap' justify='center'>
            <Box
              fontSize={['12vw', null, null, '10vw', '10vw']}
              lineHeight='1'
              inlineSize='100%'
              overflowWrap='break-word'
              textAlign='center'
              mb={5}
            >
              {currentProject.shamanAddress}
            </Box>
            <CopyButton
              text={currentProject.shamanAddress}
              iconProps={{ height: '100px', width: '100px' }}
            />
          </Flex>
          <Text
            textAlign='center'
            mt={10}
            fontSize={['xl', '2xl', '5xl', '5xl', '5xl']}
          >
            1. Send {supportedChains[currentProject.networkID].nativeCurrency}{' '}
            to the address above on{' '}
            {supportedChains[currentProject.networkID].name}
          </Text>
          <Text
            textAlign='center'
            mt={1}
            fontSize={['xl', '2xl', '5xl', '5xl', '5xl']}
          >
            2. Get back Loot in the project DAO
          </Text>
          <Flex
            wrap='wrap'
            justify='center'
            textTransform='uppercase'
            fontSize='sm'
            mt={5}
            mb={10}
          >
            <ContributionExample project={currentProject} boxWidth='60%' />
          </Flex>
          <Text textAlign='center' fontSize='lg'>
            <RouterLink
              to={`/dao/${currentProject?.networkID}/${
                currentProject?.dao?.id
              }/${yeeternumber || '1'}`}
            >
              See More Project Details
            </RouterLink>
          </Text>
        </>
      )}
    </Box>
  );
};

export default Yeet;
