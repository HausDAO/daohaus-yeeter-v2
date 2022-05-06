import React, { useEffect, useMemo, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import {
  Icon,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useParams } from 'react-router';
import { ethers } from 'ethers';
import { useWallet } from '@raidguild/quiver';

import ProjectDetailsNotice from './projectDetailsNotice';
import EtherscanLink from './etherscanLink';
import WrongNetworkToolTip from './wrongNetworkToolTip';
import ContributionExample from './contributionExample';
import { encodeFunctionCall } from '../utils/abi';
import { supportedChains } from '../utils/chain';
import { maxContribution } from '../utils/projects';
import { displayBalance, fetchSpecificTokenData } from '../utils/tokenValue';
import { useDao } from '../contexts/DaoContext';
import { useAppModal } from '../hooks/useModals';
import ContributeAddress from './contributeAddress';

const Contribute = ({ project, contributions }) => {
  const { daochain } = useParams();
  const { address, chainId, provider } = useWallet();
  const { refetch } = useDao();
  const { genericModal } = useAppModal();
  const [contributionAmount, setContributionAmount] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [contributionComplete, setContributionComplete] = useState(null);
  const [tokenData, setTokenData] = useState(null);

  const chainMatch = daochain === chainId;

  const fetchToken = async () => {
    setTokenData(
      await fetchSpecificTokenData(
        project.yeeterConfig.token.id,
        {
          allowance: [address, project.shamanAddress],
          decimals: true,
        },
        daochain,
      ),
    );
  };

  useEffect(() => {
    if (!contributionAmount && project) {
      setContributionAmount(
        Number(
          displayBalance(
            project.yeeterConfig.pricePerUnit,
            project.yeeterTokenDecimals,
            4,
          ),
        ),
      );
    }
    if (address && project?.yeeterConfig?.erc20Only) {
      fetchToken();
    }
  }, [address, project]);

  const enoughTokenAllowance = useMemo(() => {
    if (contributionAmount && tokenData?.allowance) {
      return ethers.utils
        .parseUnits(tokenData.allowance, 'wei')
        .gte(
          ethers.utils.parseUnits(
            contributionAmount.toString(),
            tokenData.decimals,
          ),
        );
    }
  }, [contributionAmount, tokenData]);

  useEffect(() => {
    const pollTX = async () => {
      const interval = setInterval(async () => {
        const tx = await provider.getTransaction(txHash);

        if (tx.blockNumber) {
          refetch();
          setContributionComplete(
            tx.to.toLowerCase() === project.shamanAddress && txHash,
          );
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

  const submitTx = async args => {
    setLoading(true);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction(args).catch(err => {
      if (err.code === -32603) {
        // not enough funds to make this tx
        console.log(err.data.message);
        setError(true);
      }
      if (err.code === 4001) {
        // user cancelled
        console.log(err.message);
      }
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 5000);
    });

    if (!tx) {
      setLoading(false);
      return;
    }
    setTxHash(tx.hash);
  };

  const handleContribute = async () => {
    const args = {
      to: project.shamanAddress,
      value: ethers.utils.parseEther(contributionAmount.toString()),
    };
    await submitTx(args);
  };

  const handleERC20Contribute = async () => {
    const contribValue = ethers.utils.parseUnits(
      contributionAmount.toString(),
      tokenData.decimals,
    );
    const args = !enoughTokenAllowance
      ? {
          to: project.yeeterConfig.token.id,
          data: encodeFunctionCall(
            [
              'function approve(address spender, uint256 amount) returns (bool)',
            ],
            'approve',
            [project.shamanAddress, ethers.constants.MaxUint256.toString()],
          ),
        }
      : {
          to: project.shamanAddress,
          data: encodeFunctionCall(
            ['function yeetyeet20(uint256 _value)'],
            'yeetyeet20',
            [contribValue],
          ),
        };
    await submitTx(args);
  };

  return (
    <>
      <ProjectDetailsNotice
        title='How to Contribute'
        toolLabel='What to know!'
        toolContent='The Core Team are full shareholders in the DAO and are responsible for the goals of the project. Full shareholder membership is proposed through the DAOhaus interface.'
      >
        {/* {!chainMatch && <WrongNetworkToolTip />} */}
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

              {contributionAmount !== null && (
                <ContributionExample
                  project={project}
                  fontSize='xs'
                  boxWidth='90%'
                  setContributionAmount={setContributionAmount}
                />
              )}

              {!chainMatch && (
                <Box mt={10}>
                  <WrongNetworkToolTip />
                </Box>
              )}

              {!project.yeeterConfig.erc20Only ? (
                <>
                  {!error ? (
                    <>
                      <Button
                        mt={10}
                        onClick={handleContribute}
                        disabled={loading || !chainMatch}
                      >
                        {!loading ? (
                          'Contribute'
                        ) : (
                          <Spinner color='secondary.500' />
                        )}
                      </Button>

                      {chainMatch && (
                        <Text
                          mt={5}
                          color='secondary.500'
                          fontSize='sm'
                          onClick={openContributeAddress}
                          _hover={{ cursor: 'pointer' }}
                        >
                          Or Send Funds Directly
                        </Text>
                      )}
                    </>
                  ) : (
                    <>
                      <Alert
                        status='error'
                        backgroundColor='red.900'
                        borderRadius='10'
                        mt={8}
                      >
                        <AlertIcon />
                        <AlertDescription>
                          You do not have enough funds to contribute to this
                          project
                        </AlertDescription>
                      </Alert>
                    </>
                  )}
                </>
              ) : (
                <Box>
                  <Button
                    mt={10}
                    onClick={handleERC20Contribute}
                    disabled={loading || !chainMatch || !tokenData}
                    isLoading={loading}
                    minWidth='152px'
                  >
                    {!enoughTokenAllowance ? 'Approve Tokens' : 'Contribute'}
                  </Button>
                  <Text
                    mt={5}
                    fontSize='xs'
                    fontWeight='700'
                    textTransform='uppercase'
                    textAlign='center'
                  >
                    Actions required:
                  </Text>
                  <Box textTransform='uppercase'>
                    <Text fontSize='xs' textAlign='left' px={4}>
                      1. Approve Tokens
                    </Text>
                    <Text fontSize='xs' textAlign='left' px={4}>
                      2. Contribute
                    </Text>
                  </Box>
                </Box>
              )}

              {loading &&
                txHash &&
                (!project.yeeterConfig.erc20Only || enoughTokenAllowance) &&
                !contributionComplete && (
                  <Flex mt={4} align='center'>
                    <Text
                      color='secondary.500'
                      fontSize='md'
                      textAlign='center'
                      mr={2}
                      ml={3}
                    />
                    <EtherscanLink
                      address={txHash}
                      isTransaction
                      linkText='TX Pending'
                    />
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
                    🎉 Success!
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
