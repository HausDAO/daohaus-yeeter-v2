import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Icon, Link } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';

const DaohausLink = ({ linkText }) => {
  const { daoid, daochain } = useParams();
  return (
    <Link
      href={`https://app.daohaus.club/dao/${daochain}/${daoid}`}
      isExternal
      ml={2}
    >
      <Flex align='center'>
        {linkText}
        <Icon ml={2} as={RiExternalLinkLine} name='transaction link' />
      </Flex>
    </Link>
  );
};

export default DaohausLink;
