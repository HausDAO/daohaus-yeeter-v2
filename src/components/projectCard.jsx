import React from 'react';
import { Box, Text } from '@chakra-ui/layout';

const ProjectCard = ({ project }) => {
  return <Box p={10}>{project.name}</Box>;
};

export default ProjectCard;
