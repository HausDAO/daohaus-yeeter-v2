import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Icon, Button, Spinner } from '@chakra-ui/react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useParams } from 'react-router';
import { ethers } from 'ethers';
import { useWallet } from '@raidguild/quiver';

import ProjectDetailsNotice from './projectDetailsNotice';
import EtherscanLink from './etherscanLink';
import WrongNetworkToolTip from './wrongNetworkToolTip';
import ContributionExample from './contributionExample';
import { supportedChains } from '../utils/chain';
import { maxContribution } from '../utils/projects';
import { displayBalance } from '../utils/tokenValue';
import { useDao } from '../contexts/DaoContext';
import { useAppModal } from '../hooks/useModals';
import ContributeAddress from './contributeAddress';

const Contribute = ({ project, contributions }) => {
  const { daochain } = useParams();
  const { chainId, provider } = useWallet();
  const { refetch } = useDao();
  const { genericModal } = useAppModal();
  const [contributionAmount, setContributionAmount] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [loading, setLoading] = useState(null);
  const [contributionComplete, setContributionComplete] = useState(null);

  const chainMatch = daochain === chainId;

  useEffect(() => {
    if (project) {
      setContributionAmount(
        Number(
          displayBalance(
            project.yeeter.yeeterConfig.pricePerUnit,
            project.yeeterTokenDecimals,
            2,
          ),
        ),
      );
    }
  }, [project]);

  useEffect(() => {
    const pollTX = async () => {
      const interval = setInterval(async () => {
        const tx = await provider.getTransaction(txHash);

        if (tx.blockNumber) {
          refetch();
          setContributionComplete(txHash);
          setTxHash(null);
          setLoading(false);
          clearInterval(interval);
        }
      }, 3000);

      return () => clearInterval(interval);
    };

    if (txHash) {
      pollTX();
    }
  }, [txHash]);

  const openContributeAddress = () =>
    genericModal({
      title: 'Contribute!',
      body: <ContributeAddress project={project} />,
    });

  const handleContribute = async () => {
    const signer = provider.getSigner();

    const args = {
      to: project.yeeter.shamanAddress,
      value: ethers.utils.parseEther(contributionAmount.toString()),
    };
    const tx = await signer.sendTransaction(args);

    console.log('tx', tx);
    setLoading(true);
    setTxHash(tx.hash);
  };

  return (
    <>
      <ProjectDetailsNotice
        title='How to Contribute'
        toolLabel='What to know!'
        toolContent='The Core Team are full shareholders in the DAO and are responsible for the goals of the project. Full shareholder membership is proposed through the DAOhaus interface.'
      >
        {!chainMatch && <WrongNetworkToolTip />}
        <Flex direction='column' align='center' mb={3}>
          {Number(contributions.total) < maxContribution(project) && (
            <>
              <Box
                fontSize='xs'
                fontWeight='700'
                textTransform='uppercase'
                color='gray.200'
                mt={3}
              >
                On {supportedChains[project.networkID].name}
              </Box>

              {contributionAmount && (
                <ContributionExample
                  project={project}
                  fontSize='xs'
                  boxWidth='90%'
                  setContributionAmount={setContributionAmount}
                />
              )}

              {!chainMatch && (
                <Text
                  mt={5}
                  // color='secondary.500'
                  fontSize='sm'
                  onClick={openContributeAddress}
                  _hover={{ cursor: 'pointer' }}
                >
                  Switch to {supportedChains[project.networkID].name}
                </Text>
              )}

              <Button
                mt={10}
                onClick={handleContribute}
                disabled={loading || !chainMatch}
              >
                {!loading ? 'Contribute' : <Spinner color='secondary.500' />}
              </Button>

              <Text
                mt={5}
                color='secondary.500'
                fontSize='sm'
                onClick={openContributeAddress}
                _hover={{ cursor: 'pointer' }}
              >
                Or Send Funds Directly
              </Text>

              {loading && txHash && (
                <Flex mt={4} align='center'>
                  <Text
                    color='secondary.500'
                    fontSize='md'
                    textAlign='center'
                    mr={2}
                    ml={3}
                  >
                    TX Pending
                  </Text>
                  <EtherscanLink address={txHash} isTransaction />
                </Flex>
              )}

              {contributionComplete && (
                <Flex mt={4} align='center'>
                  <Text
                    color='secondary.500'
                    fontSize='md'
                    textAlign='center'
                    mr={2}
                    ml={3}
                  >
                    🎉 Contribution Complete!
                  </Text>
                  <EtherscanLink address={contributionComplete} isTransaction />
                </Flex>
              )}
            </>
          )}

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
      </ProjectDetailsNotice>
    </>
  );
};

export default Contribute;
