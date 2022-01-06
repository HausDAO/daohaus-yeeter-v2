import React from 'react';
import { Flex } from '@chakra-ui/layout';

const ProjectProposals = ({ project }) => {
  return (
    <Flex p={10} backgroundColor='primary.500' wrap='wrap'>
      <Flex direction='column' w={['100%', null, null, '65%', '65%']} />
      <Flex direction='column' w={['100%', null, null, '35%', '35%']} />
    </Flex>
  );
};

export default ProjectProposals;
