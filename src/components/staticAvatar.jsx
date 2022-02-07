import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Avatar, Box, Link, Icon } from '@chakra-ui/react';
import makeBlockie from 'ethereum-blockies-base64';

import { RiExternalLinkLine } from 'react-icons/ri';
import CopyButton from './copyButton';
import { supportedChains } from '../utils/chain';
import EnsDisplay from './ensDisplay';

const StaticAvatar = ({
  address,
  avatarImg,
  name,
  hideCopy,
  emoji,
  hideEtherscanLink,
  ...props
}) => {
  const { daochain } = useParams();
  const blockie = useMemo(() => {
    if (address) {
      return makeBlockie(address);
    }
  }, [address]);
  const avImg = avatarImg || blockie;

  return (
    <Flex direction='row' alignItems='center'>
      <Flex direction='row' alignItems='center'>
        <Avatar
          name={name || address}
          src={avImg}
          size='sm'
          mr={{ base: 2, md: 0 }}
        />
        <Flex>
          <EnsDisplay
            address={address}
            noLink
            fontSize={props.fontSize}
            ml={{ base: props.ml || 2, md: props.ml || 3 }}
          />

          <Box as='span' mx={1}>
            {emoji}
          </Box>
          {hideCopy || <CopyButton text={address} />}
          {(!daochain && hideEtherscanLink) || (
            <Link
              href={`${supportedChains[daochain]?.block_explorer}/address/${address}`}
              isExternal
              mt='-1'
            >
              <Icon as={RiExternalLinkLine} name='transaction link' />
            </Link>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StaticAvatar;
