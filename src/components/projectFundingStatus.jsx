import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/layout';
import { Progress, Icon } from '@chakra-ui/react';

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
              project.yeeterConfig.maxTarget,
              project.yeeterTokenDecimals,
              2,
            )}{' '}
            {supportedChains[project.networkID].nativeCurrency}
          </Box>
          {softCap && (
            <Box fontSize={{ base: 'sm', md: 'xs' }} color='gray.500'>
              Goal:{' '}
              {displayBalance(
                project.yeeterConfig.maxTarget * (softCap / 100),
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
                  project.yeeterConfig.maxTarget * (softCap / 100) -
                    project.balance,
                ),
                project.yeeterTokenDecimals,
                2,
              )}{' '}
              {project.yeeterConfig.maxTarget * (softCap / 100) -
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
            <Box mr={3} alignSelf='flex-start'>
              <Icon viewBox='0 0 24 24' size='1.5rem'>
                <path
                  d='M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20V20ZM13 12H17V14H11V7H13V12Z'
                  fill='#FAF6EB'
                />
              </Icon>
            </Box>
            <YeetCountdown project={project} />
          </Flex>
        )}
      {/* {yeetPeriodStatus === 'funded' && (
        <Box mb={3} fontFamily='mono' fontSize='xl'>
          🎉 Max Funding Goal Met!
        </Box>
      )}
      {yeetPeriodStatus === 'failed' && (
        <Box mb={3} fontFamily='mono' fontSize='xl'>
          ⏰ Funding Period Over
        </Box>
      )} */}

      {!daoid && <ContributedIndicator project={project} />}
    </>
  );
};

export default ProjectFundingStatus;
