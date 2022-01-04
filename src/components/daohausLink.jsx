import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Icon, Link } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';

const DaohausLink = ({ linkText, project }) => {
  const { daoid, daochain } = useParams();

  return (
    <Link
      href={`https://app.daohaus.club/dao/${project?.networkID ||
        daochain}/${project?.id || daoid}`}
      isExternal
    >
      <Flex align='center'>
        {linkText}
        <Icon ml={2} as={RiExternalLinkLine} name='transaction link' />
      </Flex>
    </Link>
  );
};

export default DaohausLink;
