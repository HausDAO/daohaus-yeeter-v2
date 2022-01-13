import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/react';

import YeetCountdown from './yeetCountdown';
import ContributedIndicator from './contributedIndicator';
import { supportedChains } from '../utils/chain';
import { displayBalance } from '../utils/tokenValue';
import {
  projectCompletePercentage,
  totalYeeters,
  yeetStatus,
} from '../utils/projects';

const ProjectFundingStatus = ({ project }) => {
  const { daoid } = useParams();

  const projectComplete = projectCompletePercentage(project);
  const yeetPeriodStatus = yeetStatus(project);
  const yeeterCount = totalYeeters(project);

  return (
    <>
      <Flex justify='space-between' w='100%' mb={3}>
        <Flex fontFamily='mono' direction='column'>
          <Box fontSize='2xl'>
            <Text fontSize='xs' color='gray.500'>
              Raised{' '}
            </Text>
            {project.displayBalance}{' '}
            {supportedChains[project.networkID].nativeCurrency}
          </Box>
          <Box fontSize='xs' color='gray.500'>
            With a goal of{' '}
            {displayBalance(
              project.yeeter.yeeterConfig.maxTarget,
              project.yeeterTokenDecimals,
              2,
            )}{' '}
            {supportedChains[project.networkID].nativeCurrency}
          </Box>
        </Flex>
        <Flex fontFamily='mono' direction='column' alignItems='center'>
          <Box fontSize='2xl'>{yeeterCount}</Box>
          <Box fontSize='xs' color='gray.500'>
            Yeeters
          </Box>
        </Flex>
      </Flex>
      <Progress
        colorScheme='green'
        height='35px'
        value={projectComplete}
        backgroundColor='primary.400'
        mb={3}
      />
      {yeetPeriodStatus !== 'expired' &&
        yeetPeriodStatus !== 'funded' &&
        yeetPeriodStatus !== 'failed' && (
          <Flex mb={3} align='baseline'>
            <Box mr='3'>⏳</Box>
            <YeetCountdown project={project} />
          </Flex>
        )}
      {yeetPeriodStatus === 'funded' && (
        <Box mb={3} fontFamily='mono' fontSize='xl'>
          🎉 Funding Goal Met!
        </Box>
      )}
      {yeetPeriodStatus === 'failed' && (
        <Box mb={3} fontFamily='mono' fontSize='xl'>
          🤷 Funding Goal not Met
        </Box>
      )}

      {!daoid && <ContributedIndicator project={project} />}
    </>
  );
};

export default ProjectFundingStatus;
