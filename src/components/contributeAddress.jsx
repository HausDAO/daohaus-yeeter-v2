import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

import ProjectDetailsNotice from './projectDetailsNotice';
import CopyButton from './copyButton';
import EtherscanLink from './etherscanLink';
import { supportedChains } from '../utils/chain';
import { displayBalance } from '../utils/tokenValue';

const ContributeAddress = ({ project }) => {
  return (
    <ProjectDetailsNotice
      title='How to Contribute'
      toolLabel='What to know!'
      toolContent='The Core Team are full shareholders in the DAO and are responsible for the goals of the project. Full shareholder membership is proposed through the DAOhaus interface.'
    >
      <Text color='secondary.500' fontSize='sm' textAlign='center' mt={7}>
        Or from your Wallet, send{' '}
        {supportedChains[project.networkID].nativeCurrency} to the following
        address:
      </Text>

      <Flex
        fontSize='lg'
        fontFamily='mono'
        direction='column'
        align='center'
        mb={3}
        px={{ base: 8, md: 0 }}
        justify='center'
      >
        <Text fontSize='sm' ml={3} mt={5} maxWidth={{ base: '100%' }}>
          {project.yeeter.shamanAddress}
        </Text>
        <Flex align='center'>
          <CopyButton text={project.yeeter.shamanAddress} />
          <Box>
            <EtherscanLink address={project.yeeter.shamanAddress} />
          </Box>
        </Flex>
      </Flex>

      <Flex direction='row' justify='flex-start' align='center' p={3}>
        <Icon as={AiOutlineExclamationCircle} mr={3} />
        <Box>
          <Text fontSize='xs'>
            Loot is issued in increments of 100 and accepts multiples of{' '}
            {displayBalance(
              project.yeeter.yeeterConfig.pricePerUnit,
              project.yeeterTokenDecimals,
              2,
            )}{' '}
            {supportedChains[project.networkID].nativeCurrency}
          </Text>
        </Box>
      </Flex>
    </ProjectDetailsNotice>
  );
};

export default ContributeAddress;
