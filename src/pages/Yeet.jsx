import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/layout';

import { Spinner } from '@chakra-ui/spinner';
import { useDao } from '../contexts/DaoContext';
import CopyButton from '../components/copyButton';
import { supportedChains } from '../utils/chain';
import { displayBalance } from '../utils/tokenValue';
import {
  lootFromContribution,
  LOOT_PER_UNIT,
  maxContribution,
  yeetingTime,
  yeetStatus,
} from '../utils/projects';

const UpcomingBlock = ({ project }) => {
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
        <RouterLink to={`/dao/${project?.networkID}/${project?.id}`}>
          See More Project Details
        </RouterLink>
      </Text>
    </Flex>
  );
};

const ExpiredBlock = ({ project }) => {
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
        <RouterLink to={`/dao/${project?.networkID}/${project?.id}`}>
          See More Project Details
        </RouterLink>
      </Text>
    </Flex>
  );
};

const Yeet = () => {
  const { currentProject } = useDao();

  const status = useMemo(() => {
    if (currentProject) {
      return yeetStatus(currentProject);
    }
    return null;
  }, [currentProject]);

  return (
    <Box p={10}>
      {!currentProject && <Spinner />}
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
              {currentProject.yeeter.shamanAddress}
            </Box>
            <CopyButton
              text={currentProject.yeeter.shamanAddress}
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
            2. Get back Loot and Project DAO membership
          </Text>
          <Flex
            wrap='wrap'
            justify='center'
            textTransform='uppercase'
            fontSize='sm'
            my={5}
          >
            <Box>
              <Box mb={2} mr={10} fontWeight='700'>
                If you yeet
              </Box>
              <Box mb={2}>
                {displayBalance(
                  currentProject.yeeter.yeeterConfig.pricePerUnit,
                  currentProject.yeeterTokenDecimals,
                  2,
                )}{' '}
                {supportedChains[currentProject.networkID].nativeCurrency} (min)
              </Box>
              <Box>
                {displayBalance(
                  maxContribution(currentProject),
                  currentProject.yeeterTokenDecimals,
                  2,
                )}{' '}
                {supportedChains[currentProject.networkID].nativeCurrency} (max)
              </Box>
            </Box>
            <Box>
              <Box mb={2} fontWeight='700'>
                You receive
              </Box>
              <Box mb={2}>{LOOT_PER_UNIT} Loot</Box>
              <Box>
                {lootFromContribution(
                  maxContribution(currentProject),
                  currentProject,
                )}{' '}
                Loot
              </Box>
            </Box>
          </Flex>
          <Text textAlign='center' fontSize='lg'>
            <RouterLink
              to={`/dao/${currentProject?.networkID}/${currentProject?.id}`}
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
