import React from 'react';
import { Flex, Box } from '@chakra-ui/layout';

import ProjectOverview from './projectOverview';
import ProjectFundingStatus from './projectFundingStatus';

const ProjectListCard = ({ project }) => {
  return (
    <Flex p={10} backgroundColor='primary.500' wrap='wrap'>
      <Flex direction='column' w={['100%', null, null, '70%', '70%']}>
        <ProjectOverview project={project} />
      </Flex>
      <Flex direction='column' w={['100%', null, null, '30%', '30%']}>
        <ProjectFundingStatus project={project} />
      </Flex>
    </Flex>
  );
};

export default ProjectListCard;
