import React, { useMemo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

import CopyButton from './copyButton';
import { maxContribution, yeetStatus } from '../utils/projects';
import { supportedChains } from '../utils/chain';
import { truncateAddr } from '../utils/general';
import EtherscanLink from './etherscanLink';
import { displayBalance } from '../utils/tokenValue';
import ProjectDetailsNotice from './projectDetailsNotice';
import DaohausLink from './daohausLink';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';

const yeetNotice = (project, contributions) => {
  return (
    <>
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
    </>
  );
};

const fundedNotice = project => {
  return (
    <Flex
      fontSize='md'
      fontFamily='heading'
      align='flex-start'
      direction='column'
      mb={3}
      justify='center'
    >
      <Text mb={3}>Visit the DAO to keep up with the project details:</Text>
      <Flex direction='row' justify='space-between'>
        <DaohausLink linkText='Visit the DAO' project={project} />
      </Flex>
    </Flex>
  );
};

const failedNotice = (project, address) => {
  return (
    <Flex
      fontSize='md'
      fontFamily='heading'
      align='flex-start'
      direction='column'
      mb={3}
      justify='center'
    >
      <Text mb={3}>
        You can rage quit and withdraw your funds or visit the DAO:
      </Text>
      <Flex direction='row' justify='space-between'>
        <DaohausLink
          linkText='Visit the DAO'
          project={project}
          route={address && `/profile/${address}`}
        />
      </Flex>
    </Flex>
  );
};

const ProjectContributionActions = ({ project, contributions }) => {
  const { address } = useInjectedProvider();
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
      {projectStatus === 'active' && (
        <ProjectDetailsNotice
          title={`Yeet ${supportedChains[project.networkID].short_name} ${
            supportedChains[project.networkID].nativeCurrency
          } to`}
          toolLabel='What to know!'
          toolContent='The Core Team are full shareholders in the DAO and are responsible for the goals of the project. Full shareholder membership is proposed through the DAOhaus interface.'
        >
          {yeetNotice(project, contributions)}
        </ProjectDetailsNotice>
      )}
      {projectStatus === 'failed' && (
        <ProjectDetailsNotice
          title="What's Next"
          toolLabel='What happens to the funds?'
          toolContent='Regardless of reaching a goal, funds for this project are available for the DAO. Visit the DAO to see how they are being used or rage quit and withdraw your funds.'
        >
          {failedNotice(project, address)}
        </ProjectDetailsNotice>
      )}
      {projectStatus === 'funded' && (
        <ProjectDetailsNotice
          title="What's Next"
          toolLabel='What happens to the funds?'
          toolContent='Regardless of reaching a goal, funds for this project are available for the DAO. Visit the DAO to see how they are being used or rage quit and withdraw your funds.'
        >
          {fundedNotice(project)}
        </ProjectDetailsNotice>
      )}
    </Box>
  );
};

export default ProjectContributionActions;
