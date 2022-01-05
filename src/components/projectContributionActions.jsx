import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import CopyButton from './copyButton';

const ProjectContributionActions = ({ project }) => {
  return (
    <Flex direction='column'>
      <Text textTransform='uppercase'>Yeet xdai to</Text>
      <Box>{project?.yeeter?.shamanAddress}</Box>
      <CopyButton text={project?.yeeter?.shamanAddress} />
    </Flex>
  );
};

export default ProjectContributionActions;
