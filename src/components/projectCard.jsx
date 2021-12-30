import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import ProjectOverview from './projectOverview';

const ProjectCard = ({ project }) => {
  return (
    <Flex p={10} backgroundColor='primary.500'>
      <Box>
        <ProjectOverview project={project} />
      </Box>
    </Flex>
  );
};

export default ProjectCard;
