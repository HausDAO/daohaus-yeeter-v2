import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Icon, Link, Text, Tooltip } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { truncateAddr, truncateENSName } from '../utils/general';
import { handleGetENS } from '../utils/ens';
import { supportedChains } from '../utils/chain';

const EnsDisplay = ({ address, noLink, ...props }) => {
  const { daochain } = useParams();

  const [ensName, setEnsName] = useState();

  const getEns = async memberAddress => {
    const ensResult = await handleGetENS(memberAddress);
    if (ensResult && parseInt(ensResult) !== 0) {
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
    <Tooltip
      label={ensName && ensName.length > 15 ? ensName : ''}
      fontSize='md'
    >
      <Text
        fontSize={props.fontSize || 'sm'}
        fontFamily='heading'
        ml={{ base: props.ml, lg: props.ml || 3 }}
        maxWidth={props.maxWidth}
      >
        {truncateENSName(ensName) || truncateAddr(address)}
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
    </Tooltip>
  );
};

export default EnsDisplay;
