import React from 'react';
import { Flex } from '@chakra-ui/layout';

import ProjectOverview from './projectOverview';
import ProjectFundingStatus from './projectFundingStatus';

const ProjectListCard = ({ project }) => {
  return (
    <Flex p={10} backgroundColor='primary.500' wrap='wrap'>
      <Flex direction='column' w={['100%', null, null, '65%', '65%']}>
        <ProjectOverview project={project} />
      </Flex>
      <Flex direction='column' w={['100%', null, null, '35%', '35%']}>
        <ProjectFundingStatus project={project} />
      </Flex>
    </Flex>
  );
};

export default ProjectListCard;
