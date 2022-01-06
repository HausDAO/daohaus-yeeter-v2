import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Icon, Link } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';

const DaohausLink = ({ linkText, project, route }) => {
  const { daoid, daochain } = useParams();

  const url = `https://app.daohaus.club/dao/${project?.networkID ||
    daochain}/${project?.id || daoid}${route || ''}`;

  return (
    <Link href={url} isExternal>
      <Flex align='center'>
        {linkText}
        <Icon ml={2} as={RiExternalLinkLine} name='transaction link' />
      </Flex>
    </Link>
  );
};

export default DaohausLink;
