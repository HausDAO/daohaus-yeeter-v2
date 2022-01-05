import React, { useMemo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { Icon } from '@chakra-ui/react';
import {
  AiOutlineExclamationCircle,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';

import CopyButton from './copyButton';
import { maxContribution, yeetStatus } from '../utils/projects';
import { supportedChains } from '../utils/chain';
import { truncateAddr } from '../utils/general';
import EtherscanLink from './etherscanLink';
import { displayBalance } from '../utils/tokenValue';

const yeetNotice = (project, contributions) => {
  console.log('contributions', contributions);
  return (
    <Box>
      <Flex justify='space-between' align='center' mb={2} fontSize='xs'>
        <Text textTransform='uppercase'>
          Yeet {supportedChains[project.networkID].short_name}{' '}
          {supportedChains[project.networkID].nativeCurrency} to
        </Text>

        <Tooltip
          hasArrow
          shouldWrapChildren
          padding={3}
          color='#ED963A'
          placement='bottom'
          label='The Core Team are full shareholders in the DAO and are responsible for the goals of the project. Full shareholder membership is proposed through the DAOhaus interface. '
        >
          <Flex alignItems='center' color='#ED963A'>
            <Icon mr={1} mt='2px' as={AiOutlineQuestionCircle} />
            What to know!
          </Flex>
        </Tooltip>
      </Flex>
      <Flex
        direction='column'
        border='1px solid'
        borderColor='secondary.500'
        borderRadius='10'
        padding={5}
      >
        <Flex
          fontSize='lg'
          fontFamily='mono'
          align='center'
          mb={3}
          justify='center'
        >
          <Text ml={3} mt={1}>
            {truncateAddr(project.yeeter.shamanAddress)}
          </Text>
          <CopyButton text={project.yeeter.shamanAddress} />
          <Box>
            <EtherscanLink address={project.yeeter.shamanAddress} />
          </Box>
        </Flex>
        <Flex direction='row' justify='space-between' wrap='wrap'>
          <Box fontSize='xs' textTransform='uppercase' color='gray.400'>
            {supportedChains[project.networkID].name}
          </Box>
          <Box fontSize='xs' textTransform='uppercase' color='gray.400'>
            Max{' '}
            {displayBalance(
              maxContribution(project),
              project.yeeterTokenDecimals,
            )}{' '}
            {supportedChains[project.networkID].nativeCurrency} contribution
          </Box>
        </Flex>
        {Number(contributions.total) >= maxContribution(project) && (
          <Flex
            direction='row'
            justify='flex-start'
            align='center'
            color='red.600'
          >
            <Icon as={AiOutlineExclamationCircle} mr={3} />
            <Box mt={2}>You’ve reached your individual contribution cap!</Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

const ProjectContributionActions = ({ project, contributions }) => {
  const projectStatus = useMemo(() => {
    if (project) {
      console.log('project', project);
      return yeetStatus(project);
    }
    return null;
  }, [project]);

  if (!projectStatus) {
    return null;
  }

  return (
    <Box direction='column'>
      {projectStatus !== 'active' && yeetNotice(project, contributions)}
    </Box>
  );
};

export default ProjectContributionActions;
