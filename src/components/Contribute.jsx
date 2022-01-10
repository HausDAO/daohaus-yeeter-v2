import React from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { Icon, Button } from '@chakra-ui/react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useParams } from 'react-router';
import ProjectDetailsNotice from './projectDetailsNotice';
import { supportedChains } from '../utils/chain';

import {
  lootFromContribution,
  LOOT_PER_UNIT,
  maxContribution,
} from '../utils/projects';
import { truncateAddr } from '../utils/general';
import CopyButton from './copyButton';
import EtherscanLink from './etherscanLink';
import { displayBalance } from '../utils/tokenValue';
import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import WrongNetworkToolTip from './wrongNetworkToolTip';
import { useAppModal } from '../hooks/useModals';

const Contribute = ({ project, contributions }) => {
  const { daochain } = useParams();
  const { injectedChain } = useInjectedProvider();
  const { closeModal } = useAppModal();

  const chainMatch = daochain === injectedChain.chainId;

  return (
    <>
      <Flex
        wrap='wrap'
        justify='space-between'
        textTransform='uppercase'
        fontSize='sm'
        mt={5}
      >
        <Box>
          <Box mb={3}>If you contribute</Box>
          <Box mb={3}>
            {displayBalance(
              project.yeeter.yeeterConfig.pricePerUnit,
              project.yeeterTokenDecimals,
              2,
            )}{' '}
            {supportedChains[project.networkID].nativeCurrency} (min)
          </Box>
          <Box>
            {displayBalance(
              maxContribution(project),
              project.yeeterTokenDecimals,
              2,
            )}{' '}
            {supportedChains[project.networkID].nativeCurrency} (max)
          </Box>
        </Box>
        <Box>
          <Box mb={3}>You receive</Box>
          <Box mb={3}>{LOOT_PER_UNIT} Loot</Box>
          <Box>
            {lootFromContribution(maxContribution(project), project)} Loot
          </Box>
        </Box>
        <Box>
          {/* <Box mt={7} mb={3}>
            Tier 1 NFT
          </Box>
          <Box mb={3}>Tier 2 NFT</Box> */}
        </Box>
      </Flex>
      <Flex
        direction='row'
        justify='flex-start'
        align='center'
        p={3}
        mt={5}
        border='1px solid'
        borderColor='secondary.500'
        borderRadius='4px'
      >
        <Icon as={AiOutlineExclamationCircle} mr={3} />
        <Box>
          Amounts must be in increments of{' '}
          {displayBalance(
            project.yeeter.yeeterConfig.pricePerUnit,
            project.yeeterTokenDecimals,
            2,
          )}{' '}
          {supportedChains[project.networkID].nativeCurrency}
        </Box>
      </Flex>
      <Divider my={7} />
      <ProjectDetailsNotice
        title='How to Contribute'
        toolLabel='What to know!'
        toolContent='The Core Team are full shareholders in the DAO and are responsible for the goals of the project. Full shareholder membership is proposed through the DAOhaus interface.'
      >
        <Text color='secondary.500' fontSize='sm' textAlign='center'>
          From your Wallet, send DAI to the following address:
        </Text>
        <Flex
          fontSize='lg'
          fontFamily='mono'
          align='center'
          mb={3}
          justify='center'
        >
          <Text ml={3} mt={2}>
            {truncateAddr(project.yeeter.shamanAddress)}
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
      <Flex justify='flex-end' mt={5}>
        <Button variant='outline' onClick={closeModal}>
          Nevermind
        </Button>
        <Button ml={5} onClick={closeModal}>
          Done!
        </Button>
      </Flex>
    </>
  );
};

export default Contribute;
