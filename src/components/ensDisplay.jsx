import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Icon, Link, Text } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { truncateAddr } from '../utils/general';
import { handleGetENS } from '../utils/ens';
import { supportedChains } from '../utils/chain';

const EnsDisplay = ({ address, noLink }) => {
  const { daochain } = useParams();

  const [ensName, setEnsName] = useState();

  const getEns = async memberAddress => {
    const ensResult = await handleGetENS(memberAddress);
    if (ensResult) {
      return { name: ensResult };
    }

    return undefined;
  };

  useEffect(() => {
    const setUp = async () => {
      const ensObj = await getEns(address);
      setEnsName(ensObj?.name);
    };
    setUp();
  }, [address]);
  return (
    <Text>
      {ensName || truncateAddr(address)}
      {!noLink && (
        <Link
          href={`${supportedChains[daochain].block_explorer}/address/${address}`}
          isExternal
          ml={2}
        >
          <Icon as={RiExternalLinkLine} name='transaction link' />
        </Link>
      )}
    </Text>
  );
};

export default EnsDisplay;
