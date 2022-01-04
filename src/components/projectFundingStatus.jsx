import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import { supportedChains } from '../utils/chain';

const ProjectFundingStatus = ({ project }) => {
  return (
    <Box>
      {project?.balance} {supportedChains[project.networkID].nativeCurrency}
    </Box>
  );
};

export default ProjectFundingStatus;
