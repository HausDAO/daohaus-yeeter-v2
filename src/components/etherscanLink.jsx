import React from 'react';
import { useParams } from 'react-router';
import { Link } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';

import { supportedChains } from '../utils/chain';

const EtherscanLink = ({ address, isTransaction }) => {
  const { daochain } = useParams();
  return (
    <Link
      href={`${supportedChains[daochain].block_explorer}/${
        isTransaction ? 'tx' : 'address'
      }/${address}`}
      isExternal
    >
      <Icon as={RiExternalLinkLine} name='transaction link' />
    </Link>
  );
};

export default EtherscanLink;
