import React from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { Icon, Button } from '@chakra-ui/react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useParams } from 'react-router';
import ProjectDetailsNotice from './projectDetailsNotice';
import { supportedChains } from '../utils/chain';

import { maxContribution } from '../utils/projects';
import CopyButton from './copyButton';
import EtherscanLink from './etherscanLink';
import { displayBalance } from '../utils/tokenValue';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import WrongNetworkToolTip from './wrongNetworkToolTip';
import { useAppModal } from '../hooks/useModals';
import { useDao } from '../contexts/DaoContext';
import ContributionExample from './contributionExample';

const Contribute = ({ project, contributions }) => {
  const { daochain } = useParams();
  const { injectedChain } = useInjectedProvider();
  const { closeModal } = useAppModal();
  const { refetch } = useDao();

  const chainMatch = daochain === injectedChain?.chainId;

  const handleDone = () => {
    refetch();
    closeModal();
  };

  return (
    <>
      <ProjectDetailsNotice
        title='How to Contribute'
        toolLabel='What to know!'
        toolContent='The Core Team are full shareholders in the DAO and are responsible for the goals of the project. Full shareholder membership is proposed through the DAOhaus interface.'
      >
        <Text color='secondary.500' fontSize='sm' textAlign='center'>
          From your Wallet, send{' '}
          {supportedChains[project.networkID].nativeCurrency} to the following
          address:
        </Text>
        <Flex
          fontSize='lg'
          fontFamily='mono'
          align='center'
          mb={3}
          justify='center'
        >
          <Text fontSize='sm' ml={3} my={5}>
            {/* {truncateAddr(project.yeeter.shamanAddress)} */}
            {project.yeeter.shamanAddress}
          </Text>
          <CopyButton text={project.yeeter.shamanAddress} />
          <Box>
            <EtherscanLink address={project.yeeter.shamanAddress} />
          </Box>
        </Flex>
        <Flex
          direction='row'
          justify='space-between'
          wrap='wrap'
          align='center'
        >
          <Box fontSize='xs' textTransform='uppercase' color='gray.200'>
            {supportedChains[project.networkID].name}
          </Box>

          {!chainMatch && <WrongNetworkToolTip />}
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
      </ProjectDetailsNotice>
      <Divider my={7} />
      <ContributionExample project={project} />
      <Flex direction='row' justify='flex-start' align='center' p={3} mt={5}>
        <Icon as={AiOutlineExclamationCircle} mr={3} />
        <Box>
          Loot is issued in increments of 100 with increments of{' '}
          {displayBalance(
            project.yeeter.yeeterConfig.pricePerUnit,
            project.yeeterTokenDecimals,
            2,
          )}{' '}
          {supportedChains[project.networkID].nativeCurrency}
        </Box>
      </Flex>
      <Flex justify='flex-end' mt={5}>
        <Button variant='outline' onClick={closeModal}>
          Nevermind
        </Button>
        <Button ml={5} onClick={handleDone}>
          Done!
        </Button>
      </Flex>
    </>
  );
};

export default Contribute;
