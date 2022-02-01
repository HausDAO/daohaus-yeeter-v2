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
  softCapTag,
  totalYeeters,
  yeetStatus,
} from '../utils/projects';

const ProjectFundingStatus = ({ project }) => {
  const { daoid } = useParams();

  const projectComplete = projectCompletePercentage(project);
  const yeetPeriodStatus = yeetStatus(project);
  const yeeterCount = totalYeeters(project);
  const softCap = softCapTag(project);

  return (
    <>
      <Flex justify='space-between' w='100%' mb={3} mt={{ base: 3, md: 0 }}>
        <Flex fontFamily='mono' direction='column'>
          <Box fontSize='2xl'>
            {project.displayBalance || '0'}{' '}
            {supportedChains[project.networkID].nativeCurrency}
            {/* <Text fontSize='xs' color='gray.500'> // maybe we don't need this? 
              Raised
            </Text> */}
          </Box>
          <Box fontSize={{ base: 'sm', md: 'xs' }} color='gray.500'>
            Max Cap:{' '}
            {displayBalance(
              project.yeeter.yeeterConfig.maxTarget,
              project.yeeterTokenDecimals,
              2,
            )}{' '}
            {supportedChains[project.networkID].nativeCurrency}
          </Box>
          {softCap && (
            <Box fontSize={{ base: 'sm', md: 'xs' }} color='gray.500'>
              Goal:{' '}
              {displayBalance(
                project.yeeter.yeeterConfig.maxTarget * (softCap / 100),
                project.yeeterTokenDecimals,
                2,
              )}{' '}
              {`(${softCap}%)`}
            </Box>
          )}
          {softCap && (
            <Box fontSize={{ base: 'sm', md: 'xs' }} color='gray.500'>
              {displayBalance(
                Math.abs(
                  project.yeeter.yeeterConfig.maxTarget * (softCap / 100) -
                    project.balance,
                ),
                project.yeeterTokenDecimals,
                2,
              )}{' '}
              {project.yeeter.yeeterConfig.maxTarget * (softCap / 100) -
                project.balance >
              0
                ? 'to goal'
                : 'above goal'}
            </Box>
          )}
        </Flex>
        <Flex fontFamily='mono' direction='column' alignItems='center'>
          <Box fontSize='2xl'>{yeeterCount}</Box>
          <Box fontSize={{ base: 'sm', md: 'xs' }} color='gray.500'>
            Yeeters
          </Box>
        </Flex>
      </Flex>
      <Progress
        colorScheme='green'
        height='35px'
        value={projectComplete}
        backgroundColor='primary.400'
        mb={4}
        bgGradient={
          softCap
            ? `linear(to-r, primary.400 0% ${softCap}%,primary.400 0%,primary.100 ${parseInt(
                softCap,
              ) + 2}%,primary.300 0%)`
            : 'none'
        }
        borderLeftRadius='4px'
        borderRightRadius='4px'
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
          🎉 Max Funding Goal Met!
        </Box>
      )}
      {yeetPeriodStatus === 'failed' && (
        <Box mb={3} fontFamily='mono' fontSize='xl'>
          ⏰ Funding Period Over
        </Box>
      )}

      {!daoid && <ContributedIndicator project={project} />}
    </>
  );
};

export default ProjectFundingStatus;
